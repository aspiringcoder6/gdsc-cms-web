import Calendar from "./panel-content/right/Calendar";
import RightPanelHeader from "./panel-content/right/RightPanelHeader";
import Tomorrow from "./panel-content/right/Tomorrow";
import Upcoming from "./panel-content/right/Upcoming";
import { useAppSelector } from "../redux/hooks";
import React from "react";
const RightPanel = () => {
    const today = new Date();
    const taskListData = useAppSelector((state) => state.task.taskList);
    const [selected, setSelected] = React.useState<Date>(today);
    return (
        <div className=" h-full p-4 right-0 shadow-2xl overflow-y-auto hidden lg:block">
            <RightPanelHeader />

            <Calendar selected={selected} setSelected={setSelected} />
            {selected && (
                <>
                    <Upcoming
                        tasks={taskListData.filter((task) => {
                            const taskDueDate = new Date(task.dueDate);
                            return (
                                taskDueDate.getDate() === selected.getDate() &&
                                taskDueDate.getMonth() ===
                                    selected.getMonth() &&
                                taskDueDate.getFullYear() ===
                                    selected.getFullYear()
                            );
                        })}
                        selected={selected}
                    />

                    <Tomorrow
                        tasks={taskListData.filter((task) => {
                            const taskDueDate = new Date(task.dueDate);
                            return (
                                taskDueDate.getDate() ===
                                    selected.getDate() + 1 &&
                                taskDueDate.getMonth() ===
                                    selected.getMonth() &&
                                taskDueDate.getFullYear() ===
                                    selected.getFullYear()
                            );
                        })}
                    />
                </>
            )}
        </div>
    );
};

export default RightPanel;
