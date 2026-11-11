
import dayjs from 'dayjs';
import type { Column, UserData, ProjectData, TaskData, TeamData } from './types.js';

// Task Status
const tasksStatusConfig = {
    todo: { color: 'neutral', label: 'To Do' },
    in_progress: { color: 'info', label: 'In Progress' },
    in_review: { color: 'warning', label: 'In Review' },
    completed: { color: 'success', label: 'Completed' },
};

type TaskStatus = keyof typeof tasksStatusConfig;

// Task Priority
const tasksPriorityConfig = {
    low: 'success',
    medium: 'info',
    high: 'warning',
    urgent: 'error',
};

type TaskPriority = keyof typeof tasksPriorityConfig;

// Type Guards
function isTaskStatus(value: unknown): value is TaskStatus {
    return (
        typeof value === 'string' &&
        Object.keys(tasksStatusConfig).includes(value)
    );
}

function isTaskPriority(value: unknown): value is TaskPriority {
    return (
        typeof value === 'string' &&
        Object.keys(tasksPriorityConfig).includes(value)
    );
}

// Teams Columns
export const teamsColumns: Column<TeamData>[] = [
    { key: 'name', label: 'Name' },
    { key: 'department', label: 'Department' },
    { key: 'leadName', label: 'Lead' },
    { key: 'memberCount', label: 'Members' },
    { key: 'location', label: 'Location' },
    { key: 'email', label: 'Email' },
    {
        key: 'status',
        label: 'Status',
        htmlStrcuture: ({ value }) => (
            <span className={`capitalize badge badge-${value === 'active' ? 'success' : 'error'}`}>
                {value}
            </span>
        ),
    },
    {
        key: 'createdAt',
        label: 'Created',
        htmlStrcuture: ({ value }) =>
            dayjs(typeof value === 'string' ? value : undefined).format('DD-MM-YYYY'),
    },
    { key: 'actions', label: '', actions: ['edit', 'delete'] },
];

// Users Columns
export const usersColumns: Column<UserData>[] = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
    { key: 'teamName', label: 'Team' },
    {
        key: 'status',
        label: 'Status',
        htmlStrcuture: ({ value }) => (
            <span className={`capitalize badge badge-${value === 'active' ? 'success' : 'error'}`}>
                {value}
            </span>
        ),
    },
    {
        key: 'createdAt',
        label: 'Created',
        htmlStrcuture: ({ value }) =>
            dayjs(typeof value === 'string' ? value : undefined).format('DD-MM-YYYY'),
    },
    { key: 'actions', label: '', actions: ['edit', 'delete'] },
];

// Projects Columns
export const projectsColumns: Column<ProjectData>[] = [
    { key: 'name', label: 'Project' },
    { key: 'clientName', label: 'Client' },
    { key: 'teamName', label: 'Team' },
    { key: 'ownerName', label: 'Owner' },
    { key: 'priority', label: 'Priority' },
    {
        key: 'status',
        label: 'Status',
        htmlStrcuture: ({ value }) => (
            <span className={`capitalize badge badge-${value === 'active' ? 'success' : 'error'}`}>
                {value}
            </span>
        ),
    },
    { key: 'progress', label: 'Progress' },
    { key: 'dueDate', label: 'Due' },
    { key: 'actions', label: '', actions: ['view', 'edit', 'delete'] },
];

// Tasks Columns
export const tasksColumns: Column<TaskData>[] = [
    { key: 'title', label: 'Task' },
    { key: 'projectName', label: 'Project' },
    { key: 'assigneeName', label: 'Assignee' },
    { key: 'type', label: 'Type' },
    {
        key: 'priority',
        label: 'Priority',
        htmlStrcuture: ({ value }) => {
            const priority = typeof value === 'string' ? value.toLowerCase() : '';

            const color = isTaskPriority(priority)
                ? tasksPriorityConfig[priority]
                : 'neutral';

            return (
                <span className={`capitalize badge badge-${color}`}>
                    {priority || 'Select...'}
                </span>
            );
        },
    },
    {
        key: 'status',
        label: 'Status',
        htmlStrcuture: ({ value }) => {
            const status = typeof value === 'string' ? value.toLowerCase() : '';

            const config = isTaskStatus(status)
                ? tasksStatusConfig[status]
                : { color: 'neutral', label: 'Select...' };

            return (
                <span className={`capitalize badge badge-${config.color}`}>
                    {config.label}
                </span>
            );
        },
    },
    { key: 'dueDate', label: 'Due' },
    { key: 'actions', label: '', actions: ['edit', 'delete'] },
];
