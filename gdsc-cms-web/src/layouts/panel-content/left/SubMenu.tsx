import polygon_icon from "assets/dashboard/LeftPanel-icon/Polygon 1.svg";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

const SubMenu = ({ data, open, toggleLeftPanel }) => {
    const { pathname } = useLocation();
    const [subMenuOpen, setSubMenuOpen] = useState(false);
    const centerStyle = open ? "" : "justify-center";
    return (
        <>
            <li
                className={`p-2.5 flex rounded-full gap-2.5 item cursor-pointer duration-300 font-semibold hover:bg-secondary-gray ${
                    pathname.includes(data.name) && "text-white bg-primary-blue"
                } ${centerStyle}`}
                onClick={() => setSubMenuOpen(!subMenuOpen)}
            >
                <div onClick={toggleLeftPanel}>{data.icon}</div>
                {open && (
                    <>
                        <p className="capitalize flex-1">{data.name}</p>
                        <img
                            src={polygon_icon}
                            className={`${
                                subMenuOpen && "rotate-180"
                            } duration-100`}
                        />
                    </>
                )}
            </li>
            <motion.ul
                animate={
                    subMenuOpen ? { height: "fit-content" } : { height: 0 }
                }
                className="flex flex-col pl-5 text-[0.85rem] font-normal overflow-hidden"
            >
                {open &&
                    data.menus.map((menu) => (
                        <li key={menu}>
                            <NavLink
                                to={`/${data.name}/${menu}`}
                                className={
                                    "p-2.5 flex rounded-full item md:cursor-pointer cursor-default duration-300 font-semibold hover:bg-secondary-gray"
                                }
                            >
                                {menu}
                            </NavLink>
                        </li>
                    ))}
            </motion.ul>
        </>
    );
};

export default SubMenu;
