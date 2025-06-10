import { Router } from "express";
import { createUser, createUserValidators, getAllUsers, getProfile, updateProfile, updateProfileValidators } from "../services/user.service";

const router = Router();

// Get all users
router.get("/all", getAllUsers);

// Create a user record
router.post("/", createUserValidators, createUser);

// Get profile for user with uid
router.get("/profile/:uid", getProfile);

// Update profile for user with uid
router.patch("/profile/:uid", updateProfileValidators, updateProfile);
router.post("/profile/:uid", updateProfileValidators, updateProfile); // Method for clients which cannot patch


export default router;
