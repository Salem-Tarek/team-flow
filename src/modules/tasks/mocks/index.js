import { http, HttpResponse } from 'msw'

const STORAGE_KEY = 'tasks'

const initialTasks = [
    {
        id: 1,
        title: "Build login page",
        projectId: 1,
        projectName: "Website Redesign",
        assigneeId: 3,
        assigneeName: "Sara Ahmed",
        type: "feature",
        priority: "high",
        status: "in_progress",
        dueDate: "2026-04-15",
        estimateHours: 12,
        description: "Email and password form with validation and error states.",
        createdAt: "2026-03-20T09:00:00Z",
    },
    {
        id: 2,
        title: "Setup authentication flow",
        projectId: 1,
        projectName: "Website Redesign",
        assigneeId: 5,
        assigneeName: "Mahmoud Ali",
        type: "feature",
        priority: "high",
        status: "completed",
        dueDate: "2026-04-10",
        estimateHours: 16,
        description: "Configure JWT and token storage mechanisms securely.",
        createdAt: "2026-03-21T10:00:00Z",
    },
    {
        id: 3,
        title: "Design mobile app wireframes",
        projectId: 2,
        projectName: "E-Commerce Mobile App",
        assigneeId: 12,
        assigneeName: "Nouran Khaled",
        type: "design",
        priority: "high",
        status: "in_progress",
        dueDate: "2026-04-20",
        estimateHours: 20,
        description: "Low-fidelity layouts for product listing and checkout screens.",
        createdAt: "2026-03-22T11:00:00Z",
    },
    {
        id: 4,
        title: "Keyword research & competitor analysis",
        projectId: 4,
        projectName: "SEO & Traffic Growth",
        assigneeId: 8,
        assigneeName: "Omar Youssef",
        type: "task",
        priority: "medium",
        status: "todo",
        dueDate: "2026-04-25",
        estimateHours: 10,
        description: "Identify high-ranking keywords and analyze competitor backlink profiles.",
        createdAt: "2026-03-23T08:30:00Z",
    },
    {
        id: 5,
        title: "Pipeline ETL script development",
        projectId: 5,
        projectName: "Data Warehouse Migration",
        assigneeId: 19,
        assigneeName: "Yasmin Fathy",
        type: "feature",
        priority: "high",
        status: "in_progress",
        dueDate: "2026-05-05",
        estimateHours: 30,
        description: "Python scripts to extract, transform, and load legacy data into cloud storage.",
        createdAt: "2026-03-24T09:15:00Z",
    },
    {
        id: 6,
        title: "Implement ticketing webhook",
        projectId: 6,
        projectName: "Customer Support Portal",
        assigneeId: 21,
        assigneeName: "Karim Hassan",
        type: "feature",
        priority: "medium",
        status: "todo",
        dueDate: "2026-05-10",
        estimateHours: 14,
        description: "Handle incoming support ticket alerts and sync status changes.",
        createdAt: "2026-03-25T13:45:00Z",
    },
    {
        id: 7,
        title: "API rate limiting configuration",
        projectId: 7,
        projectName: "Microservices API Gateway",
        assigneeId: 14,
        assigneeName: "Hassan Mostafa",
        type: "bug",
        priority: "high",
        status: "completed",
        dueDate: "2026-05-01",
        estimateHours: 8,
        description: "Prevent DDOS attacks and manage client quotas using Redis.",
        createdAt: "2026-03-26T14:00:00Z",
    },
    {
        id: 8,
        title: "Employee leave request module",
        projectId: 8,
        projectName: "HR Employee Portal",
        assigneeId: 33,
        assigneeName: "Mona Ibrahim",
        type: "feature",
        priority: "low",
        status: "todo",
        dueDate: "2026-06-10",
        estimateHours: 15,
        description: "UI and backend logic for submitting and approving annual leaves.",
        createdAt: "2026-03-27T10:30:00Z",
    },
    {
        id: 9,
        title: "Setup Cypress E2E tests",
        projectId: 9,
        projectName: "Automated QA Testing Suite",
        assigneeId: 27,
        assigneeName: "Tarek Zaki",
        type: "task",
        priority: "medium",
        status: "todo",
        dueDate: "2026-06-20",
        estimateHours: 25,
        description: "Write end-to-end user flows for checkout and user registration.",
        createdAt: "2026-03-28T11:20:00Z",
    },
    {
        id: 10,
        title: "Sales pipeline reporting dashboard",
        projectId: 10,
        projectName: "Enterprise Sales Dashboard",
        assigneeId: 40,
        assigneeName: "Dina Samir",
        type: "feature",
        priority: "high",
        status: "in_progress",
        dueDate: "2026-07-15",
        estimateHours: 18,
        description: "Visual charts representing monthly closed deals and revenue targets.",
        createdAt: "2026-03-29T15:00:00Z",
    },
    {
        id: 11,
        title: "Setup Cypress 11",
        projectId: 9,
        projectName: "Automated QA Testing Suite",
        assigneeId: 27,
        assigneeName: "Tarek Zaki",
        type: "task",
        priority: "medium",
        status: "todo",
        dueDate: "2026-06-20",
        estimateHours: 25,
        description: "Write end-to-end user flows for checkout and user registration.",
        createdAt: "2026-03-28T11:20:00Z",
    },
    {
        id: 12,
        title: "Sales pipeline 12",
        projectId: 10,
        projectName: "Enterprise Sales Dashboard",
        assigneeId: 40,
        assigneeName: "Dina Samir",
        type: "feature",
        priority: "high",
        status: "in_progress",
        dueDate: "2026-07-15",
        estimateHours: 18,
        description: "Visual charts representing monthly closed deals and revenue targets.",
        createdAt: "2026-03-29T15:00:00Z",
    },
];

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