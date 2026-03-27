const text = [
"Django Developer",
"AI Systems Builder",
"Backend Engineer"
];

let count = 0;
let index = 0;
let current = "";
let letter = "";

(function type(){

if(count === text.length){
count = 0;
}

current = text[count];
letter = current.slice(0, ++index);

document.querySelector(".typing").textContent = letter;

if(letter.length === current.length){
count++;
index = 0;
}

setTimeout(type,120);

})();