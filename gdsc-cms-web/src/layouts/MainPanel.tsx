import Searchbar from "./panel-content/main/Searchbar";

const MainPanel = ({ children, switchBg = false }) => {
    return (
        <div className="flex-grow text-center hide-vertical-scrollbar">
            <Searchbar />
            <div
                className={`p-4 h-dashboard overflow-y-auto ${
                    switchBg ? "bg-[#F7F9FD]" : "bg-[#FFF]"
                }`}
            >
                {children}
            </div>
        </div>
    );
};

export default MainPanel;
