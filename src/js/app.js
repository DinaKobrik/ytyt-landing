// Загрузка страницы //
window.addEventListener("load", () => {
  console.log("Загрузился");
  const preloader = document.getElementById("preloader");
  const content = document.querySelector(".content");

  // Убираем прелоадер
  preloader.style.opacity = "0";
  preloader.style.transition = "opacity 0.5s";
 
  // Показываем контент после анимации
  setTimeout(() => {
    preloader.style.display = "none";
    content.style.display = "block";
  }, 500); // 500 мс соответствует длительности transition
});

// advantages__wrapper //
function advantagesWrapperSize() {
  const advantagesMin = document.querySelector(".advantages__wrapper-min"),
    advantagesMax = document.querySelector(".advantages__wrapper-max");
  // Проверяем ширину экрана
  if (window.innerWidth < 1254) {
    advantagesMin.classList.add("advantages__wrapper-active");
    advantagesMax.classList.remove("advantages__wrapper-active");
  } else {
    advantagesMin.classList.remove("advantages__wrapper-active");
    advantagesMax.classList.add("advantages__wrapper-active");
  }
}
// Вызываем функцию при загрузке страницы
window.addEventListener("load", advantagesWrapperSize);
// Вызываем функцию при изменении размера окна
window.addEventListener("resize", advantagesWrapperSize);

// advantages__item //
function advantagesItemSize() {
  const advantagesItemMin = document.querySelector(
      ".advantages-item__flex-min"
    ),
    advantagesItemMax = document.querySelector(".advantages-item__flex-max");

  if (window.innerWidth < 768) {
    advantagesItemMin.classList.add("advantages-item__flex-active");
    advantagesItemMax.classList.remove("advantages-item__flex-active");
  } else {
    advantagesItemMin.classList.remove("advantages-item__flex-active");
    advantagesItemMax.classList.add("advantages-item__flex-active");
  }
}
// Вызываем функцию при загрузке страницы
window.addEventListener("load", advantagesItemSize);
// Вызываем функцию при изменении размера окна
window.addEventListener("resize", advantagesItemSize);

// video //
document.addEventListener("DOMContentLoaded", () => {
  const playButton = document.querySelector(".stages-video__content-play");
  const img = document.querySelector(".stages-video__content-flex img");
  const video = document.querySelector(".stages-video__content-flex .video");
  const overlay = document.querySelector(".stages-video__content-overlay");
  const iframe = document.querySelector("#vkPlayer");

  playButton.addEventListener("click", () => {
    // Показываем iframe
    video.style.display = "flex";
    // Отправляем команду воспроизведения
    iframe.contentWindow.postMessage(
      '{"event":"command","func":"playVideo","args":""}',
      "*"
    );
    // Скрываем кнопку воспроизведения
    img.style.display = "none";
    playButton.style.display = "none";
    overlay.style.display = "none";
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const iframe = document.querySelector("#vkPlayer");
  const fullscreenButton = document.querySelector("#fullscreen");

  // Функция для отправки команд в iframe
  const sendCommand = (command) => {
    iframe.contentWindow.postMessage(
      JSON.stringify({
        event: "command",
        func: command,
        args: "",
      }),
      "*"
    );
  };

  // Кнопка Fullscreen
  fullscreenButton.addEventListener("click", () => {
    if (iframe.requestFullscreen) {
      iframe.requestFullscreen();
    } else if (iframe.webkitRequestFullscreen) {
      iframe.webkitRequestFullscreen(); // Для Safari
    } else if (iframe.mozRequestFullScreen) {
      iframe.mozRequestFullScreen(); // Для Firefox
    } else if (iframe.msRequestFullscreen) {
      iframe.msRequestFullscreen(); // Для IE/Edge
    }
  });
});

// hamburger //
window.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector(".menu"),
    menuItem = document.querySelectorAll(".menu__link, .menu__close"),
    menuList = document.querySelector(".menu__list"),
    header = document.querySelector(".header"),
    overlayHeader = document.querySelector(".header__overlay"),
    hamburger = document.querySelector(".hamburger"),
    close = document.querySelector(".menu__close");
  function menuActive() {
    if (window.innerWidth < 992) {
      hamburger.addEventListener("click", () => {
        hamburger.classList.add("hamburger_active");
        header.classList.add("header_active");
        overlayHeader.style.display = "block";
        menu.classList.add("menu_active");
        menuList.classList.add("menu_active__list");
        close.style.display = "block";
      });

      menuItem.forEach((item) => {
        item.addEventListener("click", (event) => {
          // Предотвращаем стандартное поведение
          event.preventDefault();

          // Добавляем задержку перед закрытием меню
          setTimeout(() => {
            hamburger.classList.remove("hamburger_active");
            header.classList.remove("header_active");
            overlayHeader.style.display = "none";
            menu.classList.remove("menu_active");
            menuList.classList.remove("menu_active__list");
            close.style.display = "none";
          }, 500);

          // Выполняем переход
          const href = item.getAttribute("href");
          if (href && href.startsWith("#")) {
            document.querySelector(href)?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          } else if (href) {
            window.location.href = href;
          }
        });
      });
    }
  }

  // Вызываем функцию при загрузке страницы
  window.addEventListener("load", menuActive);
  // Вызываем функцию при изменении размера окна
  window.addEventListener("resize", menuActive);
});

