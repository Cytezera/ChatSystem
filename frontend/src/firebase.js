import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/app"; 
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = { 
	apikey : process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain : process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	projectId : process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket : process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId : process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId : process.env.REACT_APP_FIREBASE_APP_ID 	
	measurementID : process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFireStore(app);

export { auth, db } ;
