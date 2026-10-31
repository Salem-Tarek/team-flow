import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            accessToken: null,
            refreshToken: null,
            isAdmin: null,

            setSession: ({ user, accessToken, refreshToken }) =>
                set({ user, accessToken, refreshToken, isAuthenticated: true, isAdmin: user?.role === "admin" }),

            clearSession: () =>
                set({ user: null, accessToken: null, refreshToken: null, isAuthenticated: false, isAdmin: null }),
        }),
        { name: "teamflow_auth" } // localStorage key
    )
)

export default useAuthStore