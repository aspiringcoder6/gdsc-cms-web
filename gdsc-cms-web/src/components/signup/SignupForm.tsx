import leftAsset from "assets/sign_up_left.svg";

import { Button } from "flowbite-react";
import { useState } from "react";

import {
    signUpWithEmailAndPassword,
    addUserToDatabase,
} from "utils/firebase.js";

function SignUpForm({ setOpenSignup, changeLogin }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [secondPass, setSecondPass] = useState("");

    const handleSubmit = () => {
        if (
            !email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/) ||
            pass !== secondPass
        ) {
            alert("Email or password is not valid");
            return;
        }

        signUpWithEmailAndPassword(email, pass).then((userCredential) => {
            // Signed up successfully, get the user UID
            const user = userCredential.user;
            const uid = user.uid;

            const userData = {
                email: email,
                displayName: name,
                role: "member",
                uid: uid,
                photoURL:
                    "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.facebook.com%2Fgdsc.hust%2F&psig=AOvVaw1rwPS1TrQMe_5A_tVwDoCu&ust=1710166046672000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCJC4uNDu6YQDFQAAAAAdAAAAABAE",
            };

            addUserToDatabase(userData, uid);
        });
        setName("");
        setEmail("");
        setPass("");
        setSecondPass("");
        setOpenSignup(false);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="none hidden lg:flex md:items-center md:mx-12 md:my-16">
                <img src={leftAsset} alt="sign up asset" className="w-[120%]" />
                <div className="line mx-12 border border-[#D9D9D9] h-[130%]" />
            </div>
            <div className="mx-12 my-16">
                <h1 className="text-5xl pb-4 text-center text-primary-blue font-bold">
                    Đăng ký
                </h1>
                <h3 className="text-center pb-8 text-xl">
                    Tham gia vào cộng đồng GDSC-HUST
                </h3>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4 mt-4"
                >
                    <input
                        type="text"
                        placeholder="Tên gọi"
                        className="input border rounded-[10px]"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Tên đăng nhập/ tài khoản gmail"
                        className="input rounded-[10px]"
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
                    <input
                        type="password"
                        placeholder="Xác nhận mật khẩu"
                        className="input rounded-[10px]"
                        value={secondPass}
                        onChange={(e) => setSecondPass(e.target.value)}
                    />
                    <div className="flex flex-row items-center justify-between">
                        <a
                            className="underline underline-offset-4 text-primary-blue"
                            onClick={() => {
                                changeLogin(true);
                                setOpenSignup(false);
                            }}
                            style={{ cursor: "pointer" }}
                        >
                            Quay lại đăng nhập
                        </a>
                        <Button
                            onClick={handleSubmit}
                            className="bg-primary-blue px-4 py-0"
                        >
                            Đăng kí
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUpForm;
