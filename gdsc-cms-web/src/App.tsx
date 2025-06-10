import { onAuthStateChanged } from "firebase/auth";
import Dashboard from "pages/Dashboard";
import Home from "pages/Home";
import Documentation from "pages/documentation";
import DocumentionPage from "pages/documentation/DocumentionPage";
import TaskManager from "pages/TaskManager";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAppDispatch } from "redux/hooks";
import { loginUser, logoutUser } from "redux/slices/userSlice";
import { auth, getUserData } from "utils/firebase";

function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const { uid, displayName, email, photoURL } = user;
                const userData = {
                    email: email,
                    displayName: displayName,
                    role: "member",
                    uid: uid,
                    photoURL: photoURL,
                };
                const result = getUserData(userData, uid);
                dispatch(
                    loginUser({
                        uid,
                        displayName: (await result).displayName,
                        email,
                        photoURL,
                        role: (await result).role,
                    })
                );
            } else {
                dispatch(logoutUser());
            }
        });
    }, [auth]);
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/task-manager" element={<TaskManager />} />
                <Route
                    path="/documentation/team/:teamId"
                    element={<Documentation />}
                />
                <Route
                    path="/documentation/:docId"
                    element={<DocumentionPage />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
