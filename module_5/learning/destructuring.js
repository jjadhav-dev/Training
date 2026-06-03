/*
    we use destructuring for sperat copy of item from array or object
    ex: 
        we have request
        body = {
         name:"Jayesh",
         mo_no:1212121212
        }
        const user_data = req.bo
        we can destructuring it like that
        const {name} = req.body;

        so we have no need access the user name like that req.body.name 
        we can esaily access thought : name
*/ 
console.log("******************Destructuring Object**********************")
const  body = {
    name:"Jayesh",
    age:23,
    mo_no:"09090909090"
}
const {name,age} = body;
console.log("without destructuring",body.name)
console.log("with destructuring",name)



console.log("******************Destructuring Array**********************")
const arr = [10,20,30];
const [a,b] = arr;
console.log(b)


console.log("***********************Nestsed Object Destructuring**************")
const arr1 = {
    player_info:{
        name:"jayesh",
        age:22,
        dob:"29-08-2002"
    },
    wallet:{
        ammount:100,
    }
}

const {player_info:{name:player_name}} = arr1;
console.log(player_name)






