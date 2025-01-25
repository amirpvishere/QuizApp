const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

const quizData = [
  { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], correct: "4" },
  { question: "Which planet is the biggest planet in solar system?", options: ["Earth", "Mars", "Jupiter", "Venus"], correct: "Jupiter" },
  { question: "What is the capital of Canada?", options: ["Ottawa", "London", "Toronto", "Vanvouver"], correct: "Ottawa" },
  { question: "Which one is the oldest nation?", options: ["Egypt", "Iran", "China", "Greece"], correct: "Iran" },
  { question: "Which one is NOT a mammal?", options: ["Elephant", "Snake", "Shark", "Giraffe"], correct: "Snake" },
  { question: "Which country has the most World Cup Trophy in the history?", options: ["Italy", "Germany", "Argentina", "Brazil"], correct: "Brazil" },
  { question: "Which element has the chemical symbol Carbon Dioxide?", options: ["H2O", "O2H", "OC2", "CO2"], correct: "CO2" },
  { question: "What is the square root of 81?", options: ["6", "7", "8", "9"], correct: "9" },
  { question: "Who has the biggest empire?", options: ["Gengiz Khan", "Cyrus", "Julio Ceasar", "Hitler"], correct: "Gengiz Khan" },
  { question: "What is the icing point of water?", options: ["0°C", "100°C", "120°C", "150°C"], correct: "0°C" }
];

app.get('/', (req, res) => {
    let quizForm = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Quiz</title>
        <link rel="stylesheet" href="/styles.css">
      </head>
      <body>
        <h1>Quiz</h1>
        <form action="/submit" method="POST">
    `;
  
    quizData.forEach((item, index) => {
      quizForm += `
        <p>${index + 1}. ${item.question}</p>
      `;
      item.options.forEach((option) => {
        quizForm += `
          <input type="radio" name="q${index}" value="${option}" required> ${option}<br>
        `;
      });
    });
  
    quizForm += `
          <button type="submit">Submit</button>
        </form>
      </body>
      </html>
    `;
  
    res.send(quizForm);
  });

  app.post('/submit', (req, res) => {
    const userAnswers = req.body;
    let resultHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Results</title>
        <link rel="stylesheet" href="/styles.css">
      </head>
      <body>
        <h1>Results</h1>
        <table>
          <tr>
            <th>Question</th>
            <th>Your Answer</th>
            <th>Correct Answer</th>
            <th>Result</th>
          </tr>
    `;
  
    quizData.forEach((item, index) => {
      const userAnswer = userAnswers[`q${index}`];
      const isCorrect = userAnswer === item.correct;
  
      resultHTML += `
        <tr>
          <td>${item.question}</td>
          <td>${userAnswer || "No Answer"}</td>
          <td>${item.correct}</td>
          <td>${isCorrect ? "Correct" : "Incorrect"}</td>
        </tr>
      `;
    });
  
    resultHTML += `
    </table>
    <form action="/" method="GET">
      <button type="submit">Try Again</button>
    </form>
  </body>
  </html>
`;
  
    res.send(resultHTML);
  });
  

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
