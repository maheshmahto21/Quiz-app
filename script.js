const quizData = [
    {
        question: "What is the capital of India?",
        options: ["Delhi", "Maharashtra", "Punjab", "Bihar"],
        answer: "Delhi"
    },
    {
        question: "Who is the prime minister of India?",
        options: ["Amitabh Bacchan", "Rahul Gandi", "Narendra Modi", "Mahesh Mahto"],
        answer: "Narendra Modi"
    },
    {
        question: "Who is the Asia richest man?",
        options: ["Mahesh Mahto", "Gautam Adani", "Sharukh Khan", "Mukesh Ambani"],
        answer: "Mukesh Ambani"
    },
    {
        // question: "Who is Mahatma Gandhi",
        // options: ["Teacher", "Theif", "Father of india", "Army man"],
        // answer: "Father of india"
    }
];

let currentQuestionIndex = 0;
let score = 0;

const quizForm = document.getElementById('quizForm');
const questionContainer = document.getElementById('questionContainer');
const feedbackDiv = document.getElementById('feedback');
const resultDiv = document.getElementById('result');

function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionContainer.innerHTML = `
        <div class="question">
            <p>${currentQuestion.question}</p>
            ${currentQuestion.options.map((option, index) => `
                <label>
                    <input type="radio" name="answer" value="${option}"> ${option}
                </label><br>
            `).join('')}
        </div>
    `;
    feedbackDiv.innerHTML = ''; 
}

const submitQuiz = (event) => {
    event.preventDefault(); 

    const selectedAnswer = quizForm.answer ? quizForm.answer.value : null;

    if (selectedAnswer) {
        if (selectedAnswer === quizData[currentQuestionIndex].answer) {
            score++;
            feedbackDiv.innerHTML = "<span style='color: green;'>Correct answer!</span>";
        } else {
            feedbackDiv.innerHTML = "<span style='color: red;'>Wrong answer! The correct answer is: " + quizData[currentQuestionIndex].answer + "</span>";
        }
        currentQuestionIndex++;

        if (currentQuestionIndex < quizData.length) {
            setTimeout(() => {
                loadQuestion();
            }, 2000); 
        } else {
            showResult();
        }
    } else {
        alert('Please select an answer!');
    }
};

function showResult() {
    questionContainer.style.display = 'none';  
    resultDiv.innerHTML = `Your score is: ${score} out of ${quizData.length}`;
}
 
quizForm.addEventListener('submit', submitQuiz);
 
loadQuestion(); 
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        submitQuiz(new Event('submit')); 
    }
});
