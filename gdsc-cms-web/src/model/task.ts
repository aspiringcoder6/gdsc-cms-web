import { IUserInfo } from "./user";

export interface ITask {
    id?: string;
    title?: string;
    label?: string[];
    assigner?: string;
    assignee?: string[];
    description?: string;
    createdDate?: { seconds: number; nanoseconds: number };
    status?: string;
    assignees?: IUserInfo[];
    comments?: string[];
    dueDate: string;
}

export interface ITaskState {
    taskList: ITask[];
    comments: string[];
    users: IUserInfo[];
    loading: boolean;
    currentId: string;
}

export interface IComment {
    id: string;
    comment: string,
    uid: string
}