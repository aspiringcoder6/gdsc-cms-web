import { Dropdown, TextInput } from "flowbite-react";
import { useAppDispatch, useAppSelector } from "redux/hooks";

export default function TaskDropdown({
    children,
    data = null,
    setRes,
    className = "",
    type = "",
}) {
    const users = useAppSelector((state) => state.task.users);

    const handleUsers = (index, existed) => {
        let tmp = [...data];
        if (existed) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].displayName == users[index].displayName) {
                    tmp.splice(i, 1);
                    break;
                }
            }
            setRes(tmp);
        } else {
            setRes([...tmp, users[index]]);
        }
    };

    const removeLabel = (label) => {
        let tmp = [...data];
        for (let i = 0; i < data.length; i++) {
            if (tmp[i] == label) {
                tmp.splice(i, 1);
                break;
            }
        }
        setRes(tmp);
    };

    if (type == "assignee") {
        return (
            <Dropdown
                label=""
                // dismissOnClick={false}
                renderTrigger={() => {
                    return children;
                }}
                className={`w-40 h-40 overflow-scroll ${className}`}
            >
                {users.map((user, index) => {
                    const existed = data.find(
                        (item) => item["displayName"] === user.displayName
                    );

                    return (
                        <Dropdown.Item
                            onClick={() => handleUsers(index, existed)}
                            key={index}
                            className={`${existed && " text-blue-500"}`}
                        >
                            {user.displayName}
                        </Dropdown.Item>
                    );
                })}
            </Dropdown>
        );
    } else if (type == "status") {
        return (
            <Dropdown
                label=""
                // dismissOnClick={false}
                renderTrigger={() => {
                    return children;
                }}
                className={`${className}`}
            >
                <Dropdown.Item
                    onClick={() => {
                        setRes("To Do");
                    }}
                >
                    To Do
                </Dropdown.Item>
                <Dropdown.Item
                    onClick={() => {
                        setRes("In Progress");
                    }}
                >
                    In Progress
                </Dropdown.Item>
                <Dropdown.Item
                    onClick={() => {
                        setRes("Review");
                    }}
                >
                    Review
                </Dropdown.Item>
                <Dropdown.Item
                    onClick={() => {
                        setRes("Done");
                    }}
                >
                    Done
                </Dropdown.Item>
            </Dropdown>
        );
    }
}
