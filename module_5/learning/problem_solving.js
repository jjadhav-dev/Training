// find count of char in a string
const str = "hello world";
let char_count = {};
for(let char of str){
    char_count[char] = char_count[char] ? char_count[char]+1 : 1
} 
console.log(char_count)



// find vowel count in a string
const str2 = "hello world";
let vowel_count = 0;
for(let char of str2){
    if(char === "a" || char === "e" || char === "i" || char === "o" || char === "u"){
        vowel_count++;
    }
}
console.log("Vowel Count",vowel_count)



