import { TextInput } from "flowbite-react";
import { useState, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "redux/hooks";
import { addCommentByID, fetchCommentsById } from "redux/slices/taskSlice";
import { convertDateToSecondsAndNanos } from "utils/date";

import activity from "assets/task-manager/activity.svg";
import Comment from "./Comment";

export default function Activity({ userInfo, id, disabled = false }) {
    const dispatch = useAppDispatch();
    const comments = useAppSelector((state) => state.task.comments);
    const [commentValue, setCommentValue] = useState("");

    const handleAddComment = async () => {
        const commentData = {
            id: id,
            comment: commentValue,
            content: commentValue,
            uid: userInfo.uid,
            createdDate: convertDateToSecondsAndNanos(new Date()),
            user: userInfo,
        };
        await dispatch(addCommentByID(commentData));
        await dispatch(fetchCommentsById(id));
        setCommentValue("");
    };

    useEffect(() => {
        id && dispatch(fetchCommentsById(id));
    }, []);

    return (
        <>
            {/* Activity */}

            <div className="activity-header flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <img src={activity} alt="activity" />
                    <p className="text-[#172B4D] text-2xl">Activity</p>
                </div>
                <div className="p-2 bg-[#091e420f] rounded-[3px] hover:border hover:border-[#44546F] hover:font-semibold transition-all ">
                    <button className="text-[#44546F]">Show details</button>
                </div>
            </div>

            {/* Comments */}

            <div className="pb-4">
                <div className="input flex gap-2 items-center py-4">
                    <img
                        src={userInfo.photoURL}
                        alt="user avatar"
                        className="w-10 h-10 object-cover rounded-full"
                    />

                    <form
                        className="w-full"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleAddComment();
                        }}
                    >
                        <TextInput
                            className="text-md text-[#44546F] font-semibold w-full"
                            placeholder={"Add a comment..."}
                            value={commentValue}
                            onChange={(e) => setCommentValue(e.target.value)}
                            disabled={disabled}
                        />
                    </form>
                </div>

                {comments.map((comment, index) => {
                    return <Comment data={comment} key={index} />;
                })}
            </div>
        </>
    );
}
