const gameContainer = document.querySelector(".game-container")
const bodyContainer = document.querySelector(".body-container")
const scoreContainer = document.querySelector(".score-container")
const quantity = localStorage.getItem("quantity");
const quantityOfCards = 72;
let arrayOfRandomNumbers = [];
let pairCounter = 0;
let attemptsCounter = 0;

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
    console.log(window.innerWidth)
    if (window.innerWidth > 600) {
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
}

let firstClickedImg = null;
let secondClickedImg = null;

function pickImage(e) {
    if (!e.target.classList.contains('img-container')) return;
    const imgContainer = e.target;

    if (imgContainer.classList.contains('clicked')) {
        return;
    }

    const imgElement = imgContainer.querySelector('.img');

    if (!firstClickedImg) {
        firstClickedImg = imgContainer;
        setTimeout(() => {
            imgElement.style.removeProperty('display');
        }, 300);
        imgContainer.classList.add('clicked');

    } else if (!secondClickedImg) {
        secondClickedImg = imgContainer;
        setTimeout(() => {
            imgElement.style.removeProperty('display');
        }, 300);
        imgContainer.classList.add('clicked');

        if (firstClickedImg.dataset.id === secondClickedImg.dataset.id) {
            firstClickedImg = null;
            secondClickedImg = null;
            pairCounter++;
            attemptsCounter++;
            setScoreValue()

        } else {
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
    const level = document.querySelector(".level")
    const allAttempts = document.querySelector(".all-attempts")
    document.querySelector(".pairs").innerText = quantity;
    document.querySelector(".uncovered-pairs").innerText = pairCounter;
    document.querySelector(".attempts").innerText = attemptsCounter;

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
        allAttempts.innerText = Number(quantity) * 3;
    }

    if (Number(quantity) === pairCounter) {
        setTimeout(() => {
            bodyContainer.innerHTML = `<div class="end-text"><h1>Udało Ci się!</h1>
            <p>Odkryłeś wszystkie pary korzystając z ${attemptsCounter} prób</p>
            <button class="end-btn new-game-btn">Zagraj jeszcze raz!</button></div>`
            scoreContainer.style.display = "none";
        }, 2000)

    }
    else if (Number(quantity) * 3 === attemptsCounter) {
        bodyContainer.innerHTML = `<div class="end-text"><h1>Niestety nie udało się!</h1>
        <p>Wykorzystałeś wszystkie możliwe próby</p>
        <button class="end-btn new-game-btn">Spróbuj ponownie!</button></div>`
        scoreContainer.style.display = "none";
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

