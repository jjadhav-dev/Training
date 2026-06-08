/*
Reduce:
    reduce() is one of the most powerful array methods. 
    It's used to reduce an array into a single value such as a sum, object, count, or grouped result.

Syantax:
    array.reduce((accumulator, currentValue) => {
        return updatedAccumulator;
    }, initialValue);
*/

const bets = [
    { player: "Mansi", amount: 100,active: true  },
    { player: "Dev", amount: 500,active: true },
    { player: "Jay", amount: 200, active: false },
    { player: "Ram", amount: 700,active: true  }
  ];


// Total Bets Amount 
const total_bets_ammount = bets.reduce((acc,curr)=>{
    return acc+curr.amount
},0)
console.log("Total_bets_ammount",total_bets_ammount)


// Count Active Players
const active_players = bets.reduce((acc,curr)=>{
    if(curr.active === true){
        acc+=1
    }
    return acc
},0)
console.log("Active_players_counts",active_players)