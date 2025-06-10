import { Request, Response } from "express";
import firebase from "../utils/firebase";
import slugify from "slugify";
import {
    getFirestore,
    collection,
    doc,
    addDoc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    setDoc,
    serverTimestamp,
    query,
    orderBy,
    where,
    or,
} from "firebase/firestore";
import Document from "../model/Document";

const db = getFirestore(firebase);
class DocumentService {
    async add(req: Request, res: Response) {
        const newDocument = req.body;
        const newDocRef = doc(collection(db, "documents"));
        await setDoc(newDocRef, {
            ...newDocument,
            id: newDocRef.id,
            createdDate: serverTimestamp(),
            slug: slugify(newDocument.title, {
                replacement: "-", // replace spaces with replacement character, defaults to `-`
                remove: undefined, // remove characters that match regex, defaults to `undefined`
                lower: true, // convert to lower case, defaults to `false`
                strict: false, // strip special characters except replacement, defaults to `false`
                locale: "vi", // language code of the locale to use
                trim: true, // trim leading and trailing replacement chars, defaults to `true`
            }),
        });
        res.send("add successfully!");
    }

    async get(req: Request, res: Response) {
        const q = query(
            collection(db, "documents"),
            orderBy("createdDate", "desc")
        );
        const queryDocument = await getDocs(q);
        const result = [];
        queryDocument.forEach((doc) => {
            result.push(doc.data());
        });
        res.json(result);
    }

    async getBySlug(req: Request, res: Response) {
        const { slug } = req.params;
        const q = query(
            collection(db, "documents"),
            or(where("slug", "==", slug), where("id", "==", slug))
        );
        const queryDocument = await getDocs(q);
        queryDocument.forEach((doc) => {
            res.json(doc.data());
        });
    }

    async update(req: Request, res: Response) {
        const updateBody = req.body;
        const { id } = req.params;
        const documentRef = doc(db, "documents", id);
        await updateDoc(documentRef, {
            ...updateBody,
            updatedDate: serverTimestamp(),
            slug: slugify(updateBody.title, {
                replacement: "-", // replace spaces with replacement character, defaults to `-`
                remove: undefined, // remove characters that match regex, defaults to `undefined`
                lower: true, // convert to lower case, defaults to `false`
                strict: false, // strip special characters except replacement, defaults to `false`
                locale: "vi", // language code of the locale to use
                trim: true, // trim leading and trailing replacement chars, defaults to `true`
            }),
        });
        const newDocData = await getDoc(documentRef);
        if (newDocData.exists()) res.json(newDocData.data());
        else res.send("Update failed");
    }
}

export default new DocumentService();
