import firebase from 'firebase/app'
import 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'

const config = {
    apiKey: "AIzaSyAApdR2vYTpPNA-Olw8_2-aCyUAoH6PgJE",
    authDomain: "arsenal-238a8.firebaseapp.com",
    databaseURL: "https://arsenal-238a8.firebaseio.com",
    projectId: "arsenal-238a8",
    storageBucket: "arsenal-238a8.appspot.com",
    messagingSenderId: "1058011365061"
};

firebase.initializeApp(config);

const firebaseDB = firebase.database();
const firebaseMatches = firebaseDB.ref('matches');
const firebasePromotions = firebaseDB.ref('promotions');
const firebaseTeams = firebaseDB.ref('teams');
const firebasePlayers = firebaseDB.ref('players');

export {
    firebase,
    firebaseMatches,
    firebasePromotions,
    firebaseTeams,
    firebasePlayers,
    firebaseDB
}