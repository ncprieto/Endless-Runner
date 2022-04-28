class Wall extends Obstacle{
    constructor(scene, texture, frame, laneNumber, damage){
        super(scene, texture, frame, laneNumber);
        scene.add.existing(this);
        this.damage = damage;
    }
    hit(player) {
        return;
    }
}