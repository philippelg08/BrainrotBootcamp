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
    countdownMsg.classList.add("countdown-msg");
    countdownMsg.textContent = "Training begins in...";

    const countdownSpan = document.createElement("div");
    countdownSpan.id = "countdown";
    countdownSpan.textContent = "5";

    gameContent.appendChild(welcome);
    gameContent.appendChild(countdownMsg);
    gameContent.appendChild(countdownSpan);

    let countdown = 5;
    const interval = setInterval(() => {
        countdown--;
        if (countdown > 0) {
            countdownSpan.textContent = countdown;
            countdownSpan.classList.remove("bounce");
            void countdownSpan.offsetWidth;
            countdownSpan.classList.add("bounce");
        } else {
            clearInterval(interval);
            loadGame();
        }
    }, 1000);
}


function displayFeedback(message, type = 'correct', duration) {
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

function showEndScreen() {
    const nameInput = document.getElementById("name-input");
    const name = nameInput.value.trim();

    gameContent.textContent = "";

    const endScreen = document.createElement("div");
    endScreen.style.textAlign = "center";
    endScreen.style.marginTop = "100px";

    const title = document.createElement("h1");
    title.textContent = `Well done, ${name}`;

    const scoreDisplay = document.createElement("p");
    scoreDisplay.textContent = `Your final Aura🔥 score: ${score}`;
    scoreDisplay.style.fontSize = "1.5rem";
    scoreDisplay.style.fontWeight = "bold";
    scoreDisplay.style.marginTop = "10px";

    const playAgainBtn = document.createElement("button");
    playAgainBtn.textContent = "Play Again";
    playAgainBtn.classList.add("play-again-btn");

    playAgainBtn.addEventListener("click", () => {
        score = 0;

        gameContent.textContent = "";

        titleScreen.classList.remove("hidden");
        gameScreen.classList.add("hidden");

        const nameInput = document.getElementById("name-input");
        if (nameInput) nameInput.value = "";
    });


    endScreen.appendChild(title);
    endScreen.appendChild(scoreDisplay);
    endScreen.appendChild(playAgainBtn);

    gameContent.appendChild(endScreen);
}

function loadGame() {
    gameContent.textContent = "";

    const topBar = document.createElement("div");
    topBar.id = "top-bar";
    topBar.style.display = "flex";
    topBar.style.justifyContent = "space-between";
    topBar.style.alignItems = "center";
    topBar.style.maxWidth = "600px";
    topBar.style.margin = "20px auto 20px auto";
    topBar.style.padding = "0 10px";

    const scoreboard = document.createElement("div");
    scoreboard.id = "scoreboard";
    scoreboard.textContent = `Aura🔥: ${score}`;

    const timerBox = document.createElement("div");
    timerBox.id = "timer-box";
    timerBox.textContent = "Time: 15";

    topBar.appendChild(scoreboard);
    topBar.appendChild(timerBox);
    gameContent.appendChild(topBar);

    const instructions = document.createElement("p");
    instructions.id = "instructions";
    instructions.classList.add("instructions");
    instructions.style.textAlign = "center";
    instructions.style.marginBottom = "20px";
    gameContent.appendChild(instructions);

    const feedbackBox = document.createElement("div");
    feedbackBox.id = "feedback-box";
    feedbackBox.style.textAlign = "center";
    feedbackBox.style.marginBottom = "20px";
    gameContent.appendChild(feedbackBox);

    const gameContainer = document.createElement("div");
    gameContainer.id = "game-container";
    gameContent.appendChild(gameContainer);

    function setInstructions(text) {
        instructions.textContent = text;
    }

    const miniGames = [
        loadMewingGame,
        loadTextGame,
        loadSlangGame,
        load67Game,
        loadKneeSurgeryGame,
        loadOhioGame
    ];

    const shuffledGames = miniGames
        .map(g => ({ game: g, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(obj => obj.game);

    let currentIndex = 0;

    function nextGame() {
        if (currentIndex < shuffledGames.length) {
            const gameFunc = shuffledGames[currentIndex];
            currentIndex++;
            // Pass the shared elements to the mini-game
            gameFunc({ gameContainer, scoreboard, timerBox, feedbackBox, setInstructions });
        } else {
            showEndScreen();
        }
    }

    window.onGameEnd = nextGame;

    nextGame();

    return { scoreboard, timerBox, feedbackBox, setInstructions };
}





function loadOhioGame({ gameContainer, scoreboard, timerBox, feedbackBox, setInstructions }) {
    gameContainer.textContent = "";

    setInstructions("Click on Ohio!");

    const object = document.createElement("object");
    object.id = "us-map";
    object.type = "image/svg+xml";
    object.data = "assets/us.svg";

    object.style.width = "600px";
    object.style.height = "auto";
    object.style.display = "block";
    object.style.margin = "0 auto";

    gameContainer.appendChild(object);

    const timer = startTimer(15, timerBox, () => {
        displayFeedback("⏰ Time's up!", "wrong", 1000);
        setTimeout(() => {
            if (window.onGameEnd) window.onGameEnd();
        }, 1000);
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
                    displayFeedback("+500 Aura🔥", 'correct', 1000);

                    clearInterval(timer);

                    setTimeout(() => {
                        if (window.onGameEnd) window.onGameEnd();
                    }, 1000);

                } else {
                    state.style.fill = "red";
                    displayFeedback("❌ That's not Ohio bro 💀", 'wrong', 1000);
                }
            });
        });
    });
}


