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

function startTimer(duration, display, onTimeUp) {
    let timeLeft = duration;
    display.textContent = `Time: ${timeLeft}`;
    
    const interval = setInterval(() => {
        timeLeft--;
        display.textContent = `Time: ${timeLeft}`;

        if (timeLeft <= 5 && timeLeft > 0) {
            display.classList.add('timer-dramatic');
        } else {
            display.classList.remove('timer-dramatic');
        }

        if (timeLeft <= 0) {
            clearInterval(interval);
            display.classList.remove('timer-dramatic');
            if (onTimeUp) onTimeUp();
        }
    }, 1000);

    return interval;
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

    object.style.width = "600px";   
    object.style.height = "auto";   
    object.style.display = "block"; 
    object.style.margin = "0 auto"; 

    // Add elements in order
    gameContent.appendChild(scoreboard);
    gameContent.appendChild(feedbackBox);
    gameContent.appendChild(timerBox);
    gameContent.appendChild(instructions);
    gameContent.appendChild(object);

    const timer = startTimer(15, timerBox, () => {
        displayFeedback("⏰ Time's up!", "wrong");
        setTimeout(() => loadKneeSurgeryGame(), 1000);
    });

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

                    clearInterval(timer);

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

    const timer = startTimer(15, timerBox, () => {
        displayFeedback("⏰ Time's up!", "wrong");
        setTimeout(() => load67Game(), 1000);
    });

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
            clearInterval(timer);
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

    const container = document.createElement("div");
    container.style.position = "relative";
    container.style.width = "50vw";       
    container.style.height = "50vh";     
    container.style.margin = "0 auto";  
    container.style.border = "2px solid #222";
    container.style.overflow = "hidden";
    container.style.background = "#f0f0f0";
    container.style.cursor = "pointer";

    gameContent.appendChild(scoreboard);
    gameContent.appendChild(feedbackBox);
    gameContent.appendChild(timerBox);
    gameContent.appendChild(instructions);
    gameContent.appendChild(container);

    const timer = startTimer(15, timerBox, () => {
        displayFeedback("⏰ Time's up!", "wrong");
        setTimeout(() => loadTextGame(), 1000);
    });

    const targetNumbers = [6, 7];
    let currentIndex = 0;

    const numbers = [];
    for (let i = 0; i <= 9; i++) {
        const numDiv = document.createElement("div");
        numDiv.textContent = i;
        numDiv.style.position = "absolute";
        numDiv.style.fontSize = "5rem";     
        numDiv.style.fontWeight = "bold";
        numDiv.style.cursor = "pointer";
    
        numDiv.style.top = `${Math.random() * (container.clientHeight - 50)}px`;
        numDiv.style.left = `${Math.random() * (container.clientWidth - 50)}px`;
    
        numDiv.vx = (Math.random() - 0.5) * 8; // faster
        numDiv.vy = (Math.random() - 0.5) * 8;
    
        container.appendChild(numDiv);
        numbers.push(numDiv);
    
        numDiv.addEventListener("click", () => {
            if (i === targetNumbers[currentIndex]) {
                numDiv.style.animation = "pop 0.5s ease forwards"; 
                currentIndex++;
                if (currentIndex === targetNumbers.length) {
                    score += 500;
                    scoreboard.textContent = `Aura🔥: ${score}`;
                    displayFeedback("🎉 Nice one bro", 'correct');
                    clearInterval(timer);
                    setTimeout(() => loadTextGame(), 2000);
                }
            } else {
                numDiv.style.animation = "pop 0.5s ease forwards";
                numDiv.style.color = "red";
                displayFeedback("❌ Wrong number!", 'wrong');
                setTimeout(() => numDiv.style.color = "black", 1000);
            }
        });
    }
    
    setInterval(() => {
        numbers.forEach(numDiv => {
            let top = parseFloat(numDiv.style.top);
            let left = parseFloat(numDiv.style.left);
            const width = numDiv.offsetWidth;
            const height = numDiv.offsetHeight;
            const containerWidth = container.clientWidth;
            const containerHeight = container.clientHeight;
    
            // Update position
            top += numDiv.vy;
            left += numDiv.vx;
    
            // Bounce off edges
            if (top <= 0) {
                top = 0;
                numDiv.vy *= -1;
            }
            if (top + height >= containerHeight) {
                top = containerHeight - height;
                numDiv.vy *= -1;
            }
    
            if (left <= 0) {
                left = 0;
                numDiv.vx *= -1;
            }
            if (left + width >= containerWidth) {
                left = containerWidth - width;
                numDiv.vx *= -1;
            }
    
            numDiv.style.top = `${top}px`;
            numDiv.style.left = `${left}px`;
        });
    }, 20);
    
    
}    