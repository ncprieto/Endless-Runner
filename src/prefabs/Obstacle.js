class Obstacle extends Phaser.GameObjects.Sprite {
    constructor(scene, texture, frame, laneNumber) {
        let x = 256 + ((laneNumber - 1) * 32);   //initliaze x
        let y = 50;                           //Y value should be same across all

        super(scene, x, y, texture, frame);
        scene.add.existing(this);             // add to existing scene

        this.lane = laneNumber;   
        this.setScale(0.5);
        
        //yTarget same throughout board
        this.yTarget = 592;

        // flag for deciding if this object is actively moving or not
        this.active = false;
        this.alpha = 0;
    }
    update(player) {
        //If object moved pass player move z axis upward
        if(this.y > this.yTarget + 20 && !player.isJumping) {
            this.setDepth(2);   
        }
        else {
            this.setDepth(0);
        }
        
        //increase alpha if active
        if(this.active && this.y > 80) {
            this.alpha += 0.1;
        }
        else {
            this.apha = 0;
        }


        this.getXYSpeed(player.inventory.speed);
        //Set scale to 1 as it gets closer to the bottom setting it in the range of [0.5, 1]
        this.setScale(0.5*(this.y/this.yTarget) + 0.5);
        //move in y direction in increments specified by this.ySpeed
        if(this.y <= game.config.height && this.active) {
            this.y += this.ySpeed;
        }
        //move in x direction in increments specified by this.xSpeed
        if(this.lane > 4 && this.active) {
            this.x += this.xSpeed;
        }
        else if(this.lane < 4 && this.active){
            this.x -= this.xSpeed;
        }
        if(this.y >= 720 && this.active){
            this.reset();
        }
    }
    reset(){
        this.active = false;
        this.y = 50;
        this.x = 256 + ((this.lane - 1) * 32);
        this.setScale(0.5);
    }
    // moved objSpeed determiner to this function
    // this makes dynamically updating the speed of an object possible
    // this is called with every update so that when the player speed
    // is increased the speed of the obj is also increased
    getXYSpeed(objSpeed){
        let xIncrements = 0;    //increments to determine how fast object moves left or right

        switch(this.lane) {    //Depending on case create obj at that x coordinate
                /*By taking the difference between where the obj spawned and where it needs to go we know how far the 
                object must travel in the x direction. Then by dividing that distance by the amount of increments the 
                object will take in the Y direction we get the distance per increment that the object will need to take
                in the X direction. This is stored in xIncrements.
                */                          
            case 1:
                xIncrements = 92*objSpeed/(542);
                break;
            case 2:
                xIncrements = 64*objSpeed/(542);
                break;
            case 3:
                xIncrements = 32*objSpeed/(542);
                break;
            case 5:
                xIncrements = 32*objSpeed/(542);
                break;
            case 6:
                xIncrements = 64*objSpeed/(542);
                break;
            case 7:
                xIncrements = 96*objSpeed/(542);
                break;
        }
        //The increments that the object will move each time update is called in the game loop
        this.xSpeed = xIncrements;
        this.ySpeed = 542*objSpeed/(542); //Scaled to 1 to reduce large numbers in constructor
    }
}