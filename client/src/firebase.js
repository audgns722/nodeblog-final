import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAgjRN24w7ZF_TafTeQIYh6apxg_CgiKF8",
    authDomain: "huns-blog.firebaseapp.com",
    projectId: "huns-blog",
    storageBucket: "huns-blog.appspot.com",
    messagingSenderId: "145600671851",
    appId: "1:145600671851:web:76f58a4adea250d2c9812e"
};

firebase.initializeApp(firebaseConfig);

export default firebase;