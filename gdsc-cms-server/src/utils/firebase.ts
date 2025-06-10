import { initializeApp } from "firebase/app";
import config from "../config/db";

const firebase = initializeApp(config.firebaseConfig);

export default firebase;
