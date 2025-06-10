import { Button } from "flowbite-react";
import { useState } from "react";

import { logInWithEmailAndPassword, signInWithGoogle } from "utils/firebase.js";

import gdscLogo from "assets/gdsc_logo.svg";
import google from "assets/google.svg";
import facebook from "assets/facebook.svg";

function LoginForm({ setOpenLogin, changeSignUp }) {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const handleSubmit = () => {
        if (!email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
            alert("Email or password is not valid");
            return;
        }

        logInWithEmailAndPassword(email, pass);
        setOpenLogin(false);
    };

    const handleLoginWithGoogle = () => {
        signInWithGoogle();
    };

    return (
        <div className="flex flex-col justify-center p-6">
            <img
                src={gdscLogo}
                alt="GDSC Logo"
                className="max-w-[80px] mx-auto py-4"
            />
            <h1 className="text-4xl text-center text-primary-blue pb-2">
                Welcome back!
            </h1>
            <h3 className="text-center text-primary-gray pb-5">
                Điền thông tin để đăng nhập
            </h3>
            <div className="flex flex-row justify-around pb-3">
                <Button onClick={handleLoginWithGoogle} outline color="gray">
                    <img
                        src={google}
                        alt="Google"
                        className="pr-2 pl-5 md:pl-16 lg:pl-8"
                    />
                    <span className="pr-5 md:pr-16 lg:pr-8">Google</span>
                </Button>
                <Button
                    outline
                    color="gray"
                    className="bg-opacity-40 cursor-not-allowed"
                    disabled={true}
                >
                    <img
                        src={facebook}
                        alt="Facebook"
                        className="pr-2 pl-4 md:pl-14 lg:pl-7"
                    />
                    <span className="pr-4 md:pr-14 lg:pr-7">Facebook</span>
                </Button>
            </div>
            <div className="relative flex py-5 items-center">
                <div className="flex-grow border-t border-gray-400"></div>
                <span className="flex-shrink mx-4 text-gray-400">hoặc</span>
                <div className="flex-grow border-t border-gray-400"></div>
            </div>

            <input
                type="email"
                placeholder="Tên đăng nhập/ tài khoản gmail"
                className="input rounded-[10px] mb-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Mật khẩu"
                className="input rounded-[10px]"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
            />
            <div className="flex flex-row gap-2 items-center mt-2">
                <input type="checkbox" placeholder="Nhớ mật khẩu" />
                <span className="">Nhớ mật khẩu</span>
            </div>

            <div className="flex flex-row items-center justify-between my-4">
                <a
                    className="underline underline-offset-4 text-primary-blue"
                    onClick={() => {
                        changeSignUp(true);
                        setOpenLogin(false);
                    }}
                    style={{ cursor: "pointer" }}
                >
                    Đăng kí
                </a>
                <Button
                    onClick={handleSubmit}
                    className="bg-primary-blue px-4 py-0"
                >
                    Đăng nhập
                </Button>
            </div>
        </div>
    );
}

export default LoginForm;
