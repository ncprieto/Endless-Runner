class ItemBlock extends Obstacle{
    constructor(scene, texture, frame, laneNumber){
        super(scene, texture, frame, laneNumber);
        scene.add.existing(this);
        this.pUpArr = ['speed', 'jumpHeight', 'invuln'];
    }
    giveRandpUp(){
        return this.pUpArr[Math.floor(Math.random() * this.pUpArr.length)];
    }
}