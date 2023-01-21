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

//проверка, попадает ли на поле f цветок с координатами left, top
function onField(f, left, top) {
  let field = getCoords(f); // получили координаты top и left, а также width и height текущего поля f

  if (
    left > field.left &&
    left < field.left + field.width &&
    top > field.top &&
    top < field.top + field.height &&
    (f == tan || f == pink)
  ) {
    return true;
  }
  return false;
}

function go(event) {
  let flower = document.getElementById(event.target.id);
  let breed = flower.dataset.breed;
  let coords = getCoords(flower);
  let shiftX = event.pageX - coords.left;
  let shiftY = event.pageY - coords.top;
  // console.log(shiftX + " " + shiftY);
  moveAt(event);
  // функция перемещения объекта под координаты курсора
  function moveAt(event) {
    // shiftX и shiftY - сдвиг курсора относительно верхнего левого угла картинки
    var left = event.pageX - shiftX;
    var top = event.pageY - shiftY;

    flower.style.left = left + "px";
    flower.style.top = top + "px";

    // Координаты картинки относительно окна
    showCoords.innerHTML = `x: ${flower.style.left}, y: ${flower.style.top}`;
    // if (left > 5 && left < 405 && top > 5 && top < 305) {
    //   wrap.style.border = "2px red solid";
    // } else
    //   wrap.style.border = "none";

    if (onField(tan, left, top)) {
      if (breed == "tan") {
        tan.style.border = "2px solid green";
        pink.style.border = "none";
      } else {
        tan.style.border = "2px solid red";
        pink.style.border = "none";
      }
    }
    if (onField(pink, left, top)) {
      if (breed == "pink") {
        pink.style.border = "2px solid green";
        tan.style.border = "none";
      } else {
        pink.style.border = "2px solid red";
        tan.style.border = "none";
      }
    }
  }

  // событие перемещения мыши
  document.onmousemove = function (event) {
    moveAt(event);
  };

  // событие  отпускания мыши
  flower.onmouseup = function (event) {
    res(event);
  };

  function res(event) {
    irisesState[flower.id] = false; // сброс состояния текущего цветка
    tan.style.border = "none";
    pink.style.border = "none";

    let left = parseInt(flower.style.left);
    let top = parseInt(flower.style.top);
    //alert(left);

    if (onField(tan, left, top)) {
      if (breed == "tan") {
        irisesState[flower.id] = true;
      } else {
        irisesState[flower.id] = false;
      }
    }
    if (onField(pink, left, top)) {
      if (breed == "pink") {
        irisesState[flower.id] = true;
      } else {
        irisesState[flower.id] = false;
      }
    }
    console.log(irisesState);
    //..... проверить поле pink

    //реализовать - если цветок находится на своем поле, то  irisesState[flower.id] = true, иначе - irisesState[flower.id] = false

    document.onmousemove = null;
    flower.onmouseup = null;
  }

  flower.ondragstart = function () {
    return false; // отмена drag and drop браузера
  };
}

function check() {
  // Проверка, все ли ирисы на своем поле
  // реализовать - если в массиве irisesState хотя бы одно значение false, то выдавать сообщение "Error", если все true - то "OK". Сообщение писать в state
  let res = true;
  //for (let i = 0; i < irisesState.length; i++) {
  for (const key in irisesState) {
    if (!irisesState[key]) {
      //
    }
  }
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
