import ReactQuill from "react-quill";
// import { useAppDispatch } from "redux/hooks";
import "react-quill/dist/quill.snow.css";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "./style.css";
import { useState } from "react";

function TextEditor({ value, setValue }) {
    const [isFocus, setFocus] = useState(false);
    // const dispatch = useAppDispatch();
    // const toolbarOptions = [
    //     ["bold", "italic", "underline"], // toggled buttons
    //     [{ list: "ordered" }, { list: "bullet" }],
    //     ["link", "image"], // remove formatting button
    // ];
    return (
        <div
            className={`w-full border-2 border-transparent ${
                isFocus ? "border-primary-blue rounded-md" : ""
            }`}
        >
            <EditorToolbar />
            <ReactQuill
                theme="snow"
                value={value}
                tabIndex={2}
                className="w-full"
                onChange={(content) => {
                    setValue(content);
                }}
                modules={modules}
                formats={formats}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
            />
        </div>
    );
}

export default TextEditor;
