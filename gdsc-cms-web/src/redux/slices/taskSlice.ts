import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ITask, ITaskState, IComment } from "model/task";
import { IUserInfo } from "model/user";
import { convertDateToSecondsAndNanos } from "utils/date";
import api from "utils/api";

// omit imports and state
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
    const response = await api.get("/task/get");
    const data: ITask[] = response.data;

    // Fetch comments of each task and add to data
    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        const id = element.id;
        const rs = await api.get("/task/get/" + id + "/comment");
        const comments: string[] = rs.data;
        element["comments"] = comments;
    }
    return data;
});

export const getDocById = createAsyncThunk(
    "tasks/getDocById",
    async (id: string) => {
        const response = await api.get("/task/get/" + id);
        const data: ITask = response.data;
        return data;
    }
);

export const fetchCommentsById = createAsyncThunk(
    "tasks/fetchCommentsById",
    async (id: string) => {
        const response = await api.get("/task/get/" + id + "/comment");
        const data: string[] = response.data;
        return data;
    }
);

export const getAllUsers = createAsyncThunk("task/getAllUsers", async () => {
    const response = await api.get("/user/all");
    const data: IUserInfo[] = response.data;
    return data;
});

export const addTask = createAsyncThunk("task/add", async (doc: ITask) => {
    let assignee = [];
    for (let index = 0; index < doc.assignees.length; index++) {
        const element = doc.assignees[index];
        assignee.push(element["uid"]);
    }

    const taskData = {
        title: doc.title,
        assignees: assignee,
        assigner: doc.assigner,
        label: doc.label,
        status: doc.status,
        description: doc.description,
        dueDate: doc.dueDate,
    };

    const response = await api.post("/task/add", taskData);
    const data = response.data;
    console.log(data);
    return data;
});

export const addCommentByID = createAsyncThunk(
    "tasks/addCommentById",
    async (data: IComment) => {
        const commentData = {
            content: data.comment,
            uid: data.uid,
        };

        await api.post("/task/add/" + data.id + "/comment", commentData);
    }
);

export const updateTaskById = createAsyncThunk(
    "tasks/updateTaskById",
    async (doc: ITask) => {
        let assignee = [];
        for (let index = 0; index < doc.assignees.length; index++) {
            const element = doc.assignees[index];
            assignee.push(element["uid"]);
        }

        const taskData = {
            title: doc.title,
            assignee: assignee,
            assigner: doc.assigner,
            label: doc.label,
            status: doc.status,
            description: doc.description,
            dueDate: doc.dueDate,
        };

        const response = await api.put("/task/update/" + doc.id, taskData);
        const data: ITask = response.data;
        return data;
    }
);

const initialState: ITaskState = {
    taskList: [],
    comments: [],
    users: [],
    loading: false,
    currentId: "",
};

const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        // omit reducer cases
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTasks.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchTasks.fulfilled, (state, action) => {
            state.taskList = [];
            state.comments = [];
            state.loading = false;
            action.payload.forEach((task: ITask) => {
                state.taskList.push(task);
            });
        });
        // builder.addCase(getDocById.fulfilled, (state, action) => {
        //     state.curTask = action.payload;
        // });
        builder.addCase(fetchCommentsById.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchCommentsById.fulfilled, (state, action) => {
            state.loading = false;
            state.comments = action.payload;
        });
        builder.addCase(getAllUsers.fulfilled, (state, action) => {
            const response = action.payload;

            state.users = action.payload;
        });
        builder.addCase(addTask.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(addTask.fulfilled, (state, action) => {
            state.loading = false;
            state.currentId = action.payload["taskId"];
        });
        builder.addCase(addCommentByID.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(addCommentByID.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(updateTaskById.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateTaskById.fulfilled, (state) => {
            state.loading = false;
        });
    },
});

export default taskSlice.reducer;
