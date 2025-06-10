import { useAppDispatch, useAppSelector } from "redux/hooks";
import { Avatar, Dropdown } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { logOut } from "utils/firebase";
import { logoutUser } from "redux/slices/userSlice";

const UserAvatar = () => {
    const userInfo = useAppSelector((state) => state.user.info);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        logOut();
        navigate("/");
        dispatch(logoutUser());
    }
    
    return (
        <Dropdown
            label={
                <Avatar
                    img={userInfo.photoURL}
                    alt="user avatar"
                    rounded
                    bordered
                    color={"#1F87FC"}
                />
            }
            arrowIcon={false}
            inline
        >
            <Dropdown.Header>
                <span className="block text-sm">
                    {userInfo.displayName}
                </span>
                <span className="block truncate text-sm font-medium">
                    {userInfo.email}
                </span>
            </Dropdown.Header>
            <Dropdown.Item
                onClick={() => {
                    navigate("/dashboard");
                }}
            >
                Dashboard
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleLogout}>
                Sign out
            </Dropdown.Item>
        </Dropdown>
    );
}

export default UserAvatar;