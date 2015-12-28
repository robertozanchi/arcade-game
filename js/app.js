// Enemies our player must avoid
var Enemy = function(x, y) {
  // Set the enemy image to bug
  this.sprite = 'images/enemy-bug.png';
  // Set the enemy's postion
  this.x = x;
  this.y = y;
  // Set the enemy speed speed
  this.rate = 100 + Math.floor(Math.random() * 150);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  this.x = this.x + (dt * this.rate);
  // When bug goes off one side, reappear on the other side
  if (this.x > 700){
    this.x = -100;
    this.rate = 100 + Math.floor(Math.random() * 150);
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
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
    player.reset();
  }
};

Player.prototype.reset = function () {
  this.x = 303;
  this.y = 404;
};

// Handle keyboard input during gameplay
Player.prototype.handleInput = function(key) {
  switch(key) {
    case 'up':
      if (this.y > 0){
        this.y -= 83;
      }
      break;
    case 'down':
      if (this.y < 404) {
        this.y += 83;
      }
      break;
    case 'left':
      if (this.x > 0) {
        this.x -= 101;
      }
      break;
    case 'right':
      if (this.x < 404){
        this.x += 101;
      }
      break;
  }
};

// Draw the player on the screen
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
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
