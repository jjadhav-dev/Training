/*
    A closure is a function that remembers
     variables from the place where it was created, even after that outer function has finished executing.
*/
function outer(){
    let a = 10
    return function inner(){
        console.log(a++)
    }
}
let fun_call1 = outer();
console.log("fun call",fun_call1)
fun_call1()
fun_call1()
fun_call1()