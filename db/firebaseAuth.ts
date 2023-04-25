import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import config from '~/db/firebaseConfig'

const firebaseConfig = config;

const app = initializeApp(firebaseConfig);

export const authentication = getAuth(app);

onAuthStateChanged(authentication, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    // const uid = user.uid;
    // getUserData(uid);
  } else {
    // User is signed out
    // ...
  }
});

export async function createUser(email: string, password: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(authentication, email, password)
    const user = userCredential.user;

    localStorage.setItem('uid', user.uid)

    return { user };

  } catch(error) {
    const errorCode = error.code;
    const errorMessage = error.message;

    return {errorCode, errorMessage};
  }
}

export async function signIn(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(authentication, email, password)
    const user = userCredential.user;

    localStorage.setItem('uid', user.uid)

    return { user };

  } catch(error) {
    const errorCode = error.code;
    const errorMessage = error.message;

    return {errorCode, errorMessage};
  }
}

export function signOut() {
  localStorage.removeItem('uid');
}
