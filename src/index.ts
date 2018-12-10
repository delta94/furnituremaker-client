import { firebaseInit, startup } from './scripts';

firebaseInit();

startup();

if (module.hot) {
    module.hot.accept(['./scripts'], () => {
        // tslint:disable-next-line:no-string-literal
        const nextStartup = require('./scripts').startup;
        nextStartup();
    });
}

if (process.env.NODE_ENV === 'production') {
    if ('serviceWorker' in navigator) {
        const workerUrl = '/static/service-worker.js';
        const workerOptions = { scope: '/' };
        const loadServiceWorker = async () => {
            try {
                const registration = await navigator.serviceWorker.register(workerUrl, workerOptions);
                // tslint:disable-next-line:no-console
                console.info('SW registered: ', registration);
            } catch (registrationError) {
                // tslint:disable-next-line:no-console
                console.info('SW registration failed: ', registrationError);
            }
        };

        window.addEventListener('load', loadServiceWorker);
    }
}