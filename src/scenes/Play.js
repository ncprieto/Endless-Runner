class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }
    preload(){
        this.load.image('square', './assets/square.png');
        this.load.image('wall', './assets/metal_wall.png');
        this.load.spritesheet('player', './assets/character_animation.png',{ frameWidth: 64, frameHeight: 84 });
        this.load.image('pit', './assets/small_hole_v2.png');

        //background
        //this.load.image('road', './assets/road.png');
        this.load.spritesheet('buildings', './assets/background_animation.png', {frameWidth: 704, frameHeight: 720});

        //UI
        this.load.image('upgrades', './assets/upgrade_ui.png');
        this.load.image('score', './assets/score_ui.png');

        //items
        this.load.image('jump', './assets/upgrade_jump.png');
        this.load.image('speed', './assets/upgrade_speed.png');
        this.load.image('shield', './assets/upgrade_shield.png');
        this.load.image('upgrade', './assets/upgrade_random.png');

        //load sounds
        this.load.audio('music', './assets/RoboRunner_Game_Music.wav');
        this.load.audio('jumpSound', './assets/jump.wav');
        this.load.audio('laneSound', './assets/lane_change.wav');
        this.load.audio('wallHit', './assets/wall_hit.wav');
        this.load.audio('upgradeSound', './assets/upgrade.wav');
        this.load.audio('deathSound', './assets/death.wav');
        this.load.audio('holeHit', './assets/hole_hit.wav');


    }
    create(){
        //background
        this.background = this.add.sprite(0,0,'buildings').setOrigin(0,0);
        //this.road = this.add.sprite(0,0,'road').setOrigin(0,0);
        this.anims.create({ key: 'background', frames: this.anims.generateFrameNumbers('buildings', { start: 0, end: 5   }), frameRate: 10, repeat: -1 });
        this.background.play('background');

        this.anims.create({ key: 'running', frames: this.anims.generateFrameNumbers('player', { start: 0, end: 6 }), frameRate: 10, repeat: -1 });

        

        this.obs1 = new Pit(this, 'pit', 0, 1, 3).setOrigin(0.5, 0);
        this.obs2 = new Wall(this, 'wall', 0, 2, 1).setOrigin(0.5, 0);
        this.obs3 = new Wall(this, 'wall', 0, 3, 1).setOrigin(0.5, 0);
        this.obs4 = new Wall(this, 'wall', 0, 4, 1).setOrigin(0.5, 0);
        this.obs5 = new Wall(this, 'wall', 0, 5, 1).setOrigin(0.5, 0);
        this.obs6 = new Wall(this, 'wall', 0, 6, 1).setOrigin(0.5, 0);
        this.obs7 = new Wall(this, 'wall', 0, 7, 1).setOrigin(0.5, 0);

        this.obsArr = [this, this.obs1, this.obs2, this.obs3, this.obs4, this.obs5, this.obs6, this.obs7];
        this.hitReceivedArr = [this, this.hitReceived1, this.hitReceived2, this.hitReceived3, this.hitReceived4,
                                     this.hitReceived5, this.hitReceived6, this.hitReceived7];
        //item block init
        this.itemBlock = new ItemBlock(this, 'upgrade', 0, 4).setOrigin(0.5, 0);

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

        //play anims
        this.player.play('running');

        //keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);


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

            //update score
            this.scoreText.text = this.score +=  (this.player.inventory.speed * 2 - 1);
        }
        else {
            let menuConfig = {
                fontFamily: 'Courier',
                fontSize: '28px',
                backgroundColor: '#87ceeb',
                color: '#000000',
                align: 'right',
                padding: {
                top: 5,
                bottom: 5,
                },
                fixedWidth: 0
            }
            this.add.text(game.config.width/2, game.config.height/2-32, 'Game Over', menuConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2, 'Press (F) to Start Again', menuConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2+32, 'Press (R) to return to main menu', menuConfig).setOrigin(0.5);
            this.player.update();

            if(Phaser.Input.Keyboard.JustDown(keyF)){
                this.sound.stopAll();
                this.scene.restart();
                this.sound.play('music');
            }
            if(Phaser.Input.Keyboard.JustDown(keyR)) {
                this.sound.stopAll();
                this.scene.start('menuScene');
            }


        }
        
        //Update upgrades
        this.jumpNum.text = "x" + (this.player.inventory.jump * 2 - 2);
        this.speedNum.text = "x" + (this.player.inventory.speed * 2 - 2);
        this.shieldNum.text = "x" + this.player.inventory.invuln;

        

        //these conditionals decide if the player receives an item
        //checkCollision spams true when colliding with an object
        //so in order to not give out a bunch of powerups we decide if the
        //player has just received one or not
        let itemCheck = this.checkCollision(this.player, this.itemBlock);
        if(itemCheck && !this.player.itemJustReceived){
            this.sound.play('upgradeSound');
            let spdCheck = this.itemBlock.giveRandpUp(this.player, this.obsSpawnRate);
            if(spdCheck){
                this.adjustSpawnRate();
            }
            this.player.itemJustReceived = true;
        }
        else if(!itemCheck && this.player.itemJustReceived){
            this.player.itemJustReceived = false;
        }


        // collision detection between player and obs1
        // similar to checking for item collision detection
        // collision detection function spams true on hits
        // but we only want to registed that it hit once

        for(let i in this.obsArr){
            if(i == 0){
                continue;
            }
            else{
                let hitCheck = this.checkCollision(this.player, this.obsArr[i]);
                if(hitCheck && !this.hitReceivedArr[i]){
                    this.obsArr[i].hit(this.player);
                    this.hitReceivedArr[i] = true;
                }
                else if(!hitCheck && this.hitReceivedArr[i]){
                    this.hitReceivedArr[i] = false;
                }
            }
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
        if(this.player.inventory.speed == 1){
            this.obsSpawnRate += 25;
        }
        let count = 0;
        let obs = this.obsArr[Math.floor(Math.random() * (7 - 1) + 1)];
        while(obs.active){
            obs = this.obsArr[Math.floor(Math.random() * (7 - 1) + 1)];
            count += 1;
            if(count >= 20){
                return;
            }
        }
        obs.lane = Math.floor(Math.random() * (7 - 1) + 1);
        obs.reset();
        obs.active = true;
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
    // is also moving faster
    adjustSpawnRate(){
        if(this.obsSpawnRate > 1500){
            this.obsSpawnRate = 1500;
        }
        this.obsSpawnRate -= 200;
        if(this.obsSpawnRate <= 400){
            this.obsSpawnRate = 400;
        }
    }
}