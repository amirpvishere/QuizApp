const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
    secret: 'Quiz',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 600000 }
})
);

app.set('view engine', 'ejs');

const quizQuestion = [
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
    { question: "Which planet is the biggest planet in solar system?", options: ["Earth", "Mars", "Jupiter", "Venus"], answer: "Jupiter" },
    { question: "What is the capital of Canada?", options: ["Ottawa", "London", "Toronto", "Vanvouver"], answer: "Ottawa" },
    { question: "Which one is the oldest nation?", options: ["Egypt", "Iran", "China", "Greece"], answer: "Iran" },
    { question: "Which one is NOT a mammal?", options: ["Elephant", "Snake", "Shark", "Giraffe"], answer: "Snake" },
    { question: "Which country has the most World Cup Trophy in the history?", options: ["Italy", "Germany", "Argentina", "Brazil"], answer: "Brazil" },
    { question: "Which element has the chemical symbol Carbon Dioxide?", options: ["H2O", "O2H", "OC2", "CO2"], answer: "CO2" },
    { question: "What is the square root of 81?", options: ["6", "7", "8", "9"], answer: "9" },
    { question: "Who has the biggest empire?", options: ["Gengiz Khan", "Cyrus", "Julio Ceasar", "Hitler"], answer: "Gengiz Khan" },
    { question: "What is the icing point of water?", options: ["0°C", "100°C", "120°C", "150°C"], answer: "0°C" }  
];

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/start', (req, res) => {
    req.session.userName = req.body.name;
    req.session.currentQuestionIndex = 0;
    req.session.score = 0;
    req.session.userAnswers = [];
    res.redirect('/quiz');
})

app.get('/quiz', (req ,res) => {
    if (!req.session.userName) return res.redirect('/');

    const index = req.session.currentQuestionIndex;
    if(index >= quizQuestion.length) return res.redirect('/result');

    const questionData = quizQuestion[index];

    console.log("Rendering Question:", questionData); // Debugging

    res.render('quiz', {
        name: req.session.userName,
        questionData,
        index: index + 1
    });
});

app.post('/quiz', (req, res) => {
    if (!req.session.userName) return res.redirect('/');

    const index = req.session.currentQuestionIndex;
    const userAnswers = req.body.answer;
    const correctAnswer = quizQuestion[index].answer;

    if (!req.session.userAnswers) {
        req.session.userAnswers = [];
    }

    req.session.userAnswers.push({
        question: quizQuestion[index].question,
        userAnswer: req.body.answer,
        correctAnswer: quizQuestion[index].answer
    });

    if (userAnswers === correctAnswer) {
        req.session.score++
    };

    req.session.currentQuestionIndex++;

    if (req.session.currentQuestionIndex >= quizQuestion.length) {
        return res.redirect('/results');
    }

    res.redirect('/quiz')
});

app.get('/results', (req, res) => {
    if (!req.session.userName) return res.redirect('/');

    console.log("User Answers:", req.session.userAnswers); // Debugging

    res.render('results', {
        name: req.session.userName,
        score: req.session.score,
        totalQuestion: quizQuestion.length,
        userAnswers: req.session.userAnswers
    });
});

app.post('/finish', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
});
