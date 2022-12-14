import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const fireBaseConfig = process.env.firebaseConfig;

const firebaseApp = firebase.initializeApp(fireBaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const timestamp = firebase.firestore.FieldValue.serverTimestamp();

export { auth, provider, timestamp };
export default db;
