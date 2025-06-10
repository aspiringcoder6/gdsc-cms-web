import DocumentContainer from "components/document/DocumentContainer";
import TeamContainer from "components/document/TeamContainer";
import Layout from "layouts";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { fetchDocs } from "redux/slices/documentSlice";
// import { fetchDocs } from "redux/slices/documentSlice";
import { setPageType } from "redux/slices/pageSlice";

function Documentation() {
    const dispatch = useAppDispatch();
    const isLogin = useAppSelector((state) => state.user.isLoggedIn);
    useEffect(() => {
        isLogin && dispatch(fetchDocs());
    }, [isLogin]);

    useEffect(() => {
        dispatch(setPageType("documentation"));
    }, []);
    return (
        <Layout>
            <TeamContainer />
            <DocumentContainer />
        </Layout>
    );
}

export default Documentation;
