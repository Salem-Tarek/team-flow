import { http, HttpResponse } from 'msw'
import { initialTeams } from '~/app/mocks/index.js'

const STORAGE_KEY = 'teams'

function getStoredTeams() {
    try {
        if (typeof window !== 'undefined' && window.localStorage) {
            const raw = window.localStorage.getItem(STORAGE_KEY)
            if (raw) {
                const parsed = JSON.parse(raw)
                if (Array.isArray(parsed)) {
                    return parsed
                }
            }
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initialTeams))
        }
    } catch (e) {
        console.error('Failed to read teams from localStorage:', e)
    }
    return [...initialTeams]
}

function saveTeams(items) {
    try {
        if (typeof window !== 'undefined' && window.localStorage) {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
        }
    } catch (e) {
        console.error('Failed to save teams to localStorage:', e)
    }
}

function generateId(items) {
    let id;
    do {
        id = Math.floor(Math.random() * 1000) + 1;
    } while (items.some((item) => item.id === id));
    return id;
}

function findLeadName(leadId) {
    try {
        if (typeof window !== 'undefined' && window.localStorage && leadId) {
            const rawUsers = window.localStorage.getItem('users')
            if (rawUsers) {
                const users = JSON.parse(rawUsers)
                const user = users.find(u => u.id === Number(leadId))
                if (user?.name) return user.name
            }
        }
    } catch (e) {
        // ignore lookup error
    }
    return ""
}

export const handlers = [
    // 1. Get List
    http.get('https://www.teamflow.com/api/teams', ({ request }) => {
        const url = new URL(request.url)
        const stored = getStoredTeams()
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
    http.get('https://www.teamflow.com/api/teams/:id', ({ params }) => {
        const { id } = params;
        const stored = getStoredTeams();
        const team = stored.find((t) => t.id === Number(id));

        if (!team) {
            return new HttpResponse(JSON.stringify({ message: "Team not found" }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return HttpResponse.json(team);
    }),

    // 3. Create Item
    http.post('https://www.teamflow.com/api/teams', async ({ request }) => {
        const stored = getStoredTeams();
        const generatedId = generateId(stored);

        const newItemData = await request.json();
        const teamPayload = newItemData?.data || newItemData || {};
        const leadName = teamPayload.leadName || findLeadName(teamPayload.leadId);

        const newItem = {
            id: generatedId,
            memberCount: teamPayload.memberCount ?? 0,
            ...teamPayload,
            leadId: teamPayload.leadId ? Number(teamPayload.leadId) : undefined,
            leadName: leadName || teamPayload.leadName || "",
            createdAt: new Date().toISOString(),
        };

        const updatedTeams = [newItem, ...stored];
        saveTeams(updatedTeams);

        return HttpResponse.json({
            data: newItem,
            message: "Team created successfully",
        }, { status: 201 });
    }),

    // 4. Update Item
    http.put('https://www.teamflow.com/api/teams/:id', async ({ request, params }) => {
        const { id } = params;
        const data = await request.json();
        const stored = getStoredTeams();
        const itemIndex = stored.findIndex(t => t.id === Number(id));

        if (itemIndex === -1) {
            return new HttpResponse(JSON.stringify({ message: "Team not found" }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const teamPayload = data?.data || data || {};
        const leadName = teamPayload.leadName || findLeadName(teamPayload.leadId) || stored[itemIndex].leadName;

        const updatedItem = {
            ...stored[itemIndex],
            ...teamPayload,
            id: Number(id),
            leadId: teamPayload.leadId !== undefined ? Number(teamPayload.leadId) : stored[itemIndex].leadId,
            leadName: leadName || "",
            updatedAt: new Date().toISOString(),
        };

        const updatedTeams = [...stored];
        updatedTeams[itemIndex] = updatedItem;
        saveTeams(updatedTeams);

        return HttpResponse.json({
            data: updatedItem,
            message: "Team updated successfully",
        }, { status: 200 });
    }),

    // 5. Delete Item
    http.delete('https://www.teamflow.com/api/teams/:id', ({ params }) => {
        const { id } = params;
        const stored = getStoredTeams();
        const updatedTeams = stored.filter(t => t.id !== Number(id));
        saveTeams(updatedTeams);

        return HttpResponse.json({
            data: {
                id: Number(id),
            },
            message: "Team deleted successfully",
        }, { status: 200 });
    })
]