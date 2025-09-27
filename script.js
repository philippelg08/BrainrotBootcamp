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

function displayFeedback(message, type = 'correct', duration = 4000) {
    const feedbackBox = document.getElementById('feedback-box');
    if (!feedbackBox) return;

    feedbackBox.textContent = message;

    feedbackBox.className = '';
    feedbackBox.classList.add('visible', type);

    setTimeout(() => {
        feedbackBox.classList.remove('visible');
    }, duration);
}

function loadOhioGame() {
    gameContent.textContent = "";

    const scoreboard = document.createElement("div");
    scoreboard.id = "scoreboard";
    scoreboard.textContent = `Aura🔥: ${score}`;

    const feedbackBox = document.createElement("div");
    feedbackBox.id = "feedback-box";

    const timerBox = document.createElement("div");
    timerBox.id = "timer-box";
    timerBox.textContent = "Time: 15";

    const instructions = document.createElement("p");
    instructions.classList.add("instructions");
    instructions.textContent = "Click on Ohio!";

    const object = document.createElement("object");
    object.id = "us-map";
    object.type = "image/svg+xml";
    object.data = "assets/us.svg";

    // Add elements in order
    gameContent.appendChild(scoreboard);
    gameContent.appendChild(feedbackBox);
    gameContent.appendChild(timerBox);
    gameContent.appendChild(instructions);
    gameContent.appendChild(object);

    let gameTime = 15;
    const gameTimer = setInterval(() => {
        gameTime--;
        timerBox.textContent = `Time: ${gameTime}`;
        if (gameTime <= 0) {
            clearInterval(gameTimer);
            displayFeedback("⏰ Time's up!", "wrong");
            setTimeout(() => loadKneeSurgeryGame(), 1000);
        }
    }, 1000);

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
                    score += 500;
                    scoreboard.textContent = `Aura🔥: ${score}`;

                    state.style.fill = "green";
                    displayFeedback("✅ Correct! Welcome to Ohio, recruit.", 'correct');

                    clearInterval(gameTimer);

                    // Wait 1.5s so player sees the green highlight
                    setTimeout(() => {
                        loadKneeSurgeryGame();
                    }, 2000);

                } else {
                    state.style.fill = "red";
                    displayFeedback("❌ Wrong! That's not Ohio.", 'wrong');
                }
            });
        });
    });
}


function loadKneeSurgeryGame() {
    gameContent.textContent = "";

    const scoreboard = document.createElement("div");
    scoreboard.id = "scoreboard";
    scoreboard.textContent = `Aura🔥: ${score}`;

    const feedbackBox = document.createElement("div");
    feedbackBox.id = "feedback-box";

    const timerBox = document.createElement("div");
    timerBox.id = "timer-box";
    timerBox.textContent = "Time: 15";

    const instructions = document.createElement("p");
    instructions.classList.add("instructions");
    instructions.textContent = "Click the spot that needs surgery!";

    // Container
    const container = document.createElement("div");
    container.style.position = "relative";
    container.style.display = "inline-block";

    // Body image
    const bodyImg = document.createElement("img");
    bodyImg.src = "assets/body.png";
    bodyImg.alt = "Body Outline";
    bodyImg.id = "body-img";
    bodyImg.style.width = "250px";
    bodyImg.style.height = "auto";
    bodyImg.style.cursor = "pointer";

    container.appendChild(bodyImg); // append body first
    gameContent.appendChild(scoreboard);
    gameContent.appendChild(feedbackBox);
    gameContent.appendChild(timerBox);
    gameContent.appendChild(instructions);
    gameContent.appendChild(container);

    // Knee targets in percentages
    const kneeTargets = [
        { x: 0.51, y: 0.70, width: 0.2, height: 0.1 }, // left knee
        { x: 0.26, y: 0.70, width: 0.2, height: 0.1 }  // right knee
    ];

    // Timer
    let timeLeft = 15;
    const timerInterval = setInterval(() => {
        timeLeft--;
        timerBox.textContent = `Time: ${timeLeft}`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            displayFeedback("⏰ Time's up!", "wrong");
            setTimeout(() => load67Game(), 1000);
        }
    }, 1000);

    // Click detection
    bodyImg.addEventListener("click", (e) => {
        const rect = bodyImg.getBoundingClientRect();
        const clickX = (e.clientX - rect.left) / rect.width;
        const clickY = (e.clientY - rect.top) / rect.height;

        const correct = kneeTargets.some(target => {
            return clickX >= target.x &&
                   clickX <= target.x + target.width &&
                   clickY >= target.y &&
                   clickY <= target.y + target.height;
        });

        if (correct) {
            score += 500;
            scoreboard.textContent = `Aura🔥: ${score}`;
            displayFeedback("✅ Correct! Bro needs knee surgery", "correct", 2500);
            clearInterval(timerInterval);
            setTimeout(() => load67Game(), 2500);
        } else {
            displayFeedback("❌ Wrong! That's not the place", "wrong", 1500);
        }
    });
}

function load67Game() {
    gameContent.textContent = "";

    const scoreboard = document.createElement("div");
    scoreboard.id = "scoreboard";
    scoreboard.textContent = `Aura🔥: ${score}`;

    const feedbackBox = document.createElement("div");
    feedbackBox.id = "feedback-box";

    const timerBox = document.createElement("div");
    timerBox.id = "timer-box";
    timerBox.textContent = "Time: 15";

    const instructions = document.createElement("p");
    instructions.classList.add("instructions");
    instructions.textContent = "You know what to click.";

    // Container
    const container = document.createElement("div");
    container.style.position = "relative";
    container.style.display = "inline-block";

    // Body image
    const bodyImg = document.createElement("img");
    bodyImg.src = "assets/body.png";
    bodyImg.alt = "Body Outline";
    bodyImg.id = "body-img";
    bodyImg.style.width = "250px";
    bodyImg.style.height = "auto";
    bodyImg.style.cursor = "pointer";

    container.appendChild(bodyImg); // append body first
    gameContent.appendChild(scoreboard);
    gameContent.appendChild(feedbackBox);
    gameContent.appendChild(timerBox);
    gameContent.appendChild(instructions);
    gameContent.appendChild(container);

    // Knee targets in percentages
    const kneeTargets = [
        { x: 0.51, y: 0.70, width: 0.2, height: 0.1 }, // left knee
        { x: 0.26, y: 0.70, width: 0.2, height: 0.1 }  // right knee
    ];

    // Timer
    let timeLeft = 15;
    const timerInterval = setInterval(() => {
        timeLeft--;
        timerBox.textContent = `Time: ${timeLeft}`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            displayFeedback("⏰ Time's up!", "wrong");
            setTimeout(() => load67Game(), 1000);
        }
    }, 1000);

    // Click detection
    bodyImg.addEventListener("click", (e) => {
        const rect = bodyImg.getBoundingClientRect();
        const clickX = (e.clientX - rect.left) / rect.width;
        const clickY = (e.clientY - rect.top) / rect.height;

        const correct = kneeTargets.some(target => {
            return clickX >= target.x &&
                   clickX <= target.x + target.width &&
                   clickY >= target.y &&
                   clickY <= target.y + target.height;
        });

        if (correct) {
            score += 500;
            scoreboard.textContent = `Aura🔥: ${score}`;
            displayFeedback("✅ Correct! Bro needs knee surgery", "correct", 2500);
            clearInterval(timerInterval);
            setTimeout(() => load67Game(), 2500);
        } else {
            displayFeedback("❌ Wrong! That's not the place", "wrong", 1500);
        }
    });
}