function loadKneeSurgeryGame({ gameContainer, scoreboard, timerBox, feedbackBox, setInstructions }) {
    gameContainer.textContent = "";

    setInstructions("Click the spot that needs surgery!");


    const container = document.createElement("div");
    container.style.position = "relative";
    container.style.display = "inline-block";

    const bodyImg = document.createElement("img");
    bodyImg.src = "assets/body.png";
    bodyImg.alt = "Body Outline";
    bodyImg.id = "body-img";
    bodyImg.style.width = "250px";
    bodyImg.style.height = "auto";
    bodyImg.style.cursor = "pointer";

    container.appendChild(bodyImg);
    gameContainer.appendChild(container);

    const kneeTargets = [
        { x: 0.51, y: 0.70, width: 0.2, height: 0.1 },
        { x: 0.26, y: 0.70, width: 0.2, height: 0.1 }
    ];

    const timer = startTimer(15, timerBox, () => {
        displayFeedback("⏰ Time's up!", "wrong", 1000);
        setTimeout(() => {
            if (window.onGameEnd) window.onGameEnd();
        }, 1000);
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
            displayFeedback("+500 Aura 🔥", "correct", 1000);
            clearInterval(timer);
            setTimeout(() => {
                if (window.onGameEnd) window.onGameEnd();
            }, 1000);
        } else {
            displayFeedback("❌ Wrong! That's not the place", "wrong", 1000);
        }
    });
}

