class Obstical extends Phaser.GameObjects.Sprite {
    constructor(scene, texture, frame, hitValue, laneNumber, objSpeed) {
        let x = 0;              //initliaze x to be used in case
        let y = 50;              //Y value should be same across all

        let xIncrements = 0;    //increments to determine how fast object moves left or right

        switch(laneNumber) {    //Depending on case create obj at that x coordinate
            case 1:
                //Here we say where the obj will be created initially
                x = 224;
                /*By taking the difference between where the obj spawned and where it needs to go we know how far the 
                object must travel in the x direction. Then by dividing that distance by the amount of increments the 
                object will take in the Y direction we get the distance per increment that the object will need to take
                in the X direction. This is stored in xIncrements.
                */
                xIncrements = 124/(542*objSpeed);
                break;                            
            case 2:
                x = 256;
                xIncrements = 92/(542*objSpeed);
                break;
            case 3:
                x = 288;
                xIncrements = 64/(542*objSpeed);
                break;
            case 4:
                x = 320;
                xIncrements = 32/(542*objSpeed);
                break;
            case 5:
                x = 352;
                break;
            case 6:
                x = 384;
                xIncrements = 32/(542*objSpeed);
                break;
            case 7:
                x = 416;
                xIncrements = 64/(542*objSpeed);
                break;
            case 8:
                x = 448;
                xIncrements = 96/(542*objSpeed);
                break;
            case 9:
                x = 480;
                xIncrements = 124/(542*objSpeed);
                break;
        }

        super(scene, x, y, texture, frame);
        scene.add.existing(this);   // add to existing scene

        this.damage = hitValue;

        this.lane = laneNumber;   
        this.setScale(0.5);
        
        //yTarget same throughout board
        this.yTarget = 592;

        //The increments that the object will move each time update is called in the game loop
        this.xSpeed = xIncrements;
        this.ySpeed = 542/(542*objSpeed); //Scaled to 1 to reduce large numbers in constructor
    }

    update() {
        //Set scale to 1 as it gets closer to the bottom setting it in the range of [0.5, 1]
        this.setScale(0.5*(this.y/this.yTarget) + 0.5);
        //move in y direction in increments specified by this.ySpeed
        if(this.y <= game.config.height) {
            this.y += this.ySpeed;
        }
        
        //move in x direction in increments specified by this.xSpeed
        if(this.lane > 5) {
            this.x += this.xSpeed;
        }
        else {
            this.x -= this.xSpeed;
        }
    }
}