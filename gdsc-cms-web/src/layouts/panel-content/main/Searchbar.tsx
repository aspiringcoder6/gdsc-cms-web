import addIcon from "assets/dashboard/add-icon.svg";
import modifyIcon from "assets/documentation/modify-icon.svg";
import searchIcon from "assets/dashboard/search-icon.svg";
import UploadModal from "components/document/UpLoadModal";
import { useState } from "react";
import { useAppSelector } from "redux/hooks";
import UpdateModal from "components/document/UpdateModal";
import CreateTaskModal from "components/task-manager/CreateTaskModal";

const Searchbar = () => {
    const pageType = useAppSelector((state) => state.page.pageType);
    const [isOpen, setOpen] = useState(false);

    const renderBtn = () => {
        switch (pageType) {
            case "task-manager":
                return (
                    <button
                        onClick={() => setOpen(true)}
                        className="text-primary-blue bg-primary-blue bg-opacity-10 rounded-2xl py-1 flex items-center justify-center px-4 hover:mb-1 hover:-mt-1 duration-100"
                    >
                        <img src={addIcon} alt="add" /> Create Task
                    </button>
                );
            case "documentation":
                return (
                    <button
                        onClick={() => setOpen(true)}
                        className="text-primary-blue bg-primary-blue bg-opacity-10 rounded-2xl py-1 flex items-center justify-center px-4 hover:mb-1 hover:-mt-1 duration-100"
                    >
                        <img src={addIcon} alt="add" /> New Upload
                    </button>
                );
            case "documentation-content":
                return (
                    <button
                        onClick={() => setOpen(true)}
                        className="text-primary-yellow bg-primary-yellow bg-opacity-10 rounded-2xl py-1 flex items-center justify-center px-4 gap-1 hover:mb-1 hover:-mt-1 duration-100"
                    >
                        <img src={modifyIcon} alt="add" className="w-5" />{" "}
                        Update Doc
                    </button>
                );
        }
    };

    const renderModal = () => {
        switch (pageType) {
            case "task-manager":
                return <CreateTaskModal isOpen={isOpen} setOpen={setOpen} />;
            case "documentation":
                return <UploadModal isOpen={isOpen} setOpen={setOpen} />;
            case "documentation-content":
                return <UpdateModal isOpen={isOpen} setOpen={setOpen} />;
        }
    };
    return (
        <div className="p-4 flex justify-between border-b">
            <div className="flex gap-4 items-center grow">
                <p className="flex items-center justify-center">
                    <img src={searchIcon} alt="search" />
                </p>
                <input
                    type="text"
                    placeholder="Search"
                    className="grow outline-none border-none"
                />
            </div>
            {renderBtn()}

            {renderModal()}
        </div>
    );
};

export default Searchbar;
