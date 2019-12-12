import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBtRvH31_1Tdvkitq28X-H0FFkcsFUA4lw",
    authDomain: "crwn-db-fbb6a.firebaseapp.com",
    databaseURL: "https://crwn-db-fbb6a.firebaseio.com",
    projectId: "crwn-db-fbb6a",
    storageBucket: "crwn-db-fbb6a.appspot.com",
    messagingSenderId: "536513964819",
    appId: "1:536513964819:web:c7a7433bd59efb4d5f08e6"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })

        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;

}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;