// @ts-ignore
import { body, matchedData, validationResult } from "express-validator";
import { Request, Response } from "express";
import { auth } from "firebase-admin";
import { FirebaseError } from "firebase/app";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    query,
    setDoc,
    updateDoc,
} from "firebase/firestore";
import { UserProfileInterface } from "../model/User";
import firebase from "../utils/firebase";

const db = getFirestore(firebase);

/**
 *
 * Get all users \
 * Response a array of user records, each record contain uid, displayName, photoURL, email, role.
 *
 * @param req Request
 * @param res Response
 * @returns Response
 */

export async function getAllUsers(req: Request, res: Response) {
    const q = query(collection(db, "users"));
    const querySnapshot = await getDocs(q);

    const users = querySnapshot.docs.map((user) => {
        const data = user.data();
        return {
            uid: user.id,
            displayName: data.displayName,
            photoURL: data.photoURL,
            email: data.email,
            role: data.role,
        };
    });

    return res.send(users);
}

const makeDefaultProfile = async (uid: string) => {
    const user = await auth().getUser(uid); // try to get user info from firebase auth
    const defaultProfile: UserProfileInterface = {
        uid: user.uid,
        photoURL: user.photoURL || "",
        email: user.email || "",
        displayName: user.displayName || "",
        role: "member",
    };
    return defaultProfile;
};

export const createUserValidators = [
    body("uid").trim().isString().isLength({ max: 36 }),
    body("photoURL").trim().default("").isURL().optional(),
    body("email").trim().isEmail().isLength({ max: 200 }),
    body("displayName").trim().notEmpty().isString().isLength({ max: 100 }),
    body("role")
        .trim()
        .default("member")
        .isString()
        .isLength({ max: 100 })
        .optional(),
];

/**
 *
 * Create new user record if not exist \
 * Response created user record.
 *
 * @param req Request
 * @param res Response
 * @returns Response
 */

export async function createUser(req: Request, res: Response) {
    const uid = req.params.uid || req.body.uid;
    if (typeof uid != "string" && !uid) {
        return res.status(400).send("Bad Request");
    }

    const errorResult = validationResult(req);
    if (!errorResult.isEmpty()) {
        return res.status(400).send(errorResult);
    }

    const userDocRef = doc(db, "users", uid);
    const user = await getDoc(userDocRef);

    if (user.exists()) {
        return res.send(user.data());
    }

    const setData = { ...matchedData(req) };
    await setDoc(userDocRef, setData);
    return res.send(setData);
}

/**
 *
 * Get user profile \
 * If user does not has necessary properties, add default value to this record. \
 * Response a user record.
 *
 * @param req Request
 * @param res Response
 * @returns Response
 */

export async function getProfile(req: Request, res: Response) {
    const uid = req.params.uid;
    if (typeof uid != "string" && !uid) {
        return res.status(400).send("Bad Request");
    }

    const profileDocRef = doc(db, "users", uid);
    const profile = await getDoc(profileDocRef);
    const profileData = profile.data();

    // create new record if uid not exist
    if (!profile.exists()) {
        return res.status(404).send("Not Found");
    }

    // Check and add missing property in profile
    const neededProperties = ["photoURL", "email", "displayName", "role"];
    const missingProperties = neededProperties.filter(
        (key) => !profileData.hasOwnProperty(key)
    );
    if (missingProperties.length != 0) {
        try {
            const defaultProfile = await makeDefaultProfile(uid);
            const updateData = {};
            for (let key of missingProperties) {
                updateData[key] = defaultProfile[key];
            }
            await updateDoc(profileDocRef, updateData);
            return res.send({ ...profileData, ...updateData });
        } catch {
            return res.status(404).send("Not Found");
        }
    }

    return res.send(profile.data());
}

export const updateProfileValidators = [
    body("displayName")
        .trim()
        .notEmpty()
        .isString()
        .isLength({ max: 100 })
        .optional(),
    body("story").trim().isString().isLength({ max: 2000 }).optional(),
    body("email").trim().isEmail().isLength({ max: 100 }).optional(),
    body(["department", "sector", "role", "location"])
        .trim()
        .isString()
        .isLength({ max: 100 })
        .optional(),
    body("contact").trim().isString().isLength({ max: 2000 }).optional(),
    body(["linkGithub", "linkFacebook", "linkTiktok"])
        .trim()
        .isString()
        .isLength({ max: 100 })
        .optional(),
];

/**
 *
 * Update user profile \
 * Update user profile with validated and sanitized data
 * Response updated field.
 *
 * @param req Request
 * @param res Response
 * @returns Response
 */

export async function updateProfile(req: Request, res: Response) {
    const uid = req.params.uid;
    if (typeof uid != "string" && !uid) {
        return res.status(400).send("Bad Request");
    }

    const errorResult = validationResult(req);
    if (!errorResult.isEmpty()) {
        return res.status(400).send(errorResult);
    }

    const data = matchedData(req);
    const updateData = { ...data };
    const profileDocRef = doc(db, "users", uid);

    try {
        if (Object.keys(updateData).length != 0) {
            await updateDoc(profileDocRef, updateData);
        }
    } catch (err) {
        if (err instanceof FirebaseError && err.code == "not-found") {
            return res.status(400).send("Not found");
        }
        throw err;
    }

    return res.send(data);
}

export default {
    getAllUsers,
    getProfile,
    updateProfile,
    updateProfileValidators,
};
