const gameContainer = document.querySelector(".game-container")
const scoreContainer = document.querySelector(".score-container")
const level = document.querySelector(".level")
const pairs = document.querySelector(".pairs")
const uncoveredPairs = document.querySelector(".uncovered-pairs")
const attempts = document.querySelector(".attempts")
const allAttempts = document.querySelector(".all-attempts")
const endBtn = document.querySelector(".end-btn")
const newGameBtn = document.querySelector(".new-game-btn")



const quantity = localStorage.getItem("quantity");
console.log("ilość kart", quantity)
const quantityOfCards = 72;
let arrayOfRandomNumbers = [];
let pairCounter = 0;
let attemptsCounter = 0;
// console.log(pairCounter)

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

function duplicateArrayOfRandomNumbers(arr) {
    return arr.map(element => [element, element]).flat();
}

let newDuplicateArrayOfRandomNumbers = duplicateArrayOfRandomNumbers(arrayOfRandomNumbers)
const shuffledArray = newDuplicateArrayOfRandomNumbers.sort((a, b) => 0.5 - Math.random());

function renderImages() {
    newDuplicateArrayOfRandomNumbers.forEach(element => {
        gameContainer.innerHTML += `<div data-id="${element}" class="img-container card-color">
     <img class="img" style="display:none" src="./src/img/img${element}.png">
</div>`
    });
}


function setGameContainerWidth() {
    const elementCount = newDuplicateArrayOfRandomNumbers.length;

    if (elementCount === 16) {
        gameContainer.style.width = "600px";
        scoreContainer.style.width = "520px";
        scoreContainer.style.fontSize = "1em";
    } else if (elementCount === 24) {
        gameContainer.style.width = "900px";
        scoreContainer.style.width = "795px";
        scoreContainer.style.fontSize = "1.2em";
    } else if (elementCount === 32) {
        gameContainer.style.width = "1100px";
        scoreContainer.style.width = "1070px;";
        scoreContainer.style.fontSize = "1.5em";
    }
}



let firstClickedImg = null; // Pierwszy kliknięty obrazek
let secondClickedImg = null; // Drugi kliknięty obrazek

function pickImage(e) {
    if (!e.target.classList.contains('img-container')) return;
    const imgContainer = e.target;

    const imgElement = imgContainer.querySelector('.img');

    if (!firstClickedImg) {
        // Pierwszy kliknięty obrazek
        firstClickedImg = imgContainer;
        setTimeout(() => {
            imgElement.style.removeProperty('display');
        }, 300);
        imgContainer.classList.add('clicked');

    } else if (!secondClickedImg) {
        // Drugi kliknięty obrazek
        secondClickedImg = imgContainer;
        setTimeout(() => {
            imgElement.style.removeProperty('display');
        }, 300);
        imgContainer.classList.add('clicked');

        // sprawdzam, czy oba obrazy mają takie same data-id
        if (firstClickedImg.dataset.id === secondClickedImg.dataset.id) {
            // Jeśli tak, zostawiamy obrazy odkryte, a zmienne zerujemy, żeby po chwili móc znowu odkrywać
            firstClickedImg = null;
            secondClickedImg = null;
            pairCounter++;
            attemptsCounter++;
            setScoreValue()

        } else {
            // Jeśli różne, po chwili ukrywamy obrazy z powrotem, a zmienne również zerujemy
            attemptsCounter++;
            setScoreValue()
            setTimeout(() => {
                firstClickedImg.classList.remove('clicked');
                secondClickedImg.classList.remove('clicked');
                firstClickedImg.querySelector('.img').style.display = 'none';
                secondClickedImg.querySelector('.img').style.display = 'none';
                firstClickedImg = null;
                secondClickedImg = null;
            }, 1000);
        }
    }
}

document.addEventListener("click", pickImage);

function setScoreValue() {
    pairs.innerText = quantity;
    uncoveredPairs.innerText = pairCounter;
    pairs.innerText = quantity;
    attempts.innerText = attemptsCounter;
    if (quantity === '8') {
        level.innerText = ' łatwy';
        allAttempts.innerText = Number(quantity) * 3;
    }
    if (quantity === '12') {
        level.innerText = ' średni';
        allAttempts.innerText = Number(quantity) * 3;
    }
    if (quantity === '16') {
        level.innerText = ' trudny';
        allAttempts.innerText = Number(quantity) * 4;
    }

    if (Number(quantity) === pairCounter) {
        gameContainer.innerHTML = `<div class="end-text"><h1>Udało Ci się!</h1>
        <p>Odkryłeś wszystkie pary wykorzystując ${attemptsCounter} próby</p>
        <button class="end-btn new-game-btn">Zagraj jeszcze raz!</button></div>`
        scoreContainer.style.display = "none";
        // endBtn.addEventListener("click", newGame)
    }
    else if (Number(quantity) * 3 === attemptsCounter) {
        gameContainer.innerHTML = `<div class="end-text"><h1>Niestety nie udało się!</h1>
        <p>Wykorzystałeś wszystkie możliwe próby</p>
        <button class="end-btn new-game-btn">Spróbuj ponownie!</button></div>`
        scoreContainer.style.display = "none";
        // endBtn.addEventListener("click", newGame)
    }
}


function newGame(e) {
    console.log("dsffd")
    if (!e.target.classList.contains('new-game-btn')) return;
    window.location.href = "./index.html";
}
document.addEventListener("click", newGame)


function render() {
    renderImages();
    setGameContainerWidth();
    setScoreValue()
}

render()

//Co w następnej kolejności?


//5.Karta końcowa 


