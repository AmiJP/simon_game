let Level = 0;

$(document).keypress(function () {
  if (Level == 0) {
    nextSequence();
  }
});

let gamePattern = [];

let userClickedPattern = [];

let buttonColor = ["red", "blue", "green", "yellow"];

$(".btn").click(function () {
  let userChosenColour = $(this).attr("id");
  console.log(userChosenColour);

  userClickedPattern.push(userChosenColour);
  soundPlay(userChosenColour);
  animation(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  let userlength = userClickedPattern.length;
  let gamelength = gamePattern.length;
  let user = userClickedPattern[currentLevel];
  let game = gamePattern[currentLevel];

  if (user == game) {
    console.log("success");
    if (userlength == gamelength) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    startOver();
    soundPlay("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    document.getElementById("level-title").innerHTML =
      "Game Over, Press Any Key to Restart";
  }
}

function nextSequence() {
  userClickedPattern = [];
  let randomNumber = [Math.floor(Math.random() * 4)];
  let randomchosencolor = buttonColor[randomNumber];
  gamePattern.push(randomchosencolor);
  $("#" + randomchosencolor)
    .fadeOut(100)
    .fadeIn(100)
    .fadeIn(100);
  document.getElementById("level-title").innerHTML = "Level" + " " + Level++;
}

function soundPlay(name) {
  let audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

function animation(currentcolor) {
  $("#" + currentcolor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentcolor).removeClass("pressed");
  }, 100);
}

function startOver() {
  Level = 0;
  gamePattern = [];
}
