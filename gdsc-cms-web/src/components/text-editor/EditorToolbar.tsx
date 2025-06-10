// Undo and redo functions for Custom Toolbar
function undoChange() {
    this.quill.history.undo();
}
function redoChange() {
    this.quill.history.redo();
}

// Modules object for setting up the Quill editor
export const modules = {
    toolbar: {
        container: "#toolbar",
        handlers: {
            undo: undoChange,
            redo: redoChange,
        },
    },
    history: {
        delay: 500,
        maxStack: 100,
        userOnly: true,
    },
};

// Formats objects for setting up the Quill editor
export const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "align",
    "strike",
    "script",
    "blockquote",
    "background",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "code-block",
];

// Quill Toolbar component
export const QuillToolbar = () => (
    <div id="toolbar">
        <span className="ql-formats !ml-0">
            <select className="ql-header" defaultValue="3">
                <option value="3">Normal</option>
                <option value="1">Heading 1</option>
                <option value="2">Heading 2</option>
                <option value="4">Heading 3</option>
                <option value="5">Heading 4</option>
                <option value="6">Heading 5</option>
            </select>
        </span>
        <span className="w-[1px] bg-secondary-gray h-7 align-middle inline-block"></span>
        <span className="ql-formats">
            <button className="ql-bold" />
            <button className="ql-italic" />
            <button className="ql-underline" />
        </span>
        <span className="w-[1px] bg-secondary-gray h-7 align-middle inline-block"></span>
        <span className="ql-formats">
            <button className="ql-list" value="ordered" />
            <button className="ql-list" value="bullet" />
            <button className="ql-indent" value="-1" />
            <button className="ql-indent" value="+1" />
        </span>
        <span className="w-[1px] bg-secondary-gray h-7 align-middle inline-block"></span>
        <span className="ql-formats">
            <button className="ql-link" />
            <button className="ql-image" />
        </span>
        <span className="w-[1px] bg-secondary-gray h-7 align-middle inline-block"></span>
        <span className="ql-formats">
            <button className="ql-code-block" />
            <button className="ql-blockquote" />
        </span>
    </div>
);

export default QuillToolbar;
