class ItemBlock extends Obstacle{
    constructor(scene, texture, frame, laneNumber){
        super(scene, texture, frame, laneNumber);
        scene.add.existing(this);
        this.pUpArr = ['speed', 'jump', 'invuln'];
    }
    giveRandpUp(player){
        let item = this.pUpArr[Math.floor(Math.random() * this.pUpArr.length)];
        let spd = false;
        switch (item){
            case 'speed':
                player.inventory.speed += 0.5;
                spd = true;
                break;
            case 'jump':
                player.inventory.jump += 0.5;
                break;
            case 'invuln':
                player.inventory.invuln += 1;
                break;
        }
        console.log(item);
        return spd;
    }
}