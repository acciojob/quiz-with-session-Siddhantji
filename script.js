const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// Load user progress from sessionStorage or initialize to empty object
const userAnswers = JSON.parse(sessionStorage.getItem("progress")) || {};
console.log("Loaded userAnswers from sessionStorage:", userAnswers);

function renderQuestions() {
  questionsElement.innerHTML = ''; // Clear any existing content

  questions.forEach((question, questionIndex) => {
    const questionElement = document.createElement("div");

    const questionText = document.createElement("p");
    questionText.textContent = question.question;
    questionElement.appendChild(questionText);

    question.choices.forEach((choice) => {
      const choiceLabel = document.createElement("label");
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${questionIndex}`);
      choiceElement.setAttribute("value", choice);

      // Check the radio button if the user previously selected this choice
      if (userAnswers[questionIndex] === choice) {
        choiceElement.setAttribute('checked', 'true');
        console.log(`Restoring choice for question ${questionIndex}: ${choice}`);
      }

      // Save the user's choice to sessionStorage on change
      choiceElement.addEventListener("change", () => {
        userAnswers[questionIndex] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
        console.log("Updated userAnswers in sessionStorage:", userAnswers);
      });

      choiceLabel.appendChild(choiceElement);
      choiceLabel.appendChild(document.createTextNode(choice));
      questionElement.appendChild(choiceLabel);
    });

    questionsElement.appendChild(questionElement);
  });
}

// Event listener for the submit button to calculate and display the score
submitButton.addEventListener("click", () => {
  let score = 0;
  questions.forEach((question, index) => {
    if (userAnswers[index] === question.answer) {
      score += 1;
    }
  });

  localStorage.setItem("score", score);
  scoreElement.textContent = `Your score is ${score} out of ${questions.length}.`;
  console.log("Score stored in localStorage:", score);
});

// Ensure the questions are rendered on page load and load the score if it exists
window.addEventListener("load", () => {
  const storedScore = localStorage.getItem("score");
  if (storedScore !== null) {
    scoreElement.textContent = `Your score is ${storedScore} out of ${questions.length}.`;
    console.log("Loaded score from localStorage:", storedScore);
  }
  renderQuestions(); // Render the questions on page load
});

// Initial render of the questions
renderQuestions();
