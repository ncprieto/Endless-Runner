class Player extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, laneNum){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.lane = laneNum;
        // these track whether the last up state of the keys was down or not
        this.lastLEFTUpState = true;
        this.lastRIGHTUpState = true;
        this.lastUPState = true;
        this.isJumping = false;
        this.reachedApex = false;
        // added inventory obj for consolidating powerups
        this.inventory = {
            jump: 1,
            invuln: 0,
            speed: 1
        };
        this.itemJustReceived = false;
        this.health = 10;

        //Pit hit interaction
        this.hitPit = false;

    }
    update(){
        if(keySPACE.isUp && !this.lastUPState){
            this.isJumping = true;
        }
        if(this.isJumping){
            let newScale;
            // finds whether the scale of the spirte has reached the apex of the jump
            if(this.scaleX >= (1 + (this.inventory.jump / 7))){
                this.reachedApex = true;
            }
            // slowly increment the scale of the sprite based on current scaleX and this equation
            // this.inventory.jump / (250 + (this.inventory.jump * 100) / 2) controls the air time of the sprite
            // scaling performs at a constant rate but the apex flag determines how "long" the scaling runs for
            if(!this.reachedApex){
                newScale = this.scaleX + this.inventory.jump / (250 + (this.inventory.jump * 100) / 2);
                this.y -= 0.5;
            }
            else if(this.reachedApex){
                newScale = this.scaleX - this.inventory.jump / (250 + (this.inventory.jump * 100) / 2);
                this.y += 0.5;
            }
            if(newScale <= 1 && this.reachedApex){
                this.isJumping = false;
                this.reachedApex = false;
                this.setScale(1);
            }
            this.setScale(newScale);
        }
        // if current up state is true and last up state is false
        // then we know that the key was released
        if(keyLEFT.isUp && !this.lastLEFTUpState){
            if(this.x > laneWidth + 96){
                this.x -= laneWidth;
                this.lane -= 1;
            }
        }
        if(keyRIGHT.isUp && !this.lastRIGHTUpState){
            if(this.x < game.config.width - (laneWidth * 3)){
                this.x += laneWidth;
                this.lane += 1;
            }
        }
        this.lastLEFTUpState = keyLEFT.isUp;
        this.lastRIGHTUpState = keyRIGHT.isUp;
        this.lastUPState = keySPACE.isUp;

        //if hit a pit
        if(this.hitPit && this.scaleX > 0) {
            this.scaleX -= 0.01;
            this.scaleY -= 0.01;
            this.angle += 1;
        }


    }
}