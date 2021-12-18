let colors = ["red","green","yellow","blue"];
let gamePattern = [];
let userChosenColor = [];
let gameStarted = false;
let level = 0;

function nextSequence(){
        userChosenColor = [];
        level++;
        $("#level-title").text("Level "+level);
        let randomNumber = Math.floor(Math.random()*4);
        let randomChosenColor = colors[randomNumber];
        gamePattern.push(randomChosenColor);
        $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(randomChosenColor);
    }


function playSound(chosenColor){
    let sound = new Audio("sounds/"+chosenColor+".mp3");
    sound.play();
}
  $(".start").click(function() {
      $(this).css("display","none");
    if(!gameStarted){
    $("#level-title").text("Level "+level);
    nextSequence();
    gameStarted = true;

    }

  });

$(".btn").click(function (){
        let clickedColor = $(this).attr("id");
        userChosenColor.push(clickedColor);
        playSound(clickedColor);
        $("#"+clickedColor).addClass("pressed");
        setTimeout(function () {
            $("#"+clickedColor).removeClass("pressed");
          }, 100);
    
          checkAnswer(userChosenColor.length-1);
});


function checkAnswer(currentLevel){
        if(gamePattern[currentLevel]===userChosenColor[currentLevel]){
            if(userChosenColor.length === gamePattern.length){
                setTimeout(function(){
                    nextSequence();
                },1000);
            }
        }
        else{
            playSound("wrong");
            $("body").addClass("game-over");
            $("#level-title").text("Game Over, Press Start button to Restart");
            setTimeout(function () {
                $("body").removeClass("game-over");
            }, 200);
            startOver();
        }
    }
    
    function startOver(){
        $(".start").css("display","flex");
        level = 0;
        gamePattern = [];
        userChosenColor = [];
        gameStarted = false;
}
