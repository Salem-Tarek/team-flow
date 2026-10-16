import { z } from "zod";

export const usersFields = (mode = 'add', teams = []) => {
    return [
        {
            name: "name",
            label: "Name",
            isRequired: true,
            placeholder: "Full name",
            rules: z.string().min(3, "Name must be at least 3 characters"),
        },
        {
            name: "email",
            label: "Email",
            type: "email",
            isRequired: true,
            rules: z.string().min(1, "Email is required").email("Enter a valid email"),
        },
        // only exists in create mode, so it isn't rendered or validated when editing
        ...(mode === 'add' ? [
            {
                name: "password",
                label: "Password",
                type: "password",
                isRequired: true,
                rules: z.string().min(8, "Password must be at least 8 characters"),
            }
        ] : []),
        {
            name: "role",
            label: "Role",
            type: "select",
            isRequired: true,
            placeholder: "Select role",
            items: [
                { value: "admin", label: "Admin" },
                { value: "manager", label: "Manager" },
                { value: "member", label: "Member" },
            ],
            rules: z.any().refine(v => v !== null && v !== undefined, 'Role is required'),
        },
        {
            name: "teamId",
            label: "Team",
            type: "select",
            placeholder: "No team",
            items: teams,
            rules: z.any().optional(),
        },
        {
            name: "status",
            label: "Status",
            type: "radio",
            isRequired: true,
            items: [
                { value: "active", label: "Active" },
                { value: "inactive", label: "Inactive" },
            ],
            rules: z.any().refine(v => v !== null && v !== undefined, 'Status is required'),
        },
        {
            name: "jobTitle",
            label: "Job Title",
            rules: z.string().optional()
        },
        {
            name: "phone",
            label: "Phone",
            rules: z.string().regex(/^[+\d\s-]*$/, "Digits, spaces, + and - only").optional(),
        },
    ]
}

export const teamsFields = (users = []) => {
    return [
        {
            name: "name",
            label: "Team Name",
            isRequired: true,
            placeholder: "e.g. Platform",
            rules: z.string().min(3, "Name must be at least 3 characters"),
        },
        {
            name: "department",
            label: "Department",
            type: "select",
            isRequired: true,
            placeholder: "Select department",
            items: [
                { value: "engineering", label: "Engineering" },
                { value: "design", label: "Design" },
                { value: "marketing", label: "Marketing" },
                { value: "sales", label: "Sales" },
                { value: "support", label: "Support" },
            ],
            rules: z.any().refine(v => v !== null && v !== undefined, 'Department is required'),
        },
        {
            name: "leadId",
            label: "Team Lead",
            type: "select",
            isRequired: false,
            placeholder: "Select lead",
            items: users,
            // rules: z.any().refine((v) => v !== "" && v != null, "Lead is required"),
        },
        {
            name: "email",
            label: "Team Email",
            type: "email",
            placeholder: "team@teamflow.com",
            rules: z.string().email("Enter a valid email").or(z.literal("")),
        },
        {
            name: "location",
            label: "Location",
            placeholder: "Cairo",
            rules: z.string().optional(),
        },
        {
            name: "description",
            label: "Description",
            type: "textarea",
            rows: 3,
            rules: z.string().max(200, "Max 200 characters").optional(),
        },
        {
            name: "status",
            label: "Status",
            type: "radio",
            isRequired: true,
            items: [
                { value: "active", label: "Active" },
                { value: "inactive", label: "Inactive" },
            ],
            rules: z.any().refine(v => v !== null && v !== undefined, 'Status is required'),
        },
    ]
}

