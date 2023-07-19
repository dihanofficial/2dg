//run sound
var runSound = new Audio("run.mp3");
runSound.loop = true;
//jump sound
var jumpSound = new Audio("jump.mp3");

//dead sound
var deadSound = new Audio("dead.mp3");


/// Key event

function keyCheck(event) {

    //Enter key
    if (event.which == 13) {

        if (runWokerId == 0) {

            runWokerId = setInterval(run, 100);
            runSound.play();

            moveBackgroundWokerId = setInterval(moveBackground, 100);
            createBlockWokerId = setInterval(createBlock, 100);
            moveBlockWokerId = setInterval(moveBlock, 100);
            scoreWokerId = setInterval(updateScore, 100);
        }

    }

    ///Space key
    if (event.which == 32) {

        if (jumpWokerId == 0) {

            clearInterval(runWokerId);
            runWokerId = -1;
            runSound.pause();

            jumpWokerId = setInterval(jump, 100);
            jumpSound.play();


        }

    }


}


//Boy run
var boyId = document.getElementById("boy");
var runImageNumber = 1;
var runWokerId = 0;

function run() {

    runImageNumber++;

    if (runImageNumber == 9) {
        runImageNumber = 1;
    }

    boyId.src = "Run (" + runImageNumber + ").png";
}



//Boy jump
var jumpImageNumber = 1;
var jumpWokerId = 0;
var boyMarginTop = 325;


function jump() {

    jumpImageNumber++;

    if (jumpImageNumber <= 7) {
        boyMarginTop = boyMarginTop - 30;
        boyId.style.marginTop = boyMarginTop + "px";
    }

    if (jumpImageNumber >= 8) {
        boyMarginTop = boyMarginTop + 30;
        boyId.style.marginTop = boyMarginTop + "px";
    }

    if (jumpImageNumber == 13) {
        jumpImageNumber = 1;


        clearInterval(jumpWokerId);
        jumpWokerId = 0;

        runWokerId = setInterval(run, 100);
        runSound.play();


        if (moveBackgroundWokerId == 0) {
            moveBackgroundWokerId = setInterval(moveBackground, 100);
        }

        if (scoreWokerId == 0) {
            scoreWokerId = setInterval(updateScore, 100);
        }

        if (createBlockWokerId == 0) {
            createBlockWokerId = setInterval(createBlock, 100);
        }

        if (moveBlockWokerId == 0) {
            moveBlockWokerId = setInterval(moveBlock, 100);
        }


    }


    boyId.src = "Jump (" + jumpImageNumber + ").png";

}



/// move background

var backgroundId = document.getElementById("background");
var backgroundX = 0;
var moveBackgroundWokerId = 0;

function moveBackground() {

    backgroundX = backgroundX - 20;
    backgroundId.style.backgroundPositionX = backgroundX + "px";
}


/// create block
var blockMarginLeft = 500;
var createBlockWokerId = 0;
var blockId = 1;

function createBlock() {

    var block = document.createElement("div");
    block.className = "block";
    block.id = "block" + blockId;

    blockId++;

    var gap = Math.random() * (1000 - 400) + 400;

    blockMarginLeft = blockMarginLeft + gap;
    block.style.marginLeft = blockMarginLeft + "px";

    document.getElementById("background").appendChild(block);
}


//block move
var moveBlockWokerId = 0;

function moveBlock() {

    for (var i = 1; i <= blockId; i++) {

        var currentBlock = document.getElementById("block" + i);
        var currentBlockMarginLeft = currentBlock.style.marginLeft;
        var newBlockMarginLeft = parseInt(currentBlockMarginLeft) - 20;

        currentBlock.style.marginLeft = newBlockMarginLeft + "px";

        // alert(newBlockMarginLeft);

        if (newBlockMarginLeft < 124 & newBlockMarginLeft > 24) {
            //alert(boyMarginTop);
            //235
            //alert("Dead!");

            if (boyMarginTop > 300) {

                //alert("Dead!");

                clearInterval(runWokerId);
                runSound.pause();

                clearInterval(jumpWokerId);
                jumpWokerId = -1;

                clearInterval(scoreWokerId);
                clearInterval(moveBackgroundWokerId);
                clearInterval(createBlockWokerId);
                clearInterval(moveBlockWokerId);

                deadWokerId = setInterval(dead, 100);
                deadSound.play();

            }
        }
    }
}



//score

var newScore = 0;
var scoreId = document.getElementById("score");
var scoreWokerId = 0;

function updateScore() {

    newScore++;
    //newScore = newScore + 10;

    scoreId.innerHTML = newScore;

}


//dead
var deadImageNumber = 1;
var deadWokerId = 0;

function dead() {

    deadImageNumber++;

    if (deadImageNumber == 11) {
        deadImageNumber = 10;


        boyId.style.marginTop = "325px";

        document.getElementById("endScreen").style.visibility = "visible";
        document.getElementById("endScore").innerHTML = newScore;
    }

    boyId.src = "Dead (" + deadImageNumber + ").png";


}


//reload

function reload() {
    location.reload();
}
