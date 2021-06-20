import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyB1kPHA8HjC71b8uTOdpwO4pnECsvvVJkE",
    authDomain: "iiitospi.firebaseapp.com",
    projectId: "iiitospi",
    storageBucket: "iiitospi.appspot.com",
    messagingSenderId: "681155402959",
    appId: "1:681155402959:web:99ad07ad114f463704ebba"
};

// Get a Firebase instance
firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GithubAuthProvider()

const usersCollection = db.collection('users')
const projectsCollection = db.collection('projects')

export {
    db,
    auth,
    provider,
    usersCollection,
    projectsCollection
}