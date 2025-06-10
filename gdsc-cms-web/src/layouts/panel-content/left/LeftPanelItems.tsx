import { NavLink } from "react-router-dom";
import SubMenu from "./SubMenu";
import { motion } from "framer-motion";
import IosArrowBack_icon from "assets/dashboard/LeftPanel-icon/IosArrowBack.svg";

//icon
import homepage_icon from "assets/dashboard/LeftPanel-icon/homepage.svg";
import calendar_icon from "assets/dashboard/LeftPanel-icon/calendar.svg";
import taskmanager_icon from "assets/dashboard/LeftPanel-icon/taskmanager.svg";
import registration_icon from "assets/dashboard/LeftPanel-icon/registration.svg";
import devtools_icon from "assets/dashboard/LeftPanel-icon/developertools.svg";
import finance_icon from "assets/dashboard/LeftPanel-icon/finance.svg";
import prtools_icon from "assets/dashboard/LeftPanel-icon/prtools.svg";

const subMenusList = [
    {
        name: "Registration",
        icon: <img src={registration_icon} alt="Registration" />,
        menus: ["Tech-sharing Registration", "Meeting Registration"],
    },
    {
        name: "developer tools",
        icon: <img src={devtools_icon} alt="developer tools" />,
        menus: ["Project Manager"],
    },
    {
        name: "PR tools",
        icon: <img src={prtools_icon} alt="PR tools" />,
        menus: ["HTML E-mail"],
    },
];
interface subMenusList {
    name: string;
    icon: JSX.Element;
    menus: string[];
}

const LeftPanelItems = ({ open, istab, setistab, toggleLeftPanel }) => {
    const centerStyle = open ? "" : "justify-center";
    const currentTab = window.location.pathname;
    return (
        <div>
            <span
                onClick={() => setistab(!istab)}
                className={`flex justify-end cursor-pointer xl:hidden`}
            >
                <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        opacity="0.4"
                        d="M20 36.6667C29.2047 36.6667 36.6667 29.2047 36.6667 20C36.6667 10.7953 29.2047 3.33334 20 3.33334C10.7953 3.33334 3.33337 10.7953 3.33337 20C3.33337 29.2047 10.7953 36.6667 20 36.6667Z"
                        fill="#D9D9D9"
                        fillOpacity="0.5"
                    />
                    <path
                        d="M21.7657 20.0002L25.599 16.1669C26.0824 15.6835 26.0824 14.8835 25.599 14.4002C25.1157 13.9169 24.3157 13.9169 23.8324 14.4002L19.999 18.2335L16.1656 14.4002C15.6823 13.9169 14.8823 13.9169 14.399 14.4002C13.9157 14.8835 13.9157 15.6835 14.399 16.1669L18.2324 20.0002L14.399 23.8335C13.9157 24.3168 13.9157 25.1168 14.399 25.6002C14.649 25.8502 14.9656 25.9668 15.2823 25.9668C15.599 25.9668 15.9156 25.8502 16.1656 25.6002L19.999 21.7668L23.8324 25.6002C24.0824 25.8502 24.399 25.9668 24.7157 25.9668C25.0324 25.9668 25.349 25.8502 25.599 25.6002C26.0824 25.1168 26.0824 24.3168 25.599 23.8335L21.7657 20.0002Z"
                        fill="#292D32"
                    />
                </svg>
            </span>
            <nav className="h-full bg-white xl:flex flex-col ">
                <ul className="whitespace-pre text-[1rem] py-5 flex flex-col gap-1 font-semibold">
                    <li>
                        <NavLink
                            to="/"
                            className={`py-2.5 px-2 flex items-center rounded-full gap-4 item md:cursor-pointer cursor-default duration-300 font-semibold hover:bg-secondary-gray ${centerStyle}`}
                        >
                            <img
                                src={homepage_icon}
                                alt="Home Page"
                                className="min-w-max"
                            />
                            {open && "Home page"}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard"
                            className={`py-2.5 px-2 flex items-center rounded-full gap-4 item md:cursor-pointer cursor-default duration-300 font-semibold hover:bg-secondary-gray ${centerStyle} ${
                                currentTab == "/dashboard" &&
                                "bg-primary-blue text-white"
                            }`}
                        >
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M10 6V0H18V6H10ZM0 10V0H8V10H0ZM10 18V8H18V18H10ZM0 18V12H8V18H0ZM2 8H6V2H2V8ZM12 16H16V10H12V16ZM12 4H16V2H12V4ZM2 16H6V14H2V16Z"
                                    fill="currentColor"
                                    className="min-w-max z-10"
                                />
                            </svg>
                            {open && "Dashboard"}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/"
                            className={`py-2.5 px-2 flex items-center rounded-full gap-4 item md:cursor-pointer cursor-default duration-300 font-semibold hover:bg-secondary-gray ${centerStyle} ${
                                currentTab == "/calendar" &&
                                "bg-primary-blue text-white"
                            }`}
                        >
                            <img
                                src={calendar_icon}
                                alt="Calendar"
                                className="min-w-max"
                            />
                            {open && "Calendar"}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/task-manager"
                            className={`py-2.5 px-2 flex items-center rounded-full gap-4 item md:cursor-pointer cursor-default duration-300 font-semibold hover:bg-secondary-gray ${centerStyle} ${
                                currentTab == "/task-manager" &&
                                "bg-primary-blue text-white"
                            }`}
                        >
                            <img
                                src={taskmanager_icon}
                                alt="Task manager"
                                className="min-w-max"
                            />
                            {open && "Task Manager"}
                        </NavLink>
                    </li>

                    <div>
                        {subMenusList?.map((menu) => (
                            <div key={menu.name} className="flex flex-col">
                                <SubMenu
                                    open={open}
                                    data={menu}
                                    toggleLeftPanel={toggleLeftPanel}
                                />
                            </div>
                        ))}
                    </div>

                    <li>
                        <NavLink
                            to="/"
                            className={`py-2.5 px-2 flex items-center rounded-full gap-4 item md:cursor-pointer cursor-default duration-300 font-semibold hover:bg-secondary-gray ${centerStyle}`}
                        >
                            <img
                                src={finance_icon}
                                alt="Finance"
                                className="min-w-max"
                            />
                            {open && "Finance"}
                        </NavLink>
                    </li>
                </ul>
                <motion.div
                    transition={{ duration: 0 }}
                    onClick={toggleLeftPanel}
                    className={`hidden xl:flex justify-center items-center z-50 right-2 bottom-3 cursor-pointer ${
                        open ? " absolute" : "p-l-4"
                    }`}
                >
                    <div
                        className={`w-6 h-6 flex justify-center items-center hover:bg-gray-200 rounded-full ${
                            open ? "rotate-180" : "rotate-0"
                        }`}
                    >
                        <img src={IosArrowBack_icon} />
                    </div>
                </motion.div>
            </nav>
        </div>
    );
};

export default LeftPanelItems;
