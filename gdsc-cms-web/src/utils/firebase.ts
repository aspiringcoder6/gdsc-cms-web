// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
    getAuth,
    signInWithEmailAndPassword,
    signInWithRedirect,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: import.meta.env.VITE_APP_API_KEY,
    authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_APP_PROJECT_ID,
    storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_APP_ID,
    measurementId: import.meta.env.VITE_APP_MEASUREMENT_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Interface
export interface UserData {
    email: string;
    displayName: string;
    role: string;
    uid: string;
    photoURL: string;
}

// Firestore methods
export const addUserToDatabase = async (userData: UserData, uid: string) => {
    const usersRef = doc(db, "users", uid);
    await setDoc(usersRef, userData);
};

export const getUserData = async (
    userData: UserData,
    uid: string
): Promise<UserData | null> => {
    const usersRef = doc(db, "users", uid);
    const docSnap = await getDoc(usersRef);

    if (docSnap.exists()) {
        return docSnap.data() as UserData;
    } else {
        await setDoc(usersRef, userData);
        return userData;
    }
};

// Authentication methods
export const logInWithEmailAndPassword = async (
    email: string,
    password: string
) => {
    return await signInWithEmailAndPassword(auth, email, password);
};

export const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    return await signInWithRedirect(auth, provider);
};

export const signUpWithEmailAndPassword = async (
    email: string,
    password: string
) => {
    return await createUserWithEmailAndPassword(auth, email, password);
};

export const logOut = async () => {
    await auth.signOut();
};
