// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey:
		import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: "ziggo-estate.firebaseapp.com",
	projectId: "ziggo-estate",
	storageBucket: "ziggo-estate.appspot.com",
	messagingSenderId: "688778467606",
	appId:
		"1:688778467606:web:693e183561d89ebd591837",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