function load67Game({ gameContainer, scoreboard, timerBox, feedbackBox, setInstructions }) {
    gameContainer.textContent = "";

    setInstructions("You know what to click.");

    const container = document.createElement("div");
    container.style.position = "relative";
    container.style.width = "50vw";
    container.style.height = "50vh";
    container.style.margin = "0 auto";
    container.style.border = "2px solid #222";
    container.style.overflow = "hidden";
    container.style.background = "#f0f0f0";
    container.style.cursor = "pointer";

    gameContainer.appendChild(container);

    const timer = startTimer(15, timerBox, () => {
        displayFeedback("Time's up", "wrong", 1000);
        setTimeout(() => {
            if (window.onGameEnd) window.onGameEnd();
        }, 1000);
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

        numDiv.vx = (Math.random() - 0.5) * 8; 
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
                    displayFeedback("67 🔥", 'correct', 1000);
                    clearInterval(timer);
                    clearInterval(movementInterval);
                    setTimeout(() => {
                        if (window.onGameEnd) window.onGameEnd();
                    }, 1000);
                }
            } else {
                numDiv.style.color = "red";
                displayFeedback("❌ Wrong number!", 'wrong', 1000);
                setTimeout(() => numDiv.style.color = "black", 1000);
            }
        });
    }

    const movementInterval = setInterval(() => {
        numbers.forEach(numDiv => {
            let top = parseFloat(numDiv.style.top);
            let left = parseFloat(numDiv.style.left);
            const width = numDiv.offsetWidth;
            const height = numDiv.offsetHeight;
            const containerWidth = container.clientWidth;
            const containerHeight = container.clientHeight;

            top += numDiv.vy;
            left += numDiv.vx;

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


function loadTextGame({ gameContainer, scoreboard, timerBox, feedbackBox, setInstructions }) {
    gameContainer.textContent = "";

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const textAbbreviations = shuffleArray([
        { abbr: "FYP", full: "For You Page" },
        { abbr: "GRWM", full: "Get ready with me" },
        { abbr: "IYKYK", full: "If you know you know" },
        { abbr: "L", full: "Loss" },
        { abbr: "MFW", full: "My face when" },
        { abbr: "NPC", full: "Non playable character" },
        { abbr: "POV", full: "Point of view" },
        { abbr: "TFW", full: "That feeling when" },
        { abbr: "W", full: "Win" },
        { abbr: "TLDR", full: "Too long didn't read" },
        { abbr: "pmo", full: ["Piss me off", "Put me on"] },
        { abbr: "ICL", full: "I can't lie" },
        { abbr: "ong", full: "On God" },
        { abbr: "smh", full: ["Shaking my head", "shake my head"] }
    ]);

    const container = document.createElement("div");
    container.id = "text-game-container";

    setInstructions("Write out what the abbreviations mean");

    const currentAbbr = document.createElement("div");
    currentAbbr.id = "current-abbr";
    currentAbbr.style.fontSize = "2rem";
    currentAbbr.style.fontWeight = "bold";
    currentAbbr.style.marginBottom = "10px";
    currentAbbr.style.textAlign = "center";

    const input = document.createElement("input");
    input.id = "text-input";
    input.type = "text";
    input.placeholder = "Type full text here...";
    input.autocomplete = "off";

    container.appendChild(currentAbbr);
    container.appendChild(input);

    gameContainer.appendChild(container);

    const timer = startTimer(20, timerBox, () => {
        displayFeedback("⏰ Time's up!", "wrong", 1000);
        setTimeout(() => {
            if (window.onGameEnd) window.onGameEnd();
        }, 1000);
    });

    let currentAbbrIndex = 0;

    function showNextAbbr() {
        if (currentAbbrIndex >= textAbbreviations.length) return;
        currentAbbr.textContent = textAbbreviations[currentAbbrIndex].abbr;
        currentAbbr.style.animation = "popIn 0.3s ease forwards";
    }

    showNextAbbr();

    input.addEventListener("input", () => {
        const userInput = input.value.trim().toLowerCase();
        const fullValue = textAbbreviations[currentAbbrIndex].full;

        const validAnswers = Array.isArray(fullValue)
            ? fullValue.map(v => v.toLowerCase())
            : [fullValue.toLowerCase()];

        if (validAnswers.includes(userInput)) {
            score += 200;
            scoreboard.textContent = `Aura🔥: ${score}`;
            input.value = "";
            displayFeedback("+200 Aura 🔥", "correct", 500);
            currentAbbrIndex++;

            if (currentAbbrIndex >= textAbbreviations.length) {
                clearInterval(timer);
                displayFeedback("You're insane 🔥", "correct", 1000);
                setTimeout(() => {
                    if (window.onGameEnd) window.onGameEnd();
                }, 1000);
            } else {
                showNextAbbr();
            }
        } else if (userInput.length >= (Array.isArray(fullValue) ? Math.max(...fullValue.map(v => v.length)) : fullValue.length)) {
            input.style.borderColor = "red";
            setTimeout(() => input.style.borderColor = "#222", 500);
        }
    });
}

function loadMewingGame({ gameContainer, scoreboard, timerBox, feedbackBox, setInstructions }) {
    gameContainer.textContent = "";

    setInstructions("🤫 x3");

    const stage = document.createElement("div");
    stage.id = "text-game-container";
    stage.style.position = "relative";
    stage.style.width = "600px";
    stage.style.margin = "0 auto";
    stage.style.userSelect = "none";

    gameContainer.appendChild(stage);

    const timer = startTimer(15, timerBox, () => {
        displayFeedback("You gotta practice your mewing bro", "wrong", 1000);
        setTimeout(() => {
            if (window.onGameEnd) window.onGameEnd();
        }, 1000);
    });
    const jaw = document.createElement("img");
    jaw.src = "assets/jaw.png";
    jaw.alt = "Skull";
    jaw.style.display = "block";
    jaw.style.width = "70%";
    jaw.style.height = "auto";
    jaw.style.pointerEvents = "none";
    jaw.style.marginLeft = "60px";
    stage.appendChild(jaw);

    const sliderLayer = document.createElement("div");
    sliderLayer.style.position = "absolute";
    sliderLayer.style.inset = "0";
    sliderLayer.style.pointerEvents = "none";
    stage.appendChild(sliderLayer);

    const track = document.createElement("div");
    track.style.position = "absolute";
    sliderLayer.appendChild(track);

    const finger = document.createElement("img");
    finger.src = "assets/finger.png";
    finger.alt = "Finger";
    finger.style.position = "absolute";
    finger.style.width = "90px";
    finger.style.height = "auto";
    finger.style.cursor = "grab";
    finger.style.transform = "translate(-50%, -50%)";
    stage.appendChild(finger);

    let isDragging = false;
    let swipeCount = 0;

    function layout() {
        const stageRect = stage.getBoundingClientRect();
        const jawRect = jaw.getBoundingClientRect();

        const offsetX = jawRect.left - stageRect.left;
        const offsetY = jawRect.top - stageRect.top;

        const startX = offsetX + jawRect.width * 0.45;
        const startY = offsetY + jawRect.height * 1.05;

        const endX = offsetX + jawRect.width * 0.10;
        const endY = offsetY + jawRect.height * 1.1;

        const dx = endX - startX;
        const dy = endY - startY;
        const length = Math.hypot(dx, dy);
        const angleDeg = Math.atan2(dy, dx) * (180 / Math.PI);

        track.style.left = `${startX}px`;
        track.style.top = `${startY}px`;
        track.style.width = `${length}px`;
        track.style.height = `4px`;
        track.style.transformOrigin = "0 50%";
        track.style.transform = `rotate(${angleDeg}deg)`;
        track.style.borderRadius = "2px";

        const fingerRect = finger.getBoundingClientRect();
        const fingerHalfW = fingerRect.width / 2;
        const fingerHalfH = fingerRect.height / 2;

        let t = 0;

        function setFingerAt(tParam) {
            t = Math.min(1, Math.max(0, tParam));
            const x = startX + dx * t;
            const y = startY + dy * t;
            finger.style.left = `${x}px`;
            finger.style.top = `${y}px`;
        }

        setFingerAt(0);

        function projectToSegment(px, py) {
            const vx = dx;
            const vy = dy;
            const len2 = vx * vx + vy * vy || 1;
            const tRaw = ((px - startX) * vx + (py - startY) * vy) / len2;
            return Math.min(1, Math.max(0, tRaw));
        }

        function onPointerDown(e) {
            isDragging = true;
            finger.style.cursor = "grabbing";
            e.preventDefault();
        }

        function onPointerUp() {
            if (!isDragging) return;
            isDragging = false;
            finger.style.cursor = "grab";

            if (t >= 0.999) {
                swipeCount += 1;

                if (swipeCount < 3) {
                    setFingerAt(0);
                } else {
                    clearInterval(timer);
                    score += 500;
                    scoreboard.textContent = `Aura🔥: ${score}`;
                    displayFeedback("+500 Aura 🔥", "correct", 1000);
                    setTimeout(() => {
                        if (window.onGameEnd) window.onGameEnd();
                    }, 1000);
                }
            }
        }

        function onPointerMove(e) {
            if (!isDragging) return;

            const pointX = (e.touches ? e.touches[0].clientX : e.clientX);
            const pointY = (e.touches ? e.touches[0].clientY : e.clientY);

            const sr = stage.getBoundingClientRect();
            const localX = pointX - sr.left;
            const localY = pointY - sr.top;

            const tNew = projectToSegment(localX, localY);
            setFingerAt(tNew);
        }

        finger.onmousedown = onPointerDown;
        window.addEventListener("mouseup", onPointerUp);
        window.addEventListener("mousemove", onPointerMove);

        finger.ontouchstart = onPointerDown;
        window.addEventListener("touchend", onPointerUp, { passive: false });
        window.addEventListener("touchmove", onPointerMove, { passive: false });

        function cleanup() {
            window.removeEventListener("mouseup", onPointerUp);
            window.removeEventListener("mousemove", onPointerMove);
            window.removeEventListener("touchend", onPointerUp);
            window.removeEventListener("touchmove", onPointerMove);
        }

        const onResize = () => {
            cleanup();
            layout();
        };
        window.addEventListener("resize", onResize, { once: true });
    }

    if (jaw.complete) {
        requestAnimationFrame(layout);
    } else {
        jaw.onload = () => requestAnimationFrame(layout);
    }
}

function loadSlangGame({ gameContainer, scoreboard, timerBox, feedbackBox, setInstructions }) {
    gameContainer.textContent = "";

    const slangTerms = [
        { word: "Rizz", meaning: "Charm or smooth talking ability, usually when flirting" },
        { word: "Cap", meaning: "A lie or exaggeration" },
        { word: "Bussin", meaning: "Really tasty or amazing (often about food)" },
        { word: "Goofy ahh", meaning: "Ridiculously silly or dumb" },
        { word: "Fanum tax", meaning: "Stealing food from your friends as a joke" },
        { word: "Delulu", meaning: "Being totally delusional or unrealistic" },
        { word: "Alpha", meaning: "Leader" },
        { word: "Beta", meaning: "Follower" },
        { word: "Sigma", meaning: "Lone wolf" },
        { word: "Vibe check", meaning: "Judging the mood or energy of a situation/person" },
        { word: "Sus", meaning: "Suspicious or shady" },
        { word: "Slaps", meaning: "Something that hits hard in a good way (like music)" },
        { word: "Cringe", meaning: "Embarrassing or awkward" },
        { word: "Grindset", meaning: "Obsessive hustle/work mentality" },
        { word: "Looksmaxxing", meaning: "Trying hard to improve physical looks, sometimes extreme" },
        { word: "Goated", meaning: "The greatest, legendary, the best" },
        { word: "Simp", meaning: "Someone who overdoes it for their crush or partner" },
        { word: "Crash out", meaning: "Acting reckless or losing control" },
        { word: "Doomscrolling", meaning: "Endlessly scrolling through reels and tiktoks" }
    ];

    setInstructions("Test your brainrot vocabulary");

    const question = document.createElement("div");
    question.id = "question-container";
    question.classList.add("question-box");


    const cardsContainer = document.createElement("div");
    cardsContainer.style.display = "grid";
    cardsContainer.style.gridTemplateColumns = "repeat(auto-fit, minmax(200px, 1fr))";
    cardsContainer.style.gap = "15px";
    cardsContainer.style.margin = "20px auto";
    cardsContainer.style.maxWidth = "500px";

    gameContainer.appendChild(question);
    gameContainer.appendChild(cardsContainer);

    let timer = startTimer(20, timerBox, () => {
        displayFeedback("Time’s up!", "wrong", 1000);
        setTimeout(() => {
            if (window.onGameEnd) window.onGameEnd();
        }, 1000);
    });

    const sessionTerms = slangTerms.sort(() => Math.random() - 0.5);
    let currentIndex = 0;

    function newRound() {
        cardsContainer.textContent = "";

        if (currentIndex >= sessionTerms.length) return;

        const correct = sessionTerms[currentIndex];
        currentIndex++;

        question.textContent = correct.word;

        let wrongChoices = slangTerms
            .filter(s => s.word !== correct.word)
            .sort(() => 0.5 - Math.random())
            .slice(0, 3);

        let options = [...wrongChoices, correct].sort(() => 0.5 - Math.random());

        options.forEach(option => {
            const card = document.createElement("div");
            card.textContent = option.meaning;
            card.classList.add("card");
            card.style.display = "flex";
            card.style.alignItems = "center";
            card.style.justifyContent = "center";
            card.style.textAlign = "center";
            card.style.padding = "15px";
            card.style.border = "2px solid #333";
            card.style.borderRadius = "10px";
            card.style.cursor = "pointer";
            card.style.background = "white";
            card.style.transition = "0.3s";
            card.style.minHeight = "80px";

            if (currentIndex >= sessionTerms.length) {
                clearInterval(timer);
                displayFeedback("You're insane🔥", "correct", 1000);
                setTimeout(() => {
                    if (window.onGameEnd) window.onGameEnd();
                }, 1000);
                return;
            }
            

            card.addEventListener("click", () => {
                if (option.word === correct.word) {
                    card.style.background = "#4CAF50";
                    score += 100;
                    scoreboard.textContent = `Aura🔥: ${score}`;
                    displayFeedback("+100 Aura 🔥", "correct", 500);
                } else {
                    card.style.background = "#f44336"; 
                    displayFeedback("Wrong!", "wrong");
                }
                setTimeout(newRound, 500);
            });

            cardsContainer.appendChild(card);
        });
    }
    newRound();
}


