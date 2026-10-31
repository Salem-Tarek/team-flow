import { http, HttpResponse } from 'msw'
import { projects } from '~/app/mocks/index.js'

const STORAGE_KEY = 'projects'

function getStoredProjects() {
    try {
        if (typeof window !== 'undefined' && window.localStorage) {
            const raw = window.localStorage.getItem(STORAGE_KEY)
            if (raw) {
                const parsed = JSON.parse(raw)
                if (Array.isArray(parsed)) {
                    return parsed
                }
            }
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
        }
    } catch (e) {
        console.error('Failed to read projects from localStorage:', e)
    }
    return [...projects]
}

function saveProjects(items) {
    try {
        if (typeof window !== 'undefined' && window.localStorage) {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
        }
    } catch (e) {
        console.error('Failed to save projects to localStorage:', e)
    }
}

function generateId(items) {
    let id;
    do {
        id = Math.floor(Math.random() * 1000) + 1;
    } while (items.some((item) => item.id === id));
    return id;
}

export const handlers = [
    // 1. Get List
    http.get('https://www.teamflow.com/api/projects', ({ request }) => {
        const url = new URL(request.url)
        const stored = getStoredProjects()
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
    http.get('https://www.teamflow.com/api/projects/:id', ({ params }) => {
        const { id } = params;
        const stored = getStoredProjects();
        const project = stored.find((p) => p.id === Number(id));

        if (!project) {
            return new HttpResponse(JSON.stringify({ message: "Project not found" }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return HttpResponse.json(project);
    }),

    // 3. Create Item
    http.post('https://www.teamflow.com/api/projects', async ({ request }) => {
        const stored = getStoredProjects();
        const generatedId = generateId(stored);

        const newItemData = await request.json();
        const projectPayload = newItemData?.data || newItemData || {};
        const newItem = {
            id: generatedId,
            ...projectPayload,
            createdAt: new Date().toISOString(),
        };

        const updatedProjects = [newItem, ...stored];
        saveProjects(updatedProjects);

        return HttpResponse.json({
            data: newItem,
            message: "Project created successfully",
        }, { status: 201 });
    }),

    // 4. Update Item
    http.put('https://www.teamflow.com/api/projects/:id', async ({ request, params }) => {
        const { id } = params;
        const data = await request.json();
        const stored = getStoredProjects();
        const itemIndex = stored.findIndex(project => project.id === Number(id));

        if (itemIndex === -1) {
            return new HttpResponse(JSON.stringify({ message: "Project not found" }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const projectPayload = data?.data || data || {};
        const updatedItem = {
            ...stored[itemIndex],
            ...projectPayload,
            id: Number(id),
            updatedAt: new Date().toISOString(),
        };

        const updatedProjects = [...stored];
        updatedProjects[itemIndex] = updatedItem;
        saveProjects(updatedProjects);

        return HttpResponse.json({
            data: updatedItem,
            message: "Project updated successfully",
        }, { status: 200 });
    }),

    // 5. Delete Item
    http.delete('https://www.teamflow.com/api/projects/:id', ({ params }) => {
        const { id } = params;
        const stored = getStoredProjects();
        const updatedProjects = stored.filter(project => project.id !== Number(id));
        saveProjects(updatedProjects);

        return HttpResponse.json({
            data: {
                id: Number(id),
            },
            message: "Project deleted successfully",
        }, { status: 200 });
    }),
]