/* 
Event Loop is a mechanism that allows JavaScript to handle asynchronous code.
understand the microtask and macrotask
microtask: Promise, process.nextTick
macrotask: setTimeout, setInterval, setImmediate
*/

console.log("start");

setTimeout(() => {
    console.log("setTimeout");
}, 0);

Promise.resolve().then(() => {
    console.log("Promise.resolve");
});

process.nextTick(() => {
    console.log("process.nextTick");
});

console.log("middle");

// output: start, middle, process.nextTick, Promise.resolve, setTimeout


/* 
 if we have perfrom multiple operations they are not dependent on each other.
 we follow parallel processing instance of sequential processing.
 Promise is function that have 3 states: pending, fulfilled.
 Promise methods: 
            promise.all() -> wait for all promises to be fulfilled
            promise.allSettled() -> wait for all promises to be fulfilled or rejected
            promise.race() -> wait for the first promise to be fulfilled or rejected
            promise.any() -> wait for the first promise to be fulfilled
 */



/*
 Async in Loops — A Classic Trap
 forEach() is not waiting for the promise to be fulfilled or rejected
 so always use for of loop or Promise.all() or chunks the array

 Learn error propagation
 IMPORTANT NOTE: When an awaited Promise rejects, execution jumps to
 the nearest available error handler (catch). If none exists, the error continues propagating upward
*/



/*
custom error handler:
    Custom Error Classes are specialized error types that carry extra information (statusCode, error code, context) so  backend, 
    frontend, and logs can understand exactly what went wrong
*/


/* learn Error Middleware(global)
    this middleware always write in last.
    this middleware function that accepts exactly four arguments (err, req, res, next)
*/