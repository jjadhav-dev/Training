/* 
find:
    Unlike filter(), which returns all matching items, find() returns only the first matching item.
Syantax:
    array.find((item) => {
        return condition;
    });
*/

const bets = [
    { player: "Mansi", amount: 100,active: true,status:"WIN" },
    { player: "Dev", amount: 500,active: true , status:"WIN" },
    { player: "Jay", amount: 200, active: false, status:"WIN" },
    { player: "Ram", amount: 700,active: true, status:"WIN"}
  ];

  
  // find winningBets
  const winningBet = bets.find(bet => bet.status === "WIN");
  console.log(winningBet);

  // use find to get the first active player
  const activePlayer = bets.find(bet => bet.active);
  console.log(activePlayer);

  // to get the first active player with bet amount more than 300
  const active_player = bets.find(bet => bet.active && bet.amount > 300);
  console.log(active_player);

  
