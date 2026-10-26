import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            accessToken: null,
            refreshToken: null,

            setSession: ({ user, accessToken, refreshToken }) =>
                set({ user, accessToken, refreshToken, isAuthenticated: true }),

            clearSession: () =>
                set({ user: null, accessToken: null, refreshToken: null, isAuthenticated: false }),
        }),
        { name: "teamflow_auth" } // localStorage key
    )
)

export default useAuthStore