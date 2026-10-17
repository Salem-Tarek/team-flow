import { http, HttpResponse } from 'msw'

export const handlers = [
    // 1. Get List
    http.get('https://www.teamflow.com/api/users', () => {
        return HttpResponse.json([
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
        ])
    }),

    // 2. Create Item
    http.post('https://www.teamflow.com/api/users', async ({ request }) => {

        const newItemData = await request.json();
        const newItem = {
            data: {
                id: Math.random(),
                ...(newItemData?.data || {}),
                createdAt: new Date().toISOString(),
            },
        };

        return HttpResponse.json({
            ...newItem,
            message: "User created successfully",
        }, { status: 201 });
    }),

    // 3. Delete Item
    http.delete('https://www.teamflow.com/api/users/:id', ({ params }) => {
        const { id } = params;

        return HttpResponse.json({
            data: {
                id: Number(id),
            },
            message: "User deleted successfully",
        }, { status: 200 });
    })
]