// Required variable declarations
const modal = document.querySelector('.modal-overlay');
const mssg = document.querySelector('.message h1');

// The player object is created
class myPlayer{
    constructor() {
        this.stepX = 101;
        this.stepY = 83;
        this.coordX = this.stepX * 2; // x coordinate of the player
        this.coordY = (this.stepY * 4) + 55; // y coordinate of the player
        this.x = this.coordX;   
        this.y = this.coordY;  
        this.sprite = 'images/char-boy.png';
        this.won = false;
    }
    
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    
     //The handeleInput method is called and:
     //the players x and y property is updated based the key input
     handleInput(input) {
          switch(input) {
            case 'up':
                if(this.y > this.stepY) { // conditional to ensure the player doent does move beyond the upper side
                this.y -= this.stepY;
                }
                break;
            case 'left':
                if(this.x > 0) { // conditional to ensure the player doent does move beyond the left side
                this.x -= this.stepX;
                }
                break;
            case 'right':
                if(this.x < this.stepX * 4) { // conditional to ensure the player doent does move beyond the right side
                this.x += this.stepX;
                }
                break;
            case 'down':
                if(this.y < this.stepY * 4) { // conditional to ensure the player doent does move beyond the lower side
                this.y += this.stepY;
                }
                break;
        }
    }
    //Method to fire when the player object and the enemy object collide
    update() {
       for(let enemy of allEnemies) {
          if(this.y === enemy.y && (enemy.x + enemy.move/2 > this.x && enemy.x < this.x + this.stepX/2)) { // Condition to check if the player and enemy collides
           this.reset(); // if the conditotion is met the reset method is passed
           mssg.classList.toggle('invisible');
           setTimeout(this.logMessage,1000);
          }
       }
       if(this.y === 55) { //
        this.won = true;
        modal.classList.toggle('hide');
       }
    }
    // Method that resets the player to it initial position
    reset() {
       this.x = this.coordX;   
       this.y = this.coordY;
    }
    // Method that toggles the collision message
    logMessage() { 
       mssg.classList.toggle('invisible');
    }
}

// The player object is created
const player = new myPlayer();

// constructor function for enemy our player must avoid
var Enemy = function(x, y, speed) {
    this.x = x; // positon of the enemy on x axis
    this.y = y + 55; // position of the enemy on y axis
    this.speed = speed; 
    this.sprite = 'images/enemy-bug.png'; // The image/sprite for our enemies
    this.move = 101;
    this.maxMove = this.move * 5;
    this.initial = -this.move; // Sets the initial position of the bug one grid off the canvas
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if(this.x < this.maxMove) { // Conditional to ensure the enemy moves wihtin the canvas
        this.x += this.speed * dt; // While the conditional is met the enemy moves at a constant speed
    }else { //When the condition has been broken:
        this.x = this.initial; // the position of the bug is reset to it initial
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Enemy objects are instantiated
const bug = new Enemy(-101, 0, 600);
const bugTwo = new Enemy(-101, 83, 500);
const bugThree = new Enemy(-101, 166, 700);
let allEnemies = []; // Array for the enemies is created    
allEnemies.push(bug, bugTwo, bugThree); //Enemy objects are added to the array

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