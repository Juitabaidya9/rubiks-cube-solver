// Add character counter
const cubeInput = document.getElementById("cubeInput");
const charCount = document.createElement("div");
charCount.className = "char-count";
charCount.textContent = "0/54 characters";
cubeInput.parentNode.insertBefore(charCount, cubeInput.nextSibling);

cubeInput.addEventListener("input", function() {
    const count = this.value.length;
    charCount.textContent = `${count}/54 characters`;
    charCount.style.color = count === 54 ? "#00ff00" : count > 54 ? "#ff4444" : "#888";
});

document.getElementById("solveButton").addEventListener("click", async function () {
    const cubeState = document.getElementById("cubeInput").value.trim();
    const solutionBox = document.getElementById("solution");

    if (cubeState.length !== 54) {
        solutionBox.innerHTML = "❌ Please enter exactly 54 characters.";
        return;
    }

    // Validate characters
    const validChars = /^[URFDLB]+$/;
    if (!validChars.test(cubeState)) {
        solutionBox.innerHTML = "❌ Invalid characters. Only U, R, F, D, L, B allowed.";
        return;
    }

    solutionBox.innerHTML = "⏳ Solving...";

    try {
        // Create proper JSON object with double quotes
        const jsonData = {
            cube: cubeState
        };

        const response = await fetch("http://127.0.0.1:5000/solve", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(jsonData),
        });

        const data = await response.json();

        if (response.ok) {
            if (data.solution.includes("Error")) {
                solutionBox.innerHTML = "❌ " + data.solution;
            } else {
                const moves = data.solution.trim().split(" ");
                solutionBox.innerHTML = "✅ Solution:<br><br>";
                animateMoves(moves, solutionBox);
            }
        } else {
            solutionBox.innerHTML = "❌ " + (data.error || "Failed to solve.");
        }

    } catch (error) {
        console.error("Fetch error:", error);
        solutionBox.innerHTML = "❌ Error connecting to server. Make sure Flask is running.";
    }
});

function animateMoves(moves, container) {
    let index = 0;
    container.innerHTML = "✅ Solution:<br><br>";

    const interval = setInterval(() => {
        if (index >= moves.length) {
            clearInterval(interval);
            return;
        }

        const span = document.createElement("span");
        span.textContent = moves[index] + " ";
        span.style.paddingRight = "6px";
        span.style.color = "#00ff00";
        span.style.fontWeight = "bold";
        span.style.fontSize = "1.1em";

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
    
    // Auto-fill the input with a solved state for testing
    document.getElementById("cubeInput").value = "UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB";
    charCount.textContent = "54/54 characters";
    charCount.style.color = "#00ff00";
});