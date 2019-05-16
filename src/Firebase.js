import firebase from 'firebase/app'
import 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'

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
const firebaseFanzone = firebaseDB.ref('fanzone');
const firebaseCountyTeams = firebaseDB.ref('countyTeams');

// const newCountyTeamRef = firebaseCountyTeams.push();
// newCountyTeamRef.set({
//     name: 'Wicklow',
//     nickName: "The Garden County"
// });

// console.log(firebaseFans);

export { 
    firebase,
    firebaseDB,
    firebaseMatches,
    firebasePlayers,
    firebaseFanzone,
    firebaseCountyTeams
};