import React from "react";
import { format } from "date-fns";
import { DayContent, DayContentProps, DayPicker } from "react-day-picker";
import { GoDotFill } from "react-icons/go";
import "react-day-picker/dist/style.css";
import "styles/day-picker.css";
import { useAppSelector } from "redux/hooks";
// Use this to customize a day cell according to the requirements
function DateTime(props: DayContentProps) {
    const dateTime = format(props.date, "yyyy-MM-dd");
    const modifers = props.activeModifiers;
    const taskListData = useAppSelector((state) => state.task.taskList);
    return (
        <div>
            <time dateTime={dateTime}>
                <DayContent {...props} />
            </time>
            <div className="flex">
                {taskListData.find((task) => {
                    const taskDueDate = new Date(task.dueDate);
                    return (
                        taskDueDate.getDate() === props.date.getDate() &&
                        taskDueDate.getMonth() === props.date.getMonth() &&
                        taskDueDate.getFullYear() ===
                            props.date.getFullYear() &&
                        task.status == "Review"
                    );
                }) && (
                    <GoDotFill
                        size={8}
                        color={
                            modifers && modifers.selected == true
                                ? "#FFF"
                                : "#1F87FC"
                        }
                        className="rounded-full"
                    />
                )}
                {taskListData.find((task) => {
                    const taskDueDate = new Date(task.dueDate);
                    return (
                        taskDueDate.getDate() === props.date.getDate() &&
                        taskDueDate.getMonth() === props.date.getMonth() &&
                        taskDueDate.getFullYear() ===
                            props.date.getFullYear() &&
                        task.status == "In Progress"
                    );
                }) && (
                    <GoDotFill
                        size={8}
                        color={
                            modifers && modifers.selected == true
                                ? "#FFF"
                                : "#FFB900"
                        }
                        className="rounded-full"
                    />
                )}
                {taskListData.find((task) => {
                    const taskDueDate = new Date(task.dueDate);
                    return (
                        taskDueDate.getDate() === props.date.getDate() &&
                        taskDueDate.getMonth() === props.date.getMonth() &&
                        taskDueDate.getFullYear() ===
                            props.date.getFullYear() &&
                        task.status == "Done"
                    );
                }) && (
                    <GoDotFill
                        size={8}
                        color={
                            modifers && modifers.selected == true
                                ? "#FFF"
                                : "#00A050"
                        }
                        className="rounded-full"
                    />
                )}
                {taskListData.find((task) => {
                    const taskDueDate = new Date(task.dueDate);
                    return (
                        taskDueDate.getDate() === props.date.getDate() &&
                        taskDueDate.getMonth() === props.date.getMonth() &&
                        taskDueDate.getFullYear() ===
                            props.date.getFullYear() &&
                        task.status == "To Do"
                    );
                }) && (
                    <GoDotFill
                        size={8}
                        color={
                            modifers && modifers.selected == true
                                ? "#FFF"
                                : "#9a4bff"
                        }
                        className="rounded-full"
                    />
                )}
            </div>
        </div>
    );
}

function MyCalendar({
    setSelected,
    selected,
}: {
    setSelected: React.Dispatch<React.SetStateAction<Date>>;
    selected: Date;
}) {
    return (
        <div className="flex flex-col items-center xl:mt-8">
            <DayPicker
                mode="single"
                showOutsideDays
                selected={selected}
                onSelect={setSelected}
                components={{ DayContent: DateTime }}
            />
        </div>
    );
}

export default MyCalendar;
