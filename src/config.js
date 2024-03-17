import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
    setDoc,
    doc,
} from "firebase/firestore";

import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// only passing email and pass from Login component and with the help of auth using signIn function provided by firebase to login
const logInWithEmailAndPassword = async (email, password) => {
    try {
        const response = await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        if (err.code === 'auth/invalid-credential') {
            throw new Error('Invalid credentials');
        } else {
            throw e;
        }
    }
}

// register user into auth and add extra info about user 
const registerWithEmailAndPassword = async (userInfo) => {
    try {
        const { firstName, lastName, displayName, email, pass: password, avatar } = userInfo;

        // Check if the display name already exists
        const displayNameQuery = query(collection(db, "users"), where("displayName", "==", displayName));
        const displayNameSnapshot = await getDocs(displayNameQuery);
        if (!displayNameSnapshot.empty) {
            throw new Error("Display name should be unique");
        }

        const response = await createUserWithEmailAndPassword(auth, email, password);
        const user = response.user;

        let avatarURL = null;
        if (avatar) {
            avatarURL = await uploadAvatar(displayName, avatar);
        }

        await updateProfile(user, {
            displayName,
            photoURL: avatarURL,
        });

        await addDoc(collection(db, "users"), {
            uid: user.uid,
            firstName,
            lastName,
            displayName,
            photoURL: avatarURL,
            authProvider: "local",
            email,
        });

        await setDoc(doc(db, 'userChats', user.uid), {})
    } catch (e) {
        // alert(e.message);
        console.error(e);
        if (e.code === 'auth/username-already-exists') {
            throw new Error('Display name is already in use');
        } else if (e.code === 'auth/email-already-in-use') {
            throw new Error('Email already in use');
        } else if (e.code === 'auth/invalid-email') {
            throw new Error('Invalid email');
        }
        else {
            throw e;
        }
    }
}

const uploadAvatar = async (displayName, avatarFile) => {
    const storageRef = ref(storage, `avatars/${displayName}`);

    // Upload the file
    await uploadBytes(storageRef, avatarFile);

    // Get the download URL
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;

};

const logoutHandler = async () => {
    try {
        await signOut(auth);
    } catch (e) {
        console.log(e.message);
    }
}

export { auth, db, storage, logInWithEmailAndPassword, registerWithEmailAndPassword, logoutHandler };