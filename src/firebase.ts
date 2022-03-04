import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDx7osgMpbdLZCIZhLcDz6987eG-UzIsa0",
  authDomain: "flordle.firebaseapp.com",
  projectId: "flordle",
  storageBucket: "flordle.appspot.com",
  messagingSenderId: "383898477798",
  appId: "1:383898477798:web:e1aa0705e4943298308727",
  measurementId: "G-PSPJZ898RT"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics();
export const log = (eventName: any, eventParams: any) => logEvent(analytics, eventName, eventParams)

