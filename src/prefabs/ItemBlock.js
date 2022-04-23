class ItemBlock extends Obstical{
    constructor(scene, texture, frame, laneNumber, objSpeed){
        super(scene, texture, frame, laneNumber, objSpeed);
        scene.add.existing(this);
        this.pUpArr = ['speed', 'jumpHeight', 'invuln'];
    }
    giveRandpUp(){
        return this.pUpArr[Math.floor(Math.random() * this.pUpArr.length)];
    }
}