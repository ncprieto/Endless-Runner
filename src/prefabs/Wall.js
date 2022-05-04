class Wall extends Obstacle{
    constructor(scene, texture, frame, laneNumber, damage){
        super(scene, texture, frame, laneNumber);
        scene.add.existing(this);
        this.scene = scene;
        this.damage = damage;
    }
    hit(player) {
        for(let i = 0; i < this.damage; i++) {
           let x = Math.floor(Math.random() * 2);
           console.log();
           if(player.inventory.invuln > 0) {
               player.inventory.invuln -= 1;
           }
           else {
                if(x == 0 && player.inventory.jump > 1) {
                    player.inventory.jump -= 0.5;
                }
                else {
                    x = 1;
                }
    
                if(x == 1 && player.inventory.speed > 1) {
                    player.inventory.speed -= 0.5;
                }
                else if(player.inventory.jump > 1) {
                    player.inventory.jump -= 0.5;
                }
                else {
                    this.scene.sound.play('deathSound');
                    player.isDead = true;
                    this.scene.gameOver = true;
                }
           } 
        }
        this.scene.sound.play('wallHit');
        return;
    }
}