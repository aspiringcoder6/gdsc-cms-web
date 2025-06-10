import "./style.css";
import calendarIcon from "assets/documentation/calendar-icon.svg";
import userIcon from "assets/documentation/user-icon.svg";
import teamIcon from "assets/documentation/team-icon.svg";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { useEffect, useState } from "react";
import { getDocBySlug } from "redux/slices/documentSlice";
import { formatFirebaseDate } from "utils/date";
import ConstantText from "utils/ConstantText";

function DocumentContent() {
    const dispatch = useAppDispatch();
    const { docId } = useParams();
    const [content, setContent] = useState("");

    const docItem = useAppSelector((state) => state.documentation.curDoc);
    useEffect(() => {
        dispatch(getDocBySlug(docId));
    }, []);
    useEffect(() => {
        docItem && setContent(docItem.content);
    }, [docItem]);

    return (
        <div className="w-full max-w-4xl m-auto py-8 text-left">
            <h1 className="text-3xl font-semibold text-center">
                {docItem.title}
            </h1>
            <div className="flex gap-4 items-center mt-4 justify-center">
                <div className="flex gap-2 items-center">
                    <img src={calendarIcon} alt="date" />
                    <span className="text-primary-gray">
                        {formatFirebaseDate(
                            docItem?.createdDate?.seconds,
                            docItem?.createdDate?.nanoseconds
                        )}
                    </span>
                </div>
                <div className="flex gap-2 items-center">
                    <img src={userIcon} alt="author" />
                    <span className="text-primary-gray">Nguyễn Duy</span>
                </div>
                <div className="flex gap-2 items-center">
                    <img src={teamIcon} alt="team" />
                    <span className="text-primary-gray">
                        {ConstantText[docItem.team]}
                    </span>
                </div>
            </div>
            <div
                className="post_body mt-10"
                dangerouslySetInnerHTML={{ __html: content }}
            ></div>
        </div>
    );
}

export default DocumentContent;
