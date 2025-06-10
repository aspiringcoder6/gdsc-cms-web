export interface Task {
    id?: string;
    assignee: string[];
    assignees: User[];
    assigner: User;
    label: string[]; //
    status: string;
    description?: string;
    comments?: string[] | Comment[];
    createdDate: Date;
    title: String;
    dueDate: Date;
}

export interface User {
    uid: string;
    displayName?: string;
    email?: string;
    photoURL?: string;
    role?: string;
}

export interface Comment {
    id?: string;
    uid: string; // User ID of the commenter
    content: string;
    taskId?: string; //ref to belonged task
    createdDate: Date;
}
