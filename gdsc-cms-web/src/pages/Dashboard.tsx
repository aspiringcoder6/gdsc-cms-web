import Progress from "components/dashboard/Progress";
import Project from "components/dashboard/Project";
import TodaysTask from "components/dashboard/TodaysTask";
import Layout from "layouts";
import Upcoming from "layouts/panel-content/right/Upcoming";
import Tomorrow from "layouts/panel-content/right/Tomorrow";
import { useAppSelector } from "redux/hooks";
function Dashboard() {
    const taskListData = useAppSelector((state) => state.task.taskList);
    const today = new Date();
    return (
        <Layout>
            <Progress />
            <div className="lg:hidden">
                <Upcoming
                    tasks={taskListData.filter((task) => {
                        const taskDueDate = new Date(task.dueDate);
                        return (
                            taskDueDate.getDate() === today.getDate() &&
                            taskDueDate.getMonth() === today.getMonth() &&
                            taskDueDate.getFullYear() === today.getFullYear()
                        );
                    })}
                    selected={today}
                />
                <Tomorrow
                    tasks={taskListData.filter((task) => {
                        const taskDueDate = new Date(task.dueDate);
                        return (
                            taskDueDate.getDate() === today.getDate() + 1 &&
                            taskDueDate.getMonth() === today.getMonth() &&
                            taskDueDate.getFullYear() === today.getFullYear()
                        );
                    })}
                />
            </div>
            <Project />
            <TodaysTask />
        </Layout>
    );
}

export default Dashboard;
