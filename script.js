const quizData = [
    {
        question: "1. Укажите личное местоимение:",
        options: ["Себя", "Мой", "Он", "Тот"],
        correct: 2 // Индекс правильного ответа (начинается с 0, поэтому 2 = "Он")
    },
    {
        question: "2. К какому разряду относится местоимение «себя»?",
        options: ["Возвратное", "Притяжательное", "Указательное", "Определительное"],
        correct: 0
    },
    {
        question: "3. В каком предложении есть отрицательное местоимение?",
        options: [
            "Кто-то громко постучал в дверь.",
            "Мне совершенно некого винить в этом.",
            "Я сам постараюсь всё исправить.",
            "Это моя любимая книга."
        ],
        correct: 1
    }
];

const quizElement = document.getElementById('quiz');
const resultElement = document.getElementById('result');
const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options');
const submitBtn = document.getElementById('submit');
const scoreText = document.getElementById('score-text');
const feedbackText = document.getElementById('feedback-text');
const restartBtn = document.getElementById('restart');

let currentQuiz = 0;
let score = 0;
let answered = false;

// Загрузка вопроса
function loadQuiz() {
    answered = false;
    submitBtn.style.display = 'none';
    optionsContainer.innerHTML = '';
    
    const currentQuizData = quizData[currentQuiz];
    questionElement.innerText = currentQuizData.question;

    currentQuizData.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('option-btn');
        button.addEventListener('click', () => selectOption(button, index));
        optionsContainer.appendChild(button);
    });
}

// Выбор варианта ответа
function selectOption(selectedBtn, selectedIndex) {
    if (answered) return; // Если уже ответили, блокируем нажатия
    answered = true;

    const currentQuizData = quizData[currentQuiz];
    const allButtons = optionsContainer.querySelectorAll('.option-btn');

    // Проверяем правильность
    if (selectedIndex === currentQuizData.correct) {
        selectedBtn.classList.add('correct');
        score++;
    } else {
        selectedBtn.classList.add('wrong');
        // Показываем правильный ответ
        allButtons[currentQuizData.correct].classList.add('correct');
    }

    // Делаем остальные кнопки неактивными визуально
    allButtons.forEach(btn => {
        btn.style.cursor = 'not-allowed';
    });

    submitBtn.style.display = 'block';
}

// Переход к следующему вопросу или результатам
submitBtn.addEventListener('click', () => {
    currentQuiz++;

    if (currentQuiz < quizData.length) {
        loadQuiz();
    } else {
        showResults();
    }
});

// Показ результатов
function showResults() {
    quizElement.style.display = 'none';
    resultElement.style.display = 'block';

    scoreText.innerText = `Ваш результат: ${score} из ${quizData.length}`;

    if (score === quizData.length) {
        feedbackText.innerText = "Молодец! Отличный результат, тема усвоена на 100% 🌟";
    } else if (score === 2) {
        feedbackText.innerText = "Хороший результат! Но есть куда расти 👍";
    } else {
        feedbackText.innerText = "Подумай еще. Стоит повторить разряды местоимений 📚";
    }
}

// Перезапуск квиза
restartBtn.addEventListener('click', () => {
    currentQuiz = 0;
    score = 0;
    quizElement.style.display = 'block';
    resultElement.style.display = 'none';
    loadQuiz();
});

// Запуск при загрузке
loadQuiz();