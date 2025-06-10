import Header from "./Header";
import TaskRow from "./TaskRow";
import { useAppSelector } from "redux/hooks";

export default function TasksTable() {
    const taskListData = useAppSelector((state) => state.task.taskList);
    // Use loading for future feature: load skeleton while fetching data
    // const loading = useAppSelector((state) => state.task.loading);
    const users = useAppSelector((state) => state.task.users);
    console.log("users:", users);

    return (
        <div className="min-h-full">
            <Header />
            {taskListData.map((task) => {
                return <TaskRow data={task} key={task.id} />;
            })}

            {taskListData.length == 0 && <p>There are currently no task!</p>}
        </div>
    );
}
