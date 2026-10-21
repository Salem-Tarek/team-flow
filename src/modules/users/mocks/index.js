import { http, HttpResponse } from 'msw'

const STORAGE_KEY = 'users'

const initialUsers = [
    {
        id: 1,
        name: "Sara Ahmed",
        email: "sara@teamflow.com",
        role: "admin",
        status: "active",
        jobTitle: "Frontend Developer",
        phone: "+20 100 123 4567",
        teamId: 2,
        teamName: "Platform",
        createdAt: "2026-03-14T09:30:00Z",
    },
    {
        id: 2,
        name: "Omar Hassan",
        email: "omar.hassan@teamflow.com",
        role: "manager",
        status: "active",
        jobTitle: "Engineering Manager",
        phone: "+20 111 234 5678",
        teamId: 2,
        teamName: "Platform",
        createdAt: "2026-01-10T11:15:00Z",
    },
    {
        id: 3,
        name: "Nour Mahmoud",
        email: "nour.m@teamflow.com",
        role: "member",
        status: "active",
        jobTitle: "UI/UX Designer",
        phone: "+20 122 345 6789",
        teamId: 1,
        teamName: "Design System",
        createdAt: "2026-02-01T14:20:00Z",
    },
    {
        id: 4,
        name: "Karim Ibrahim",
        email: "karim.i@teamflow.com",
        role: "member",
        status: "inactive",
        jobTitle: "Backend Developer",
        phone: "+20 106 456 7890",
        teamId: 3,
        teamName: "Core API",
        createdAt: "2025-11-18T08:45:00Z",
    },
    {
        id: 5,
        name: "Laila Youssef",
        email: "laila@teamflow.com",
        role: "manager",
        status: "active",
        jobTitle: "Product Manager",
        phone: "+20 155 567 8901",
        teamId: 4,
        teamName: "Growth",
        createdAt: "2025-09-05T10:00:00Z",
    },
    {
        id: 6,
        name: "Tarek Mostafa",
        email: "tarek.m@teamflow.com",
        role: "member",
        status: "active",
        jobTitle: "DevOps Engineer",
        phone: "+20 109 678 9012",
        teamId: 2,
        teamName: "Platform",
        createdAt: "2026-04-12T16:05:00Z",
    },
    {
        id: 7,
        name: "Hana Khaled",
        email: "hana.k@teamflow.com",
        role: "member",
        status: "active",
        jobTitle: "QA Automation Engineer",
        phone: "+20 114 789 0123",
        teamId: 3,
        teamName: "Core API",
        createdAt: "2026-05-22T13:10:00Z",
    },
    {
        id: 8,
        name: "Youssef Ali",
        email: "youssef.ali@teamflow.com",
        role: "admin",
        status: "active",
        jobTitle: "CTO",
        phone: "+20 100 890 1234",
        teamId: 5,
        teamName: "Executive",
        createdAt: "2025-06-01T08:00:00Z",
    },
    {
        id: 9,
        name: "Dina Samir",
        email: "dina.s@teamflow.com",
        role: "member",
        status: "inactive",
        jobTitle: "Data Analyst",
        phone: "+20 128 901 2345",
        teamId: 4,
        teamName: "Growth",
        createdAt: "2026-01-29T12:35:00Z",
    },
    {
        id: 10,
        name: "Ahmed Reda",
        email: "ahmed.r@teamflow.com",
        role: "member",
        status: "active",
        jobTitle: "Fullstack Developer",
        phone: "+20 112 012 3456",
        teamId: 3,
        teamName: "Core API",
        createdAt: "2026-06-10T09:50:00Z",
    },
    {
        id: 11,
        name: "Dina Samir 11",
        email: "dina.s@teamflow.com",
        role: "member",
        status: "inactive",
        jobTitle: "Data Analyst",
        phone: "+20 128 901 2345",
        teamId: 4,
        teamName: "Growth",
        createdAt: "2026-01-29T12:35:00Z",
    },
    {
        id: 12,
        name: "Ahmed Reda 12",
        email: "ahmed.r@teamflow.com",
        role: "member",
        status: "active",
        jobTitle: "Fullstack Developer",
        phone: "+20 112 012 3456",
        teamId: 3,
        teamName: "Core API",
        createdAt: "2026-06-10T09:50:00Z",
    },
]

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
                data: stored,
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

        return HttpResponse.json({ data, pagination: { page, limit, totalPages, totalItems } })
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