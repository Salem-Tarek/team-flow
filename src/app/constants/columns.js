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
