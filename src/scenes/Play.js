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
        let spd = 1;
        // this.square1 = new Obstacle(this, 'wall', 0, 1, spd).setOrigin(0.5, 0);
        // this.square3 = new Obstacle(this, 'wall', 0, 3, spd).setOrigin(0.5, 0);
        // this.square5 = new Obstacle(this, 'wall', 0, 5, spd).setOrigin(0.5, 0);
        // this.square7 = new Obstacle(this, 'wall', 0, 7, spd).setOrigin(0.5, 0);
        // this.square9 = new Obstacle(this, 'wall', 0, 9, spd).setOrigin(0.5, 0);

        this.itemBlock = new ItemBlock(this, 'square', 0, 5, spd).setOrigin(0.5, 0);

        // laneWidth * 2 places top left of sprite at 2 64 x 64 squares away from the bottom
        // Added + 32 to offset the new origin of 0.5,0
        this.player = new Player(this, laneWidth * 5 + 32, game.config.height - laneWidth * 2, 'player', 0, 5).setOrigin(0.5,0);

        //Keys for input
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }
    update(){
        // this.square1.update();
        // this.square3.update();
        // this.square5.update();
        // this.square7.update();
        // this.square9.update();
        this.itemBlock.update();

        this.player.update();

        // these conditionals decide if the player receives an item
        // checkCollision spams true when colliding with an object
        // so in order to not give out a bunch of powerups we decide if the
        // player has just received one or not
        let itemCheck = this.checkCollision(this.player, this.itemBlock);
        // if colliding with block and didn't just receive an item give them one
        if(itemCheck && !this.player.itemJustReceived){
            let pUp = this.itemBlock.giveRandpUp();
            switch (pUp){
                case 'speed':
                    this.player.inventory.speed += 0.5
                    break;
                case 'jump':
                    this.player.inventory.jump += 0.5
                    break;
                case 'invuln':
                    this.player.inventory.invuln += 1;
            }
            console.log(pUp);
            this.player.itemJustReceived = true;
        }
        // if not colliding and just received one then set itemJustReceived to false
        // can infer that the item block is "physically" behind the player
        else if(!itemCheck && this.player.itemJustReceived){
            this.player.itemJustReceived = false;
        }
    }
    checkCollision(player, obs){
        if(obs instanceof ItemBlock && obs.scaleX > 0.97 && obs.scaleX < 1){
            return true;
        }
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