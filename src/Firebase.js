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
const firebaseClubTeams = firebaseDB.ref('clubTeams');
const firebaseLeaguePostions = firebaseDB.ref('leaguePositions');
const firebaseChampionshipPostions = firebaseDB.ref('championshipPositions');

// const clubs = [
//     { key: 'Please Select a Club', value: '' },
//     { key: 'No Meath Club Affiliation', value: 'No Meath Club Affiliation' },
//     { key: 'Ballinabrackey', value: 'Ballinabrackey' },
//     { key: 'Ballinlough', value: 'Ballinlough' },
//     { key: 'Ballivor', value: 'Ballivor' },
//     { key: 'Bective', value: 'Bective' },
//     { key: 'Blackhall Gaels', value: 'Blackhall Gaels' },
//     { key: 'Boardsmill', value: 'Boardsmill' },
//     { key: 'Carnaross', value: 'Carnaross' },
//     { key: 'Castletown', value: 'Castletown' },
//     { key: 'Clann na nGael', value: 'Clann na nGael' },
//     { key: 'Clonard', value: 'Clonard' },
//     { key: 'Cortown', value: 'Cortown' },
//     { key: 'Curraha', value: 'Curraha' },
//     { key: 'Donaghmore/Ashbourne', value: 'Donaghmore/Ashbourne' },
//     { key: 'Drumbaragh Emmett’s', value: 'Drumbaragh Emmett’s' },
//     { key: 'Drumconrath', value: 'Drumconrath' },
//     { key: 'Drumree', value: 'Drumree' },
//     { key: 'Duleek/Bellewstown', value: 'Duleek/Bellewstown' },
//     { key: 'Dunderry', value: 'Dunderry' },
//     { key: 'Dunsany', value: 'Dunsany' },
//     { key: 'Dunshaughlin', value: 'Dunshaughlin' },
//     { key: 'Gaeil Colmcille', value: 'Gaeil Colmcille' },
//     { key: 'Kilbride', value: 'Kilbride' },
//     { key: 'Kildalkey', value: 'Kildalkey' },
//     { key: 'Killyon', value: 'Killyon' },
//     { key: 'Kilmainham', value: 'Kilmainham' },
//     { key: 'Kilmainhamwood', value: 'Kilmainhamwood' },
//     { key: 'Kilmessan', value: 'Kilmessan' },
//     { key: 'Kilskyre', value: 'Kilskyre' },
//     { key: 'Kiltale', value: 'Kiltale' },
//     { key: 'Longwood', value: 'Longwood' },
//     { key: 'Meath Hill', value: 'Meath Hill' },
//     { key: 'Moylagh', value: 'Moylagh' },
//     { key: 'Moynalty', value: 'Moynalty' },
//     { key: 'Moynalvey', value: 'Moynalvey' },
//     { key: 'Na Fianna', value: 'Na Fianna' },
//     { key: 'Nobber', value: 'Nobber' },
//     { key: 'Oldcastle', value: 'Oldcastle' },
//     { key: 'O’Mahony’s', value: 'O’Mahony’s' },
//     { key: 'Rathkenny', value: 'Rathkenny' },
//     { key: 'Rathmolyon', value: 'Rathmolyon' },
//     { key: 'Ratoath', value: 'Ratoath' },
//     { key: 'Round Towers', value: 'Round Towers' },
//     { key: 'Seneschalstown', value: 'Seneschalstown' },
//     { key: 'Simonstown Gaels', value: 'Simonstown Gaels' },
//     { key: 'Skryne', value: 'Skryne' },
//     { key: 'Slane', value: 'Slane' },
//     { key: 'St. Brigid’s', value: 'St. Brigid’s' },
//     { key: 'St. Colmcille’s', value: 'St. Colmcille’s' },
//     { key: 'St. Mary’s', value: 'St. Mary’s' },
//     { key: 'St. Michael’s', value: 'St. Michael’s' },
//     { key: 'St. Patrick’s', value: 'St. Patrick’s' },
//     { key: 'St. Paul’s', value: 'St. Paul’s' },
//     { key: 'St. Peter’s, Dunboyne', value: 'St. Peter’s, Dunboyne' },
//     { key: 'St. Ultan’s', value: 'St. Ultan’s' },
//     { key: 'St. Vincent’s', value: 'St. Vincent’s' },
//     { key: 'Summerhill', value: 'Summerhill' },
//     { key: 'Syddan', value: 'Syddan' },
//     { key: 'Trim', value: 'Trim' },
//     { key: 'Walterstown', value: 'Walterstown' },
//     { key: 'Wolfe Tones', value: 'Wolfe Tones' }
// ]

// const championshipPositionsRef = firebaseChampionshipPostions.push();
// championshipPositionsRef.set({
//     team: 'Meath',
//     p: '3',
//     w: '0',
//     d: '0',
//     l: '3',
//     diff: '-26',
//     pts: '0'
// });

// const countyTeamsRef = firebaseCountyTeams.push();
// countyTeamsRef.set({
//     name: 'Kerry',
//     nickName: 'The Kingdom'
// })

// console.log(firebaseFans);

export {
    firebase,
    firebaseDB,
    firebaseMatches,
    firebasePlayers,
    firebaseFanzone,
    firebaseCountyTeams,
    firebaseClubTeams,
    firebaseLeaguePostions,
    firebaseChampionshipPostions
};