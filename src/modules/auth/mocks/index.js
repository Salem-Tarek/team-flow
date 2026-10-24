import { http, HttpResponse, delay } from 'msw'
import { seedData as seedUsers, STORAGE_KEY as USERS_KEY } from '~/modules/users/mocks/index.js'

const API = 'https://www.teamflow.com/api/auth'

const ACCESS_PREFIX = 'mock-access-'
const REFRESH_PREFIX = 'mock-refresh-'

// same read logic as the users handlers, so login sees users created from the UI
function loadUsers() {
    try {
        const saved = localStorage.getItem(USERS_KEY)
        return saved ? JSON.parse(saved) : seedUsers
    } catch {
        return seedUsers
    }
}

// never send the password back to the client
const publicUser = ({ password, ...user }) => user

// reads "Authorization: Bearer mock-access-1" and finds that user
function getUserFromRequest(request) {
    const token = (request.headers.get('Authorization') || '').replace('Bearer ', '')
    if (!token.startsWith(ACCESS_PREFIX)) return null

    const id = Number(token.slice(ACCESS_PREFIX.length))
    return loadUsers().find((u) => u.id === id) ?? null
}

export const handlers = [
    // 1. Login
    http.post(`${API}/login`, async ({ request }) => {
        await delay(500)
        const body = await request.json()
        const { email, password } = body?.data || {}

        const user = loadUsers().find((u) => u.email === email && u.password === password)

        if (!user) {
            return HttpResponse.json({ message: 'Invalid email or password' }, { status: 401 })
        }
        if (user.status !== 'active') {
            return HttpResponse.json({ message: 'This account is inactive' }, { status: 403 })
        }

        return HttpResponse.json({
            data: {
                user: publicUser(user),
                accessToken: `${ACCESS_PREFIX}${user.id}`,
                refreshToken: `${REFRESH_PREFIX}${user.id}`,
            },
            message: 'Logged in successfully',
        })
    }),

    // 2. Logout
    http.post(`${API}/logout`, () => {
        return HttpResponse.json({
            data: null,
            message: 'Logged out successfully',
        })
    }),

    // 3. Current user (restores the session after a page refresh)
    http.get(`${API}/me`, ({ request }) => {
        const user = getUserFromRequest(request)

        if (!user) {
            return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 })
        }

        return HttpResponse.json({ data: publicUser(user) })
    }),
]