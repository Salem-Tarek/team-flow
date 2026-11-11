import type { ReactNode } from 'react'

export type TableRowBasics = {
    id: number | string;
    checked?: boolean;
};

export type TableAction = 'edit' | 'delete' | 'view';

export type Column<T extends TableRowBasics> = {
    key: keyof T | 'actions';
    label: string;
    htmlStrcuture?: (props: { value: T[keyof T] }) => ReactNode;
    actions?: TableAction[]
};

export type UserData = TableRowBasics & {
    name: string;
    email: string;
    password: string;
    role: string;
    status: string;
    jobTitle: string;
    phone: string;
    teamId: number | string;
    teamName: string;
    createdAt: string;
}

export type TeamData = TableRowBasics & {
    name: string;
    department: string;
    leadId: number | string;
    leadName: string;
    memberCount: number | string;
    location: string;
    email: string;
    description: string;
    status: string;
    createdAt: string;
}

export type TaskData = TableRowBasics & {
    title: string;
    projectId: number | string;
    projectName: string;
    assigneeId: number | string;
    assigneeName: string;
    type: string;
    priority: string;
    status: string;
    dueDate: string;
    estimateHours: number | string;
    description: string;
    createdAt: string;
}

export type ProjectData = TableRowBasics & {
    name: string;
    description: string;
    clientName: string;
    ownerId: number | string;
    ownerName: string;
    teamId: number | string;
    teamName: string;
    status: string;
    priority: string;
    progress: number | string;
    budget: number | string;
    startDate: string;
    dueDate: string;
    taskCount: string;
    completionDate: string;
    createdAt: string;
}