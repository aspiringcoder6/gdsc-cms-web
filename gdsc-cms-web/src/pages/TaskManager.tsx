import { useEffect } from "react";
import Layout from "layouts";
import TasksTable from "components/task-manager/TasksTable";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { fetchTasks, getAllUsers } from "redux/slices/taskSlice";
import { setPageType } from "redux/slices/pageSlice";

export default function TaskManager() {
    const dispatch = useAppDispatch();
    const isLogin = useAppSelector((state) => state.user.isLoggedIn);

    useEffect(() => {
        if (isLogin) {
            dispatch(fetchTasks());
            dispatch(getAllUsers());
        }
    }, [isLogin]);

    useEffect(() => {
        dispatch(setPageType("task-manager"));
    }, []);

    return (
        <Layout switchBg={true}>
            <TasksTable />
        </Layout>
    );
}
