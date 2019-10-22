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
  //function for update all game stats for next level
  function getNextLevel() {
    currentLevelIndex++;
    currentLevel = levels[currentLevelIndex];
    currentlevelAnswer = currentLevel.answer;
    currentlevelAnswerIndex = currentLevel.answerIndex;
    currentLevelCongratImageUrl = currentLevel.congratImageUrl;
    currentLevelPossibleAnswers = currentLevel.possibleAnswers;
    currentLevelQuestion = currentLevel.question;
  }

  //function for landing page button
  function startButtonClick() {
    var video = $("#videoBG");
    video.attr("src", "../TriviaGame/assets/images/playagame.mp4");
    video.get(0).load();
    video.get(0).play();

    //click to change video backgound when games starts and remove the audio play from landing page
    $("#startButton").click(function() {
      var audioBG = $("#audioBG");
      audioBG.remove();
      video.attr("src", "../TriviaGame/assets/images/codes.mp4");
      video.get(0).load();
      video.get(0).play();
      $("#startButton").css("display", "none");
      $(".gameLevel").css("visibility", "visible");

      generateQuestionTimer();
    });
  }

  //function to set intervals for each level
  function generateQuestionTimer() {
    clearRightOrWrong();
    timerNumber = 31;
    showGame();
    clearInterval(questionTimer);
    questionTimer = setInterval(decrementQuestion, 1000);
  }

  //function to display timer and set condition to proceed to the answer page
  function decrementQuestion() {
    timerNumber--;
    $("#timerRow").html("<h2>" + timerNumber + " seconds remaining " + "</h2>");
    if (timerNumber <= 0) {
      unansweredAnswer++;
      clearInterval(questionTimer);
      generateFailedAnswerTimer();
    }
  }

  //function to generate each level's VIEW based on the question ,possible answer, current game index, etc. Button will be generated automatically which will check answer upon click
  function showGame() {
    getNextLevel();
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

  //function for checking answer and then CONTROL which timer should the game be proceeded to
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

  //if user selected the right answer then show this page which has built in set interval timer
  function generateSuccessfulAnswerTimer() {
    timerNumber = 5;
    showRight();
    clearInterval(rightAnswerTimer);
    rightAnswerTimer = setInterval(decrementRightAnswer, 1000);
  }

  //display timer and CONTROL the game progress based on level
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

  //if user selected the wrong answer then show this page with built in set interval timer
  function generateFailedAnswerTimer() {
    timerNumber = 5;
    showWrong();
    clearInterval(wrongAnswerTimer);
    wrongAnswerTimer = setInterval(decrementWrongAnswer, 1000);
    // console.log(currentLevelIndex);
  }

  //CONTROL game progress based on level
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

  //function for the page VIEW on the answer page when right answer selected
  function showRight() {
    displayRightAnswer();
    $("#rightOrWrong").text("WELL DONE!");
    $("#congratPanel").attr("src", currentLevelCongratImageUrl);
  }

  function displayRightAnswer() {
    var rightAnswer = $("<div>");
    rightAnswer
      .addClass("shinyColor")

      .html("The right answer is: " + currentlevelAnswer);
    $("#answers").html(rightAnswer);
  }

  //function for the page VIEW on the answer page when wrong answer selected
  function showWrong() {
    displayRightAnswer();
    $("#rightOrWrong").text("COME ON!");

    $("#congratPanel").attr("src", loseImageUrl);
  }

  function clearRightOrWrong() {
    $("#rightOrWrong").text("");
    $("#answers").html("");
    $("#congratPanel").attr("src", "");
  }

  //function to reset game stat when all level had been cleared and ready to restart
  function clearGameStat() {
    currentLevelIndex = -1;
    correctAnswer = 0;
    incorrectAnswer = 0;
    unansweredAnswer = 0;
  }

  //function to show all game stats and display restart game button
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

  //function to get whole game started
  startButtonClick();
});
