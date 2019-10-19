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
    congratImageUrl:
      "https://media.giphy.com/media/wcFlXfhyyyp0c/giphy.gifww.baidu.com"
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

var currentLevelIndex = 0;
var currentLevel = levels[currentLevelIndex];
var currentlevelAnswer = currentLevel.answer;
var currentLevelCongratImageUrl = currentLevel.congratImageUrl;

function checkAnswer(userSelection) {
  if (userSelection == currentlevelAnswer) {
    showRight(currentLevel);
  } else {
    showWrong(currentLevel);
  }
}

function showRight(thisLevel) {
  $("#showUserCheckResult").text("WELL DONE MATE!");
}

function showGame(game) {
  $("#question").text(game.question);
  for (let answer of game.possibleAnswers) {
    var possibleAnswersButton = $("<button>");
    $(possibleAnswersButton).text(answer);
    $(possibleAnswersButton).click(function() {
      checkAnswer(answer);
    });
  }
  $("#answers").text(game.possibleAnswers);
  $("#answers").text(game.possibleAnswers);
}
