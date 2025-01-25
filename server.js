const express = require('express');
const cors = require('cors');
const path = require('path')

const app = express();
const port = 4000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'frontend')));
app.use(express.json());

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

app.post('/submit', (req, res) => {
    const userAnswers = req.body.answers;
    const results = quizData.map((q, index) => ({
        question: q.question,
        userAnswer: userAnswers[index],
        isCorrect: userAnswers[index] === q.correct
    }));
    res.json(results);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
});