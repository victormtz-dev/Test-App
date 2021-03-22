const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");

let currentQuestion = {};
let acceptAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];


let questions = [
    { 
        question: "Etiqueta para usar JS en HTML",
        choice1: "<script>",
        choice2: "<js>",
        choice3: "<javascrip>",
        choice4: "<scripting>",
        answer: 1

    },
    {
        question: "Forma correcta de hacer referencia a un archivo JS",
        choice1: "<script href=''>",
        choice2: "<script name=''>",
        choice3: "<script src=''>",
        choice4: "<script file=''>",
        answer: 3
    },
    {
        question: "Forma de hacer un HOLA MUNDO con alert",
        choice1: "msgBox('HOLA MUNDO')",
        choice2: "alertBox('HOLA MUNDO')",
        choice3: "msg('HOLA MUNDO')",
        choice4: "alert('HOLA MUNDO')",
        answer: 4
    },
     {
        question: "Es un lenguaje de Programacion",
        choice1: "HTML",
        choice2: "JavaScript",
        choice3: "CSS",
        choice4: "IDE",
        answer: 2
    }


    ]

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 4;

starGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    //console.log(availableQuestions);
    getNewQuestion();
};

getNewQuestion = () => {

    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
        localStorage.setItem("mostRecentScore", score);

        return window.location.assign('https://victormtz-dev.github.io/Test-App/assets/html/final.html');
    }

    questionCounter++;
    progressText.innerText = `Pregunta ${questionCounter}/${MAX_QUESTIONS}`;

    //update Bar
    
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);

    currentQuestion = availableQuestions[questionIndex];
    
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptAnswers = true;
};


choices.forEach(choice =>{
    choice.addEventListener("click", e =>{
        if(!acceptAnswers) return;

        acceptAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if (classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
          }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}
starGame();
