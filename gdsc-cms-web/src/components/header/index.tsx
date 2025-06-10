import { useAppSelector } from "redux/hooks";

import logo from "assets/logo.svg";
import darkThemeIcon from "assets/dark-theme.svg";
import { useState, useEffect, useRef } from "react";

import menu_icon from "assets/menu.svg";
import UserAvatar from "components/UserAvatar/UserAvatar";

function Header({ openLogin, openSignup }) {
    const [isOpenTab, setIsOpenTab] = useState(false);
    const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
    const componentRef = useRef(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (componentRef.current && !componentRef.current.contains(event.target)) {
            setIsOpenTab(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    return (
        <>
            <header className="relative flex items-center justify-center lg:justify-between max-w-[1560px] m-auto px-10 py-4">
                <img
                    src={menu_icon}
                    alt="menu"
                    className="absolute left-2 cursor-pointer lg:hidden"
                    onClick={() => setIsOpenTab(true)}
                />
                <img src={logo} alt="gdsc-hust" className="w-56" />
                <nav className="hidden lg:flex gap-7 font-semibold text-primary-gray text-lg">
                    <a href="" className="hover:text-black duration-150">
                        Service
                    </a>
                    <a href="" className="hover:text-black duration-150">
                        Home
                    </a>
                    <a href="" className="hover:text-black duration-150">
                        About
                    </a>
                    <a href="" className="hover:text-black duration-150">
                        Contact
                    </a>
                </nav>
                <div className="hidden lg:flex gap-4 text-lg font-semibold">
                    <button className="mr-4">
                        <img src={darkThemeIcon} alt="dark theme" />
                    </button>
                    {isLoggedIn ? (
                        <div className="flex items-center gap-6">
                            <span>Account</span>
                            <UserAvatar/>
                        </div>
                    ) : (
                        <>
                            <button onClick={() => openSignup(true)}>
                                Sign up
                            </button>
                            <button
                                onClick={() => openLogin(true)}
                                className="px-6 py-1 rounded-lg bg-primary-blue text-white border hover:border-primary-blue hover:bg-white hover:text-primary-gray duration-150"
                            >
                                Sign in
                            </button>
                        </>
                    )}
                </div>

            </header>
            <div ref={componentRef} className={`lg:hidden h-full z-[40] fixed top-0  ${isOpenTab ? "left-0" : "left-[-100%]"} transition-all duration-400 ease-in-out justify-between flex flex-col border-r shadow-2xl p-4 md:p-5 bg-white`}>
                <nav className="flex flex-col font-semibold text-primary-gray text-lg">
                    <span
                        className="flex justify-end cursor-pointer"
                    >
                        <svg
                            width="40"
                            height="40"
                            viewBox="0 0 40 40"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={() => setIsOpenTab(false)}
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
                    <a href="" className="hover:text-black duration-150">
                        Service
                    </a>
                    <a href="" className="hover:text-black duration-150 mt-7">
                        Home
                    </a>
                    <a href="" className="hover:text-black duration-150 mt-7">
                        About
                    </a>
                    <a href="" className="hover:text-black duration-150 mt-7">
                        Contact
                    </a>
                </nav>
                <div className="flex text-lg font-semibold">
                    {isLoggedIn ? (
                        <div className="flex items-center gap-6">
                            <span>Account</span>
                            <UserAvatar/>
                        </div>
                    ) : (
                        <>
                            <button onClick={() => {setIsOpenTab(false); openLogin(false); openSignup(true)}}>
                                Sign up
                            </button>
                            <button
                                onClick={() => {setIsOpenTab(false); openSignup(false); openLogin(true)}}
                                className="ml-2 px-6 py-1 rounded-lg bg-primary-blue text-white border hover:border-primary-blue hover:bg-white hover:text-primary-gray duration-150"
                            >
                                Sign in
                            </button>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default Header;
