import { Request, Response } from "express";
import firebase from "../utils/firebase";
import {
    getFirestore,
    collection,
    doc,
    getDoc,
    getDocs,
    updateDoc,
    setDoc,
    query,
    orderBy,
    arrayUnion,
    serverTimestamp,
} from "firebase/firestore";
import { Comment, Task, User } from "../model/Tasks";

const db = getFirestore(firebase);

class TaskService {
    constructor() {}
    //Create and Update Tasks
    async add(req: Request, res: Response) {
        try {
            const newTask = req.body as Task;
            const { assigner, assignees } = req.body;
            const assignerDoc = await getDoc(doc(db, "users", assigner));
            if (!assignerDoc.exists()) {
                return res.status(404).json("Assigner not found");
            }

            const assigneesDocs = await Promise.all(
                assignees.map(async (assignee) => {
                    const assigneeDoc = await getDoc(
                        doc(db, "users", assignee)
                    );
                    if (!assigneeDoc.exists()) {
                        return null;
                    }
                    return assigneeDoc.data();
                })
            );

            const newTaskRef = doc(collection(db, "tasks"));
            const createdTimestamp = serverTimestamp();

            await setDoc(newTaskRef, {
                ...newTask,
                id: newTaskRef.id,
                createdDate: createdTimestamp,
                assigner: assignerDoc.data(),
                assignees: assigneesDocs.filter(
                    (assignee) => assignee !== null
                ),
            });

            res.send({
                message: "Task added successfully!",
                taskId: newTaskRef.id,
            });
        } catch (error) {
            console.error("Error adding task:", error);
            res.status(500).send("Failed to add task");
        }
    }

    async updateTask(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const updatedTask = req.body as Task;
            const taskDoc = await getDoc(doc(db, "tasks", id));
            if (!taskDoc.exists()) {
                return res.status(404).json("Task not found");
            }
            //Check if the task document has new fields
            const taskData = taskDoc.data() as Task;
            const { assigner, assignees } = taskData;
            if (
                !("title" in taskData) ||
                !("description" in taskData) ||
                !("dueDate" in taskData)
            ) {
                //update document to include fields
                await updateDoc(doc(db, "tasks", id), {
                    title: updatedTask.title || "",
                    description: updatedTask.description || "",
                    dueDate: updatedTask.dueDate,
                });
            }

            const assignerDoc = await getDoc(doc(db, "users", assigner.uid));
            if (!assignerDoc.exists()) {
                return res.status(404).json("Assigner not found");
            }
            const assigneesDocs = await Promise.all(
                assignees.map(async (assignee) => {
                    const assigneeDoc = await getDoc(
                        doc(db, "users", assignee.uid)
                    );
                    if (!assigneeDoc.exists()) {
                        return null;
                    }
                    return assigneeDoc.data();
                })
            );
            await updateDoc(doc(db, "tasks", id), {
                ...updatedTask,
                assigner: assignerDoc.data(),
                assignees: assigneesDocs.filter(
                    (assignee) => assignee !== null
                ),
            });

            res.send("Task updated successfully!");
        } catch (error) {
            console.error("Error updating task:", error);
            res.status(500).send("Failed to update task");
        }
    }

    //Get All Tasks
    async getTasks(req: Request, res: Response) {
        try {
            const q = query(
                collection(db, "tasks"),
                orderBy("createdDate", "desc")
            );
            const querySnapshot = await getDocs(q);
            const tasks = querySnapshot.docs.map((doc) => doc.data());
            res.json(tasks);
        } catch (error) {
            console.error("Error getting tasks:", error);
            res.status(500).send("Failed to get tasks");
        }
    }

    //Get One Task
    async getTask(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const taskDoc = await getDoc(doc(db, "tasks", id));
            if (!taskDoc.exists()) {
                return res.status(404).json("Task not found");
            }
            const taskData = taskDoc.data();
            res.json(taskData);
        } catch (error) {
            console.error("Error getting task:", error);
            res.status(500).send("Failed to get task");
        }
    }

    //Add Description
    async addDescription(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { description } = req.body;
            // Retrieve the task document
            const taskRef = doc(db, "tasks", id);
            const taskDoc = await getDoc(taskRef);
            if (!taskDoc.exists()) {
                return res.status(404).json("Task not found");
            }

            await updateDoc(taskRef, {
                description: arrayUnion(description),
            });

            res.send("Description added successfully");
        } catch (error) {
            console.error("Error adding description:", error);
            res.status(500).send("Failed to add description");
        }
    }

    async addComment(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { uid, content } = req.body; // Include uid in the request

            const taskRef = doc(db, "tasks", id);
            const taskDoc = await getDoc(taskRef);
            if (!taskDoc.exists()) {
                return res.status(404).json("Task not found");
            }

            const comment: Comment = {
                uid: uid,
                content: content,
                createdDate: new Date(),
            };

            await updateDoc(taskRef, {
                comments: arrayUnion(comment),
            });

            res.send("Comment added successfully");
        } catch (error) {
            console.error("Error adding comment:", error);
            res.status(500).send("Failed to add comment");
        }
    }

    async getComments(req: Request, res: Response) {
        try {
            const { taskId } = req.params;

            // Retrieve the task document
            const taskRef = doc(db, "tasks", taskId);
            const taskDoc = await getDoc(taskRef);
            if (!taskDoc.exists()) {
                return res.status(404).json("Task not found");
            }

            const taskData = taskDoc.data() as Task;
            const comments = taskData.comments || [];

            const commentsWithUserInfo = await Promise.all(
                comments.map(async (comment: string | Comment) => {
                    if (typeof comment === "string") {
                        // If comment is just a string, return it as is
                        return {
                            content: comment,
                            createdDate: new Date(),
                        };
                    } else {
                        // Fetch user information using the UID
                        const userRef = doc(db, "users", comment.uid);
                        const userDoc = await getDoc(userRef);
                        if (userDoc.exists()) {
                            const userData = userDoc.data() as User;
                            return {
                                user: userData,
                                content: comment.content,
                                createdDate: comment.createdDate,
                            };
                        } else {
                            // If user not found, return basic comment information
                            return {
                                content: comment.content,
                                createdDate: comment.createdDate,
                            };
                        }
                    }
                })
            );

            res.json(commentsWithUserInfo);
        } catch (error) {
            console.error("Error getting comments:", error);
            res.status(500).send("Failed to get comments");
        }
    }
}

export default new TaskService();
