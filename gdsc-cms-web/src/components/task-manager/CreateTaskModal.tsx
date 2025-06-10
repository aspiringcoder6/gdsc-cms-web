import {
    Modal,
    FloatingLabel,
    TextInput,
    Textarea,
    Datepicker,
    Avatar,
    Button,
} from "flowbite-react";
import { ToastContainer, toast } from "react-toastify";

import { useAppDispatch, useAppSelector } from "redux/hooks";
import { addTask, fetchTasks } from "redux/slices/taskSlice";

import TaskDropdown from "./TaskDropdown";
import Activity from "./Activity";

import "react-toastify/dist/ReactToastify.css";
import { IoClose } from "react-icons/io5";
import calendar from "assets/task-manager/calendar.svg";
import description from "assets/task-manager/description.svg";

import { useState } from "react";
// import { useEffect } from "react";

export default function CreateTaskModal({ isOpen, setOpen }) {
    const dispatch = useAppDispatch();
    const [labelOpen, setLabelOpen] = useState(false);
    const userInfo = useAppSelector((state) => state.user.info);
    const loading = useAppSelector((state) => state.task.loading);
    const currentId = useAppSelector((state) => state.task.currentId);
    const [status, setStatus] = useState("In Progress");
    const [assignee, setAssignee] = useState([]);
    const [label, setLabel] = useState([]);
    const [labelValue, setLabelValue] = useState("");
    const [desc, setDesc] = useState("");
    const [dueDate, setDueDate] = useState(new Date().toDateString());
    const [title, setTitle] = useState("Enter your title ...");

    // console.log("data: ", data);
    const handleDateChange = (date) => {
        setDueDate(date);
        console.log(date);
    };

    const statusColors = {
        Done: {
            textColor: "text-[#fff]",
            bgColor: "bg-[#04ce00]",
        },
        "In Progress": {
            textColor: "text-[#fff]",
            bgColor: "bg-[#ffb900]",
        },
        Review: {
            textColor: "text-[#fff]",
            bgColor: "bg-[#1f87fc]",
        },
        "To Do": {
            textColor: "text-[#fff]",
            bgColor: "bg-[#9747ff]",
        },
    };

    const createLabelColors = ({ label }) => {
        // Can add more keys and color in the future
        const labelColors = {
            High: "bg-[#FF4F28]",
            Design: "bg-[#00A050]",
        };

        if (label in labelColors) {
            return labelColors[label];
        } else {
            return "bg-[#A5B4CB]";
        }
    };

    const addLabel = (labelName) => {
        setLabel([...label, labelName]);
    };

    const removeLabel = (labelName) => {
        let tmp = [...label];
        for (let i = 0; i < label.length; i++) {
            if (tmp[i] == labelName) {
                tmp.splice(i, 1);
                break;
            }
        }
        setLabel(tmp);
    };

    const handleCreateTask = async () => {
        try {
            await dispatch(
                addTask({
                    id: currentId,
                    title: title,
                    assignees: assignee,
                    assigner: userInfo.uid,
                    label: label,
                    status: status,
                    description: desc,
                    dueDate: dueDate,
                })
            );
            !loading && toast.success("📝 Create Successfully");
            setTitle("Enter your title ...");
            setAssignee([]);
            setLabel([]);
            setStatus("In Progress");
            setDueDate(new Date().toDateString());
            setDesc("");
            setTimeout(() => {
                setOpen(false);
            }, 2000);
            await dispatch(fetchTasks());
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Modal
            dismissible
            size="2xl"
            show={isOpen}
            onClose={() => setOpen(false)}
        >
            <Modal.Body className="bg-[#F7F9FD] rounded-[15px]">
                <div className="body">
                    {/* Task Title */}
                    <div className="header flex justify-between">
                        <div className="flex gap-2 items-center w-full">
                            <img src={calendar} />
                            <FloatingLabel
                                className="border-none p-0 m-0 text-3xl text-[#44546F] w-[150%]"
                                variant="standard"
                                label=""
                                // defaultValue={"Enter the Task ..."}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        <button onClick={() => setOpen(false)}>
                            <IoClose size={32} />
                        </button>
                    </div>

                    {/* Assignee, Label, Status, etc */}
                    <div className="properties flex items-start gap-7 pt-7 pb-4 pl-7">
                        <div className="flex flex-col justify-center items-center">
                            <p className="text-[#44546F] font-semibold ">
                                Assignee
                            </p>
                            <div className="flex items-center gap-1 pt-2 ">
                                <Avatar.Group className="relative">
                                    {assignee.map((assignee, index) => {
                                        if (index < 4) {
                                            return (
                                                <Avatar
                                                    img={
                                                        assignee.photoURL
                                                            ? assignee.photoURL
                                                            : userInfo.photoURL
                                                    }
                                                    alt="user avatar"
                                                    rounded
                                                    key={index}
                                                />
                                            );
                                        }
                                    })}
                                    <TaskDropdown
                                        setRes={setAssignee}
                                        data={assignee}
                                        type="assignee"
                                        className=" mt-[55%]"
                                    >
                                        <Avatar.Counter
                                            total={assignee.length}
                                            className="cursor-pointer"
                                        />
                                    </TaskDropdown>
                                </Avatar.Group>
                            </div>
                        </div>

                        <div className="flex flex-col justify-center items-start">
                            <p className="text-[#44546F] font-semibold ">
                                Label
                            </p>
                            <div className="flex items-center gap-1 pt-2">
                                {label.map((label, index) => {
                                    if (index < 2) {
                                        return (
                                            <p
                                                key={index}
                                                onClick={() => {
                                                    removeLabel(label);
                                                }}
                                                className={`py-2 px-3 bg-[#FF4F28] ${createLabelColors(
                                                    label
                                                )}  rounded-[2px] text-white cursor-pointer transition-all ease-in-out hover:bg-[#DC4827]`}
                                            >
                                                {label}
                                            </p>
                                        );
                                    }
                                })}

                                <button
                                    onClick={() => {
                                        setLabelOpen(true);
                                    }}
                                >
                                    <p className="py-[6px] px-4 bg-[#091e420f] text-xl font-semibold rounded-[3px] transition-all ease-in-out hover:bg-[#091e4233]">
                                        +
                                    </p>
                                </button>
                                <Modal
                                    dismissible
                                    size="xl"
                                    show={labelOpen}
                                    onClose={() => setLabelOpen(false)}
                                >
                                    <Modal.Body className="bg-[#F7F9FD] rounded-[15px]">
                                        <form
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                addLabel(labelValue);
                                                setLabelOpen(false);
                                                setLabelValue("");
                                            }}
                                        >
                                            <TextInput
                                                className="text-md text-[#44546F] font-semibold w-full"
                                                placeholder={"Label name..."}
                                                value={labelValue}
                                                onChange={(e) =>
                                                    setLabelValue(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </form>
                                    </Modal.Body>
                                </Modal>
                            </div>
                        </div>

                        <div className="flex flex-col justify-center items-start relative">
                            <p className="text-[#44546F] font-semibold ">
                                Status
                            </p>
                            <TaskDropdown
                                setRes={setStatus}
                                type="status"
                                className=""
                            >
                                <div className="flex items-center gap-1 pt-2 transition-all cursor-pointer hover:shadow-md ">
                                    <p
                                        className={`py-2 px-3 ${statusColors[status].textColor} ${statusColors[status].bgColor}`}
                                    >
                                        {status ? status : "To Do"}
                                    </p>
                                </div>
                            </TaskDropdown>
                        </div>
                    </div>

                    <div className="pl-7 pb-7 pr-48">
                        <p className="text-[#44546F] font-semibold ">
                            Due Date
                        </p>
                        <Datepicker
                            onSelectedDateChanged={handleDateChange}
                            defaultDate={new Date(dueDate)}
                            className="pt-2"
                        />
                    </div>

                    {/* Description */}

                    <div className="description-header flex gap-2 items-center">
                        <img src={description} alt="description icon" />
                        <p className="text-[#172B4D] text-2xl">Description</p>
                    </div>

                    <div className="pt-4 pb-8 pl-7">
                        <Textarea
                            className=" text-md text-[#44546F] font-semibold"
                            helperText=""
                            placeholder={
                                desc
                                    ? desc
                                    : "Add a more detailed description..."
                            }
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            color={"gray"}
                        />
                    </div>

                    {/* Activity Section */}
                    <Activity
                        userInfo={userInfo}
                        id={currentId}
                        disabled={currentId ? false : true}
                    />

                    {/* <Button color={"blue"} className="ml-auto mb-4" >Create Task</Button> */}
                    <ToastContainer
                        position="bottom-right"
                        autoClose={2000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="colored"
                    />

                    <Button
                        onClick={() => {
                            handleCreateTask();
                        }}
                        className="ml-auto"
                    >
                        Create Task
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );
}
