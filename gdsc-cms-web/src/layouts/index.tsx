import LeftPanel from "layouts/LeftPanel";
import MainPanel from "layouts/MainPanel";
import RightPanel from "layouts/RightPanel";
import { getFromLocalStorage, setToLocalStorage } from "helper/localStorage";
import { useEffect, useState } from "react";

function Layout({ children, switchBg = false }) {
    const [isOpen, setIsOpen] = useState(getFromLocalStorage("isOpen", true));

    const toggleLeftPanel = () => setIsOpen(!isOpen);

    useEffect(() => {
        setToLocalStorage("isOpen", isOpen);
    }, [isOpen]);

    return (
        <div className="md:flex h-screen">
            <LeftPanel isOpen={isOpen} toggleLeftPanel={toggleLeftPanel} />
            <MainPanel switchBg={switchBg}>{children}</MainPanel>
            <RightPanel />
        </div>
    );
}

export default Layout;
