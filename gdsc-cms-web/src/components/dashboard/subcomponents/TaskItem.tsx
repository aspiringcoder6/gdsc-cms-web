import taskIcon from "assets/dashboard/task-icon.svg";
import messageIcon from "assets/dashboard/message-icon.svg";
import clockIcon from "assets/dashboard/clock-icon.svg";

function TaskItem({ name, comments }) {
    return (
        <div className="flex items-center px-6 py-3 shadow-task rounded-md max-w-4xl justify-between w-full">
            <div className="flex items-center gap-10">
                <img src={taskIcon} alt="task" />
                <div>
                    <p className="font-semibold">Start from</p>
                    <p className="text-primary-gray">09:00</p>
                </div>
                <div>
                    <p className="font-semibold">{name}</p>
                    <p className="text-primary-gray flex items-center gap-1">
                        <img src={messageIcon} alt="message" />
                        {comments ? comments.length : 0} comments
                    </p>
                </div>
            </div>
            <button className="flex items-center bg-primary-blue bg-opacity-10 text-primary-blue px-3 py-2 rounded-md gap-2 font-semibold">
                <img src={clockIcon} alt="reminder" />
                Reminder
            </button>
        </div>
    );
}

export default TaskItem;
