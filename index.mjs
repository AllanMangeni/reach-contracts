import {loadstlib } from '@reach-sh/stdlib';
import * as backend from './build/index.main.mjs';
const stdlib = loadStdlib(process.env);

(async () => {
    const startingBalance = stdlib.parseCurrency(100);
    const accAlice = await stdlib.newTestAccount (startingBalance);
    const accBob = await stdlib.newTestAccount (startingBalance);

    const ctcAlice = accAlice.contract(backend);
    const ctcBob = await stdlib.newTestAccount(startingBalance);

    const HAND = ['Rock', 'Paper', 'Scissors'];
    const OUTCOME = ['Bob Wins', 'Draw', 'Alice Wins'];
    const Player = (Who) => ({
        getHand: () => {
            const hand = Math.floor(Math.random() * 3);
            console.log('${Who} played ${HAND[hand]}');
            return hand;
        },
        seeOutcome: (outcome) => {
            console.log('${Who} saw outcome ${OUTCOME[outcome]}');
        },
    });
    
    await Promise.all([
        ctcAlice.p.Alice({
            ...Player('Alice'),
        }),
        ctcBob.p.Bob({
            ...Player('Bob'),
        }),
    ]);
});