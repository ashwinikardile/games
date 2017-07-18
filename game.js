var canvas; //Handle on dimensions of display area
var canvasContext; //underline graphical information
var ballX = 170;
var ballY = ballX - 20;
var ballSpeedX = 15;
var ballSpeedY = 6;
var paddelOneY = 250;
var paddelTwoY = 250;
const paddelHeight = 100;
const paddelWidth = 10;
const winScore = 5;
var playerOneScore = 0;
var playerTwoScore = 0;
var winCondition = false;

function mouseMovement(events){
  var root = document.documentElement;
  var rect = canvas.getBoundingClientRect(); //get handle
  var mouseX = events.clientX - rect.left - root.scrollLeft;
  var mouseY = events.clientY - rect.top - root.scrollTop;
  return {
    coordinateX:mouseX,
    coordinateY:mouseY
  };
}

function handleMouseClick(events) {
  if (winCondition) {
    playerOneScore = 0;
    playerTwoScore = 0;
    winCondition = false;
  }
}

    window.onload = function () {
      canvas = document.getElementById('gameCanvas');
      canvasContext = canvas.getContext('2d');
      //set up a timer to slow down the process
      var framesPerSec = 20;
      setInterval(function(){
        moveEverything();
        draw();
      },1000/framesPerSec);

    canvas.addEventListener('mousemove' ,
      function(events){
        var mouseLocation = mouseMovement(events);
        paddelOneY = mouseLocation.coordinateY-(paddelHeight/2);
        //paddelTwoY = mouseLocation.coordinateY-(paddelHeight/2);
      });

      canvas.addEventListener('mousedown', handleMouseClick);
    }

  function draw() {
    drawRect(0,0,canvas.width,canvas.height, 'LightSkyBlue');
    if (winCondition) {
      canvasContext.fillStyle = 'black';
      if (playerOneScore >= winScore){
      canvasContext.fillText("Player One Won!", 400,300);
      }else if (playerTwoScore >= winScore) {
        canvasContext.fillText("Player Two Won !", 400,300);
      }
      canvasContext.fillText("Click to continue!", 400,350);
      return;
    }

    drawRect(0,paddelOneY,paddelWidth,paddelHeight, 'red');
    drawRect(canvas.width-paddelWidth,paddelTwoY,paddelWidth,paddelHeight, 'red');

    // Draw Circle
    //drawRect(ballX,150,20,20,'green');
    drawCircle(ballX,ballY,10,0,Math.PI*2,true,'black');

    canvasContext.fillText("Player One Score: "+playerOneScore,100,100);
    canvasContext.fillText("Player Two Score: "+playerTwoScore,canvas.width-200,100);

  }

  function playerTwoMove(){
    var paddelTwoYCenter = paddelTwoY + (paddelHeight/2);
    if (paddelTwoYCenter < ballY-35) {
      paddelTwoY += 6;
    }else if (paddelTwoYCenter > ballY+35) {
      paddelTwoY -= 6;
    }
  }

  function moveEverything() {
    if (winCondition) {
      return;
    }
    playerTwoMove();
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    if (ballX < 0) {
      if (ballY > paddelOneY && ballY < paddelOneY+paddelHeight) {
        ballSpeedX = -ballSpeedX;
        var diffY = ballY -(paddelOneY+(paddelHeight/2));
        ballSpeedY = diffY*0.35;
      }else{
        playerTwoScore += 1;
        resetBall();
      //ballSpeedX = -ballSpeedX;

      }
    }
    if(ballY < 0){
      ballSpeedY = -ballSpeedY;
    }
    if (ballY > canvas.height) {
      ballSpeedY = -ballSpeedY;
      //resetBall();
    }
    if (ballX > canvas.width) {
      if (ballY > paddelTwoY && ballY < paddelTwoY+paddelHeight) {
        ballSpeedX = -ballSpeedX;
        var diffY = ballY -(paddelTwoY+(paddelHeight/2));
        ballSpeedY = diffY*0.35;
      }else {
        playerOneScore += 1;
        resetBall();

      }
    }
  }

  function drawCircle(x,y,r,sAngle,eAngle,direction,color){
    canvasContext.fillStyle = 'black';
    canvasContext.beginPath();
    canvasContext.arc(x,y,r,sAngle,eAngle,true);
    canvasContext.fill();
  }

  function drawRect(x,y,w,h,color) {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x,y,w,h);
  }

  function resetBall(){
    if (playerOneScore >= winScore ||
        playerTwoScore >= winScore) {
          winCondition = true;
    }
    ballSpeedX = -ballSpeedX;
    ballX = canvas.width/2;
    ballY = canvas.height/2;
  }
