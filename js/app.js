// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    this.x = 0;
    this.y =  (1 + getRandomInt(3)) * 83 - 18;

    this.width = 95;
    this.height = 63;

    this.sideMargin = 3;

    this.topMargin = 78;
    this.bottomMargin = 30;
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt * (10 + Math.random() * 200);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//get positions for collision detection
Enemy.prototype.getPosX = function() {
    return this.x;
}

Enemy.prototype.getPosY = function() {
    return this.y;
}

//get width height for collision detection
Enemy.prototype.getWidth = function() {
    return this.width;
}

Enemy.prototype.getHeight = function() {
    return this.height;
}

//get margins for collision detection
Enemy.prototype.getSideMargin = function() {
    return this.sideMargin;
}

Enemy.prototype.getTopMargin = function() {
    return this.topMargin;
}

Enemy.prototype.getBottomMargin = function() {
    return this.bottomMargin;
}

//get a random integer for enemy placement
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(canvasContext) {
    this.sprite = 'images/char-boy.png';

    this.width = 67;
    this.height = 75;

    this.sideMargin = 17;

    this.topMargin = 65;
    this.bottomMargin = 31;
    //needed to detection whether the player goes out of the canvas
    this.canvasContext = canvasContext;

    this.movementX = 20;
    this.movementY = 20;

    //initial position
    this.x = 2 * 101;
    this.y = 5 * 83;
};

Player.prototype.handleInput = function(direction) {

    const canvasWidth = this.canvasContext.canvas.scrollWidth;
    const canvasHeight = this.canvasContext.canvas.scrollHeight;

    switch(direction) {
        case 'left':
            if(this.x + this.sideMargin >= this.movementX) {
                this.x -= this.movementX;
            } else {
                this.x = -this.sideMargin;
            }
            break;
        case 'right':
            if(this.x + this.sideMargin + this.width + this.movementX <= canvasWidth) {
                this.x += this.movementX;
            } else {
                this.x = canvasWidth - (this.sideMargin + this.width);
            }
            break;
        case 'down':
            if(this.y + this.topMargin + this.height + this.movementY <= canvasHeight) {
                this.y += this.movementY;
            } else {
                this.y = canvasHeight - (this.topMargin + this.height);
            }
            break;
        case 'up':
            //no need to do border detection because reaching to the water ends the game
            this.y -= this.movementY;
            if(this.y + this.topMargin + this.height < 83 + 55) {
                showResultPage();
            }
    }
};


Player.prototype.update = function() {

}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

}
//get positions for collision and border detection
Player.prototype.getPosX = function() {
    return this.x;
}

Player.prototype.getPosY = function() {
    return this.y;
}
//get width and height for collision and border detection
Player.prototype.getWidth = function() {
    return this.width;
}

Player.prototype.getHeight = function() {
    return this.height;
}
//get margins for collision and border detection
Player.prototype.getSideMargin = function() {
    return this.sideMargin;
}

Player.prototype.getTopMargin = function() {
    return this.topMargin;
}

Player.prototype.getBottomMargin = function() {
    return this.bottomMargin;
}

//make the result page and replace the current page
function showResultPage() {
    const fragment = document.createElement('div');

    const newImgElement = document.createElement('img');
    newImgElement.src = 'images/checkmark.gif';
    newImgElement.className = 'checkmark-img';
    newImgElement.alt = 'Animated checkmark image';
    fragment.appendChild(newImgElement);

    const newHeadingElement = document.createElement('h1');
    newHeadingElement.innerText = 'Congratulations! You won!';
    fragment.appendChild(newHeadingElement);

    const buttonElement = document.createElement('button');
    buttonElement.innerText = 'Play Again!';
    buttonElement.addEventListener('click', function() {
        location.reload();
    });
    fragment.appendChild(buttonElement);

    document.body.innerHTML = '';
    document.body.appendChild(fragment);
}


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});




