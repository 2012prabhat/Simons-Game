let colors = ["red","green","yellow","blue"];
let gamePattern = [];
let userChosenColor = [];
let gameStarted = false;
let level = 0;
let restartBtn = $(".restart");

function nextSequence(){
    userChosenColor = [];
    level++;
    $("#level-title").text("Level "+level);
    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColor = colors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    gameStarted = true;
}

function playSound(chosenColor){
    let sound = new Audio("sounds/"+chosenColor+".mp3");
    sound.play();
}


$(".restart").click(function() {
    if (!gameStarted) {
      $("#level-title").text("Level " + level);
      nextSequence();
      gameStarted = true;
      this.style.display = "none";
    }
  });

  $(".start").click(function() {
    if (!gameStarted) {
      $("#level-title").text("Level " + level);
      nextSequence();
      gameStarted = true;
      this.style.display = "none";
    }
  });

$(".btn").click(function (){
    if(gameStarted==true){
        let clickedColor = $(this).attr("id");
        playSound(clickedColor);
        $("#"+clickedColor).addClass("pressed");
        setTimeout(function () {
            $("#"+clickedColor).removeClass("pressed");
          }, 100);
    
          userChosenColor.push(clickedColor);
          checkAnswer(userChosenColor.length-1);
    }
});


function checkAnswer(currentLevel){
        if(gamePattern[currentLevel]===userChosenColor[currentLevel]){
            if(gamePattern.length === userChosenColor.length){
                setTimeout(function(){
                    nextSequence();
                },1000);
            }
        }
        else{
            playSound("wrong");
            $("body").addClass("game-over");
            setTimeout(function () {
                $("body").removeClass("game-over");
            }, 200);
            $("#level-title").text("Game Over, Press restart button to Restart");
            startOver();
        }
}

function startOver(){
    gamePattern = [];
    gameStarted = false;
    level = 0;
    restartBtn.css("display","flex");
}
