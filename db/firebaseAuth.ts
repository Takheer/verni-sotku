import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import config from '~/db/firebaseConfig'

const BACKEND_URL = process.env.BACKEND_URL

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

async function createUserInDB(email: string, uuid: string) {
  console.log('createUserInDB')

  const res = await fetch(`${BACKEND_URL}/add-user`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user: {
        email,
        uuid,
        name: ''
      }
    }),
  })

  console.log({ res })

  return await res.json()
}

export async function registerNewUser(email: string, password: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(authentication, email, password)
    const userFromDB = await createUserInDB(email, userCredential.user.uid)
    const user = userCredential.user;
    return { user, userFromDB };

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
    return { user };

  } catch(error) {
    const errorCode = error.code;
    const errorMessage = error.message;

    return {errorCode, errorMessage};
  }
}
