/* Usefull global variables */
var currentScore = 0;
var crashedCount = 0;
                 
// Enemies our player must avoid
var Enemy = function (locX, locY, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.locX = locX;
    this.locY = locY;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.locX += this.speed * dt;
    this.locX = this.locX > 500 ? 0 : this.locX;
    this.crash();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.locX, this.locY);
};

Enemy.prototype.crash = function () {
    if (player.locX + 26 <= this.locX + 90 && player.locX + 77 >= this.locX + 10 && player.locY + 130 >= this.locY + 92 && player.locY + 72 <= this.locY + 132) {
        document.getElementById("crashed").innerHTML = ++crashedCount;
        restart();
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (locX, locY, speed) {
    this.locX = locX;
    this.locY = locY;
    this.speed = speed;
    this.sprite = 'images/char-boy.png'
}

Player.prototype.update = function () {
    // Only update coordinates when the player has made a move
    if (this.moved) {
        this.locX = this.col * 100;
        this.locY = this.row * 100;
        this.moved = false;
    }
    // If the player reaches the water the game should be reset by
    // moving the player back to the initial location
    if (this.locY === 0) {
        currentScore += 1;
        document.getElementById("score").innerHTML = currentScore;
        this.reset();
    }
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.locX, this.locY);
}

Player.prototype.handleInput = function (keyPressed) {
    if (keyPressed == 'right') {
        this.locX += this.speed;
        if (this.locX > 400)
            this.locX = 400;
    } else if (keyPressed == 'left') {
        this.locX -= this.speed;
        if (this.locX < 2)
            this.locX = 2;
    } else if (keyPressed == 'down') {
        this.locY += this.speed;
        if (this.locY > 410)
            this.locY = 410;
    } else if (keyPressed == 'up') {
        this.locY -= this.speed;
        if (this.locY <= 25) {
            winning();
            return;
        }

    }
}

// Move player one column/row in the given direction
Player.prototype.move = function (direction) {
    switch (direction) {
        case "right":
            this.col += 1;
            break;
        case "left":
            this.col -= 1;
            break;
        case "down":
            this.row += 1;
            break;
        case "up":
            this.row -= 1;
            break;
    }
    this.moved = true;
};

Player.prototype.reset = function () {
    this.locX = 200;
    this.locY = 410;
    this.speed = 80;
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
var player = new Player(0, 0, 0);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Game Winning 
function winning() {
    player.reset();
    currentScore++;
    document.getElementById("score").innerText = currentScore;
    var prob = parseInt(Math.random() * 10);
    if (prob < 5 && allEnemies.length < 5) {
        var enemy = new Enemy(0, 40 + Math.random() * 100, 40 + Math.random() * 100);
        allEnemies.push(enemy);
    }
}

// Restart Game
function restart() {
    player.reset();
    allEnemies = [];
    allEnemies.push(
        new Enemy(0, 40 + Math.random() * 100, 40 + Math.random() * 100),
        new Enemy(0, 60 + Math.random() * 100, 60 + Math.random() * 100),
        new Enemy(5, 50 + Math.random() * 130, 70 + Math.random() * 100)
    );
}

restart();