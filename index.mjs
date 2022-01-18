import {loadstlib } from '@reach-sh/stdlib';
import * as backend from './build/index.main.mjs';
const stdlib = loadStdlib(process.env);

(async () => {
    const startingBalance = stdlib.parseCurrency(100);
    const accAlice = await stdlib.newTestAccount (startingBalance);
    const accBob = await stdlib.newTestAccount (startingBalance);

    const ctcAlice = accAlice.contract(backend);
    const ctcBob = await stdlib.newTestAccount(startingBalance);

    await Promise.all([
        ctcAlice.p.Alice({
            // implement Alice interact project here
        }),
        ctcBob.p.Bob({
            // implement Bob's interact object here
        }),
    ]);
})();