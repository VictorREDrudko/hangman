const task = [
  {
    question: "What is the capital of Venezuela?",
    answer: "caracas",
  },
  {
    question: "What is the capital of Australia?",
    answer: "canberra",
  },
  {
    question: "What is the capital of Tanzania?",
    answer: "dodoma",
  },
  {
    question: "What is the capital of Botswana?",
    answer: "gaborone",
  },
  {
    question: "What is the capital of Peru?",
    answer: "lima",
  },
  {
    question: "What is the capital of Bangladesh?",
    answer: "dhaka",
  },
  {
    question: "What is the capital of Pakistan?",
    answer: "islamabad",
  },
  {
    question: "What is the capital of South Africa?",
    answer: "pretoria",
  },
  {
    question: "What is the capital of Liechtenstein?",
    answer: "vaduz",
  },
  {
    question: "What is the capital of Morocco?",
    answer: "rabat",
  },
  {
    question: "What is the capital of North Korea?",
    answer: "pyongyang",
  },
  {
    question: "What is the capital of Bahrain?",
    answer: "manama",
  },
  {
    question: "What is the capital of United Kingdom?",
    answer: "london",
  },
  {
    question: "What is the capital of Italy?",
    answer: "rome",
  },
  {
    question: "What is the capital of Spain?",
    answer: "madrid",
  },
  {
    question: "What is the capital of Portugal?",
    answer: "lisbon",
  },
  {
    question: "What is the capital of China?",
    answer: "peking",
  },
  {
    question: "What is the capital of Japan?",
    answer: "tokyo",
  },
  {
    question: "What is the capital of Egypt?",
    answer: "cairo",
  },
  {
    question: "What is the capital of Canada?",
    answer: "ottawa",
  },
];

// 1. СОЗДАНИЕ ИГРЫ
let currentQuestion = "";
let currentAnswer = "";
let count = 0;
const countAll = 6;

const createElements = () => {
  // Создаем элементы
  const wrapper = document.createElement("div");
  const gallows = document.createElement("div");
  const gallowsImage = document.createElement("img");
  const gallowsTitle = document.createElement("h1");
  const gallowsSilhouette = document.createElement("div");
  const quiz = document.createElement("div");
  const quizSecretWord = document.createElement("ul");
  const quizQuestion = document.createElement("h2");
  const containerCount = document.createElement("div");
  const quizCount = document.createElement("h3");
  const quizCountNumber = document.createElement("span");
  const quizKeyboard = document.createElement("div");

  // Присваиваем классы элементам
  wrapper.classList.add("wrapper");
  gallows.classList.add("gallows");
  gallowsImage.classList.add("gallows__image");
  gallowsTitle.classList.add("gallows__title");
  gallowsSilhouette.classList.add("gallows__silhouette");
  quiz.classList.add("quiz");
  quizSecretWord.classList.add("quiz__word");
  quizQuestion.classList.add("quiz__question");
  containerCount.classList.add("container__count");
  quizCount.classList.add("quiz__count");
  quizCountNumber.classList.add("quiz__count_number");
  quizKeyboard.classList.add("quiz__keyboard");

  // Присваиваем атребуты элементам
  gallowsImage.setAttribute("src", "img/hangman.png");
  gallowsImage.setAttribute("alt", "gallows");

  // Создаем вложенность элементов
  document.body.append(wrapper);
  wrapper.append(gallows);
  wrapper.append(quiz);
  gallows.append(gallowsImage);
  gallows.append(gallowsTitle);
  gallows.append(gallowsSilhouette);
  quiz.append(quizSecretWord);
  quiz.append(quizQuestion);
  quiz.append(containerCount);
  quiz.append(quizKeyboard)
  containerCount.append(quizCount);
  containerCount.append(quizCountNumber);

  // Отрисуем части тела
  for (let i = 1; i <= 6; i++) {
    const silhouette = document.createElement("img");
    gallowsSilhouette.append(silhouette);
    silhouette.classList.add(`silhouette_${i}`);
    silhouette.setAttribute("src", `img/hangman-${i}.png`);
    silhouette.setAttribute("alt", "part of the body");
    // silhouette.classList.add("show__silhouette");
  }

  // Отрисуем буквы секретного слова
  for (let i = 0; i < currentAnswer.length; i++) {
    const quizSecretWordLetter = document.createElement("li");
    quizSecretWord.append(quizSecretWordLetter);
    quizSecretWordLetter.classList.add("quiz__letter");
    quizSecretWordLetter.innerHTML = currentAnswer[i];
  }

  // Создадим клавиатуру
  for (let i = 97; i <= 122; i++) {
    const buttonKeyboard = document.createElement("button");
    quizKeyboard.append(buttonKeyboard);
    buttonKeyboard.classList.add("quiz__button");
    buttonKeyboard.innerHTML = String.fromCharCode(i);
    buttonKeyboard.addEventListener("click", (event) => {
      startGame(event.target, String.fromCharCode(i));
    });
  }

  // Присваиваем значения элементам
  gallowsTitle.innerHTML = "HANDMAN GAME";
  quizCount.innerHTML = "Incorrect guesses: ";
  quizQuestion.innerHTML = `Hint: ${currentQuestion}`;
  quizCountNumber.innerHTML = `${count} / ${countAll}`;
}

