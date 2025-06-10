import { format } from "date-fns";

import UpcomingCard from "components/dashboard/subcomponents/UpcomingCard";

const Upcoming = ({ tasks, selected }) => {
    const today = new Date();
    return (
        <div className="py-4 text-left">
            <h2 className="text-2xl font-bold">
                Upcoming
                <span className="text-primary-blue">.</span>
            </h2>
            <h3 className="text-lg font-semibold text-[#A5B4CB] pt-3">
                {selected == today && "Today,"}{" "}
                {format(selected, "dd MMMM yyyy")}
            </h3>

            <div className="task-list mt-5 flex flex-col gap-3">
                {tasks.length ? (
                    tasks.map((task, index) => {
                        let color = "#0177fb1a";
                        let iconColor = "#1F87FC";
                        if (task.status == "Done") {
                            color = "#e5fae5";
                            iconColor = "#04cf41";
                        } else if (task.status == "In Progress") {
                            color = "#ffb90047";
                            iconColor = "#FFB900";
                        } else if (task.status == "Review") {
                            color = "#f4ecff";
                            iconColor = "#9949ff";
                        }
                        return (
                            <UpcomingCard
                                task={task.title}
                                due={task.dueDate}
                                key={index}
                                iconColor={iconColor}
                                bgColor={color}
                            />
                        );
                    })
                ) : (
                    <p className="text-center text-gray-400">
                        No task available
                    </p>
                )}
            </div>
        </div>
    );
};

export default Upcoming;
