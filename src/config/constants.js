import firebase from 'firebase';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

// Required for side-effects
require('firebase/firestore');


const config = {
  apiKey: "AIzaSyDxTHToo3r_gAW6sB1rX4E04AkCimwB-WU",
  authDomain: "examen1-2c002.firebaseapp.com",
  databaseURL: "https://examen1-2c002.firebaseio.com",
  projectId: "examen1-2c002",
  storageBucket: "examen1-2c002.appspot.com",
  messagingSenderId: "785410627840"
};

var fire = firebase.initializeApp(config);


const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/dashboard',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  
};

export const db = firebase.firestore();
export const database = firebase.database();
export const firebaseAuth = firebase.auth;
export const firebaseUI = uiConfig;
export default fire;
//export const provider = new.firebase.GoogleAuthProvider();
