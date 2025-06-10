import { useAppDispatch, useAppSelector } from "redux/hooks";
import TaskItem from "./subcomponents/TaskItem";
import { useEffect } from "react";
import { fetchTasks } from "redux/slices/taskSlice";
const TodaysTask = () => {
    const dispatch = useAppDispatch();
    const taskListData = useAppSelector((state) => state.task.taskList);
    const isLogin = useAppSelector((state) => state.user.isLoggedIn);

    useEffect(() => {
        //fetch Tasks
        if (isLogin) {
            dispatch(fetchTasks());
        }
    }, []);
    return (
        <div className="text-left w-full mt-10">
            <h2 className="text-2xl font-semibold">Today's Task</h2>
            <div className="flex flex-col items-center gap-6 mt-6">
                {taskListData.map((task) => {
                    // Filter tasks that are due today
                    const today = new Date();
                    const taskDueDate = new Date(task.dueDate);
                    if (
                        taskDueDate.getDate() !== today.getDate() ||
                        taskDueDate.getMonth() !== today.getMonth() ||
                        taskDueDate.getFullYear() !== today.getFullYear()
                    ) {
                        return null; // Skip tasks not due today
                    }
                    return (
                        <TaskItem
                            name={task.title ?? task.description}
                            comments={task.comments}
                            key={task.id}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default TodaysTask;
