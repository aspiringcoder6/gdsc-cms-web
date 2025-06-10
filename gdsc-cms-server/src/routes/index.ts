import { Express } from "express";
import documentRouter from "./document";
import taskRouter from "./task";
import userRouter from "./user";

function route(app: Express) {
    app.use("/api/document", documentRouter);
    app.use("/api/task", taskRouter);
    app.use("/api/user", userRouter);
}

export default route;
