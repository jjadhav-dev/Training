
/*
    spread operator  : spread the value
    rest operator : collect the value

*/

// spread operator
console.log("*************spread operator with array example*************")
const arr = [1, 2, 3];
const new_arr = [...arr, 4];
console.log(new_arr);



console.log("*************spread operator with object example*************")
const user = {
    name: "Jayesh",
    age: 22
  };
  
 const user_info = {
    ...user,
    city: "Ahmedabad"
  };
  console.log(user_info)


// rest opertor

console.log("*************rest operator with array example*************")
const [first, ...reaming] = [1, 2, 3, 4];
console.log(first);
console.log(reaming);


console.log("*************rest operator with object example*************")

const user1 = {
    name: "Jayesh",
    age: 22,
    city: "Ahmedabad"
  };
  
  const { name, ...reaming_data } = user1;
  console.log(name)
  console.log(reaming_data);