const createModal = () => {
  // Создаем элементы модального окна
  const containerModal = document.createElement("div");
  const bodyModal = document.createElement("div");
  const containerModalImage = document.createElement("div");
  const imageModal = document.createElement("img");
  const resultGame = document.createElement("h3");
  const containerSecretWord = document.createElement("div");
  const secretWordText = document.createElement("p");
  const secretWord = document.createElement("p");
  const buttonModal = document.createElement("button");

  // Присваиваем классы элементам модального окна
  containerModal.classList.add("modal");
  bodyModal.classList.add("modal__body");
  containerModalImage.classList.add("modal__img__container");
  imageModal.classList.add("modal__img");
  resultGame.classList.add("modal__result");
  containerSecretWord.classList.add("modal__word__container");
  secretWordText.classList.add("modal__text");
  secretWord.classList.add("modal__word");
  buttonModal.classList.add("modal__button");

  // Присваиваем атребуты элементам
  imageModal.setAttribute("src", "img/win.gif");
  imageModal.setAttribute("alt", "gif win");

  // Создаем вложенность
  document.body.append(containerModal);
  containerModal.append(bodyModal);
  bodyModal.append(containerModalImage);
  bodyModal.append(resultGame);
  bodyModal.append(containerSecretWord);
  bodyModal.append(buttonModal);
  containerModalImage.append(imageModal);
  containerSecretWord.append(secretWordText);
  containerSecretWord.append(secretWord);

  // Присваиваем значения элементам модального окна
  // resultGame.innerHTML = "Victory!!! Congratulations!";
  secretWordText.innerHTML = "The secret word was: ";
  secretWord.innerHTML = currentAnswer;
  buttonModal.innerHTML = "Play Again";
}

// СЛУЧАЙНЫЙ ВЫБОР ВОПРОСА
const getRandomQuestion = () => {
  let random = Math.floor(Math.random() * task.length);
  const { question, answer } = task[random];
  currentAnswer = answer;
  currentQuestion = question;
}

const initGame = () => {
  getRandomQuestion();
  createElements();
  createModal();
}

initGame();




// 2. ПРОЦЕСС ИГРЫ
const silhouetteImg = document.querySelectorAll(".gallows__silhouette img");
const boxSecretWord = document.querySelector(".quiz__word");
const boxKeyboard = document.querySelector(".quiz__keyboard");
const keyKeyboard = document.querySelectorAll(".quiz__button");
const countText = document.querySelector(".quiz__count_number")
const modal = document.querySelector(".modal");
const modalResultText = document.querySelector(".modal__result");
const modalSecretWord = document.querySelector(".modal__word");
const modalImage = document.querySelector(".modal__img");
const btnPlay = document.querySelector(".modal__button");
const question = document.querySelector(".quiz__question");
let word = document.querySelectorAll(".quiz__letter");
let arrayLettersSecretWord = [];



const startGame = (btn, letter) => {
  if (currentAnswer.includes(letter)) {
    [...currentAnswer].forEach((element, index) => {
      if (element === letter) {
        arrayLettersSecretWord.push(element);
        boxSecretWord.querySelectorAll("li")[index].innerText = element;
        boxSecretWord.querySelectorAll("li")[index].classList.add("quiz__letter_guessed")
      }
    })
  } else {
    count++;
    if (count >= 6) {
      count = 6; 
    }

    silhouetteImg.forEach((item, index) => {
      if ((count - 1) === index) {
        item.classList.add("show__silhouette");
      }
    })
  }

  btn.disabled = true;
  btn.classList.add("disabled__button");
  countText.innerText = `${count} / ${countAll}`;

  if (count === countAll) {
    return endGame(false);
  };

  if (arrayLettersSecretWord.length === currentAnswer.length) {
    return endGame(true);
  };
}

const endGame = (result) => {
  setTimeout(() => {
    modal.classList.add("modal-open");
    modalSecretWord.textContent = currentAnswer;
    if (result) {
      modalImage.setAttribute("src", "img/win.gif");
      modalImage.setAttribute("alt", "gif win");
      modalResultText.innerText = "Victory!!! Congratulations!";
    } else {
      modalImage.setAttribute("src", "img/lose.gif");
      modalImage.setAttribute("alt", "gif lose");
      modalResultText.innerText = "You lose! Try again!";
    }
  }, 200)
}

btnPlay.addEventListener("click", () => {
  newGame();
});




const newGame = () => {
  modal.classList.remove("modal-open");
  arrayLettersSecretWord = [];
  count = 0;
  countText.innerText = `${count} / ${countAll}`;
  
  silhouetteImg.forEach((item) => {
    item.classList.remove("show__silhouette");
  });

  getRandomQuestion();
  question.innerHTML = `Hint: ${currentQuestion}`;

  word.forEach(el => {
    el.remove();
  });

  // Отрисуем буквы секретного слова
  for (let i = 0; i < currentAnswer.length; i++) {
    const quizSecretWordLetter = document.createElement("li");
    boxSecretWord.append(quizSecretWordLetter);
    quizSecretWordLetter.classList.add("quiz__letter");
    quizSecretWordLetter.innerHTML = currentAnswer[i];
  }

  word = document.querySelectorAll(".quiz__letter");

  // Вернем клавиатуру в исходное состояние
  keyKeyboard.forEach(el => {
    el.disabled = false;
    if (el.classList.contains("disabled__button")) {
      el.classList.remove("disabled__button");
    }
  })
}

 

// Подключаем физическую клавиатуру
document.addEventListener("keydown", (event) => {
  if (count === 6 || arrayLettersSecretWord.length === currentAnswer.length) {
    return;
  }
  keyKeyboard.forEach((el, index) => {
    if (el.textContent === event.key) {
      if (keyKeyboard[index].classList.contains("disabled__button")) {
        alert("Choose another button!")
        return;
      } else {
        startGame(keyKeyboard[index], event.key);
      }
    }
  })
})

