'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { useAppStore } from '@/store/useAppStore'

function ParticleField() {
    const pointsRef = useRef<THREE.Points>(null!)
    const { isInitialized } = useAppStore()

    // Track previous state to trigger explosion only once
    // If we mount and already initialized, we set this to true so we don't explode again
    const wasInitialized = useRef(isInitialized)

    // Generate 4000 particles
    const [positions, originalScatteredPositions, spherePositions] = useMemo(() => {
        const count = 4000
        const pos = new Float32Array(count * 3)
        const scattered = new Float32Array(count * 3)
        const sphere = new Float32Array(count * 3)

        // Get initial state (snapshot)
        const startInitialized = useAppStore.getState().isInitialized

        for (let i = 0; i < count; i++) {
            // 1. Scattered Positions (Post-Init World)
            const r = 10 * Math.cbrt(Math.random())
            const theta = Math.random() * 2 * Math.PI
            const phi = Math.acos(2 * Math.random() - 1)

            const x = r * Math.sin(phi) * Math.cos(theta)
            const y = r * Math.sin(phi) * Math.sin(theta)
            const z = r * Math.cos(phi)

            scattered[i * 3] = x
            scattered[i * 3 + 1] = y
            scattered[i * 3 + 2] = z

            // 2. Sphere Positions (Pre-Init Core)
            // Tightly packed sphere, radius ~2.5
            const rSphere = 2.5 + (Math.random() - 0.5) * 0.2 // Surface with slight thickness
            const xS = rSphere * Math.sin(phi) * Math.cos(theta)
            const yS = rSphere * Math.sin(phi) * Math.sin(theta)
            const zS = rSphere * Math.cos(phi)

            sphere[i * 3] = xS
            sphere[i * 3 + 1] = yS
            sphere[i * 3 + 2] = zS

            // Initial positions based on mount state
            if (startInitialized) {
                pos[i * 3] = x
                pos[i * 3 + 1] = y
                pos[i * 3 + 2] = z
            } else {
                pos[i * 3] = xS
                pos[i * 3 + 1] = yS
                pos[i * 3 + 2] = zS
            }
        }
        return [pos, scattered, sphere]
    }, []) // Empty deps = run once on mount

    // Ref for current velocities (for explosion physics)
    const velocities = useMemo(() => new Float32Array(4000 * 3).fill(0), [])

    useFrame((state) => {
        const time = state.clock.getElapsedTime()
        const mouseX = state.pointer.x * 10
        const mouseY = state.pointer.y * 10
        const mouseVec = new THREE.Vector3(mouseX, mouseY, 0)

        // Check for initialization trigger (Transition from False -> True)
        if (!wasInitialized.current && isInitialized) {
            // TRIGGER EXPLOSION
            for (let i = 0; i < 4000; i++) {
                const i3 = i * 3
                // Radial explosion velocity
                const currentPos = new THREE.Vector3(positions[i3], positions[i3 + 1], positions[i3 + 2])
                const dir = currentPos.normalize()
                const force = 0.5 + Math.random() * 0.5 // Random explosive force

                velocities[i3] = dir.x * force
                velocities[i3 + 1] = dir.y * force
                velocities[i3 + 2] = dir.z * force
            }
            wasInitialized.current = true
        }

        // Update Particles
        for (let i = 0; i < 4000; i++) {
            const i3 = i * 3

            let x = positions[i3]
            let y = positions[i3 + 1]
            let z = positions[i3 + 2]

            // STATE 1: PRE-INIT (Rotating Sphere)
            if (!isInitialized) {
                // Target is Sphere Position + Rotation
                // We rotate the target positions based on time
                const speed = 0.2
                const cosT = Math.cos(time * speed)
                const sinT = Math.sin(time * speed)

                // Original sphere coord
                const sx = spherePositions[i3]
                const sy = spherePositions[i3 + 1]
                const sz = spherePositions[i3 + 2]

                // Rotate sphere around Y axis
                const rotX = sx * cosT - sz * sinT
                const rotZ = sx * sinT + sz * cosT
                const rotY = sy

                // Lerp to rotated sphere position (rigid body feel)
                // Strong lerp to keep shape
                const lerpFactor = 0.1
                positions[i3] += (rotX - x) * lerpFactor
                positions[i3 + 1] += (rotY - y) * lerpFactor
                positions[i3 + 2] += (rotZ - z) * lerpFactor

                // Reset velocity
                velocities[i3] = 0
                velocities[i3 + 1] = 0
                velocities[i3 + 2] = 0
            }

            // STATE 2: POST-INIT (Explosion -> Drift)
            else {
                // Apply Velocity (Explosion decay)
                x += velocities[i3]
                y += velocities[i3 + 1]
                z += velocities[i3 + 2]

                // Dampen velocity
                velocities[i3] *= 0.92
                velocities[i3 + 1] *= 0.92
                velocities[i3 + 2] *= 0.92

                // Target is Scattered Position (Ambient Drift)
                const tx = originalScatteredPositions[i3]
                const ty = originalScatteredPositions[i3 + 1]
                const tz = originalScatteredPositions[i3 + 2]

                // Ambient Flow Noise
                const flowX = Math.sin(time * 0.5 + y * 0.5) * 0.005
                const flowY = Math.cos(time * 0.3 + x * 0.5) * 0.005

                // Mouse Repulsion (Global)
                const currentPos = new THREE.Vector3(x, y, z)
                const distToMouse = currentPos.distanceTo(mouseVec)
                let repelX = 0, repelY = 0, repelZ = 0

                if (distToMouse < 4) {
                    const repelForce = (4 - distToMouse) / 4
                    const repelStrength = 0.1
                    const dir = currentPos.clone().sub(mouseVec).normalize()
                    repelX = dir.x * repelForce * repelStrength
                    repelY = dir.y * repelForce * repelStrength
                    repelZ = dir.z * repelForce * repelStrength
                }

                // Elastic pull to target (drift)
                const elasticFactor = 0.01
                // Use velocity for smooth transition from explosion to drift
                velocities[i3] += (tx - x) * elasticFactor + flowX + repelX
                velocities[i3 + 1] += (ty - y) * elasticFactor + flowY + repelY
                velocities[i3 + 2] += (tz - z) * elasticFactor + repelZ

                positions[i3] = x
                positions[i3 + 1] = y
                positions[i3 + 2] = z
            }
        }

        pointsRef.current.geometry.attributes.position.needsUpdate = true
    })

    return (
        <group>
            <Points
                ref={pointsRef}
                positions={positions}
                stride={3}
                frustumCulled={false}
            >
                <PointMaterial
                    transparent
                    color="#8B5CF6"
                    size={0.05}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </Points>
        </group>
    )
}

export default function ParticleOrb() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 12], fov: 60 }}>
                <ParticleField />
                <ambientLight intensity={0.5} />
            </Canvas>
        </div>
    )
}
