class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }
    preload(){
        this.load.image('square', './assets/square.png');
        this.load.image('wall', './assets/metal_wall.png');
        this.load.image('player', './assets/robo_player.png');
    }
    create(){
        let spd = 0.5;
        this.square1 = new Obstical(this, 'wall', 0, 1, spd).setOrigin(0.5, 0);
        this.square3 = new Obstical(this, 'wall', 0, 3, spd).setOrigin(0.5, 0);
        this.square5 = new Obstical(this, 'wall', 0, 5, spd).setOrigin(0.5, 0);
        this.square7 = new Obstical(this, 'wall', 0, 7, spd).setOrigin(0.5, 0);
        this.square9 = new Obstical(this, 'wall', 0, 9, spd).setOrigin(0.5, 0);

        // laneWidth * 2 places top left of sprite at 2 64 x 64 squares away from the bottom
        // Added + 32 to offset the new origin of 0.5,0
        this.player = new Player(this, laneWidth * 5 + 32, game.config.height - laneWidth * 2, 'player', 0, 5).setOrigin(0.5,0);

        //Keys for input
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }
    update(){
        this.square1.update();
        this.square3.update();
        this.square5.update();
        this.square7.update();
        this.square9.update();

        this.player.update();
        console.log(this.checkCollision(this.player, this.square5));
        

    }
    // add checking for if player is jumping
    checkCollision(player, obs){
        if(obs.scaleX >= 1.05){
            return false;
        }
        if(obs.scaleX > 0.97 && obs.scaleX < 1 && !player.isJumping){
            if(player.lane == obs.lane){
                return true;
            }
            return false;
        }
        return false;
    }
}