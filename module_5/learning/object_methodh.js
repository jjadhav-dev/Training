/*
    Object is a collection of key value pair. It is used to store datan a structured way. 
*/

// object use in iGaming application to store player information, game details, bet details, transaction details etc.

const player = {
    name: "Mansi",
    age: 25,
    country: "India",
    active: true,
    bet_amount: 100,
    game_played: ["Poker", "Blackjack", "Roulette"],
    transaction_history: [
        { amount: 100, type: "deposit" },
        { amount: 50, type: "withdrawal" },
        { amount: 200, type: "deposit" }
    ]
}

// access object properties
console.log(player.name) // Mansi
console.log(player.age) // 25


// access nested object properties
console.log(player.game_played[0]) // Poker
console.log(player.transaction_history[1].type) // withdrawal

// update object properties
player.active = false;
console.log(player.active) // false

// add new property to object
player.email = "mansi@example.com";
console.log(player.email) // mansi@example.com

// delete property from object
delete player.age;
console.log(player.age) // undefined

// loop through object properties
for(let key in player){
    console.log(`${key}: ${player[key]}`)
}

// check if property exists in object
console.log("name" in player) // true
console.log("age" in player) // false

// get all keys of object
console.log(Object.keys(player)) 

// get all values of object
console.log(Object.values(player)) 

// get all entries of object
console.log(Object.entries(player)) 

//  object methods
const player2 = {
    name: "Jayesh",
    age: 30,
    country: "IND",
    active: true,
    bet_amount: 500,
    game_played: ["Poker", "Blackjack", "Roulette"],
    transaction_history: [
        { amount: 500, type: "deposit" },
        { amount: 100, type: "withdrawal" },
        { amount: 300, type: "deposit" }
    ],
    getPlayerInfo: function(){
        return `Player ${this.name} from ${this.country} is ${this.active ? "active" : "inactive"} and has bet amount of ${this.bet_amount}`
    }
}
