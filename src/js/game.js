const gameContainer = document.querySelector(".game-container")
const quantity = localStorage.getItem("quantity");
console.log("ilość kart", quantity)
const quantityOfCards = 41;
let arrayOfRandomNumbers = [];

function getRandomNumbers() {
    while (arrayOfRandomNumbers.length < quantity) {
        const randomNumber = Math.floor(Math.random() * quantityOfCards) + 1;
        if (!arrayOfRandomNumbers.includes(randomNumber)) {
            arrayOfRandomNumbers.push(randomNumber);
        }
    }
    return arrayOfRandomNumbers;
}

const randomNumbers = getRandomNumbers();
console.log(randomNumbers);

function duplicateArrayOfRandomNumbers(arr) {
    return arr.map(element => [element, element]).flat();
}

let newDuplicateArrayOfRandomNumbers = duplicateArrayOfRandomNumbers(arrayOfRandomNumbers)
const shuffledArray = newDuplicateArrayOfRandomNumbers.sort((a, b) => 0.5 - Math.random());

console.log("duplicate", newDuplicateArrayOfRandomNumbers)

function setNewCard() {
    return `<div class="img-container">
    <img src="./src/img/img1.png">
</div>`
}


const newGameBtn = document.querySelector(".new-game-btn")

function newGame() {
    window.location.href = "./index.html";
}

newGameBtn.addEventListener("click", newGame)


//Co w następnej kolejności?

//1. iterować po newDuplicateArrayOfRandomNumbers i pobierając numerki podstawiać je pod src zdjęć przez co zdjęcia będą
//się pojawiać w randomowych miejscach

//2.Uzależnić szerokość kontenera od tego jaka jest długość newDuplicateArrayOfRandomNumbers.length

//3.Obsłużyć funkcjonalność, że najpierw obrazki są zakryte, a gdy kliknie się dwa o tym samym id to pozostają odkryte

//4.Obsłużyć poziom, odkryte pary i liczbę prób

//5.Karta końcowa 


