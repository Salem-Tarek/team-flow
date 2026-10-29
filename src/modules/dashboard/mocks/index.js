import { http, HttpResponse } from 'msw';

/**
 * Safely retrieves parsed array data from localStorage.
 */
function getFromLocalStorage(key) {
    try {
        if (typeof window !== 'undefined' && window.localStorage) {
            const raw = window.localStorage.getItem(key);
            if (raw) {
                const parsed = JSON.parse(raw);
                if (Array.isArray(parsed)) {
                    return parsed;
                }
            }
        }
    } catch (e) {
        console.error(`Failed to read '${key}' from localStorage:`, e);
    }
    return [];
}

/**
 * Extracts initials from an assignee name (e.g., "Sara Ahmed" -> "SA").
 */
function formatInitials(name) {
    if (!name) return "TF";
    const parts = String(name).trim().split(/\s+/);
    if (parts.length === 1) {
        return parts[0].slice(0, 2).toUpperCase();
    }
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Normalizes task status to match UI presentation (To Do, In Progress, In Review, Completed).
 */
function formatStatus(status) {
    if (!status) return "To Do";
    const s = String(status).toLowerCase().trim().replace(/[\s_-]+/g, "");
    if (s === "todo" || s === "pending") return "To Do";
    if (s === "inprogress" || s === "doing") return "In Progress";
    if (s === "inreview" || s === "review") return "In Review";
    if (s === "completed" || s === "done") return "Completed";
    return String(status).charAt(0).toUpperCase() + String(status).slice(1);
}

/**
 * Normalizes task priority to Title Case (Low, Medium, High, Urgent).
 */
function formatPriority(priority) {
    if (!priority) return "Medium";
    const p = String(priority).toLowerCase().trim();
    if (p === "low") return "Low";
    if (p === "medium") return "Medium";
    if (p === "high") return "High";
    if (p === "urgent") return "Urgent";
    return String(priority).charAt(0).toUpperCase() + String(priority).slice(1);
}

/**
 * Formats date into readable string e.g. "Oct 30, 2026".
 */
function formatDate(dateStr) {
    if (!dateStr) return "";
    try {
        const d = new Date(dateStr);
        if (isNaN(d.getTime())) return dateStr;
        return d.toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
        });
    } catch {
        return dateStr;
    }
}

/**
 * Computes dashboard statistics directly from real localStorage data.
 */
function getComputedStats() {
    const tasks = getFromLocalStorage('tasks');
    const projects = getFromLocalStorage('projects');
    const teams = getFromLocalStorage('teams');
    const users = getFromLocalStorage('users');

    // Projects metrics
    const totalProjects = projects.length;
    const activeProjects = projects.filter(p => {
        const s = (p.status || '').toLowerCase().trim();
        return s === 'active' || s === 'in_progress';
    }).length;
    const avgProjectProgress = totalProjects > 0
        ? Math.round(projects.reduce((acc, p) => acc + (Number(p.progress) || 0), 0) / totalProjects)
        : 0;

    // Tasks metrics
    const totalTasks = tasks.length;
    const inProgressTasks = tasks.filter(t => {
        const s = (t.status || '').toLowerCase().trim().replace(/[\s_-]+/g, '');
        return s === 'inprogress' || s === 'doing';
    }).length;
    const taskProgressRate = totalTasks > 0
        ? Math.round((inProgressTasks / totalTasks) * 100)
        : 0;

    // Completed tasks metrics
    const completedTasks = tasks.filter(t => {
        const s = (t.status || '').toLowerCase().trim().replace(/[\s_-]+/g, '');
        return s === 'completed' || s === 'done';
    }).length;
    const completionRate = totalTasks > 0
        ? Math.round((completedTasks / totalTasks) * 100)
        : 0;

    // Team members metrics
    const totalMembers = users.length;
    const teamCount = teams.length;
    const activeUsers = users.filter(u => (u.status || '').toLowerCase().trim() === 'active').length;
    const activeRate = totalMembers > 0
        ? Math.round((activeUsers / totalMembers) * 100)
        : 0;

    return [
        {
            title: "Total Projects",
            value: totalProjects,
            subtitle: `${activeProjects} active project${activeProjects === 1 ? '' : 's'}`,
            change: totalProjects > 0 ? "+12%" : "0%",
            icon: "folder",
            color: "text-primary",
            iconBg: "bg-primary/10",
            progress: avgProjectProgress || (totalProjects > 0 ? Math.round((activeProjects / totalProjects) * 100) : 0),
            progressColor: "bg-primary",
        },
        {
            title: "Total Tasks",
            value: totalTasks,
            subtitle: `${inProgressTasks} in progress`,
            change: totalTasks > 0 ? "+8%" : "0%",
            icon: "tasks",
            color: "text-primary",
            iconBg: "bg-primary/10",
            progress: taskProgressRate,
            progressColor: "bg-primary",
        },
        {
            title: "Completed Tasks",
            value: completedTasks,
            subtitle: `${completionRate}% completion rate`,
            change: completedTasks > 0 ? "+18%" : "0%",
            icon: "check",
            color: "text-success",
            iconBg: "bg-success/10",
            progress: completionRate,
            progressColor: "bg-success",
        },
        {
            title: "Team Members",
            value: totalMembers,
            subtitle: `Across ${teamCount} team${teamCount === 1 ? '' : 's'}`,
            change: totalMembers > 0 ? "+5%" : "0%",
            icon: "users",
            color: "text-primary",
            iconBg: "bg-primary/10",
            progress: activeRate || 100,
            progressColor: "bg-primary",
        },
    ];
}

