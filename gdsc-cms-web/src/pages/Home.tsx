import { useState } from "react";

import Header from "components/header";
import Login from "components/login";
import SignUp from "components/signup";

import background from "assets/background.svg";
import { useAppSelector } from "redux/hooks";
import { useNavigate } from "react-router-dom";

function Home() {
    const [openLogin, setOpenLogin] = useState(false);
    const [openSignup, setOpenSignup] = useState(false);
    const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
    const navigate = useNavigate();

    const handleGetStartedClick = () => {
        if (isLoggedIn) {
            navigate("/dashboard");
        } else {
            setOpenLogin(true);
        }
    };

    return (
        <>
            <Header openLogin={setOpenLogin} openSignup={setOpenSignup} />
            <main
                className={`max-w-[1560px] m-auto flex ${
                    (openLogin || openSignup) && "hidden"
                } lg:flex flex-col items-center h-main lg:background`}
            >
                <h1 className="font-semibold text-4xl md:text-7xl text-center leading-relaxed mt-12">
                    Welcome to <span className="text-primary-red">G</span>
                    <span className="text-primary-blue">D</span>
                    <span className="text-primary-yellow">S</span>
                    <span className="text-primary-green">C</span>!
                </h1>
                <h2 className="text-primary-gray text-center text-2xl md:text-3xl">
                    Code, Innovate, Inspire.
                </h2>
                <button
                    onClick={handleGetStartedClick}
                    className="text-white bg-primary-blue px-6 py-2 rounded-[20px] mt-6 text-lg border-2 hover:border-primary-blue hover:bg-white hover:text-primary-gray duration-150"
                >
                    Get started
                </button>
                <div className="flex-grow flex items-end max-w-[700px]">
                    <img src={background} alt="parabol gate" />
                </div>
            </main>
            <div className="hidden lg:flex">
                <Login
                    openLogin={openLogin}
                    setOpenLogin={setOpenLogin}
                    changeSignUp={setOpenSignup}
                />
                <SignUp
                    openSignup={openSignup}
                    setOpenSignup={setOpenSignup}
                    changeLogin={setOpenLogin}
                />
            </div>
            {(openLogin || openSignup) && (
                <div className="h-main flex flex-col justify-center overflow-x-auto lg:hidden">
                    <Login
                        openLogin={openLogin}
                        setOpenLogin={setOpenLogin}
                        changeSignUp={setOpenSignup}
                    />
                    <SignUp
                        openSignup={openSignup}
                        setOpenSignup={setOpenSignup}
                        changeLogin={setOpenLogin}
                    />
                </div>
            )}
        </>
    );
}

export default Home;
