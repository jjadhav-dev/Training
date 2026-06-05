/*
Foreach: 
    Used when you just want to perform an action.
*/

const bets = [
    { player: "Mansi", amount: 100,active: true,status:"WIN" },
    { player: "Dev", amount: 500,active: true , status:"WIN" },
    { player: "Jay", amount: 200, active: false, status:"WIN" },
    { player: "Ram", amount: 700,active: true, status:"WIN"}
  ];

// display palyer bet aamount along with they are name

bets.forEach((i)=>{
    console.log(`Player ${i.player} bet is ${i.amount}`)
})

// display only active players

bets.forEach((i)=>{
    if(i.active){
        console.log(`Player ${i.player} is active`)
    }
})

// display only active players with bet amount more than 300

bets.forEach((i)=>{
    if(i.active && i.amount > 300){
        console.log(`Player ${i.player} is active and bet amount is more than 300`)
    }
})

// display only active players with bet amount more than 300 and status is win

bets.forEach((i)=>{
    if(i.active && i.amount > 300 && i.status === "WIN"){
        console.log(`Player ${i.player} is active and bet amount is more than 300 and status is win`)
    }
})