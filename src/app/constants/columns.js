export const teamsColumns = [
    { key: "name", label: "Name" },
    { key: "department", label: "Department" },
    { key: "leadName", label: "Lead" },
    { key: "memberCount", label: "Members" },
    { key: "location", label: "Location" },
    { key: "email", label: "Email" },
    { key: "status", label: "Status", type: "badge" },
    { key: "createdAt", label: "Created", type: "date" },
    { key: "actions", label: "", actions: ["view", "edit", "delete"] },
];

export const usersColumns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role", type: "badge" },
    { key: "teamName", label: "Team" },
    { key: "status", label: "Status", type: "badge" },
    { key: "createdAt", label: "Created", type: "date" },
    { key: "actions", label: "", actions: ["edit", "delete"] },
];

export const projectsColumns = [
    { key: "name", label: "Project" },
    { key: "clientName", label: "Client" },
    { key: "teamName", label: "Team" },
    { key: "ownerName", label: "Owner" },
    { key: "priority", label: "Priority", type: "badge" },
    { key: "status", label: "Status", type: "badge" },
    { key: "progress", label: "Progress" },
    { key: "dueDate", label: "Due", type: "date" },
    { key: "actions", label: "", actions: ["view", "edit", "delete"] },
];

export const tasksColumns = [
    { key: "title", label: "Task" },
    { key: "projectName", label: "Project" },
    { key: "assigneeName", label: "Assignee" },
    { key: "type", label: "Type", type: "badge" },
    { key: "priority", label: "Priority", type: "badge" },
    { key: "status", label: "Status", type: "badge" },
    { key: "dueDate", label: "Due", type: "date" },
    { key: "actions", label: "", actions: ["view", "edit", "delete"] },
];