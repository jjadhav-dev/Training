
setTimeout(() => console.log("timeout 0"), 0)
Promise.resolve().then(() => console.log("promise 1"))

Promise.resolve().then(() => {
    console.log("promise 2")
    Promise.resolve().then(() => 
    console.log("promise 3"))
})
console.log("end")



