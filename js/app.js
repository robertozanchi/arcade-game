// Enemies the player must avoid
var Enemy = function(x, y) {
    // Set the enemy image to bug
    this.sprite = 'images/enemy-bug.png';
    // Set the enemy's postion
    this.x = x;
    this.y = y;
    // Set the enemy's initial speed
    this.rate = 100 + Math.floor(Math.random() * 150);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x = this.x + (dt * this.rate);
    // When bug goes off one side, reappear on the other side
    if (this.x > 700){
        this.x = -100;
        // Assigns a new speed to enemy
        this.rate = 100 + Math.floor(Math.random() * 150);
    }
};

// Reset player when she collides with an enemy
Enemy.prototype.checkCollision = function() {
    if (player.x < this.x + 65 &&
        player.x + 65 > this.x &&
        player.y < this.y + 65 &&
        65 + player.y > this.y) {
        player.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class
var Player = function(x,y) {
    // Set the player image to boy character
    this.sprite = 'images/char-boy.png';
    // Set the player's position
    this.x = x;
    this.y = y;
};

Player.prototype.update = function() {
    // When player reaches water, the position is reset
    if (this.y < 0) {
        this.reset();
  }
};

// Resets player's position to initial position
Player.prototype.reset = function () {
    this.x = 303;
    this.y = 404;
};

// Handle keyboard input during gameplay
Player.prototype.handleInput = function(key) {
    var tile_width = 101;
    var tile_length = 83;
    switch(key) {
        case 'up':
        if (this.y > 0){
            this.y -= tile_length;
        }
        break;
        case 'down':
        if (this.y < 404) {
            this.y += tile_length;
        }
        break;
        case 'left':
        if (this.x > 0) {
            this.x -= tile_width;
        }
        break;
        case 'right':
        if (this.x < 404){
            this.x += tile_width;
        }
        break;
    }
};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Instantiate enemy objects and put them in an array called allEnemies
var enemy1 = new Enemy(-101, 55);
var enemy2 = new Enemy(-101, 140);
var enemy3 = new Enemy(-101, 225);

var allEnemies = [];
allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);

// Place the player object in a variable called player
var player = new Player(303, 404);

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
