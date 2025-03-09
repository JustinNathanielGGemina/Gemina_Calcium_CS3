const quizData = [
    {
        question: "What year did World War II begin?",
        options: ["1935", "1939", "1941", "1945"],
        correct: 1
    },
    {
        question: "Which countries were part of the Axis Powers?",
        options: ["USA, UK, France", "Germany, Italy, Japan", "Soviet Union, China, USA", "Canada, Australia, Brazil"],
        correct: 1
    },
    {
        question: "What event led the United States to enter World War II?",
        options: ["The Battle of Stalingrad", "D-Day Invasion", "The Attack on Pearl Harbor", "The Bombing of Hiroshima"],
        correct: 2
    },
    {
        question: "Who was the leader of Nazi Germany during World War II?",
        options: ["Winston Churchill", "Joseph Stalin", "Benito Mussolini", "Adolf Hitler"],
        correct: 3
    },
    {
        question: "Which battle is considered the turning point of the war in the Pacific?",
        options: ["Battle of the Bulge", "Battle of Midway", "Battle of Berlin", "Battle of Britain"],
        correct: 1
    }
];

let currentQuestionIndex = 0;
let score = 0;

const quizContent = document.getElementById("myQuiz");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const submit = document.getElementById("submit");
const quizSection = document.getElementById("quiz");
const resultsSection = document.getElementById("results");

function displayQuestion() {
    const questionData = quizData[currentQuestionIndex];
    let optionsHtml = "";
    for (let i = 0; i < questionData.options.length; i++) {
        optionsHtml += `
            <li>
                <button class="option-btn" onclick="checkAnswer(${i})">${questionData.options[i]}</button>
            </li>
        `;
    }
    quizContent.innerHTML = `
        <div class="question">${questionData.question}</div>
        <ul class="options">
            ${optionsHtml}
        </ul>
    `;
    prev.disabled = currentQuestionIndex === 0;
    next.disabled = true;
}

function checkAnswer(selected) {
    const questionData = quizData[currentQuestionIndex];
    const buttons = document.querySelectorAll(".option-btn");

    buttons.forEach((btn, index) => {
        btn.disabled = true;
        if (index === questionData.correct) {
            btn.classList.add("correct");
        } else {
            btn.classList.add("incorrect");
        }
    });

    if (selected === questionData.correct) {
        score++;
    }

    next.disabled = false;
}

next.addEventListener("click", () => {
    if (currentQuestionIndex < quizData.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    }
});

prev.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
});

submit.addEventListener("click", () => {
    quizSection.style.display = "none";  // Hide quiz section
    resultsSection.style.display = "block"; // Show results

    let message = "";
    if (score === 5) {
        message = "That is a perfect score! Excellent Work!";
    } else if (score === 4) {
        message = "Good job!";
    } else if (score === 3) {
        message = "That is the passing score!";
    } else if (score === 2) {
        message = "Do better next time!";
    } else if (score === 1) {
        message = "Try Harder! I know you can do it.";
    } else {
        message = "Please read all of it again.";
    }

    resultsSection.innerHTML = <h2>You scored ${score} out of ${quizData.length}.</h2><p>${message}</p>;
});

displayQuestion();