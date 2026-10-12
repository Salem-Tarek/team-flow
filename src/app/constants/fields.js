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