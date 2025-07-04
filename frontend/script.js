
document.getElementById("solveButton").addEventListener("click", async function () {
    const cubeState = document.getElementById("cubeInput").value.trim();
    const solutionBox = document.getElementById("solution");

    if (cubeState.length !== 54) {
        solutionBox.innerHTML = "❌ Please enter a valid 54-character cube string.";
        return;
    }

    solutionBox.innerHTML = "⏳ Solving...";

    try {
        const response = await fetch("http://127.0.0.1:5000/solve", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ cube: cubeState }),
        });

        const data = await response.json();

        if (response.ok) {
            const moves = data.solution.trim().split(" ");
            solutionBox.innerHTML = "✅ Solving with animation:<br><br>";
            animateMoves(moves, solutionBox);
        } else {
            solutionBox.innerHTML = "❌ " + (data.error || "Failed to solve.");
        }

    } catch (error) {
        console.error(error);
        solutionBox.innerHTML = "❌ Error solving cube.";
    }
});


function animateMoves(moves, container) {
    let index = 0;

    const interval = setInterval(() => {
        if (index >= moves.length) {
            clearInterval(interval);
            return;
        }

        const span = document.createElement("span");
        span.textContent = moves[index] + " ";
        span.style.paddingRight = "6px";
        span.style.color = "#00ff00"; // green color
        span.style.fontWeight = "bold";

        container.appendChild(span);
        index++;
    }, 600); 
}


document.getElementById("scrambleButton").addEventListener("click", () => {
    const moves = ["R", "R'", "R2", "L", "L'", "L2", "U", "U'", "U2", "D", "D'", "D2", "F", "F'", "F2", "B", "B'", "B2"];
    let scramble = [];
    let prev = "";

    for (let i = 0; i < 20; i++) {
        let move;
        do {
            move = moves[Math.floor(Math.random() * moves.length)];
        } while (move[0] === prev); 
        scramble.push(move);
        prev = move[0];
    }

    const solutionBox = document.getElementById("solution");
    solutionBox.innerHTML = "🔀 Scramble:<br><br>" + scramble.join(" ");
});
