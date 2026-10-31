import { http, HttpResponse } from 'msw'
import { initialTasks } from '~/app/mocks/index.js'

const STORAGE_KEY = 'tasks'

function getStoredTasks() {
    try {
        if (typeof window !== 'undefined' && window.localStorage) {
            const raw = window.localStorage.getItem(STORAGE_KEY)
            if (raw) {
                const parsed = JSON.parse(raw)
                if (Array.isArray(parsed)) {
                    return parsed
                }
            }
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initialTasks))
        }
    } catch (e) {
        console.error('Failed to read tasks from localStorage:', e)
    }
    return [...initialTasks]
}

function saveTasks(items) {
    try {
        if (typeof window !== 'undefined' && window.localStorage) {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
        }
    } catch (e) {
        console.error('Failed to save tasks to localStorage:', e)
    }
}

function generateId(items) {
    let id;
    do {
        id = Math.floor(Math.random() * 1000) + 1;
    } while (items.some((item) => item.id === id));
    return id;
}

function findProjectName(projectId) {
    try {
        if (typeof window !== 'undefined' && window.localStorage && projectId) {
            const rawProjects = window.localStorage.getItem('projects')
            if (rawProjects) {
                const projects = JSON.parse(rawProjects)
                const project = projects.find(p => p.id === Number(projectId))
                if (project?.name) return project.name
            }
        }
    } catch (e) {
        // ignore lookup error
    }
    return ""
}

function findAssigneeName(assigneeId) {
    try {
        if (typeof window !== 'undefined' && window.localStorage && assigneeId) {
            const rawUsers = window.localStorage.getItem('users')
            if (rawUsers) {
                const users = JSON.parse(rawUsers)
                const user = users.find(u => u.id === Number(assigneeId))
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
    http.get('https://www.teamflow.com/api/tasks', ({ request }) => {
        const url = new URL(request.url)
        const stored = getStoredTasks()
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
    http.get('https://www.teamflow.com/api/tasks/:id', ({ params }) => {
        const { id } = params;
        const stored = getStoredTasks();
        const task = stored.find((p) => p.id === Number(id));

        if (!task) {
            return new HttpResponse(JSON.stringify({ message: "Task not found" }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return HttpResponse.json(task);
    }),

    // 3. Create Item
    http.post('https://www.teamflow.com/api/tasks', async ({ request }) => {
        const stored = getStoredTasks();
        const generatedId = generateId(stored);

        const newItemData = await request.json();
        const taskPayload = newItemData?.data || newItemData || {};
        const projectName = taskPayload.projectName || findProjectName(taskPayload.projectId);
        const assigneeName = taskPayload.assigneeName || findAssigneeName(taskPayload.assigneeId);

        const newItem = {
            id: generatedId,
            ...taskPayload,
            projectId: taskPayload.projectId ? Number(taskPayload.projectId) : undefined,
            assigneeId: taskPayload.assigneeId ? Number(taskPayload.assigneeId) : undefined,
            projectName: projectName || taskPayload.projectName || "",
            assigneeName: assigneeName || taskPayload.assigneeName || "",
            createdAt: new Date().toISOString(),
        };

        const updatedTasks = [newItem, ...stored];
        saveTasks(updatedTasks);

        return HttpResponse.json({
            data: newItem,
            message: "Task created successfully",
        }, { status: 201 });
    }),

    // 4. Update Item
    http.put('https://www.teamflow.com/api/tasks/:id', async ({ request, params }) => {
        const { id } = params;
        const data = await request.json();
        const stored = getStoredTasks();
        const itemIndex = stored.findIndex(t => t.id === Number(id));

        if (itemIndex === -1) {
            return new HttpResponse(JSON.stringify({ message: "Task not found" }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const taskPayload = data?.data || data || {};
        const projectName = taskPayload.projectName || findProjectName(taskPayload.projectId) || stored[itemIndex].projectName;
        const assigneeName = taskPayload.assigneeName || findAssigneeName(taskPayload.assigneeId) || stored[itemIndex].assigneeName;

        const updatedItem = {
            ...stored[itemIndex],
            ...taskPayload,
            id: Number(id),
            projectId: taskPayload.projectId !== undefined ? Number(taskPayload.projectId) : stored[itemIndex].projectId,
            assigneeId: taskPayload.assigneeId !== undefined ? Number(taskPayload.assigneeId) : stored[itemIndex].assigneeId,
            projectName: projectName || "",
            assigneeName: assigneeName || "",
            updatedAt: new Date().toISOString(),
        };

        const updatedTasks = [...stored];
        updatedTasks[itemIndex] = updatedItem;
        saveTasks(updatedTasks);

        return HttpResponse.json({
            data: updatedItem,
            message: "Task updated successfully",
        }, { status: 200 });
    }),

    // 5. Delete Item
    http.delete('https://www.teamflow.com/api/tasks/:id', ({ params }) => {
        const { id } = params;
        const stored = getStoredTasks();
        const updatedTasks = stored.filter(t => t.id !== Number(id));
        saveTasks(updatedTasks);

        return HttpResponse.json({
            data: {
                id: Number(id),
            },
            message: "Task deleted successfully",
        }, { status: 200 });
    })
]