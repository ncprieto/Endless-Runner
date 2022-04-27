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
        this.obs1 = new Obstacle(this, 'wall', 0, 1).setOrigin(0.5, 0);
        this.obs2 = new Obstacle(this, 'wall', 0, 2).setOrigin(0.5, 0);
        this.obs3 = new Obstacle(this, 'wall', 0, 3).setOrigin(0.5, 0);
        this.obs4 = new Obstacle(this, 'wall', 0, 4).setOrigin(0.5, 0);
        this.obs5 = new Obstacle(this, 'wall', 0, 5).setOrigin(0.5, 0);
        this.obs6 = new Obstacle(this, 'wall', 0, 6).setOrigin(0.5, 0);
        this.obs7 = new Obstacle(this, 'wall', 0, 7).setOrigin(0.5, 0);


        //item block init
        this.itemBlock = new ItemBlock(this, 'square', 0, 4).setOrigin(0.5, 0);

        // laneWidth * 2 places top left of sprite at 2 64 x 64 squares away from the bottom
        // Added + 32 to offset the new origin of 0.5,0
        this.player = new Player(this, laneWidth * 5 + 32, game.config.height - laneWidth * 2, 'player', 0, 5).setOrigin(0.5,0);

        //Keys for input
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyLEFT  = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // obs spawn timer event
        // executes every second and 1/2, slowly increases based on player speed
        this.upperSpawnBound = 2000;
        this.lowerSpawnBound = 1000;
        this.spawnObsClock = this.time.addEvent({delay: this.upperSpawnBound, callback: this.spawnObj, callbackScope: this, loop: true});
        // item block spawn event happens every 6 seconds
        this.itemSpawnRate = 6000;
        this.spawnItemClock = this.time.addEvent({delay: this.itemSpawnRate, callback: this.spawnItemBlock, callbackScope: this, loop: true});

        this.gameOver = false;
    }
    update(){
        if(!this.gameOver){
            this.obs1.update(this.player.inventory.speed);
            this.obs2.update(this.player.inventory.speed);
            this.obs3.update(this.player.inventory.speed);
            this.obs4.update(this.player.inventory.speed);
            this.obs5.update(this.player.inventory.speed);
            this.obs6.update(this.player.inventory.speed);
            this.obs7.update(this.player.inventory.speed);
            this.itemBlock.update(this.player.inventory.speed);
            this.player.update();
        }
        this.player.update();

        //these conditionals decide if the player receives an item
        //checkCollision spams true when colliding with an object
        //so in order to not give out a bunch of powerups we decide if the
        //player has just received one or not
        let itemCheck = this.checkCollision(this.player, this.itemBlock);
        if(itemCheck && !this.player.itemJustReceived){
            let pUp = this.itemBlock.giveRandpUp();
            switch (pUp){
                case 'speed':
                    this.player.inventory.speed += 0.5;
                    this.upperSpawnBound -= 100;
                    this.lowerSpawnBound -= 50;
                    this.adjustSpawnRate();
                    break;
                case 'jump':
                    this.player.inventory.jump += 0.5;
                    break;
                case 'invuln':
                    this.player.inventory.invuln += 1;
                    break;
            }
            console.log(pUp);
            this.player.itemJustReceived = true;
        }
        else if(!itemCheck && this.player.itemJustReceived){
            this.player.itemJustReceived = false;
        }

        // collision detection between player and obs1
        // similar to checking for item collision detection
        // collision detection function spams true on hits
        // but we only want to registed that it hit once
        let hitCheck1 = this.checkCollision(this.player, this.obs1);
        if(hitCheck1 && ! this.player.hitJustReceived1){
            this.player.hitJustReceived1 = true;
            this.player.health -= 1;
        }
        else if(!hitCheck1 && this.player.hitJustReceived1){
            this.player.hitJustReceived1 = false;
        }

        // collision detection between player and obs2
        let hitCheck2 = this.checkCollision(this.player, this.obs2);
        if(hitCheck2 && ! this.player.hitJustReceived2){
            this.player.hitJustReceived2 = true;
            this.player.health -= 1;
        }
        else if(!hitCheck2 && this.player.hitJustReceived2){
            this.player.hitJustReceived2 = false;
        }

        // collision detection between player and obs3
        let hitCheck3 = this.checkCollision(this.player, this.obs3);
        if(hitCheck3 && ! this.player.hitJustReceived3){
            this.player.hitJustReceived3 = true;
            this.player.health -= 1;
        }
        else if(!hitCheck3 && this.player.hitJustReceived3){
            this.player.hitJustReceived3 = false;
        }

        // collision detection between player and obs4
        let hitCheck4 = this.checkCollision(this.player, this.obs4);
        if(hitCheck4 && ! this.player.hitJustReceived4){
            this.player.hitJustReceived4 = true;
            this.player.health -= 1;
        }
        else if(!hitCheck4 && this.player.hitJustReceived4){
            this.player.hitJustReceived4 = false;
        }

        // collision detection between player and obs5
        let hitCheck5 = this.checkCollision(this.player, this.obs5);
        if(hitCheck5 && ! this.player.hitJustReceived5){
            this.player.hitJustReceived5 = true;
            this.player.health -= 1;
        }
        else if(!hitCheck5 && this.player.hitJustReceived5){
            this.player.hitJustReceived5 = false;
        }

        // collision detection between player and obs6
        let hitCheck6 = this.checkCollision(this.player, this.obs6);
        if(hitCheck6 && ! this.player.hitJustReceived6){
            this.player.hitJustReceived6 = true;
            this.player.health -= 1;
        }
        else if(!hitCheck6 && this.player.hitJustReceived6){
            this.player.hitJustReceived6 = false;
        }

        // collision detection between player and obs7
        let hitCheck7 = this.checkCollision(this.player, this.obs7);
        if(hitCheck7 && ! this.player.hitJustReceived7){
            this.player.hitJustReceived7 = true;
            this.player.health -= 1;
        }
        else if(!hitCheck7 && this.player.hitJustReceived7){
            this.player.hitJustReceived7 = false;
        }
        // health checking and game restart 
        // place holder for now
        if(this.player.health == 0){
            this.gameOver = true;
        }
        if(this.gameOver){
            this.scene.start("menuScene");
        }
    }
    checkCollision(player, obs){
        if(obs instanceof ItemBlock && obs.scaleX > 0.97 && obs.scaleX < 1){
            if(player.lane == obs.lane){
                return true;
            }
            return false;
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
    // random num generator decides which obs to spawn
    // if that obs it picked it already spawned an moving then
    // it moves to the next case below it and repeats
    spawnObj(){
        let obsNum = Math.floor(Math.random() * (7 - 1) + 1);
        switch(obsNum){
            case 1:
                if(!this.obs1.active){
                    this.obs1.lane = Math.floor(Math.random() * (7 - 1) + 1); // assign obs to be spawned new lane to spawn from
                    this.obs1.reset();                                        // reset gives us correct x position to spawn from
                    this.obs1.active = true;
                    break;
                }
            case 2:
                if(!this.obs2.active){
                    this.obs2.lane = Math.floor(Math.random() * (7 - 1) + 1);
                    this.obs2.reset();
                    this.obs2.active = true;
                    break;
                }
            case 3:
                if(!this.obs3.active){
                    this.obs3.lane = Math.floor(Math.random() * (7 - 1) + 1);
                    this.obs3.reset();
                    this.obs3.active = true;
                    break;
                }
            case 4:
                if(!this.obs4.active){
                    this.obs4.lane = Math.floor(Math.random() * (7 - 1) + 1);
                    this.obs4.reset();
                    this.obs4.active = true;
                    break;
                }
            case 5:
                if(!this.obs5.active){
                    this.obs5.lane = Math.floor(Math.random() * (7 - 1) + 1);
                    this.obs5.reset();
                    this.obs5.active = true;
                    break;
                }
            case 6:
                if(!this.obs6.active){
                    this.obs6.lane = Math.floor(Math.random() * (7 - 1) + 1);
                    this.obs6.reset();
                    this.obs6.active = true;
                    break;
                }
            case 7:
                if(!this.obs7.active){
                    this.obs7.lane = Math.floor(Math.random() * (7 - 1) + 1);
                    this.obs7.reset();
                    this.obs7.active = true;
                    break;
                }
        }
    }
    // spawnItemBlock works similar to obs spawning
    // choose a lane number between 2 and 7 and spawn it from that lane
    spawnItemBlock(obs){
        let laneNum = Math.floor(Math.random() * (7 - 2) + 2);
        this.itemBlock.lane = laneNum;
        this.itemBlock.reset();
        this.itemBlock.active = true;
    }
    // adjustSpawnRate adjusts rate at which obs timer events trigger
    // upper and lower bound slowly decrease and player gain more speed
    // essentially makes the spawing of obs faster giving illusion that player
    // is also moving fastert
    adjustSpawnRate(){
        if(this.upperSpawnBound < 600){
            this.upperSpawnBound = 600;
        }
        if(this.lowerSpawnBound < 300){
            this.lowerSpawnBound = 300;
        }
        // this next line chooses a number between the lower and upper bounds
        // and sets it as the timer for the next obs spawn event
        let spawnWindow = Math.floor(Math.random() * ((this.upperSpawnBound - (this.player.inventory.speed * this.upperSpawnBound) / 10) - this.lowerSpawnBound) + this.lowerSpawnBound);
        this.spawnObsClock.delay = spawnWindow;
    }
}