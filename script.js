let score = 0;

const startBtn = document.getElementById("start-btn");
const titleScreen = document.getElementById("title-screen");
const gameScreen = document.getElementById("game");
const gameContent = document.getElementById("game-content");

startBtn.addEventListener("click", () => {
    const nameInput = document.getElementById("name-input");
    const name = nameInput.value.trim();

    if (name === "") {
        alert("Recruit, we need your name before we start! 🫡");
        return;
    }

    titleScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");

    startCountdown(name);
});

function startCountdown(name) {
    gameContent.textContent = "";

    const welcome = document.createElement("h2");
    welcome.textContent = `Welcome, ${name}! 🎖️`;

    const countdownMsg = document.createElement("p");
    countdownMsg.textContent = "Training begins in ";

    const countdownSpan = document.createElement("span");
    countdownSpan.id = "countdown";
    countdownSpan.textContent = "5";

    countdownMsg.appendChild(countdownSpan);

    gameContent.appendChild(welcome);
    gameContent.appendChild(countdownMsg);

    let countdown = 5;
    const interval = setInterval(() => {
        countdown--;
        if (countdown > 0) {
            countdownSpan.textContent = countdown;
        } else {
            clearInterval(interval);
            loadOhioGame();
        }
    }, 1000);
}

function displayFeedback(message, type = 'correct') {
    const feedbackBox = document.getElementById('feedback-box');
    if (!feedbackBox) return;

    feedbackBox.textContent = message;

    feedbackBox.className = '';
    feedbackBox.classList.add('visible', type);

    setTimeout(() => {
        feedbackBox.classList.remove('visible');
    }, 1500);
}

function loadOhioGame() {
    gameContent.textContent = "";

    const scoreboard = document.createElement("div");
    scoreboard.id = "scoreboard";
    scoreboard.textContent = `Score: ${score}`;

    const feedbackBox = document.createElement("div");
    feedbackBox.id = "feedback-box";

    const instructions = document.createElement("p");
    instructions.classList.add("instructions");
    instructions.textContent = "Click on Ohio!";

    const object = document.createElement("object");
    object.id = "us-map";
    object.type = "image/svg+xml";
    object.data = "assets/us.svg";

    gameContent.appendChild(scoreboard);
    gameContent.appendChild(feedbackBox);
    gameContent.appendChild(object);
    gameContent.appendChild(instructions);

    object.addEventListener("load", () => {

        const svgDoc = object.contentDocument;
        const states = svgDoc.querySelectorAll("path");

        states.forEach(state => {
            state.style.cursor = "pointer";

            state.addEventListener("mouseenter", () => {
                state.dataset.originalFill = state.style.fill || state.getAttribute("fill");
                state.style.fill = "turquoise";
            });

            state.addEventListener("mouseleave", () => {
                state.style.fill = state.dataset.originalFill || "#ccc";
            });

            state.addEventListener("click", () => {
                if (state.id === "OH") {
                    score++;
                    scoreboard.textContent = `Score: ${score}`;
                    
                    displayFeedback("✅ Correct! Welcome to Ohio, recruit.", 'correct');
                    // ADD NEXT GAME
                } else {
                    displayFeedback("❌ Wrong! That's not Ohio.", 'wrong');
                }
            });
        });
    });
}