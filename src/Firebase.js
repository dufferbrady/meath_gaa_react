import firebase from 'firebase/app'
import 'firebase/app'
import 'firebase/database'

const config = {
    apiKey: "AIzaSyARad3SaGe-ghTfKkfbIe_gmWHVsVwpdsI",
    authDomain: "meath-gaa-767d7.firebaseapp.com",
    databaseURL: "https://meath-gaa-767d7.firebaseio.com",
    projectId: "meath-gaa-767d7",
    storageBucket: "meath-gaa-767d7.appspot.com",
    messagingSenderId: "419865006551"
};

firebase.initializeApp(config);

export const firebaseDB = firebase.database();

firebaseDB.ref('matches').once('value').then(snapshot => {
    console.log(snapshot)
});