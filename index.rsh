'reach 0.1';

const player = {
  getHand: Fun([], UInt),
  seeOutcome: Fun([UInt], Null),
};

export const main = Reach.App(() => {
  const Alice = Participant('Alice', {
    ...player,
  });
  const Bob   = Participant('Bob', {
   ...player
  });
  init();
  
 Alice.only(() => {
   const handAlice = declassify(interact.getHand());
});
Alice.publish(handAlice);
commit();

Bob.only(() = {
  const handBob = declassify(interact.getHand());
});
Bob.publish(handBob);

const outcome = (handAlice + (4 + handBob)) % 3;
commit();

each([Alice, Bob], () => {
  interact.seeOutcome(outcome);
});
});