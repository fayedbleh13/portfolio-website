import { create } from 'zustand'

interface AppState {
    isInitialized: boolean
    isDormant: boolean
    activeSection: string
    initialize: () => void
    setDormant: (dormant: boolean) => void
    setActiveSection: (section: string) => void
}

export const useAppStore = create<AppState>((set) => ({
    isInitialized: false,
    isDormant: true,
    activeSection: 'hero',
    initialize: () => set({ isInitialized: true, isDormant: false }),
    setDormant: (dormant) => set({ isDormant: dormant }),
    setActiveSection: (section) => set({ activeSection: section }),
}))
