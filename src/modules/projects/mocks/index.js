import { http, HttpResponse } from 'msw'

const projects = [
    {
        id: 1,
        name: "Website Redesign",
        clientName: "Nile Retail",
        teamId: 1,
        teamName: "Platform",
        ownerId: 3,
        ownerName: "Sara Ahmed",
        priority: "high",
        status: "active",
        startDate: "2026-03-01",
        dueDate: "2026-06-30",
        budget: 45000,
        progress: 62,
        taskCount: 18,
        description: "Full redesign of the customer-facing site.",
        createdAt: "2026-02-20T10:00:00Z",
    },
    {
        id: 2,
        name: "E-Commerce Mobile App",
        clientName: "Cairo Style",
        teamId: 2,
        teamName: "Frontend Core",
        ownerId: 5,
        ownerName: "Mahmoud Ali",
        priority: "high",
        status: "active",
        startDate: "2026-03-15",
        dueDate: "2026-08-15",
        budget: 75000,
        progress: 40,
        taskCount: 24,
        description: "Developing cross-platform mobile shopping application.",
        createdAt: "2026-03-01T09:00:00Z",
    },
    {
        id: 3,
        name: "Brand Identity Refresh",
        clientName: "Gulf Ventures",
        teamId: 3,
        teamName: "Product Design",
        ownerId: 12,
        ownerName: "Nouran Khaled",
        priority: "medium",
        status: "active",
        startDate: "2026-04-01",
        dueDate: "2026-05-30",
        budget: 20000,
        progress: 85,
        taskCount: 10,
        description: "Redesigning company logo, typography, and marketing assets.",
        createdAt: "2026-03-10T11:30:00Z",
    },
    {
        id: 4,
        name: "SEO & Traffic Growth",
        clientName: "Alexandria Trade",
        teamId: 4,
        teamName: "Growth Marketing",
        ownerId: 8,
        ownerName: "Omar Youssef",
        priority: "low",
        status: "active",
        startDate: "2026-04-10",
        dueDate: "2026-10-10",
        budget: 30000,
        progress: 25,
        taskCount: 15,
        description: "Executing comprehensive SEO strategy and targeted paid campaigns.",
        createdAt: "2026-03-20T14:00:00Z",
    },
    {
        id: 5,
        name: "Data Warehouse Migration",
        clientName: "Pharaoh Logistics",
        teamId: 5,
        teamName: "Data Analytics",
        ownerId: 19,
        ownerName: "Yasmin Fathy",
        priority: "high",
        status: "active",
        startDate: "2026-04-15",
        dueDate: "2026-07-30",
        budget: 60000,
        progress: 50,
        taskCount: 22,
        description: "Migrating legacy databases to a modern cloud analytics platform.",
        createdAt: "2026-04-01T08:15:00Z",
    },
    {
        id: 6,
        name: "Customer Support Portal",
        clientName: "RedSea Tourism",
        teamId: 6,
        teamName: "Customer Success",
        ownerId: 21,
        ownerName: "Karim Hassan",
        priority: "medium",
        status: "active",
        startDate: "2026-05-01",
        dueDate: "2026-09-01",
        budget: 35000,
        progress: 30,
        taskCount: 12,
        description: "Building an automated ticketing system and help center.",
        createdAt: "2026-04-10T10:45:00Z",
    },
    {
        id: 7,
        name: "Microservices API Gateway",
        clientName: "Delta Fintech",
        teamId: 7,
        teamName: "Backend Architecture",
        ownerId: 14,
        ownerName: "Hassan Mostafa",
        priority: "high",
        status: "active",
        startDate: "2026-05-15",
        dueDate: "2026-11-15",
        budget: 90000,
        progress: 15,
        taskCount: 30,
        description: "Implementing secure and scalable API gateway for financial services.",
        createdAt: "2026-05-01T09:20:00Z",
    },
    {
        id: 8,
        name: "HR Employee Portal",
        clientName: "Pyramids Group",
        teamId: 8,
        teamName: "Human Resources",
        ownerId: 33,
        ownerName: "Mona Ibrahim",
        priority: "low",
        status: "active",
        startDate: "2026-06-01",
        dueDate: "2026-08-30",
        budget: 25000,
        progress: 70,
        taskCount: 8,
        description: "Internal dashboard for managing payroll, leave requests, and reviews.",
        createdAt: "2026-05-10T13:00:00Z",
    },
    {
        id: 9,
        name: "Automated QA Testing Suite",
        clientName: "Suez Tech",
        teamId: 9,
        teamName: "Quality Assurance",
        ownerId: 27,
        ownerName: "Tarek Zaki",
        priority: "medium",
        status: "inactive",
        startDate: "2026-06-15",
        dueDate: "2026-09-15",
        budget: 40000,
        progress: 10,
        taskCount: 14,
        description: "Setting up end-to-end testing pipelines and CI/CD integration.",
        createdAt: "2026-05-20T11:00:00Z",
    },
    {
        id: 10,
        name: "Enterprise Sales Dashboard",
        clientName: "Arabia Motors",
        teamId: 10,
        teamName: "Sales Enterprise",
        ownerId: 40,
        ownerName: "Dina Samir",
        priority: "high",
        status: "active",
        startDate: "2026-07-01",
        dueDate: "2026-12-31",
        budget: 80000,
        progress: 5,
        taskCount: 20,
        description: "Advanced analytics and pipeline management for B2B sales reps.",
        createdAt: "2026-06-01T15:30:00Z",
    },
]

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
    http.get('https://www.teamflow.com/api/projects', () => {
        const stored = getStoredProjects();
        return HttpResponse.json(stored)
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