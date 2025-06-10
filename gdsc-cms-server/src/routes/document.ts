import { Router } from "express";
import documentService from "../services/document.service";
import multer from "multer";

const router = Router();
const upload = multer();
router.post("/add", documentService.add);
router.put("/update/:id", documentService.update);
router.get("/get/:slug", documentService.getBySlug);
router.get("/get", documentService.get);

export default router;
