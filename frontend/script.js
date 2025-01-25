const quizData = [
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], correct: "4" },
    { question: "Which planet is the biggest planet in solar system?", options: ["Earth", "Mars", "Jupiter", "Venus"], correct: "Jupiter" },
    { question: "What is the capital of Canada?", options: ["Ottawa", "London", "Toronto", "Vancouver"], correct: "Ottawa" },
    { question: "Which one is the oldest nation?", options: ["Egypt", "Iran", "China", "Greece"], correct: "Iran" },
    { question: "Which one is NOT a mammal?", options: ["Elephant", "Snake", "Shark", "Giraffe"], correct: "Snake" },
    { question: "Which country has the most World Cup Trophy in the history?", options: ["Italy", "Germany", "Argentina", "Brazil"], correct: "Brazil" },
    { question: "Which element has the chemical symbol Carbon Dioxide?", options: ["H2O", "O2H", "OC2", "CO2"], correct: "CO2" },
    { question: "What is the square root of 81?", options: ["6", "7", "8", "9"], correct: "9" },
    { question: "Who has the biggest empire?", options: ["Gengiz Khan", "Cyrus", "Julio Ceasar", "Hitler"], correct: "Gengiz Khan" },
    { question: "What is the icing point of water?", options: ["0°C", "100°C", "120°C", "150°C"], correct: "0°C" }
]

const quizForm = document.getElementById('quizForm');
quizData.forEach((q, index) => {
    const questionDiv = document.createElement('div');

    console.log(q.question);
    questionDiv.innerText = `${q.question}`;
    questionDiv.innerHTML += '<br>'
    
    q.options.forEach((option) => {
        questionDiv.innerHTML += `
        <label>
            <input type="radio" name="question${index}" value="${option}" required>
            ${option}
        </label><br>`;
    })
    quizForm.appendChild(questionDiv);
});

quizForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const answers = quizData.map((_, index) => formData.get(`question${index}`));

    const response = await fetch('http://localhost:4000/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers })
    });

    const results = await response.json();

    const resultsTableBody = document.getElementById('resultsTable').querySelector('tbody');
    resultsTableBody.innerHTML = '';

    results.forEach((result) => {
        const row = `
        <tr>
            <td>${result.question}</td>
            <td>${result.userAnswer}</td>
            <td>${result.isCorrect? 'Correct' : 'Incorrect'}</td>
        </tr>`;
        resultsTableBody.innerHTML += row;
    });
});