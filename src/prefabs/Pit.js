class Pit extends Obstacle{
    constructor(scene, texture, frame, laneNumber){
        super(scene, texture, frame, laneNumber);
        this.scene = scene;
        scene.add.existing(this);
    }
    hit(player) {
        player.hitPit = true;
        this.scene.sound.play('holeHit');
        this.scene.gameOver = true;
        return;
    }
}