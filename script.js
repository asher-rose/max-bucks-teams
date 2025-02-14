// Sample dares with points
const dares = [
    { text: "Get 3 pieces of marriage advice for Max, from 3 different people", points: 5 },
    { text: "Swap an item of clothing with someone", points: 5 },
    { text: "Find a girl that looks the most like Jenny, and get a photo with them", points: 5 },
    { text: "Convince a stranger that you know them", points: 4 },
    { text: "Find another Max and get a photo with them", points: 4 },
    { text: "Get someone to sign their name on you, or something you have", points: 3 },
    { text: "Get someone to teach you their signature dance move", points: 3 },
    { text: "Start a slow clap", points: 2 },
    { text: "Compliment someone", points: 1 },
    { text: "BONUS: Bring at least 2 new people with you to meet the rest of the group at the end", points: 8 }
];

// Initialize the game state
let gameState = JSON.parse(localStorage.getItem('bachelorPartyGame')) || {
    team1: { points: 0, completedDares: [], mandatoryCompleted: false },
    team2: { points: 0, completedDares: [], mandatoryCompleted: false },
    team3: { points: 0, completedDares: [], mandatoryCompleted: false }
};

// Update the UI with current game state
function updateUI() {
    ['team1', 'team2', 'team3'].forEach(teamId => {
        const team = gameState[teamId];
        const teamElement = document.getElementById(teamId);
        const scoreElement = teamElement.querySelector('.score span');
        const dareList = teamElement.querySelector('.dare-list');
        const mandatorySection = teamElement.querySelector('.mandatory-section');
        const mandatoryBtn = teamElement.querySelector('.mandatory-btn');

        // Update score
        scoreElement.textContent = team.points;
        
        // Update mandatory section
        mandatorySection.className = `mandatory-section ${team.mandatoryCompleted ? 'completed' : ''}`;
        mandatoryBtn.className = `mandatory-btn ${team.mandatoryCompleted ? 'completed' : ''}`;
        mandatoryBtn.textContent = team.mandatoryCompleted ? '✓' : 'Complete';
        mandatoryBtn.onclick = () => toggleMandatory(teamId);

        // Clear and rebuild dare list
        dareList.innerHTML = '';
        dares.forEach((dare, index) => {
            const dareItem = document.createElement('div');
            dareItem.className = `dare-item ${team.completedDares.includes(index) ? 'completed' : ''}`;
            
            const dareText = document.createElement('span');
            dareText.textContent = `${dare.text} (${dare.points} pts)`;
            
            const completeButton = document.createElement('button');
            completeButton.textContent = team.completedDares.includes(index) ? '✓' : 'Complete';
            completeButton.onclick = () => toggleDare(teamId, index, dare.points);
            
            dareItem.appendChild(dareText);
            dareItem.appendChild(completeButton);
            dareList.appendChild(dareItem);
        });
    });

    // Save state
    localStorage.setItem('bachelorPartyGame', JSON.stringify(gameState));
}

// Toggle dare completion
function toggleDare(teamId, dareIndex, points) {
    const team = gameState[teamId];
    const dareCompleted = team.completedDares.includes(dareIndex);
    
    if (dareCompleted) {
        team.completedDares = team.completedDares.filter(d => d !== dareIndex);
        team.points -= points;
    } else {
        team.completedDares.push(dareIndex);
        team.points += points;
    }
    
    updateUI();
}

// Toggle mandatory task completion
function toggleMandatory(teamId) {
    const team = gameState[teamId];
    team.mandatoryCompleted = !team.mandatoryCompleted;
    updateUI();
}

// Initialize the UI when the page loads
document.addEventListener('DOMContentLoaded', updateUI); 