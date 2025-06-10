import { Modal } from "flowbite-react";
import SignUpForm from "./SignupForm";

function SignUp({ openSignup, setOpenSignup, changeLogin }) {
    return (
        <>
            <Modal
                size="5xl"
                show={openSignup}
                onClose={() => setOpenSignup(false)}
                className="hidden lg:flex"
            >
                <Modal.Header className="border-none pb-0"></Modal.Header>
                <Modal.Body>
                    <SignUpForm
                        setOpenSignup={setOpenSignup}
                        changeLogin={changeLogin}
                    />
                </Modal.Body>
            </Modal>
            {openSignup && (
                <div className="lg:hidden">
                    <SignUpForm
                        setOpenSignup={setOpenSignup}
                        changeLogin={changeLogin}
                    />
                </div>
            )}
        </>
    );
}

export default SignUp;
