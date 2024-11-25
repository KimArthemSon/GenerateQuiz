let questions;
let currQuestion = 0;
let questionsData = [];
const forms = document.getElementById("card");
const des = document.getElementById("Description");
const scoreboard = document.getElementById("Score");
const answer = document.getElementById("answer");
const last = document.getElementById("Last");
let copy = [];
let text;
let score = 0;
let count = 0;

// File input listener
document.getElementById("fileInput").addEventListener("change", function (event) {
    reset();
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            text = e.target.result + "";
            readFile();
        };

        reader.onerror = function (e) {
            console.error("Error reading file", e);
        };

        reader.readAsText(file);
    }
});

// Reset function
function reset() {
    currQuestion = 0;
    questionsData = [];
    copy = [];
    des.textContent = "";
    score = 0;
    scoreboard.textContent = "";
    answer.value = "";
}

// File processing
async function readFile() {
    try {
        let theWrong = 0;

        questions = text.split("|");
        questions.splice(0, questions.length - 1).map((e, index) => {
            let data = e.split(";");
            data[0] = data[0].trim();
            data[1] = data[1].trim();

            theWrong = index;

            let obj = {
                answer: data[0],
                description: data[1],
            };
            questionsData.push(obj);
        });

        copy = [...questionsData];
        start();
    } catch (error) {
        alert("Something wrong with the file format!!\n");
    }
}

// Start quiz
function start() {
    des.textContent = copy[currQuestion].description;
}

// Form submission handler
forms.addEventListener("submit", (e) => {
    e.preventDefault();
    try {
        if ((answer.value + "").toLowerCase() === (copy[currQuestion].answer + "").toLowerCase()) {
            score++;
        }

        last.textContent = "Last Answer: " + copy[currQuestion].answer;
        answer.value = "";
        scoreboard.textContent = "Score: " + score;

        RandomNextQuestion();
    } catch (error) {
        alert("No File Input!!");
    }
});

// Select next random question
function RandomNextQuestion() {
    let newCopy = [];

    if (copy.length === 0 || count === questionsData.length) {
        newCopy = [...questionsData];
        copy = [...newCopy];
        currQuestion = Math.floor(Math.random() * questionsData.length);
        count = 0;
    } else {
        newCopy = copy.filter((_, i) => i !== currQuestion);
        copy = [...newCopy];
    }

    currQuestion = Math.floor(Math.random() * newCopy.length);
    start();
}
