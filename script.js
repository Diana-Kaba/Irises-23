let tan = document.getElementById("tan");
let pink = document.getElementById("pink");
let showCoords = document.getElementById("showCoords");
let state = document.getElementById("state");

let irises = document.getElementsByClassName("iris");

let irisesState = [];

for (let i = 0; i < irises.length; i++) {
  //   const element = irises[i].id;
  //   console.log(element);
  irisesState[irises[i].id] = false;
}

console.log(irisesState);
