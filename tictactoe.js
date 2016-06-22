var clickNum = 0;
var chosenArray1 =[];
var chosenArray2 =[];
var player = "";
var player1Score = 0;
var player2Score = 0;
localStorage.setItem('player1Score', 0);
localStorage.setItem('player2Score', 0);

$(document).ready(function(){

//The player can choose their board background by clicking on the themes.
  $("li:eq(0)").click(function(){
    $("#board").removeClass("island night waterfall");
    $("#board").addClass("island");
  });

  $("li:eq(1)").click(function(){
    $("#board").removeClass("island night waterfall");
    $("#board").addClass("night");
  });
  $("li:eq(2)").click(function(){
    $("#board").removeClass("island night waterfall");
    $("#board").addClass("waterfall");
  });

//resets the board to play again via the button.
  var reset = function(){
    $(".square").removeClass("p2 p1 flash");
    clickNum = 0;
    chosenArray1=[];
    chosenArray2=[];
    $(".square").off("click").one("click", game);
    $("h2").text("");

  };

  $("button").click(reset); // reset game

  var winningArrays = [ [0, 1, 2], [0, 4, 8], [0, 3, 6], [1, 4, 7], [2, 4, 6], [2, 5, 8], [3, 4, 5], [6, 7, 8] ];

  // This function checks if a player has won.
  var subset = function(chosenArray){
    // We're checking that clickNum is less than 9 because we want the game to end after all 9 boxes have been clicked.
    if(clickNum <9){
      // First, go through all the arrays in winningArrays and check if the the indexes of player's box choices matches any of the numbers in a winning array
      for (var i = 0; i < winningArrays.length; i++) {
      var matchedMoves = 0;
      for (var k = 0; k < chosenArray.length; k++) {
        if( winningArrays[i].includes(chosenArray[k])){
        // If the any of the numbers match add 1 to matched move.
        matchedMoves += 1;
        }
        // When all three numbers in a player's array matches a winning array, we want the the winning boxes to flash three times and update the h2 to state who the winner is.
        if(matchedMoves >= 3){
          for (var m = 0; m < winningArrays[i].length; m++) {
            $("div.square").eq(winningArrays[i][m]).addClass("flash");
          }
          $("h2").text(player +", you've won!");
          //To keep score, of each player's wins, add a point to their respective score variable and display it.
          if(player === "Player 1"){
            player1Score++;
            var localScore = parseInt(localStorage.getItem('player1Score'));
            localScore++;
            localStorage.setItem('player1Score', localScore);
            $("#p1").text(player1Score);
            $("#p2").text(player2Score);
          }else{
            player2Score++;
            var localScore2 = parseInt(localStorage.getItem('player2Score'));
            localScore2++;
            localStorage.setItem('player2Score', localScore2);
            $("#p1").text(player1Score);
            $("#p2").text(player2Score);
          }
          }
        }
      }
    //if there was no winner after all squares were clicked, return a message to restart the game.
    }else{
      $("h2").text("Looks like no one won! Click below to play again!");
    }
  };
//Game function executes the player's turn
  var game = function(){
    var index = $(".square").index(this);
    ++clickNum;
    //Clicknum determines which player is going. Odd is turns is player 1. Even turns is player 2.
    if(clickNum % 2 === 0){
    //When the player clicks the square the square turns to the player's color and adds to square index to their chosenArray. Then the "subset" function is run to check if there is a winner.
      $(this).addClass("p2");
      chosenArray2.push(index);// adds chosen to new array
      player = "Player 2";
      subset(chosenArray2);
      }

     else{
      $(this).addClass("p1");
      chosenArray1.push(index);
      player = "Player 1";
      subset(chosenArray1);
      }
    };
//When a square is clicked, that is the start of the game. Each square can only be clicked once.
$(".square").one("click", game);

});
