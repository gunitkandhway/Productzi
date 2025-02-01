import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBh9fuhpse5It9tzTjsLhAUYghsXOLI6oA",
  authDomain: "zensiblegunit.firebaseapp.com",
  projectId: "zensiblegunit",
  storageBucket: "zensiblegunit.firebasestorage.app",
  messagingSenderId: "1057088225485",
  appId: "1:1057088225485:web:1dbbcbfdba6219ae85e984"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut };
