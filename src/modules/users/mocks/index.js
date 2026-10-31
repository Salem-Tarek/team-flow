import { http, HttpResponse } from 'msw'
import { initialUsers } from '~/app/mocks/index.js'

const STORAGE_KEY = 'users'

const withoutPassword = ({ password, ...rest }) => rest

function getStoredUsers() {
    try {
        if (typeof window !== 'undefined' && window.localStorage) {
            const raw = window.localStorage.getItem(STORAGE_KEY)
            if (raw) {
                const parsed = JSON.parse(raw)
                if (Array.isArray(parsed)) {
                    return parsed
                }
            }
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initialUsers))
        }
    } catch (e) {
        console.error('Failed to read users from localStorage:', e)
    }
    return [...initialUsers]
}

function saveUsers(items) {
    try {
        if (typeof window !== 'undefined' && window.localStorage) {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
        }
    } catch (e) {
        console.error('Failed to save users to localStorage:', e)
    }
}

function generateId(items) {
    let id;
    do {
        id = Math.floor(Math.random() * 1000) + 1;
    } while (items.some((item) => item.id === id));
    return id;
}

function findTeamName(teamId) {
    try {
        if (typeof window !== 'undefined' && window.localStorage && teamId) {
            const rawTeams = window.localStorage.getItem('teams')
            if (rawTeams) {
                const teams = JSON.parse(rawTeams)
                const team = teams.find(t => t.id === Number(teamId))
                if (team?.name) return team.name
            }
        }
    } catch (e) {
        // ignore lookup error
    }
    return ""
}

export const handlers = [
    // 1. Get List
    http.get('https://www.teamflow.com/api/users', ({ request }) => {
        const url = new URL(request.url)
        const stored = getStoredUsers()
        const totalItems = stored.length

        if (url.searchParams.get('all') === 'true') {
            return HttpResponse.json({
                data: stored?.map(withoutPassword) || [],
                pagination: {
                    page: 1,
                    limit: stored.length,
                    totalPages: 1,
                    totalItems: stored.length
                }
            })
        }

        const pageSearchParam = Number(url.searchParams.get('page'));
        const limitSearchParam = Number(url.searchParams.get('limit'));

        const page = Math.max(1, pageSearchParam || 1)
        const limit = Math.max(1, limitSearchParam || 10)

        const totalPages = Math.max(1, Math.ceil(totalItems / limit))
        const currentPage = Math.min(page, totalPages)

        const start = (currentPage - 1) * limit
        const data = stored.slice(start, start + limit)

        return HttpResponse.json({ data: data?.map(withoutPassword) || [], pagination: { page, limit, totalPages, totalItems } })
    }),

    // 2. Get single item
    http.get('https://www.teamflow.com/api/users/:id', ({ params }) => {
        const { id } = params;
        const stored = getStoredUsers();
        const user = stored.find((u) => u.id === Number(id));

        if (!user) {
            return new HttpResponse(JSON.stringify({ message: "User not found" }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return HttpResponse.json(user);
    }),

    // 3. Create Item
    http.post('https://www.teamflow.com/api/users', async ({ request }) => {
        const stored = getStoredUsers();
        const generatedId = generateId(stored);

        const newItemData = await request.json();
        const userPayload = newItemData?.data || newItemData || {};
        const teamName = userPayload.teamName || findTeamName(userPayload.teamId);

        const newItem = {
            id: generatedId,
            ...userPayload,
            teamId: userPayload.teamId ? Number(userPayload.teamId) : undefined,
            teamName: teamName || userPayload.teamName || "",
            createdAt: new Date().toISOString(),
        };

        const updatedUsers = [newItem, ...stored];
        saveUsers(updatedUsers);

        return HttpResponse.json({
            data: newItem,
            message: "User created successfully",
        }, { status: 201 });
    }),

    // 4. Update Item
    http.put('https://www.teamflow.com/api/users/:id', async ({ request, params }) => {
        const { id } = params;
        const data = await request.json();
        const stored = getStoredUsers();
        const itemIndex = stored.findIndex(u => u.id === Number(id));

        if (itemIndex === -1) {
            return new HttpResponse(JSON.stringify({ message: "User not found" }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const userPayload = data?.data || data || {};
        const teamName = userPayload.teamName || findTeamName(userPayload.teamId) || stored[itemIndex].teamName;

        const updatedItem = {
            ...stored[itemIndex],
            ...userPayload,
            id: Number(id),
            teamId: userPayload.teamId !== undefined ? Number(userPayload.teamId) : stored[itemIndex].teamId,
            teamName: teamName || "",
            updatedAt: new Date().toISOString(),
        };

        const updatedUsers = [...stored];
        updatedUsers[itemIndex] = updatedItem;
        saveUsers(updatedUsers);

        return HttpResponse.json({
            data: updatedItem,
            message: "User updated successfully",
        }, { status: 200 });
    }),

    // 5. Delete Item
    http.delete('https://www.teamflow.com/api/users/:id', ({ params }) => {
        const { id } = params;
        const stored = getStoredUsers();
        const updatedUsers = stored.filter(u => u.id !== Number(id));
        saveUsers(updatedUsers);

        return HttpResponse.json({
            data: {
                id: Number(id),
            },
            message: "User deleted successfully",
        }, { status: 200 });
    })
]

export { initialUsers as seedData, STORAGE_KEY }