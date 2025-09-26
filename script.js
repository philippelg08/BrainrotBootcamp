document.getElementById("start-btn").addEventListener("click", () => {
    const name = document.getElementById("name-input").value.trim();
    if (name === "") {
        alert("Recruit, we need your name before we start! 🫡");
        return;
    }

    document.getElementById("title-screen").classList.add("hidden");
    document.getElementById("game").classList.remove("hidden");

    document.getElementById("game").innerHTML = `
    <h2>Welcome, ${name}! 🎖️</h2>
    <p>Your training begins now...</p>
    `;
});

document.getElementById("us-map").addEventListener("load", () => {
    const svgDoc = document.getElementById("us-map").contentDocument;
    const ohio = svgDoc.getElementById("OH");
  
    ohio.addEventListener("click", () => alert("Correct! Ohio ✅"));
  });