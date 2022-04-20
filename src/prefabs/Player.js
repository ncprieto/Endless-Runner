class Player extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, laneNum){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.lane = laneNum;
    }
    create(){
        // these track whether the last up state of the keys was down or not
        this.lastLEFTUpState = true;
        this.lastRIGHTUpState = true;
    }
    update(){
        // if current up state is true and last up state is false
        // then we know that the key was released
        if(keyLEFT.isUp && !this.lastLEFTUpState){
            if(this.x > laneWidth){
                this.x -= laneWidth;
                this.lane -= 1;
            }
        }
        if(keyRIGHT.isUp && !this.lastRIGHTUpState){
            if(this.x < game.config.width - (laneWidth * 2)){
                this.x += laneWidth;
                this.lane += 1;
            }
        }
        this.lastLEFTUpState = keyLEFT.isUp;
        this.lastRIGHTUpState = keyRIGHT.isUp;
    }
}