
const cubeInput = document.getElementById('cubeInput');
const solveButton = document.getElementById('solveButton');
const scrambleButton = document.getElementById('scrambleButton');
const solutionBox = document.getElementById('solution');
const charCount = document.querySelector('.char-count');

cubeInput.addEventListener('input', function() {
    const count = this.value.length;
    charCount.textContent = `${count}/54`;
    charCount.style.color = count === 54 ? '#22c55e' : count > 54 ? '#ef4444' : '#6b7280';
    
    
    if (count > 54) {
        this.value = this.value.slice(0, 54);
    }
});

solveButton.addEventListener('click', async function() {
    const cubeState = cubeInput.value.trim();
    
    if (cubeState.length !== 54) {
        showError('Please enter exactly 54 characters');
        return;
    }

    if (!/^[URFDLB]+$/.test(cubeState)) {
        showError('Only U, R, F, D, L, B characters are allowed');
        return;
    }

    showLoading();
    
    try {
        const response = await fetch('http://127.0.0.1:5000/solve', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cube: cubeState })
        });

        const data = await response.json();

        if (response.ok) {
            if (data.solution.includes('Error')) {
                showError(data.solution);
            } else if (data.solution.includes('already solved')) {
                showSuccess(data.solution, true);
            } else {
                showSolution(data.solution);
            }
        } else {
            showError(data.error || 'Failed to solve cube');
        }
    } catch (error) {
        console.error('Fetch error:', error);
        showError('Cannot connect to server. Make sure Flask is running on port 5000');
    }
});


scrambleButton.addEventListener('click', () => {
    const moves = ["R", "R'", "R2", "L", "L'", "L2", "U", "U'", "U2", "D", "D'", "D2", "F", "F'", "F2", "B", "B'", "B2"];
    let scramble = [];
    let prev = '';

    for (let i = 0; i < 20; i++) {
        let move;
        do {
            move = moves[Math.floor(Math.random() * moves.length)];
        } while (move[0] === prev);
        scramble.push(move);
        prev = move[0];
    }

    solutionBox.innerHTML = `
        <div style="color: #f59e0b; margin-bottom: 10px;">🔀 Generated Scramble:</div>
        <div class="solution-moves">${scramble.map(m => `<span class="move">${m}</span>`).join('')}</div>
        <div style="margin-top: 15px; color: #6b7280; font-size: 0.9em;">
            Copy this scramble and try to solve it!
        </div>
    `;

    
    cubeInput.value = 'UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB';
    charCount.textContent = '54/54';
    charCount.style.color = '#22c55e';
});


function showLoading() {
    solutionBox.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
            <div class="loading"></div>
            <span>Analyzing cube state...</span>
        </div>
    `;
}

function showError(message) {
    solutionBox.innerHTML = `
        <div style="color: #ef4444;">
            <span style="font-size: 1.2em;">❌</span>
            ${message}
        </div>
    `;
}

function showSuccess(message, isSolved = false) {
    solutionBox.innerHTML = `
        <div style="color: #22c55e; ${isSolved ? 'animation: cubeRotate 2s ease-in-out;' : ''}">
            <span style="font-size: 1.2em;">✅</span>
            ${message}
        </div>
    `;
}

function showSolution(moveString) {
    const moves = moveString.split(' ');
    solutionBox.innerHTML = `
        <div style="color: #10b981; margin-bottom: 15px;">
            <span style="font-size: 1.2em;">✅</span>
            Solution found (${moves.length} moves):
        </div>
        <div class="solution-moves">${moves.map(m => `<span class="move">${m}</span>`).join('')}</div>
        <div style="margin-top: 15px; color: #6b7280; font-size: 0.9em;">
            Click each move to see it animated...
        </div>
    `;

    
    const moveElements = solutionBox.querySelectorAll('.move');
    moveElements.forEach((moveEl, index) => {
        moveEl.style.cursor = 'pointer';
        moveEl.addEventListener('click', () => {
            highlightMove(moveEl, moves[index]);
        });
    });
}

function highlightMove(element, move) {
    
    document.querySelectorAll('.move').forEach(m => {
        m.style.transform = 'scale(1)';
        m.style.boxShadow = 'none';
    });
    
    
    element.style.transform = 'scale(1.1)';
    element.style.boxShadow = '0 0 15px rgba(16, 185, 129, 0.5)';
    
   
    console.log('Animating move:', move);
}


cubeInput.addEventListener('focus', () => {
    if (cubeInput.value === '') {
        cubeInput.placeholder = 'Try: UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB';
    }
});


cubeInput.value = 'UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB';
charCount.textContent = '54/54';
charCount.style.color = '#22c55e';