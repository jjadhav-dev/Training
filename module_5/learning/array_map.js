/*
    MAP:-
      eturns a NEW array. Does not modify the original.

    Syantax:

      array.map((item, index) => {
        return transformedItem;
      });

*/
//list of bets:

const bets = [
  { player: "Jayesh", amount: 100 },
  { player: "Arpit", amount: 250 },
  { player: "Ram", amount: 150 }
];

// add a bonus of 10% to each bet amount.
const newUpdatedBets = bets.map((i)=>{
  return {...i,bonus_ammount:i.amount*0.10}
})
console.log(newUpdatedBets);


// get only player name 
const player_name = bets.map((i)=>{
   return i.player
})
console.log(player_name)
