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



const firebaseDB = firebase.database();
const firebaseMatches = firebaseDB.ref('matches');
const firebasePlayers = firebaseDB.ref('players');

// const newPlayerRef = firebasePlayers.push();
// newPlayerRef.set({
//     name: "James McEntee",
//     position: "Wing Back",
//     club: "Curragha",
//     image: "http://meath.gaa.ie/wp-content/uploads/2017/06/McEntee_James_631.png"
// });

// console.log(firebasePlayers);

export { 
    firebaseMatches,
    firebasePlayers
};