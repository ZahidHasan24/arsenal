import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyAApdR2vYTpPNA-Olw8_2-aCyUAoH6PgJE",
  authDomain: "arsenal-238a8.firebaseapp.com",
  databaseURL: "https://arsenal-238a8.firebaseio.com",
  projectId: "arsenal-238a8",
  storageBucket: "arsenal-238a8.appspot.com",
  messagingSenderId: "1058011365061",
};

firebase.initializeApp(config);

const firebaseDB = firebase.firestore();
const firebaseMatches = firebaseDB.collection("matches");
const firebasePromotions = firebaseDB.collection("promotions");
const firebaseTeams = firebaseDB.collection("teams");
const firebasePlayers = firebaseDB.collection("players");
const firebasePositions = firebaseDB.collection("positions");

export {
  firebase,
  firebaseMatches,
  firebasePromotions,
  firebaseTeams,
  firebasePlayers,
  firebaseDB,
  firebasePositions,
};
