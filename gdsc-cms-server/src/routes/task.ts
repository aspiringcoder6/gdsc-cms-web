import { Router} from "express";
import TaskService from "../services/task.service";
import UserService from "../services/user.service";

const router = Router();

// Get All Tasks
router.get("/get", TaskService.getTasks);

// Add a new task or update an existing task
router.post("/add", TaskService.add);

// Update an existing task by ID
router.put("/update/:id", TaskService.updateTask);

// Get a specific task by ID
router.get("/get/:id", TaskService.getTask);

// Add description for a task
router.post("/add/:id/description", TaskService.addDescription);

// Add comment for a task
router.post("/add/:id/comment", TaskService.addComment);

// Get comments for a specific task
router.get("/get/:taskId/comment", TaskService.getComments);

export default router;
