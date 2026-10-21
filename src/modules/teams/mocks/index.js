import { http, HttpResponse } from 'msw'

const STORAGE_KEY = 'teams'

const initialTeams = [
    {
        id: 1,
        name: "Platform",
        department: "engineering",
        leadId: 3,
        leadName: "Sara Ahmed",
        memberCount: 6,
        location: "Cairo",
        email: "platform@teamflow.com",
        description: "Owns core infrastructure and shared UI.",
        status: "active",
        createdAt: "2026-02-01T08:00:00Z",
    },
    {
        id: 2,
        name: "Frontend Core",
        department: "engineering",
        leadId: 5,
        leadName: "Mahmoud Ali",
        memberCount: 8,
        location: "Alexandria",
        email: "frontend@teamflow.com",
        description: "Develops and maintains React and Vue applications.",
        status: "active",
        createdAt: "2026-02-05T09:30:00Z",
    },
    {
        id: 3,
        name: "Product Design",
        department: "design",
        leadId: 12,
        leadName: "Nouran Khaled",
        memberCount: 4,
        location: "Dubai",
        email: "design@teamflow.com",
        description: "Creates user interfaces, design systems, and wireframes.",
        status: "active",
        createdAt: "2026-02-10T10:00:00Z",
    },
    {
        id: 4,
        name: "Growth Marketing",
        department: "marketing",
        leadId: 8,
        leadName: "Omar Youssef",
        memberCount: 5,
        location: "Riyadh",
        email: "growth@teamflow.com",
        description: "Focuses on user acquisition, SEO, and paid campaigns.",
        status: "active",
        createdAt: "2026-02-15T11:15:00Z",
    },
    {
        id: 5,
        name: "Data Analytics",
        department: "data",
        leadId: 19,
        leadName: "Yasmin Fathy",
        memberCount: 3,
        location: "Cairo",
        email: "analytics@teamflow.com",
        description: "Builds dashboards, reports, and predictive data models.",
        status: "active",
        createdAt: "2026-02-20T12:00:00Z",
    },
    {
        id: 6,
        name: "Customer Success",
        department: "support",
        leadId: 21,
        leadName: "Karim Hassan",
        memberCount: 7,
        location: "London",
        email: "support@teamflow.com",
        description: "Assists clients, resolves tickets, and ensures user retention.",
        status: "active",
        createdAt: "2026-02-25T14:30:00Z",
    },
    {
        id: 7,
        name: "Backend Architecture",
        department: "engineering",
        leadId: 14,
        leadName: "Hassan Mostafa",
        memberCount: 5,
        location: "Cairo",
        email: "backend@teamflow.com",
        description: "Manages microservices, APIs, and database performance.",
        status: "active",
        createdAt: "2026-03-01T08:45:00Z",
    },
    {
        id: 8,
        name: "Human Resources",
        department: "hr",
        leadId: 33,
        leadName: "Mona Ibrahim",
        memberCount: 3,
        location: "Dubai",
        email: "hr@teamflow.com",
        description: "Handles recruitment, employee relations, and company culture.",
        status: "active",
        createdAt: "2026-03-05T09:00:00Z",
    },
    {
        id: 9,
        name: "Quality Assurance",
        department: "engineering",
        leadId: 27,
        leadName: "Tarek Zaki",
        memberCount: 4,
        location: "Alexandria",
        email: "qa@teamflow.com",
        description: "Performs automated and manual testing to ensure bug-free releases.",
        status: "inactive",
        createdAt: "2026-03-10T15:20:00Z",
    },
    {
        id: 10,
        name: "Sales Enterprise",
        department: "sales",
        leadId: 40,
        leadName: "Dina Samir",
        memberCount: 6,
        location: "Riyadh",
        email: "sales@teamflow.com",
        description: "Drives B2B contracts, pitches, and revenue growth.",
        status: "active",
        createdAt: "2026-03-15T16:00:00Z",
    }
]

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
    http.get('https://www.teamflow.com/api/teams', () => {
        const stored = getStoredTeams();
        return HttpResponse.json(stored)
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