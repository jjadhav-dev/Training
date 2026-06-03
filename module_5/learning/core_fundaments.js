// Equality — == vs === and Why It Matters
console.log(1 == 1); // true
console.log(1 == "1"); // true
console.log(1 === "1"); // false
console.log(1 === 1); // true
console.log(1 !== "1"); // true
console.log(1 !== 1); // false
console.log(1 !== "1"); // true

console.log(0 == false); // true
console.log(0 === false); // false
console.log(0 != false); // false
console.log(0 !== false); // true
console.log(0 != true); // true
console.log(0 !== true); // true
console.log(0 != "0"); // false
console.log(0 !== "0"); // true
console.log(0 != "1"); // true
console.log(0 !== "1"); // true

console.log(null == undefined); // true
console.log(null === undefined); // false
console.log(null != undefined); // false
console.log(null !== undefined); // true


//Truthy & Falsy Values
//falsy values: 
false, 0, -0, 0n, "", null, undefined, NaN
//truthy values: 
true, 1, -1, 0n, "0", "false", "null", "undefined", "NaN", "Infinity", "[]", "{}", "function(){}"


/*  
Optional Chaining (?.)
Optional chaining lets you safely access a property 
or method on an object that might be null or undefined.
if property is not present, it will return undefined
Nullish Coalescing (??)
if left side is null or undefined, it will return the right side
 */

// this is different from || operator and ?? operator
console.log(0 ?? 10); // 0
console.log(0 || 10); // 10
    


