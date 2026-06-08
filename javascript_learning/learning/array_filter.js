/*
  filter:
        filter() is another very common array method,
         specially in iGaming applications where you need to show only certain players, bets, games, or transactions.
    array.filter((item) => {
        return condition;
    });
*/

const bets = [
    { player: "Mansi", amount: 100,active: true  },
    { player: "Dev", amount: 500,active: true },
    { player: "Jay", amount: 200, active: false },
    { player: "Ram", amount: 700,active: true  }
  ];

// only bets greater than 300

const bets_greater_than_300 = bets.filter((i)=>{
    return i.amount > 300
})
console.log("bets_greater_than_300",bets_greater_than_300)

// get only active player
const active_player = bets.filter((i)=>{
   if(i.active === true){
    return i;
   }
})
console.log("Active Player",active_player)

// get only active player with bet amount more than 300
const active_player_with_bet_amount_more_than_300 = bets.filter((i)=>{
    if(i.active === true && i.amount > 300){
     return i;
    }
 })
 console.log("Active Player with bet amount more than 300",active_player_with_bet_amount_more_than_300)
