/*
  Funtions we use for specific task is repetedly used in our code, 
 so we can create a function and reuse it whenever we need it.
*/

// function declaration
function greet(name){
    return `Hello ${name}`;
}
console.log(greet("Mansi")) 

// function expression
const greet2 = function(name){
    return `Hello ${name}`;
}
console.log(greet2("Dev")) 

// arrow function
const greet3 = (name) => {
    return `Hello ${name}`;
}
console.log(greet3("Jay"))

// function to calculate total bet amount 
const bets = [
    { player: "Mansi", amount: 100,active: true  },
    { player: "Dev", amount: 500,active: true },
    { player: "Jay", amount: 200, active: false },
    { player: "Ram", amount: 700,active: true  }
  ];

function calculateTotalBetAmount(bets){
    let total = 0;
    bets.forEach((bet)=>{
        total += bet.amount
    })
    return total;
}
console.log("Total Bet Amount",calculateTotalBetAmount(bets))

// function to get active players
function getActivePlayers(bets){
    return bets.filter((bet)=>{
        return bet.active === true
    })
}
console.log("Active Players",getActivePlayers(bets))

// function to get active players with bet amount more than 300
function getActivePlayersWithBetAmountMoreThan300(bets){
    return bets.filter((bet)=>{
        return bet.active === true && bet.amount > 300
    })
}
console.log("Active Players with Bet Amount More Than 300",getActivePlayersWithBetAmountMoreThan300(bets))

 // use of arrow functions find total bet amount

 const calculateTotalBetAmount2 = (bets) => {
    let total = 0;
    bets.forEach((bet)=>{
        total += bet.amount
    })
    return total;
 }
 console.log("Total Bet Amount using arrow function",calculateTotalBetAmount2(bets))

 // use of arrow functions to get active players
 const getActivePlayers2 = (bets) => {
    return bets.filter((bet)=>{
        return bet.active === true
    })
 }
 console.log("Active Players using arrow function",getActivePlayers2(bets))

 // use of arrow functions to get active players with bet amount more than 300
 const getActivePlayersWithBetAmountMoreThan300_2 = (bets) => {
    return bets.filter((bet)=>{
        return bet.active === true && bet.amount > 300
    })
 }
 console.log("Active Players with Bet Amount More Than 300 using arrow function",getActivePlayersWithBetAmountMoreThan300_2(bets))