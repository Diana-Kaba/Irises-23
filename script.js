let golden = document.getElementById("golden");
let blue = document.getElementById("blue");
let brown = document.getElementById("brown");
let showCoords = document.getElementById("showCoords");
let state = document.getElementById("state");

let checkButton = document.getElementById("check");
checkButton.addEventListener("click", check);

let dogs = document.getElementsByClassName("dog");

let dogsState = [];

for (let i = 0; i < dogs.length; i++) {
  const element = dogs[i].id;
  console.log(element);
  dogsState[dogs[i].id] = false;
}

console.log(dogsState);

for (let i = 0; i < dogs.length; i++) {
  dogs[i].onmousedown = go;
}

function onField(f, left, top) {
  // проверка, попадает ли на поле f собак с координатами left, top
  let field = getCoords(f); // получили координаты top и left, а также width и height текущего поля f

  if (
    left > field.left &&
    left < field.left + field.width &&
    top > field.top &&
    top < field.top + field.height &&
    (f == golden || f == blue || f == brown)
  ) {
    return true;
  }
  return false;
}

function go(event) {
  let dog = document.getElementById(event.target.id);
  let breed = dog.dataset.breed;
  let coords = getCoords(dog);
  let shiftX = event.pageX - coords.left;
  let shiftY = event.pageY - coords.top;
  moveAt(event);
  // функция перемещения объекта под координаты курсора
  function moveAt(event) {
    // shiftX и shiftY - сдвиг курсора относительно верхнего левого угла картинки
    let left = event.pageX - shiftX;
    let top = event.pageY - shiftY;

    dog.style.left = left + "px";
    dog.style.top = top + "px";

    // Координаты картинки относительно окна
    showCoords.innerHTML = `x: ${dog.style.left}, y: ${dog.style.top}`;

    if (onField(golden, left, top)) {
      if (breed == "golden") {
        golden.style.border = "3px solid green";
        blue.style.border = "none";
        brown.style.border = "none";
      } else {
        golden.style.border = "3px solid red";
        blue.style.border = "none";
        brown.style.border = "none";
      }
    }

    if (onField(blue, left, top)) {
      if (breed == "blue") {
        blue.style.border = "3px solid green";
        brown.style.border = "none";
        golden.style.border = "none";
      } else {
        blue.style.border = "3px solid red";
        brown.style.border = "none";
        golden.style.border = "none";
      }
    }

    if (onField(brown, left, top)) {
      if (breed == "brown") {
        brown.style.border = "3px solid green";
        blue.style.border = "none";
        golden.style.border = "none";
      } else {
        brown.style.border = "3px solid red";
        blue.style.border = "none";
        golden.style.border = "none";
      }
    }
  }

  // событие перемещения мыши
  document.onmousemove = function (event) {
    moveAt(event);
  };

  // событие  отпускания мыши
  dog.onmouseup = function (event) {
    res(event);
  };

  function res(event) {
    dogsState[dog.id] = false; // сброс состояния текущей собаки
    golden.style.border = "none";
    blue.style.border = "none";
    brown.style.border = "none";

    let left = parseInt(dog.style.left);
    let top = parseInt(dog.style.top);

    if (onField(golden, left, top)) {
      if (breed == "golden") {
        dogsState[dog.id] = true;
      } else {
        dogsState[dog.id] = false;
      }
    }
    if (onField(blue, left, top)) {
      if (breed == "blue") {
        dogsState[dog.id] = true;
      } else {
        dogsState[dog.id] = false;
      }
    }
    if (onField(brown, left, top)) {
      if (breed == "brown") {
        dogsState[dog.id] = true;
      } else {
        dogsState[dog.id] = false;
      }
    }
    //... проверить поле
    // реализовать - если собака находится на своем поле, то  dogsState[dog.id] = true, иначе - dogsState[dog.id] = false

    document.onmousemove = null;
    dog.onmouseup = null;
  }

  dog.ondragstart = function () {
    return false; // отмена drag and drop браузера
  };
}

function check() {
  // проверка, все ли собаки на своем поле
  let res = true;
  for (const key in dogsState) {
    if (!dogsState[key]) {
      res = false;
      state.innerHTML = "Error!";
      break;
    } else {
      state.innerHTML = "OK";
    }
  }
}

function getCoords(elem) {
  let box = elem.getBoundingClientRect();
  // scrollX и scrollY возвращают скроллирование окна в пикселях
  return {
    height: box.height,
    width: box.width,
    top: box.top + scrollY,
    left: box.left + scrollX,
  };
}
