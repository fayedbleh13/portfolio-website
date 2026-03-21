'use client'
/* eslint-disable react-hooks/exhaustive-deps, react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/purity */
/* eslint-disable react-hooks/immutability */

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, Sparkles, Icosahedron } from '@react-three/drei'
import * as THREE from 'three'

function Scene({ onComplete }: { onComplete: () => void }) {
    const ballRef = useRef<THREE.Group>(null)
    const wormholeGroupRef = useRef<THREE.Group>(null)
    const diskRef = useRef<THREE.Points>(null)
    const timeRef = useRef(0)
    const completeCalled = useRef(false)

    // Generate high-fidelity particle disk (accretion disk)
    const particleCount = 10000
    const [positions, colors] = useMemo(() => {
        const positions = new Float32Array(particleCount * 3)
        const colors = new Float32Array(particleCount * 3)
        const colorV = new THREE.Color()

        for (let i = 0; i < particleCount; i++) {
            // Skew distribution toward the inner edge
            const r = 1.0 + Math.pow(Math.random(), 2) * 1.5 // Radius: 1.0 to 2.5
            const theta = Math.random() * Math.PI * 2

            // Thickness tapers off at edges
            const thickness = Math.max(0.01, Math.exp(-Math.pow(r - 1.1, 2) * 5) * 0.2)
            const y = (Math.random() - 0.5) * thickness

            positions[i * 3] = r * Math.cos(theta)
            positions[i * 3 + 1] = r * Math.sin(theta)
            positions[i * 3 + 2] = y

            // Color gradient: Intense Cyan inner edge -> Deep Purple outer edge
            const normalizedDist = (r - 1.0) / 1.5
            colorV.lerpColors(new THREE.Color('#06B6D4'), new THREE.Color('#4C1D95'), normalizedDist)

            // Add some cosmic jitter
            colorV.lerp(new THREE.Color('#ffffff'), Math.random() * 0.2)

            colors[i * 3] = colorV.r
            colors[i * 3 + 1] = colorV.g
            colors[i * 3 + 2] = colorV.b
        }
        return [positions, colors]
    }, [])

    useFrame((_state, delta) => {
        timeRef.current += delta
        const t = timeRef.current

        // Scene 3: Energy Ball Animation (Jumps UP, then slams DOWN)
        if (ballRef.current) {
            // Chaotic multidimensional spin to emphasize 3D geometry
            ballRef.current.rotation.x -= delta * 3.5
            ballRef.current.rotation.y += delta * 4.2

            if (t < 1.0) {
                const easedOut = 1 - Math.pow(1 - t, 3)
                ballRef.current.position.y = easedOut * 1.5
                ballRef.current.scale.setScalar(1)
            } else if (t < 1.6) {
                const p = (t - 1.0) / 0.6
                const easedIn = p * p * p
                ballRef.current.position.y = 1.5 - easedIn * 3.5
                const scale = 1 - p
                ballRef.current.scale.setScalar(Math.max(0, Math.pow(scale, 2))) // shrink faster
            } else {
                ballRef.current.scale.setScalar(0)
            }
        }

        // Scene 4: Cinematic Spin + Expand/Collapse
        if (wormholeGroupRef.current) {
            // Spin the entire disk
            wormholeGroupRef.current.rotation.y -= delta * 1.5

            let wScale = 0
            if (t < 1.0) {
                // Smoothly open up the portal
                wScale = Math.pow(t, 2)
            } else if (t < 1.6) {
                // Pulse outward violently when struck
                const hitPower = Math.sin((t - 1.0) * Math.PI) // 0 to 1 back to 0
                wScale = 1.0 + hitPower * 0.15
            } else if (t < 2.0) {
                // Collapse rapidly into a singularity
                const collapseP = (t - 1.6) / 0.4
                wScale = 1.0 - Math.pow(collapseP, 4) // Holds a bit, then slams shut
            }

            const s = Math.max(0, wScale)
            wormholeGroupRef.current.scale.set(s, s, s)
        }

        if (t > 2.5 && !completeCalled.current) {
            completeCalled.current = true
            onComplete()
        }
    })

    return (
        <group>
            {/* Ambient environment sparkles */}
            <Sparkles count={150} scale={8} size={2} speed={0.4} opacity={0.3} color="#06B6D4" />

            {/* Complex 3D Geometric Energy Ball */}
            <group ref={ballRef} position={[0, 0, 0]}>
                {/* Rotating solid geometric core to prove 3-dimensionality */}
                <Icosahedron args={[0.25, 1]}>
                    <meshBasicMaterial color="#ffffff" wireframe />
                </Icosahedron>
                <Icosahedron args={[0.22, 2]}>
                    <meshBasicMaterial color="#ffffff" />
                </Icosahedron>
                {/* Spinning Cyan Grid */}
                <Icosahedron args={[0.35, 2]}>
                    <meshBasicMaterial 
                        color="#06B6D4" 
                        transparent 
                        opacity={0.5} 
                        wireframe
                        blending={THREE.AdditiveBlending} 
                        depthWrite={false} 
                    />
                </Icosahedron>
                {/* Outer cyan energy aura */}
                <Sphere args={[0.4, 32, 32]}>
                    <meshBasicMaterial 
                        color="#06B6D4" 
                        transparent 
                        opacity={0.6} 
                        blending={THREE.AdditiveBlending} 
                        depthWrite={false} 
                    />
                </Sphere>
                {/* Extended violet aura */}
                <Sphere args={[0.6, 32, 32]}>
                    <meshBasicMaterial 
                        color="#8B5CF6" 
                        transparent 
                        opacity={0.2} 
                        blending={THREE.AdditiveBlending} 
                        depthWrite={false} 
                    />
                </Sphere>
                <pointLight intensity={3} color="#06B6D4" distance={5} />
            </group>

            {/* High-Fidelity Void/Wormhole (Flat on XZ plane) */}
            <group position={[0, -1.8, 0]}>
                {/* 
                    Layed perfectly flat horizontally. The camera is above looking down.
                */}
                <group rotation={[-Math.PI / 2, 0, 0]}>
                    <group ref={wormholeGroupRef} scale={[0, 0, 0]}>

                        {/* 1) The True Event Horizon (Absolute Black) */}
                        <mesh renderOrder={1}>
                            <circleGeometry args={[1.0, 64]} />
                            <meshBasicMaterial color="#000000" depthWrite={false} />
                        </mesh>

                        {/* 2) The Photon Sphere Glow (Hot Cyan edge) */}
                        <mesh renderOrder={2} position={[0, 0, -0.01]}>
                            <ringGeometry args={[0.98, 1.05, 64]} />
                            <meshBasicMaterial
                                color="#06B6D4"
                                transparent
                                opacity={0.8}
                                blending={THREE.AdditiveBlending}
                                depthWrite={false}
                            />
                        </mesh>

                        {/* 3) High-Fidelity Particle Accretion Disk */}
                        <points ref={diskRef} renderOrder={3}>
                            <bufferGeometry>
                                <bufferAttribute
                                    attach="attributes-position"
                                    count={positions.length / 3}
                                    args={[positions, 3]}
                                />
                                <bufferAttribute
                                    attach="attributes-color"
                                    count={colors.length / 3}
                                    args={[colors, 3]}
                                />
                            </bufferGeometry>
                            <pointsMaterial
                                size={0.03}
                                vertexColors
                                transparent
                                opacity={0.6}
                                blending={THREE.AdditiveBlending}
                                depthWrite={false}
                                sizeAttenuation
                            />
                        </points>

                        {/* Deep purple sub-glow to give volume */}
                        <mesh renderOrder={0} position={[0, 0, -0.05]}>
                            <ringGeometry args={[1.0, 2.5, 64]} />
                            <meshBasicMaterial
                                color="#4C1D95"
                                transparent
                                opacity={0.15}
                                blending={THREE.AdditiveBlending}
                                depthWrite={false}
                            />
                        </mesh>
                    </group>
                </group>
            </group>
        </group>
    )
}

interface Props {
    onComplete: () => void;
}

export default function TransmissionEffect({ onComplete }: Props) {
    return (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
            <Canvas
                camera={{ position: [0, 2.0, 6], fov: 45 }}
                gl={{ antialias: true, alpha: true, outputColorSpace: THREE.SRGBColorSpace }}
                dpr={[1, 2]}
            >
                <Scene onComplete={onComplete} />
            </Canvas>
        </div>
    )
}
