import { MdDarkMode } from "react-icons/md";
// import { MdOutlineDarkMode } from "react-icons/md";
import { FaQuestionCircle } from "react-icons/fa";
import { IoDocumentText } from "react-icons/io5";
import { FaBell } from "react-icons/fa";
import { Link } from "react-router-dom";
import UserAvatar from "components/UserAvatar/UserAvatar";

const RightPanelHeader = () => {

    return (
        <div className="w-full mb-4 flex justify-end gap-4">
            <button className="">
                <MdDarkMode
                    className="fill-[#666C73] hover:fill-[#3C3D3F] transition ease-in"
                    size={24}
                />
            </button>
            <button className="">
                <FaQuestionCircle
                    className="fill-[#666C73] hover:fill-[#3C3D3F] transition ease-in"
                    size={24}
                />
            </button>
            <Link
                to={"/documentation/team/developer"}
                className="flex items-center"
            >
                <IoDocumentText
                    className="fill-[#666C73] hover:fill-[#3C3D3F] transition ease-in"
                    size={24}
                />
            </Link>
            <button className="">
                <FaBell
                    className="fill-[#666C73] hover:fill-[#3C3D3F] transition ease-in"
                    size={24}
                />
            </button>
            <UserAvatar/>
        </div>
    );
};

export default RightPanelHeader;
