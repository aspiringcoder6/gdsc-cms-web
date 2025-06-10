import TextEditor from "components/text-editor";
import { Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { updateDoc } from "redux/slices/documentSlice";
import loadingIcon from "assets/loadinggif.gif";
import "react-toastify/dist/ReactToastify.css";

function UpdateModal({ isOpen, setOpen }) {
    const dispatch = useAppDispatch();
    const uid = useAppSelector((state) => state.user.info.uid);
    const isLoading = useAppSelector((state) => state.documentation.loading);
    const curDoc = useAppSelector((state) => state.documentation.curDoc);

    const [content, setContent] = useState(curDoc.content);
    const [title, setTitle] = useState(curDoc.title);
    const [team, setTeam] = useState<"developer" | "media" | "event">(
        curDoc.team
    );
    const [group, setGroup] = useState(curDoc.group);

    useEffect(() => {
        setContent(curDoc.content);
        setTitle(curDoc.title);
        setTeam(curDoc.team);
        setGroup(curDoc.group);
    }, [curDoc]);

    useEffect(() => {
        window.history.replaceState(
            null,
            document.title,
            "/documentation/" + curDoc?.slug
        );
    }, [curDoc?.slug]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(
                updateDoc({
                    id: curDoc.id,
                    uid: uid,
                    title: title,
                    team: team,
                    content: content,
                    group: group,
                })
            );
            toast.success("📝 Update Successfully");
            !isLoading && setOpen(false);
        } catch (error) {
            console.log("Error");
        }
    };
    return (
        <>
            <Modal
                dismissible
                size="2xl"
                show={isOpen}
                onClose={() => setOpen(false)}
            >
                <Modal.Body>
                    <h3 className="font-semibold text-xl flex items-center">
                        General{" "}
                        {isLoading && (
                            <img
                                src={loadingIcon}
                                alt="loading"
                                className="w-12"
                            />
                        )}
                    </h3>
                    <div className="flex flex-col gap-2 py-4">
                        <div className="justify-between">
                            <label
                                htmlFor="doc-title"
                                className="w-full inline-block"
                            >
                                Title
                            </label>
                            <input
                                id="doc-title"
                                type="text"
                                className="grow py-1 border-[#ccc] rounded-md w-full"
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
                            />
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-1/2">
                                <label
                                    htmlFor="doc-team"
                                    className="w-full inline-block"
                                >
                                    Team
                                </label>
                                <select
                                    name="team"
                                    id="doc-team"
                                    className="grow w-full py-1 border-[#ccc] rounded-md"
                                    value={team}
                                    onChange={(e) =>
                                        setTeam(
                                            e.target.value as
                                                | "developer"
                                                | "media"
                                                | "event"
                                        )
                                    }
                                >
                                    <option value="developer">Developer</option>
                                    <option value="media">Media</option>
                                    <option value="event">Event-PR-HR</option>
                                </select>
                            </div>
                            <div className="w-1/2">
                                <label
                                    htmlFor="doc-group"
                                    className="w-full inline-block"
                                >
                                    Group
                                </label>
                                <select
                                    name="group"
                                    id="doc-group"
                                    className="grow w-full py-1 border-[#ccc] rounded-md"
                                    onChange={(e) => setGroup(e.target.value)}
                                    value={group}
                                >
                                    <option value="convention">
                                        Quy trình & Convention
                                    </option>
                                    <option value="web">Web</option>
                                    <option value="mobile">Mobile</option>
                                    <option value="ai">AI</option>
                                    <option value="event">Event</option>
                                    <option value="pr">PR</option>
                                    <option value="hr">HR</option>
                                    <option value="content">Content</option>
                                    <option value="design">Design</option>
                                    <option value="photo">Photo</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <h3 className="font-semibold text-xl mb-4">Content</h3>
                    <TextEditor value={content} setValue={setContent} />
                    <div className="mt-4 flex justify-end">
                        <button
                            className="px-4 py-1 rounded-md bg-primary-blue text-white"
                            onClick={handleSubmit}
                        >
                            Update
                        </button>
                    </div>
                </Modal.Body>
            </Modal>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </>
    );
}

export default UpdateModal;
