class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }
    preload(){
        this.load.image('square', './assets/square.png');
        this.load.image('wall', './assets/metal_wall.png');
        this.load.image('player', './assets/robo_player.png');
        this.load.image('pit', './assets/small_hole_v2.png');

        //background
        this.load.spritesheet('road', './assets/road_animation.png', { frameWidth: 704, frameHeight: 720 });
        this.load.spritesheet('buildings', './assets/background_animation.png', {frameWidth: 704, frameHeight: 720});

        //UI
        this.load.image('upgrades', './assets/upgrade_ui.png');
        this.load.image('score', './assets/score_ui.png');

        //items
        this.load.image('jump', './assets/upgrade_jump.png');
        this.load.image('speed', './assets/upgrade_speed.png');
        this.load.image('shield', './assets/upgrade_shield.png');

    }
    create(){
        //background
        this.background = this.add.sprite(0,0,'buildings').setOrigin(0,0);
        this.road = this.add.sprite(0,0,'road').setOrigin(0,0);
        //this.anims.create({ key: 'background', frames: this.anims.generateFrameNumbers('road', { start: 0, end: 3 }), frameRate: 4, repeat: -1 });
        //this.background.play('background');

        

        this.obs1 = new Pit(this, 'pit', 0, 1, 3).setOrigin(0.5, 0);
        this.obs2 = new Obstacle(this, 'wall', 0, 2).setOrigin(0.5, 0);
        this.obs3 = new Obstacle(this, 'wall', 0, 3).setOrigin(0.5, 0);
        this.obs4 = new Obstacle(this, 'wall', 0, 4).setOrigin(0.5, 0);
        this.obs5 = new Obstacle(this, 'wall', 0, 5).setOrigin(0.5, 0);
        this.obs6 = new Obstacle(this, 'wall', 0, 6).setOrigin(0.5, 0);
        this.obs7 = new Obstacle(this, 'wall', 0, 7).setOrigin(0.5, 0);

        this.obsArr = [this, this.obs1, this.obs2, this.obs3, this.obs4, this.obs5, this.obs6, this.obs7];
        //item block init
        this.itemBlock = new ItemBlock(this, 'square', 0, 4).setOrigin(0.5, 0);

        // laneWidth * 2 places top left of sprite at 2 64 x 64 squares away from the bottom
        // Added + 32 to offset the new origin of 0.5,0
        this.player = new Player(this, laneWidth * 5 + 32, game.config.height - laneWidth * 2, 'player', 0, 4).setOrigin(0.5,0);

        //UI at top
        this.scoreFrame = this.add.image(430, 10, 'score').setOrigin(0,0);
        this.upgradeFrame = this.add.image(10, 10, 'upgrades').setOrigin(0,0);
        //Powerup icons
        this.jumpIcon   =  this.add.image(95, 21, 'jump').setOrigin(0,0);
        this.speedIcon  =  this.add.image(152.5, 21, 'speed').setOrigin(0,0);
        this.shieldIcon =  this.add.image(210, 21, 'shield').setOrigin(0,0);
        this.jumpNum    =  this.add.text(130, 55, "x" + this.player.inventory.jump, { fontSize: 25, fill: "#000000" , fontFamily: "Arial"});
        this.speedNum   =  this.add.text(187.5, 55, "x" + this.player.inventory.speed, { fontSize: 25, fill: "#000000" , fontFamily: "Arial"});
        this.shieldNum  =  this.add.text(245, 55, "x" + this.player.inventory.invuln, { fontSize: 25, fill: "#000000" , fontFamily: "Arial"});

        //score
        this.score = 0;
        this.scoreText = this.add.text(520, 10, this.score, { fontSize: 75, fill: "#000000" , fontFamily: "Arial"});

        //Keys for input
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyLEFT  = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // obs spawn timer event
        // executes every second and 1/2, slowly increases based on player speed
        this.obsSpawnRate = 1500;
        this.spawnObsClock = this.time.addEvent({delay: this.obsSpawnRate, callback: this.spawnObj, callbackScope: this, loop: true});
        // item block spawn event happens every 6 seconds
        this.itemSpawnRate = 6000;
        this.spawnItemClock = this.time.addEvent({delay: this.itemSpawnRate, callback: this.spawnItemBlock, callbackScope: this, loop: true});

        this.gameOver = false;
    }
    update(){
        if(!this.gameOver){
            this.obs1.update(this.player);
            this.obs2.update(this.player);
            this.obs3.update(this.player);
            this.obs4.update(this.player);
            this.obs5.update(this.player);
            this.obs6.update(this.player);
            this.obs7.update(this.player);
            this.itemBlock.update(this.player);
            this.player.update();
        }
        else {
            this.player.update();
        }

        //update score
        this.scoreText.text = this.score +=  (this.player.inventory.speed * 2 - 1);
        
        //Update upgrades
        this.jumpNum.text = "x" + this.player.inventory.jump;
        this.speedNum.text = "x" + (this.player.inventory.speed * 2 - 1);
        this.shieldNum.text = "x" + this.player.inventory.invuln;

        

        //these conditionals decide if the player receives an item
        //checkCollision spams true when colliding with an object
        //so in order to not give out a bunch of powerups we decide if the
        //player has just received one or not
        let itemCheck = this.checkCollision(this.player, this.itemBlock);
        if(itemCheck && !this.player.itemJustReceived){
            let spdCheck = this.itemBlock.giveRandpUp(this.player, this.obsSpawnRate);
            if(spdCheck){
                this.adjustSpawnRate();
            }
            console.log(this.obsSpawnRate);
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
            this.obs1.hit(this, this.player);
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
            //this.scene.start("menuScene");
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
        let count = 0;
        let obs = this.obsArr[Math.floor(Math.random() * (7 - 1) + 1)];
        while(obs.active){
            obs = this.obsArr[Math.floor(Math.random() * (7 - 1) + 1)];
            count += 1;
            console.log(count);
            if(count >= 10){
                return;
            }
        }
        obs.lane = Math.floor(Math.random() * (7 - 1) + 1);
        obs.reset();
        obs.active = true;

        //this.aciveObs.append(this.obs);
        // switch(obsNum){
        //     case 1:
        //         if(!this.obs1.active){
        //             this.obs1.lane = Math.floor(Math.random() * (7 - 1) + 1); // assign obs to be spawned new lane to spawn from
        //             this.obs1.reset();                                        // reset gives us correct x position to spawn from
        //             this.obs1.active = true;
        //             break;
        //         }
        //     case 2:
        //         if(!this.obs2.active){
        //             this.obs2.lane = Math.floor(Math.random() * (7 - 1) + 1);
        //             this.obs2.reset();
        //             this.obs2.active = true;
        //             break;
        //         }
        //     case 3:
        //         if(!this.obs3.active){
        //             this.obs3.lane = Math.floor(Math.random() * (7 - 1) + 1);
        //             this.obs3.reset();
        //             this.obs3.active = true;
        //             break;
        //         }
        //     case 4:
        //         if(!this.obs4.active){
        //             this.obs4.lane = Math.floor(Math.random() * (7 - 1) + 1);
        //             this.obs4.reset();
        //             this.obs4.active = true;
        //             break;
        //         }
        //     case 5:
        //         if(!this.obs5.active){
        //             this.obs5.lane = Math.floor(Math.random() * (7 - 1) + 1);
        //             this.obs5.reset();
        //             this.obs5.active = true;
        //             break;
        //         }
        //     case 6:
        //         if(!this.obs6.active){
        //             this.obs6.lane = Math.floor(Math.random() * (7 - 1) + 1);
        //             this.obs6.reset();
        //             this.obs6.active = true;
        //             break;
        //         }
        //     case 7:
        //         if(!this.obs7.active){
        //             this.obs7.lane = Math.floor(Math.random() * (7 - 1) + 1);
        //             this.obs7.reset();
        //             this.obs7.active = true;
        //             break;
        //         }
        // }
    }
    // spawnItemBlock works similar to obs spawning
    // choose a lane number between 2 and 7 and spawn it from that lane
    spawnItemBlock(){
        if(!this.itemBlock.active){
            let laneNum = Math.floor(Math.random() * (7 - 1) + 1);
            this.itemBlock.lane = laneNum;
            this.itemBlock.reset();
            this.itemBlock.active = true;
        }
    }
    // adjustSpawnRate adjusts rate at which obs timer events trigger
    // upper and lower bound slowly decrease and player gain more speed
    // essentially makes the spawing of obs faster giving illusion that player
    // is also moving fastert
    adjustSpawnRate(){
        this.obsSpawnRate -= 200;
        if(this.obsSpawnRate <= 100){
            this.obsSpawnRate -= 10;
        }
        if(this.obsSpawnRate < 10){
            this.obsSpawnRate = 1;
        }
        console.log(this.obsSpawnRate);
    }
}