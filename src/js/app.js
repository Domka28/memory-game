const easyBtn = document.querySelector(".easy")
const mediumBtn = document.querySelector(".medium")
const hardBtn = document.querySelector(".hard")


function startEasyGame() {
    console.log("łatwa")
    localStorage.setItem("quantity", "8");
    window.location.href = "./game.html";

}

function startMediumGame() {
    console.log("średnia")
    localStorage.setItem("quantity", "12");
    window.location.href = "./game.html";
}

function startHardGame() {
    console.log("trudna")
    localStorage.setItem("quantity", "16");
    window.location.href = "./game.html";
}

easyBtn.addEventListener("click", startEasyGame)
mediumBtn.addEventListener("click", startMediumGame)
hardBtn.addEventListener("click", startHardGame)