// Плавная прокрутка //
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault(); // Отключаем стандартное поведение перехода по ссылке

    const targetId = this.getAttribute("href").substring(1); // Получаем ID целевого элемента
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth", // Плавная прокрутка
        block: "start", // Прокрутка к началу элемента
      });
    }
  });
});

// test //
window.addEventListener("DOMContentLoaded", () => {
  const startTestButton = document.querySelectorAll(".start-test"),
    openForm = document.querySelectorAll(".open-form"),
    modal = document.querySelector(".modal"),
    feedbackDisplay = document.querySelector(".feedback"),
    questionsDisplay = document.querySelector(".questions"),
    resultDisplay = document.querySelector(".result"),
    modalIntro = document.querySelector(".modal-intro"),
    modalQuestions = document.querySelector(".modal-questions"),
    contactFormWrapper = document.querySelector(".contact-form__wrapper"),
    contactForm = document.querySelector(".contact-form"),
    modalFinal = document.querySelector(".modal-final"),
    startQuizButton = document.getElementById("startQuiz"),
    submitForm = document.getElementById("submitForm"),
    modalClose = document.querySelector(".modal__close");

  const questionContainer = document.getElementById("questionContainer"),
    answersContainer = document.getElementById("answersContainer"),
    feedbackNumber = document.getElementById("feedbackNumber"),
    feedbackSubheader = document.getElementById("feedbackSubheader"),
    feedbackDescr = document.getElementById("feedbackDescr"),
    resultNumber = document.getElementById("resultNumber"),
    resultMessage = document.getElementById("resultMessage"),
    submitTest = document.getElementById("submitTest"),
    questionNumber = document.getElementById("questionNumber");
  let nextButton = document.getElementById("nextButton");
  let continueButton = document.getElementById("continueButton");

  const questions = [
    {
      question:
        "Иван Иванович купил в магазине у дома несколько пачек макарон по 40 рублей, несколько пачек печенья по 32 рубля и 2 пакета сока. Продавщица сказала, что с него 525 рублей (скидка не предусмотрена). Иван Иванович заявил, что его пытаются обсчитать. Действительно ли продавщица ошиблась в подсчетах?",
      answers: [
        "Да, сумма явно неверная",
        "Нет, такая сумма вполне могла получиться",
        "Не знаю, не получается решить",
      ],
      correct: 0, // Индекс правильного ответа
    },
    {
      question:
        "Утка стоит на одной ноге и весит 2 килограмма. Сколько будет весить утка, если она станет на две ноги?",
      answers: ["1 килограмм", "2 килограмма", "Неизвестно, нужно взвесить"],
      correct: 1,
    },
    {
      question:
        "У пастуха 15 овец. Все, кроме девяти, разбежались. Сколько овец осталось?",
      answers: ["9", "6", "15"],
      correct: 0,
    },
    {
      question: "На часах 3:15. Какой угол между минутной и часовой стрелками?",
      answers: ["0 градусов", "90 градусов", "7,5 градусов"],
      correct: 2,
    },
  ];
  const feedbackMessages = [
    {
      descr: `Правильный ответ: Да<br>
        Так как 1 пачка макарон стоит 40 рублей, то любое количество пачек будет стоить четное число рублей. Аналогично с печеньем. А так как пакетов сока ровно 2, то за сок тоже нужно будет отдать четное число рублей. Получается, что ни при каких условиях в результате не может получиться нечетное число 525, а значит, продавщица действительно пыталась обсчитать Ивана Ивановича. В этом задании проверялось ваше логическое мышление. Это критически важный навык для любого программиста.`,
    },
    {
      descr: `Правильный ответ: 2 килограмма<br>
      Вес утки не изменится от того, сколько ног она использует для опоры. Вес определяется массой утки, а не количеством точек соприкосновения с землей.`,
    },
    {
      descr: `Правильный ответ: 9<br>
      "Все, кроме девяти, разбежались" означает, что девять овец остались на месте.`,
    },
    {
      descr: `Правильный ответ: 7,5 градусов<br>
        Часовая стрелка в 3:15 сместилась на четверть расстояния между 3 и 4, то есть на 14×30=7,5 градусов. Минутная стрелка указывает ровно на 3. Разница между ними — 7,5 градусов.`,
    },
  ];

  let currentQuestionIndex = 0;
  let score = 0;
  let selectedAnswer = null;

  startTestButton.forEach((item) => {
    item.addEventListener("click", () => {
      modal.style.display = "block";
      modalIntro.style.display = "flex";
    });
  });

  startQuizButton.addEventListener("click", () => {
    resetQuiz();
    modalIntro.style.display = "none";
    modalQuestions.style.display = "flex";

    loadQuestion();
  });

  // функция сброса переменных //
  function resetQuiz() {
    // Сброс переменных
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswer = null;
    resultDisplay.style.display = "none";
  }

  // Функция загрузки вопроса
  function loadQuestion() {
    questionsDisplay.style.display = "grid";
    const currentQuestion = questions[currentQuestionIndex];

    // Обновляем номер вопроса
    questionNumber.textContent = `Задание №${currentQuestionIndex + 1}`;
    // Обновляем текст вопроса
    questionContainer.textContent = currentQuestion.question;

    // Очищаем контейнер для вариантов ответов
    answersContainer.innerHTML = "";

    // Создаём варианты ответов
    currentQuestion.answers.forEach((answer, index) => {
      const answerWrapper = document.createElement("div");
      answerWrapper.classList.add("answer-wrapper");

      const radioInput = document.createElement("input");
      radioInput.type = "radio";
      radioInput.name = "answer";
      radioInput.id = `answer-${index}`;
      radioInput.value = index;

      // Обработчик для выбора ответа
      radioInput.addEventListener("change", () => {
        selectedAnswer = parseInt(radioInput.value, 10);
        nextButton.disabled = false; // Активируем кнопку "Далее"
      });

      const label = document.createElement("label");
      label.setAttribute("for", `answer-${index}`);
      label.textContent = answer;

      answerWrapper.appendChild(radioInput);
      answerWrapper.appendChild(label);
      answersContainer.appendChild(answerWrapper);
    });

    // Деактивируем кнопку "Далее" до выбора ответа
    nextButton.disabled = true;

    // Удаляем предыдущие обработчики, если они есть
    const newNextButton = nextButton.cloneNode(true);
    nextButton.parentNode.replaceChild(newNextButton, nextButton);
    nextButton = newNextButton;

    // Обработчик кнопки "Далее"
    nextButton.addEventListener("click", () => {
      showFeedbackScreen();
    });
  }

  // Функция отображения экрана обратной связи
  function showFeedbackScreen() {
    const currentQuestion = questions[currentQuestionIndex];
    const feedback = feedbackMessages[currentQuestionIndex];

    // Проверяем правильность ответа
    if (selectedAnswer === currentQuestion.correct) {
      score++;
    }

    // Обновляем текст обратной связи
    feedbackNumber.textContent = `Задание №${currentQuestionIndex + 1}`;
    feedbackSubheader.textContent =
      selectedAnswer === currentQuestion.correct
        ? "Правильно!"
        : "Неправильно!";
    feedbackDescr.innerHTML = feedback.descr;

    // Скрываем экран с вопросом и показываем экран с фидбеком
    feedbackDisplay.style.display = "grid";
    questionsDisplay.style.display = "none";

    // Удаляем предыдущие обработчики, если они есть
    const newContinueButton = continueButton.cloneNode(true);
    continueButton.parentNode.replaceChild(newContinueButton, continueButton);
    continueButton = newContinueButton;

    // Обработчик кнопки "Далее" для перехода к следующему вопросу
    continueButton.addEventListener("click", () => {
      currentQuestionIndex++;

      if (currentQuestionIndex < questions.length) {
        // Загружаем следующий вопрос

        feedbackDisplay.style.display = "none";
        loadQuestion();
      } else {
        // Все вопросы завершены, показываем итог
        showFinalScreen();
      }
    });
  }

  // Функция для отображения финального экрана с результатом
  function showFinalScreen() {
    resultNumber.textContent = `Набрано ${score}/${questions.length}`;
    if (score < 3) {
      resultMessage.textContent = `Отлично! Теперь мы знаем куда двигаться! Только вперед! Начните обучение прямо сейчас, доступ ко вводным урокам уже открыт`;
    } else {
      resultMessage.textContent = `Это великолепный результат! У вас есть все шансы стать отличным программистом. Начните обучение прямо сейчас, доступ ко вводным урокам уже открыт`;
    }
    resultDisplay.style.display = "flex";
    feedbackDisplay.style.display = "none";
  }

  submitTest.addEventListener("click", () => {
    questionsDisplay.style.display = "none";
    resultDisplay.style.display = "none";
    contactFormWrapper.style.display = "block";
    contactForm.style.display = "flex";
  });
  // form //
  function validateFormAndSubmit(formSelector) {
    const form = document.getElementById(formSelector);

    if (!form) return; // Проверяем, существует ли форма

    form.addEventListener("submit", function (e) {
      e.preventDefault(); // Отключаем стандартное поведение отправки формы

      let isValid = true; // Флаг валидности формы

      // Удаляем старые ошибки (удаляем класс)
      form.querySelectorAll(".error-input").forEach((input) => {
        input.classList.remove("error-input");
      });

      // Валидация имени
      const nameInput = form.querySelector("[name='name']");
      if (nameInput) {
        if (
          nameInput.value.trim() === "" ||
          nameInput.value.trim().length < 2
        ) {
          isValid = false;
          nameInput.classList.add("error-input");
        }
      }
      // Валидация номера телефона
      const phoneInput = form.querySelector("[name='phone']");
      if (phoneInput) {
        const phonePattern = /^\+?\d{10,15}$/; // Пример: +1234567890 или 1234567890
        if (
          phoneInput.value.trim() === "" ||
          !phonePattern.test(phoneInput.value.trim())
        ) {
          isValid = false;
          phoneInput.classList.add("error-input");
        }
      }
      // Валидация email
      const emailInput = form.querySelector("[name='email']");
      if (emailInput) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (
          emailInput.value.trim() === "" ||
          !emailPattern.test(emailInput.value.trim())
        ) {
          isValid = false;
          emailInput.classList.add("error-input");
        }
      }

      // Если форма невалидна, показываем ошибки и не отправляем данные
      if (!isValid) {
        console.log("Заполните все поля правильно.");
        return;
      }

      // Если форма валидна, отправляем данные
      const formData = new FormData(form);

      // Отправка данных через Fetch API
      fetch("./mailer/smart.php", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Ошибка отправки формы");
          }
          return response.text();
        })
        .then(() => {
          // Очищаем поля формы
          form.querySelectorAll("input").forEach((input) => (input.value = ""));

          // Показываем окно "Спасибо"
          document.querySelector(".contact-form__wrapper").style.display =
            "none";
          document.querySelector(".contact-form").style.display = "none";
          document.querySelector(".modal-final").style.display = "flex";

          // Сбрасываем форму только после успешной отправки
          form.reset();
        })
        .catch((error) => {
          console.error("Ошибка:", error);
        });
    });
  }
  submitForm.addEventListener("click", () => {
    validateFormAndSubmit("form");
  });
  modalClose.addEventListener("click", () => {
    modal.style.display = "none";
    modalIntro.style.display = "none";
    contactFormWrapper.style.display = "none";
    modalFinal.style.display = "none";
    resultDisplay.style.display = "none";
  });

  openForm.forEach((item) => {
    item.addEventListener("click", () => {
      modalQuestions.style.display = "none";
      modal.style.display = "block";
      contactForm.style.display = "flex";
      contactFormWrapper.style.display = "block";
    });
  });
});
