class Obstical extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, hitValue, laneNumber) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   // add to existing scene
        this.damage = hitValue;
        this.lane = laneNumber;   
        this.moveSpeed = 1;       // pixels per frame

        
    }

    update() {
        //Depending on lane move in a specific line
        switch(this.lane) {
            case 1:
                this.x += 1;
                this.y -= 1;
                break;
            case 2:
                this.x += 1;
                this.y -= 1;
                break;
            case 3:
                this.x += 1;
                this.y -= 1;
                break;
            case 4:
                this.x += 1;
                this.y -= 1;
                console.log("lane4");
                break;
            case 5:
                //this.x += 1;
                this.y -= 0.1;
                console.log("case5");
                break;
            case 6:
                this.x += 1;
                this.y -= 1;
                break;
            case 7:
                this.x += 1;
                this.y -= 1;
                break;
            case 8:
                this.x += 1;
                this.y -= 1;
                break;
            case 9:
                this.x += 1;
                this.y -= 1;
                break;
        }
        //console.log("hello");
    }
}