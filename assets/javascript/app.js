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
    question: "Who directed the 2015 movie 'The Revenant' ?",
    possibleAnswers: [
      "Alejandro G. I",
      "Christopher Nolan",
      "David Fincher",
      "Wes Anderson"
    ],
    answer: "Alejandro G. I",
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
var currentLevelIndex = -1;
var currentLevel;
var currentlevelAnswer;
var currentlevelAnswerIndex;
var currentLevelCongratImageUrl;
var currentLevelPossibleAnswers;
var currentLevelQuestion;
var correctAnswer = 0;
var incorrectAnswer = 0;
var unansweredAnswer = 0;

$(document).ready(function() {
  function getNextLevel() {
    currentLevelIndex++;
    currentLevel = levels[currentLevelIndex];
    currentlevelAnswer = currentLevel.answer;
    currentlevelAnswerIndex = currentLevel.answerIndex;
    currentLevelCongratImageUrl = currentLevel.congratImageUrl;
    currentLevelPossibleAnswers = currentLevel.possibleAnswers;
    currentLevelQuestion = currentLevel.question;
  }

  function startButtonClick() {
    var video = $("#videoBG");
    video.attr("src", "../TriviaGame/assets/images/playagame.mp4");
    video.get(0).load();
    video.get(0).play();

    $("#startButton").click(function() {
      var audioBG = $("#audioBG");
      audioBG.remove();
      // audio.currentTime = 0;
      video.attr("src", "../TriviaGame/assets/images/codes.mp4");
      video.get(0).load();
      video.get(0).play();
      $("#startButton").css("display", "none");
      $(".gameLevel").css("visibility", "visible");

      generateQuestionTimer();
    });
  }

  function generateQuestionTimer() {
    clearRightOrWrong();
    timerNumber = 31;
    showGame();
    clearInterval(questionTimer);
    questionTimer = setInterval(decrementQuestion, 1000);
  }

  function decrementQuestion() {
    timerNumber--;
    $("#timerRow").html("<h2>" + timerNumber + " seconds remaining " + "</h2>");
    if (timerNumber <= 0) {
      unansweredAnswer++;
      clearInterval(questionTimer);
      generateFailedAnswerTimer();
    }
  }

  function showGame() {
    getNextLevel();
    console.log(currentLevelIndex);
    $("#question").text(currentLevelQuestion);
    for (let answer of currentLevelPossibleAnswers) {
      var possibleAnswersButton = $("<button>");
      possibleAnswersButton.text(answer);
      possibleAnswersButton.addClass("button");
      possibleAnswersButton.click(function() {
        clearInterval(questionTimer);
        $("#timerRow").html("");
        var buttonText = $(this).text();
        checkAnswer(buttonText);
      });
      var cell = $("<li>");
      cell.css("list-style-type", "none");
      cell.append(possibleAnswersButton);
      $("#answers").append(cell);
    }
  }

  function checkAnswer(userSelection) {
    console.log(userSelection, currentlevelAnswer);
    if (userSelection == currentlevelAnswer) {
      generateSuccessfulAnswerTimer();
      correctAnswer++;
    } else {
      generateFailedAnswerTimer();
      incorrectAnswer++;
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
    $("#timerRow").html("");
    if (timerNumber === 0 && currentLevelIndex === levels.length - 1) {
      clearInterval(rightAnswerTimer);
      ShowGameStat();
    } else if (timerNumber <= 0) {
      clearInterval(rightAnswerTimer);

      generateQuestionTimer();
    }
  }

  function generateFailedAnswerTimer() {
    timerNumber = 5;
    showWrong();
    clearInterval(wrongAnswerTimer);
    wrongAnswerTimer = setInterval(decrementWrongAnswer, 1000);
    // console.log(currentLevelIndex);
  }

  function decrementWrongAnswer() {
    timerNumber--;
    $("#timerRow").html("");
    if (timerNumber === 0 && currentLevelIndex === levels.length - 1) {
      clearInterval(wrongAnswerTimer);
      ShowGameStat();
    } else if (timerNumber === 0) {
      clearInterval(wrongAnswerTimer);
      generateQuestionTimer();
    }
  }

  function showRight() {
    //   clearInterval(questionTimer);
    // $("#answers").html("The right answer is: " + currentlevelAnswer);
    displayRightAnswer();
    $("#rightOrWrong").text("WELL DONE!");
    $("#congratPanel").attr("src", currentLevelCongratImageUrl);
    //   currentLevelIndex++;
  }

  function displayRightAnswer() {
    var rightAnswer = $("<div>");
    rightAnswer
      .addClass("shinyColor")
      .html("The right answer is: " + currentlevelAnswer);
    $("#answers").html(rightAnswer);
  }

  function showWrong() {
    //   clearInterval(questionTimer);
    displayRightAnswer();
    $("#rightOrWrong").text("COME ON!");
    // $("#answers").html("The right answer is: " + currentlevelAnswer);
    $("#congratPanel").attr("src", loseImageUrl);
  }

  function clearRightOrWrong() {
    $("#rightOrWrong").text("");
    $("#answers").html("");
    $("#congratPanel").attr("src", "");
  }

  function clearGameStat() {
    currentLevelIndex = -1;
    correctAnswer = 0;
    incorrectAnswer = 0;
    unansweredAnswer = 0;
  }

  function ShowGameStat() {
    $(".gameLevel").css("display", "none");
    $(".gameStatPanel").css("visibility", "visible");
    $("#correctAnswer").text(correctAnswer);
    $("#incorrectAnswer").text(incorrectAnswer);
    $("#unansweredAnswer").text(unansweredAnswer);
    $("#restartButton").css("visibility", "visible");

    $("#restartButton").click(function() {
      $(".gameLevel").css("display", "block");
      $(".gameStatPanel").css("display", "none");
      clearGameStat();

      generateQuestionTimer();
    });
  }

  startButtonClick();
});
