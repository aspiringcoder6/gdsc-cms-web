import { useState } from "react";
import UpdateTaskModal from "./UpdateTaskModal";
import { formatDateString, isDateBeforeToday } from "utils/date";

import { IoIosCheckmarkCircle } from "react-icons/io";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { useAppSelector } from "redux/hooks";

export default function TaskRow({ data }) {
    const [isOpen, setOpen] = useState(false);

    const userInfo = useAppSelector((state) => state.user.info);
    const late = isDateBeforeToday(data.dueDate); // Handle if a tasks is late or not

    const dueDate = formatDateString(data.dueDate);

    const statusColors = {
        Done: {
            textColor: "text-[#04CE00]",
            bgColor: "bg-[#04ce001a]",
        },
        "In Progress": {
            textColor: "text-[#FFB900]",
            bgColor: "bg-[#ffb9001a]",
        },
        Review: {
            textColor: "text-[#0177FB]",
            bgColor: "bg-[#1f87fc1a]",
        },
        "To Do": {
            textColor: "text-[#9747FF]",
            bgColor: "bg-[#9747ff1a]",
        },
    };

    return (
        <div
            onClick={() => setOpen(true)}
            className="header grid grid-cols-12 text-xs sm:text-sm xl:text-md font-semibold text-primary-gray border-b border-[#F7F9FD] bg-white hover:cursor-pointer hover:border hover:border-gray-200  transition-all"
        >
            <div className="col-span-1 items-center pl-4 text-left hidden sm:flex">
                {data.status == "Done" ? (
                    <IoIosCheckmarkCircle
                        size={24}
                        className="fill-[#04CE00] cursor-pointer"
                        // onClick={() => setChecked(!checked)}
                    />
                ) : (
                    <IoIosCheckmarkCircleOutline
                        size={24}
                        className="fill-primary-gray cursor-pointer"
                        // onClick={() => setChecked(!checked)}
                    />
                )}
            </div>
            <div className="col-span-5 sm:col-span-4 border-r border-[#F7F9FD] py-4 pl-4 sm:pl-0 md:pr-4 text-left flex items-center">
                <p className="max-w-[320px]">
                    {data.title ? data.title : "Not a valid title"}
                </p>
            </div>
            <div className="col-span-2 py-4 border-r border-[#F7F9FD] flex items-center justify-center">
                <p
                    className={`py-1 px-3 sm:px-4 ${
                        statusColors[data.status].textColor
                    } ${statusColors[data.status].bgColor}`}
                >
                    {data.status ? data.status : "To Do"}
                </p>
            </div>
            <div className="col-span-3 py-4 border-r border-[#F7F9FD] flex items-center justify-center gap-3 px-4">
                <img
                    src={
                        data.assigner.photoURL
                            ? data.assigner.photoURL
                            : userInfo.photoURL
                    }
                    alt=""
                    className="w-8 sm:w-10 h-auto aspect-square rounded-full object-cover"
                />
            </div>
            <div className="col-span-2 py-4 sm:pr-4 flex items-center justify-center">
                <p className={`${late ? "text-[#FF4F28]" : "text-black"}`}>
                    {dueDate ? dueDate : ""}
                </p>
            </div>

            <UpdateTaskModal isOpen={isOpen} setOpen={setOpen} data={data} />
        </div>
    );
}