export const projectsFields = (teams = [], users = []) => [
    {
        name: "name",
        label: "Project Name",
        isRequired: true,
        placeholder: "e.g. Website Redesign",
        rules: z.string().min(3, "Name must be at least 3 characters"),
    },
    {
        name: "clientName",
        label: "Client",
        placeholder: "Client or company name",
        rules: z.string().optional(),
    },
    {
        name: "teamId",
        label: "Team",
        type: "select",
        isRequired: true,
        placeholder: "Select team",
        items: teams,
        rules: z.any().refine((v) => v !== "" && v != null, "Team is required"),
    },
    {
        name: "ownerId",
        label: "Project Owner",
        type: "select",
        isRequired: true,
        placeholder: "Select owner",
        items: users,
        rules: z.any().refine((v) => v !== "" && v != null, "Owner is required"),
    },
    {
        name: "priority",
        label: "Priority",
        type: "select",
        isRequired: true,
        placeholder: "Select priority",
        items: [
            { value: "low", label: "Low" },
            { value: "medium", label: "Medium" },
            { value: "high", label: "High" },
            { value: "urgent", label: "Urgent" },
        ],
        rules: z.string().min(1, "Priority is required"),
    },
    {
        name: "status",
        label: "Status",
        type: "select",
        isRequired: true,
        items: [
            { value: "planning", label: "Planning" },
            { value: "active", label: "Active" },
            { value: "on_hold", label: "On Hold" },
            { value: "completed", label: "Completed" },
        ],
        rules: z.string().min(1, "Status is required"),
    },
    {
        name: "startDate",
        label: "Start Date",
        type: "date",
        isRequired: true,
        rules: z.string().min(1, "Start date is required"),
    },
    {
        name: "dueDate",
        label: "Due Date",
        type: "date",
        isRequired: true,
        rules: z.string().min(1, "Due date is required"),
    },
    {
        name: "budget",
        label: "Budget",
        placeholder: "0",
        rules: z.union([z.string(), z.number()])
            .refine((v) => {
                if (v === "" || v === null || v === undefined) return true;
                const num = Number(v);
                return !isNaN(num) && num >= 0;
            }, "Budget must be a positive number"),
    },
    {
        name: "description",
        label: "Description",
        type: "textarea",
        rows: 4,
        rules: z.string().max(500, "Max 500 characters").optional(),
    },
];

export const taskFields = (projects = [], users = []) => [
    {
        name: "title", label: "Task Title", isRequired: true, placeholder: "e.g. Build login page",
        rules: z.string().min(3, "Title must be at least 3 characters"),
    },
    {
        name: "projectId", label: "Project", type: "select", isRequired: true, placeholder: "Select project",
        items: projects,
        rules: z.any().refine((v) => v !== "" && v != null, "Project is required"),
    },
    {
        name: "assigneeId", label: "Assignee", type: "select", placeholder: "Unassigned",
        items: users,
        rules: z.any().optional(),
    },
    {
        name: "type", label: "Type", type: "select", isRequired: true,
        items: [
            { value: "feature", label: "Feature" },
            { value: "task", label: "Task" },
            { value: "bug", label: "Bug" },
            { value: "improvement", label: "Improvement" },
            { value: "chore", label: "Chore" },
        ],
        rules: z.string().min(1, "Type is required"),
    },
    {
        name: "priority", label: "Priority", type: "select", isRequired: true,
        items: [
            { value: "low", label: "Low" },
            { value: "medium", label: "Medium" },
            { value: "high", label: "High" },
            { value: "urgent", label: "Urgent" },
        ],
        rules: z.string().min(1, "Priority is required"),
    },
    {
        name: "status", label: "Status", type: "select", isRequired: true,
        items: [
            { value: "todo", label: "To Do" },
            { value: "in_progress", label: "In Progress" },
            { value: "in_review", label: "In Review" },
            { value: "done", label: "Done" },
        ],
        rules: z.string().min(1, "Status is required"),
    },
    {
        name: "dueDate", label: "Due Date", type: "date",
        rules: z.string().optional(),
    },
    {
        name: "estimateHours", label: "Estimate (hours)", placeholder: "0",
        rules: z.string().refine((v) => v === "" || (!isNaN(Number(v)) && Number(v) >= 0), "Estimate must be a positive number"),
    },
    {
        name: "description", label: "Description", type: "textarea", rows: 4,
        rules: z.string().max(500, "Max 500 characters").optional(),
    },
];