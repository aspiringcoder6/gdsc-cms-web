import { RiMessage2Fill } from "react-icons/ri";
import { IoEllipsisHorizontal } from "react-icons/io5";

const colors = {
    "#0177fb1a": "bg-[#0177fb1a]",
    "#ffb90047": "bg-[#ffb90047]",
    "#fe2b2526": "bg-[#fe2b2526]",
    "#e5fae5": "bg-[#e5fae5]",
    "#f4ecff": "bg-[#f4ecff]",
};

const UpcomingCard = ({
    iconColor = "#1F87FC",
    bgColor = "#0177fb1a",
    task = "",
    due = "",
}) => {
    return (
        <div className="flex flex-row px-4 py-3 items-center bg-[#F2F2FA] rounded-[15px]">
            <div className={`p-2 ${colors[bgColor]} rounded-[15px]`}>
                <RiMessage2Fill size={28} color={iconColor} />
            </div>
            <div className="pl-3">
                <p className="text-md font-semibold">{task}</p>
                <p className="text-sm text-[#666C73]">{due}</p>
            </div>
            <button className="ml-auto">
                <IoEllipsisHorizontal size={24} color="#A5B4CB" />
            </button>
        </div>
    );
};

export default UpcomingCard;
