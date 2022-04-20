let lastLEFTUpState = true;
let lastRIGHTUpState = true;
class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }
    preload(){
        this.load.image('square', './assets/square.png');
        this.load.image('player', './assets/square.png');
    }
    create(){
        this.square = new Obstical(this, 100, 100, 'square', 0, 1, 5);
        // laneWidth * 2 places top left of sprite at 2 64 x 64 squares away from the bottom
        this.player = new Player(this, laneWidth * 5, game.config.height - laneWidth * 2, 'player', 0, 5).setOrigin(0,0);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }
    update(){
        this.square.update();
        this.player.update();
    }
}