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

for (let i = 0; i < irises.length; i++) {
  irises[i].onmousedown = go;
}

function go(event) {
  let flower = document.getElementById(event.target.id);
  let breed = flower.dataset.breed;

  let coords = getCoords(flower);
  // shiftX - сдвиг курсора от левого края картинки
  let shiftX = event.pageX - coords.left;
  // shiftY - сдвиг курсора от верхнего края картинки
  let shiftY = event.pageY - coords.top;

  moveAt(event);
  // функция перемещения объекта под координаты курсора
  function moveAt(evente) {
    // shiftX и shiftY - сдвиг курсора относительно верхнего левого угла картинки
    var left = event.pageX - shiftX;
    var top = event.pageY - shiftY;

    flower.style.left = left + "px";
    flower.style.top = top + "px";

    // Координаты картинки относительно окна
    showCoords.innerHTML =
      "x: " + flower.style.left + " y: " + flower.style.top;
    // if (left > 5 && left < 405 && top > 5 && top < 305) {
    //   wrap.style.border = "2px red solid";
    // } else
    //   wrap.style.border = "none";
  }

   // событие перемещения мыши
   document.onmousemove = function (event) {
    moveAt(event);
  };
}

function getCoords(elem) {
  var box = elem.getBoundingClientRect();
  //scrollX и scrollY возвращают скроллирование окна в пикселях
  return {
    height: box.height,
    width: box.width,
    top: box.top + scrollY,
    left: box.left + scrollX,
  };
}
