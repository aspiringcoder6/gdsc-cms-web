import { Modal } from "flowbite-react";
import LoginForm from "./LoginForm";

function Login({ openLogin, setOpenLogin, changeSignUp }) {
    return (
        <>
            <Modal
                size="lg"
                show={openLogin}
                onClose={() => setOpenLogin(false)}
                className="hidden lg:flex"
            >
                <Modal.Header className="border-none pb-0"></Modal.Header>
                <Modal.Body>
                    <LoginForm
                        setOpenLogin={setOpenLogin}
                        changeSignUp={changeSignUp}
                    />
                </Modal.Body>
            </Modal>
            {openLogin && (
                <div className="lg:hidden">
                    <LoginForm
                        setOpenLogin={setOpenLogin}
                        changeSignUp={changeSignUp}
                    />
                </div>
            )}
        </>
    );
}

export default Login;
