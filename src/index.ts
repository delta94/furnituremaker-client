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