import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBIYflW6oNketZHTfOBRcqpjnRJyhqL2wE",
  authDomain: "duls-online-shop.firebaseapp.com",
  projectId: "duls-online-shop",
  storageBucket: "duls-online-shop.appspot.com",
  messagingSenderId: "299881195591",
  appId: "1:299881195591:web:bfc9eb88051821a01b2962",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
