// tslint:disable:no-console

let initialDataLoaded = false;
let notificationRef;

const notificationsRefUrl = 'https://furnituremaker-eaafa.firebaseio.com/notifications';

const getRef = (firebase) => {
    const firebaseDB = firebase.database();
    return firebaseDB.refFromURL(notificationsRefUrl);
};

const onRefChildAdded = (snapshot) => {
    if (!initialDataLoaded) {
        return;
    }

    const value = snapshot.val();
    console.log(value);
    // implement...
};

export const registerNotificationDatabasse = (firebase) => {
    notificationRef = getRef(firebase);
    notificationRef.on('child_added', onRefChildAdded);
    notificationRef.once('value').then((snapshot) => {
        initialDataLoaded = true;
    });
};

export const sendNotificationToFirebase = (ref, value) => {
    const notificationChildRef = notificationRef.child(`${ref}/notifications`);
    notificationChildRef.push()
        .set(value);
};