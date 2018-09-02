import { registerFirebaseMessage } from './firebaseMessage';

const firebase = require('firebase/app');

require('firebase/messaging');
require('firebase/database');

export const firebaseInit = () => {
    const config = {
        apiKey: 'AIzaSyD6zN2cN7Y3-bPfgC085qjib2toP2BQ3uY',
        authDomain: 'furnituremaker-eaafa.firebaseapp.com',
        databaseURL: 'https://furnituremaker-eaafa.firebaseio.com',
        projectId: 'furnituremaker-eaafa',
        storageBucket: 'furnituremaker-eaafa.appspot.com',
        messagingSenderId: '515981406117'
    };
    
    firebase.initializeApp(config);
    registerFirebaseMessage(firebase);
};

export const getFirebaseInstance = () => firebase;