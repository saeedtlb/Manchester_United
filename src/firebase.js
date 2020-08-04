import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDzbnc-gtoWWUbPl5ZOpYH31JEO2Cb6zAs',
  authDomain: 'man-utd-ded2c.firebaseapp.com',
  databaseURL: 'https://man-utd-ded2c.firebaseio.com',
  projectId: 'man-utd-ded2c',
  storageBucket: 'man-utd-ded2c.appspot.com',
  messagingSenderId: '177194897893',
  appId: '1:177194897893:web:6aa5379554387e48dc1f0c',
  measurementId: 'G-LRLDPQ4XTK',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

const database = firebase.database();
const firebaseMatches = database.ref('matches');
const firebasePromotions = database.ref('promotions');
const firebaseTeams = database.ref('teams');
const firebasePlayers = database.ref('players');

export {
  firebase,
  firebaseMatches,
  firebasePromotions,
  firebaseTeams,
  firebasePlayers,
  database,
};