/**
 * Computes task status breakdown directly from real tasks in localStorage.
 */
function getComputedTaskStatuses() {
    const tasks = getFromLocalStorage('tasks');

    const todoCount = tasks.filter(t => {
        const s = (t.status || '').toLowerCase().trim().replace(/[\s_-]+/g, '');
        return s === 'todo' || s === 'pending';
    }).length;

    const inProgressCount = tasks.filter(t => {
        const s = (t.status || '').toLowerCase().trim().replace(/[\s_-]+/g, '');
        return s === 'inprogress' || s === 'doing';
    }).length;

    const inReviewCount = tasks.filter(t => {
        const s = (t.status || '').toLowerCase().trim().replace(/[\s_-]+/g, '');
        return s === 'inreview' || s === 'review';
    }).length;

    const completedCount = tasks.filter(t => {
        const s = (t.status || '').toLowerCase().trim().replace(/[\s_-]+/g, '');
        return s === 'completed' || s === 'done';
    }).length;

    return [
        { label: "To Do", count: todoCount, color: "#457b9d" },
        { label: "In Progress", count: inProgressCount, color: "#e09f3e" },
        { label: "In Review", count: inReviewCount, color: "#47982c" },
        { label: "Completed", count: completedCount, color: "#a8dadc" },
    ];
}

/**
 * Computes weekly task activity distribution directly from real tasks in localStorage.
 */
function getComputedWeeklyActivity() {
    const tasks = getFromLocalStorage('tasks');

    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const counts = { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 };
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Count completed tasks if present, otherwise tally all tasks to reflect workload
    const completedTasks = tasks.filter(t => {
        const s = (t.status || '').toLowerCase().trim().replace(/[\s_-]+/g, '');
        return s === 'completed' || s === 'done';
    });

    const targetTasks = completedTasks.length > 0 ? completedTasks : tasks;

    targetTasks.forEach(task => {
        const rawDate = task.updatedAt || task.dueDate || task.createdAt;
        if (rawDate) {
            const d = new Date(rawDate);
            if (!isNaN(d.getTime())) {
                const dayName = dayNames[d.getDay()];
                if (counts[dayName] !== undefined) {
                    counts[dayName] += 1;
                }
            }
        }
    });

    return days.map(day => ({
        day,
        value: counts[day],
    }));
}

/**
 * Retrieves the most recent tasks directly from real localStorage data,
 * joining project and assignee names from projects and users storage.
 */
function getComputedRecentTasks() {
    const tasks = getFromLocalStorage('tasks');
    const projects = getFromLocalStorage('projects');
    const users = getFromLocalStorage('users');

    // Sort descending by updatedAt, createdAt, or id
    const sortedTasks = [...tasks].sort((a, b) => {
        const timeA = a.updatedAt ? new Date(a.updatedAt).getTime() : (a.createdAt ? new Date(a.createdAt).getTime() : (Number(a.id) || 0));
        const timeB = b.updatedAt ? new Date(b.updatedAt).getTime() : (b.createdAt ? new Date(b.createdAt).getTime() : (Number(b.id) || 0));
        return timeB - timeA;
    });

    return sortedTasks.slice(0, 5).map(task => {
        // Resolve project name
        let projectName = task.projectName;
        if (!projectName && task.projectId) {
            const project = projects.find(p => p.id === Number(task.projectId));
            projectName = project?.name;
        }
        if (!projectName) projectName = "General";

        // Resolve assignee name
        let assigneeName = task.assigneeName;
        if (!assigneeName && task.assigneeId) {
            const user = users.find(u => u.id === Number(task.assigneeId));
            assigneeName = user?.name;
        }
        if (!assigneeName) assigneeName = "Unassigned";

        return {
            id: task.id,
            title: task.title || "Untitled Task",
            project: projectName,
            assignee: assigneeName,
            initials: formatInitials(assigneeName),
            priority: formatPriority(task.priority),
            status: formatStatus(task.status),
            dueDate: formatDate(task.dueDate) || "No due date",
        };
    });
}

/**
 * Builds the complete dashboard payload reading from real localStorage data.
 */
function getDashboardResponse() {
    return {
        stats: getComputedStats(),
        taskStatuses: getComputedTaskStatuses(),
        weeklyActivity: getComputedWeeklyActivity(),
        recentTasks: getComputedRecentTasks(),
    };
}

export const handlers = [
    http.get('https://www.teamflow.com/api/dashboard', () => {
        return HttpResponse.json({
            data: getDashboardResponse(),
            message: "Dashboard data retrieved successfully",
        });
    }),
];
