class Pit extends Obstacle{
    constructor(scene, texture, frame, laneNumber){
        super(scene, texture, frame, laneNumber);
        scene.add.existing(this);
    }
    hit(scene, player) {
        scene.gameOver = true;
        player.hitPit = true;
        return;
    }
}