let levels = [
  {
    question: "How many legs do butterflies have?",
    possibleAnswers: [0, 2, 4, 6],
    answer: 6,
    answerIndex: 3,
    congratImageUrl:
      "https://media.giphy.com/media/oX9prChocapB0V9U4X/giphy.gif"
  },
  {
    question: "Which team won 2014 FIFA World Cup in Brazil?",
    possibleAnswers: ["Argentina", "Brazil", "Germany", "Netherlands"],
    answer: "Germany",
    answerIndex: 2,
    congratImageUrl: "https://media.giphy.com/media/T9fHnACJJq8Ba/giphy.gif"
  },
  {
    question: "Who directed the 2015 movie &quot;The Revenant&quot;?",
    possibleAnswers: [
      "Alejandro G. I&ntilde;&aacute;rritu",
      "Christopher Nolan",
      "David Fincher",
      "Wes Anderson"
    ],
    answer: "Alejandro G. I&ntilde;&aacute;rritu",
    answerIndex: 0,
    congratImageUrl:
      "https://pmcvariety.files.wordpress.com/2019/02/alejandro-g.-inarritu.jpg?w=1000"
  },
  {
    question: "What was the first feature-length computer-animated movie?",
    possibleAnswers: ["Tron", "Toy Story", "Lion king", "101 Dalmatians"],
    answer: "Toy Story",
    answerIndex: 1,
    congratImageUrl: "https://media.giphy.com/media/wcFlXfhyyyp0c/giphy.gif"
  },
  {
    question:
      "Which of the following car manufacturers had a war named after it?",
    possibleAnswers: ["Toyota", "Honda", "Greatwall", "Volkswagen"],
    answer: "Toyota",
    answerIndex: 0,
    congratImageUrl: "https://media.giphy.com/media/NdpQJAQuBFQJ2/giphy.gif"
  }
];

var timerNumber;
var questionTimer;
var rightAnswerTimer;
var wrongAnswerTimer;
var loseImageUrl = "https://media.giphy.com/media/1jARfPtdz7eE0/giphy.gif";
var currentLevelIndex = 0;
var currentLevel = levels[currentLevelIndex];
var currentlevelAnswer = currentLevel.answer;
var currentlevelAnswerIndex = currentLevel.answerIndex;
var currentLevelCongratImageUrl = currentLevel.congratImageUrl;

var currentLevelPossibleAnswers = currentLevel.possibleAnswers;
var currentLevelQuestion = currentLevel.question;
var correctAnswer = 0;
var incorrectAnswer = 0;
var unAnsweredAnswer = 0;

function startButtonClick() {
  $("#startButton").click(function() {
    $("#startButton").css("display", "none");
    $("#gameLevel").css("visibility", "visible");
    generateQuestionTimer();
  });
}

function generateQuestionTimer() {
  clearRightOrWrong();
  timerNumber = 31;
  showGame();
  clearInterval(questionTimer);
  //   clearInterval(rightAnswerTimer);
  //   clearInterval(wrongAnswerTimer);
  questionTimer = setInterval(decrementQuestion, 1000);
}

function decrementQuestion() {
  timerNumber--;
  $("#timerRow").html("<h2>" + timerNumber + " seconds remaining " + "</h2>");
  if (timerNumber <= 0) {
    clearInterval(questionTimer);

    generateFailedAnswerTimer();
  }
}

function showGame() {
  $("#question").text(currentLevelQuestion);
  for (let answer of currentLevelPossibleAnswers) {
    var possibleAnswersButton = $("<button>");
    possibleAnswersButton.text(answer);
    possibleAnswersButton.click(function() {
      clearInterval(questionTimer);
      $("#timerRow").html("");
      var buttonText = $(this).text;
      checkAnswer(buttonText);
      console.log(buttonText);
    });
    var cell = $("<li>");
    cell.css("list-style-type", "none");
    cell.append(possibleAnswersButton);
    $("#answers").append(cell);
  }
}

// function removeInterval(intervalId) {
//   clearInterval(intervalId);
// }

function checkAnswer(userSelection) {
  if (userSelection == currentlevelAnswer) {
    generateSuccessfulAnswerTimer();
  } else {
    generateFailedAnswerTimer();
  }
}

function generateSuccessfulAnswerTimer() {
  timerNumber = 5;
  showRight();
  currentLevelIndex++;
  clearInterval(rightAnswerTimer);
  rightAnswerTimer = setInterval(decrementRightAnswer, 1000);
}
function decrementRightAnswer() {
  timerNumber--;
  $("#timerRow").html("");
  if (timerNumber <= 0) {
    clearInterval(rightAnswerTimer);

    generateQuestionTimer();
  }
}

// run();

function generateFailedAnswerTimer() {
  timerNumber = 5;

  showWrong();
  currentLevelIndex++;
  clearInterval(wrongAnswerTimer);
  wrongAnswerTimer = setInterval(decrementWrongAnswer, 1000);
  console.log(currentLevelIndex);
}

function decrementWrongAnswer() {
  timerNumber--;
  $("#timerRow").html("");
  if (timerNumber == 0) {
    clearInterval(wrongAnswerTimer);
    // currentLevelIndex++;
    generateQuestionTimer();
  }
}

function showRight() {
  //   clearInterval(questionTimer);
  $("#rightOrWrong").text("WELL DONE MATE!");
  $("#answers").html("The right answer is: " + currentlevelAnswer);
  $("#congratPanel").attr("src", currentLevelCongratImageUrl);
  //   currentLevelIndex++;
}

function showWrong() {
  //   clearInterval(questionTimer);
  $("#rightOrWrong").text("WRONG GUESS MATE!");
  $("#answers").html("The right answer is: " + currentlevelAnswer);
  $("#congratPanel").attr("src", loseImageUrl);
  //   currentLevelIndex++;
}

function clearRightOrWrong() {
  $("#rightOrWrong").text("");
  $("#answers").html("");
  $("#congratPanel").attr("src", "");
}

startButtonClick();
