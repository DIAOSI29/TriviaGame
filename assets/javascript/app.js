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

function startButtonClick() {
  $("#startButton").click(function() {
    $("#startButton").css("display", "none");
    $("#gameLevel").css("visibility", "visible");
    generateQuestionTimer(currentLevel);
  });
}

function generateQuestionTimer(game) {
  timerNumber = 30;
  showGame(game);
  clearInterval(questionTimer);
  questionTimer = setInterval(decrementQuestion, 1000);
}

function decrementQuestion() {
  timerNumber--;
  $("#timerRow").html("<h2>" + timerNumber + "</h2>");
  if (timerNumber <= 0) {
    //   clearInterval(questionTimer);

    generateFailedAnswerTimer(currentLevel);
  }
}

function showGame(game) {
  $("#question").text(game.question);
  for (let answer of game.possibleAnswers) {
    var possibleAnswersButton = $("<button>");
    possibleAnswersButton.text(answer);
    possibleAnswersButton.click(function() {
      clearInterval(questionTimer);
      checkAnswer(this.text);
      //   console.log("checkpoint");
    });
    var cell = $("<li>");
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
  clearInterval(rightAnswerTimer);
  rightAnswerTimer = setInterval(decrementRightAnswer, 1000);
}
function decrementRightAnswer() {
  timerNumber--;
  $("#timerRow").html("<h2>" + timerNumber + "seconds remaining " + "</h2>");
  if (timerNumber <= 0) {
    clearInterval(rightAnswerTimer);

    currentLevelIndex++;
    generateQuestionTimer(currentLevel);
  }
}

// run();

function generateFailedAnswerTimer(game) {
  timerNumber = 5;
  showWrong();
  //   clearInterval(answerTimer);
  wrongAnswerTimer = setInterval(decrementWrongAnswer, 1000);
}

function decrementWrongAnswer() {
  timerNumber--;
  $("#timerRow").html("<h2>" + timerNumber + "seconds remaining " + "</h2>");
  if (timerNumber <= 0) {
    clearInterval(wrongAnswerTimer);
    currentLevelIndex++;
    generateQuestionTimer(currentLevel);
  }
}

function showRight() {
  //   clearInterval(questionTimer);
  $("#rightOrWrong").text("WELL DONE MATE!");
  $("#answers").html("The right answer is: " + currentlevelAnswer);
  $("#congratPanel").attr("src", currentLevelCongratImageUrl);
  currentLevelIndex++;
}

function showWrong() {
  //   clearInterval(questionTimer);
  $("#rightOrWrong").text("WRONG GUESS MATE!");
  $("#answers").html("The right answer is: " + currentlevelAnswer);
  $("#congratPanel").attr("src", loseImageUrl);
  currentLevelIndex++;
}

startButtonClick();
