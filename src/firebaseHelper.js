import * as firebase from 'firebase/app';
import 'firebase/analytics';

const firebaseConfig = {
    apiKey: `${process.env.FIREBASE_APIKEY}`,
    authDomain: `${process.env.FIREBASE_AUTH_DOMAIN}`,
    databaseURL: `${process.env.FIREBASE_DATABASE_URL}`,
    projectId: `${process.env.FIREBASE_PROJECTID}`,
    storageBucket: `${process.env.FIREBASE_STORAGE_BUCKET}`,
    messagingSenderId: `${process.env.FIREBASE_MESSAGEID}`,
    appId: `${process.env.FIREBASE_APPID}`,
    measurementId: `${process.env.FIREBASE_MEASUREMENTID}`
};
let analytics = null;

export const firebaseInit = () => {
    if (process.env.NODE_ENV === 'production') {
        firebase.initializeApp(firebaseConfig);
        analytics = firebase.analytics();
    }
};

export const firebaseLogEvent = (formTitle) => {
    if (process.env.NODE_ENV === 'production' && analytics) {
        analytics.logEvent('form_submission', { name: formTitle });
    }
};
