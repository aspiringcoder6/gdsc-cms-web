import UpcomingCard from "components/dashboard/subcomponents/UpcomingCard";

const Tomorrow = ({ tasks }) => {
    return (
        <div className="pb-4 pt-[4px] text-left">
            <h3 className="text-lg font-semibold text-[#A5B4CB]">Tomorrow</h3>

            <div className="task-list mt-5 flex flex-col gap-3">
                {tasks.length ? (
                    tasks.map((task, index) => {
                        let color = "#0177fb1a";
                        let iconColor = "#1F87FC";
                        if (task.status == "Done") {
                            color = "#e5fae5";
                            iconColor = "#FF0000";
                        } else if (task.status == "In Progress") {
                            color = "#ffb90047";
                            iconColor = "#FFB900";
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

export default Tomorrow;
