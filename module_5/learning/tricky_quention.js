// console.log(typeof null) // object

// console.log(0 == '0') // true

// console.log(0.1+0.2)

// without reslove and reject promise never run they are always in pending stat0e
const my_promise = new Promise((reslove,reject)=>{
    if(true){
        reslove("run")
    }else{
        reject("No run")
    }
})

my_promise.then((value)=>{
    console.log("run then")
}).catch((value)=>{
    console.log("run catch")
})

console.log("end",my_promise)