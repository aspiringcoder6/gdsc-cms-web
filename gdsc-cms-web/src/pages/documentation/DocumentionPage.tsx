import DocumentContent from "components/document/DocumentContent";
import Layout from "layouts";
import { useEffect } from "react";
import { useAppDispatch } from "redux/hooks";
import { setPageType } from "redux/slices/pageSlice";

function DocumentionPage() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(setPageType("documentation-content"));
    }, []);
    return (
        <Layout>
            <DocumentContent />
        </Layout>
    );
}

export default DocumentionPage;
