import dayjs from 'dayjs'

const tasksStatusConfig = {
    "to_do": "neutral",
    "in_progress": "info",
    "in_review": "warning",
    "completed": "success",
};

const tasksPriorityConfig = {
    low: "success",
    medium: "info",
    high: "warning",
    urgent: "error",
};

export const teamsColumns = [
    { key: "name", label: "Name" },
    { key: "department", label: "Department" },
    { key: "leadName", label: "Lead" },
    { key: "memberCount", label: "Members" },
    { key: "location", label: "Location" },
    { key: "email", label: "Email" },
    {
        key: "status",
        label: "Status",
        htmlStrcuture: ({ value }) => `<span class="capitalize badge badge-${value === "active" ? "success" : "error"}">${value}</span>`
    },
    { key: "createdAt", label: "Created" },
    { key: "actions", label: "", actions: ["edit", "delete"] },
];

export const usersColumns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    { key: "teamName", label: "Team" },
    {
        key: "status",
        label: "Status",
        htmlStrcuture: ({ value }) => `<span class="capitalize badge badge-${value === "active" ? "success" : "error"}">${value}</span>`
    },
    {
        key: "createdAt",
        label: "Created",
        htmlStrcuture: ({ value }) => dayjs(value).format("DD-MM-YYYY")
    },
    { key: "actions", label: "", actions: ["edit", "delete"] },
];

export const projectsColumns = [
    { key: "name", label: "Project" },
    { key: "clientName", label: "Client" },
    { key: "teamName", label: "Team" },
    { key: "ownerName", label: "Owner" },
    { key: "priority", label: "Priority" },
    {
        key: "status",
        label: "Status",
        htmlStrcuture: ({ value }) => `<span class="capitalize badge badge-${value === "active" ? "success" : "error"}">${value}</span>`
    },
    { key: "progress", label: "Progress" },
    { key: "dueDate", label: "Due" },
    { key: "actions", label: "", actions: ["view", "edit", "delete"] },
];

export const tasksColumns = [
    { key: "title", label: "Task" },
    { key: "projectName", label: "Project" },
    { key: "assigneeName", label: "Assignee" },
    { key: "type", label: "Type" },
    {
        key: "priority",
        label: "Priority",
        htmlStrcuture: ({ value }) => {
            const status = tasksPriorityConfig[value?.toLowerCase()] || "neutral";

            return `
        <span class="capitalize badge badge-${status}">
            ${value || "Select..."}
        </span>
    `;
        },
    },
    {
        key: "status",
        label: "Status",
        htmlStrcuture: ({ value }) => {
            const status = tasksStatusConfig[value?.toLowerCase()] || "neutral";

            return `
        <span class="capitalize badge badge-${status}">
            ${value || "Select..."}
        </span>
    `;
        },
    },
    { key: "dueDate", label: "Due" },
    { key: "actions", label: "", actions: ["edit", "delete"] },
];