// tslint:disable:no-console

export const registerFirebaseMessage = async (firebase) => {
    if (!navigator || !navigator.serviceWorker) {
        return;
    }
    const { serviceWorker } = navigator;
    const serviceWorkerUrl = '/static/firebase-messaging-sw.js';
    const registration = await serviceWorker.register(serviceWorkerUrl);
    try {
        const messaging = firebase.messaging();
        messaging.useServiceWorker(registration);
        await messaging.requestPermission();

        console.log('Notification permission granted.');
        const token = await messaging.getToken();

        console.log(token);

        messaging.onMessage((payload) => {
            console.log(payload);
        });

    } catch (error) {
        console.log('Unable to get permission to notify.', error);
    }
};