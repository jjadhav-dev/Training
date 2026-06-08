/*
    Promise is object they are resolove or reject in future
    They have three state:
        1) Pending
        2) Fulfilled
        3) Reject
*/


const my_promise = new Promise(function(res,rej){
    let value = false;
    console.log("run")
    if(value){
        res("Promise are resolve")
    }else{
        rej("Promise are reject")
    }
})
console.log(my_promise)


my_promise.then((value)=>{
    console.log(value)
}).catch((value)=>{
    console.log(value)
})


// Promise Methodhs


function getPlayerInfo(r){
    return new Promise(function(resolove,reject){
        let value = false;
        if(value){
            resolove({
                player_name:"Jayesh",
                age:24,
                address:"Pune"
            })
        }else{
            reject("Player are not found")
        }
    })
}


function getPlayerWalletInfo(resolove,reject){
    return new Promise(function(resolove,reject){
        let value = true;
        if(value){
            resolove({
                wallet_balance:1000,
                currency:"INR"
            })
        }else{
            reject("Player wallet info are not found")
        }
    })
}

function getPalyerWithrowHistory(){
    return new Promise(function(resolove,reject){
        let value = true;
        if(false){
            resolove({
            Date:"10-09-2024",
            ammount:1908,
            transtion_id:"socaosos24r4m"
        })
        }else{
            reject("Player withrow history are not found")
        }
    })
}

// promise.all()  --  Promise.all() are work if all promise are fulfiled if any promise is rejected so whole promise are rejectd
// promise.allSettled() -- Promise.allSettled() they are array of object they are return status and value of promise they are rejcted or resolve. 
// promise.race() are return first fullfied or reject promise.
// promise.any() are return first fullfied promise.

function get_palyer_dashborad(){
    return Promise.race([
        getPlayerInfo(),
        getPlayerWalletInfo(),
        getPalyerWithrowHistory()
    ])
}


get_palyer_dashborad().then((data)=>{
    console.log(data);
}).catch((err)=>{
    console.log(err);
})