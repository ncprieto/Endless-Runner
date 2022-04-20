class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }
    preload(){
        this.load.image('square', './assets/square.png');
    }
    create(){
        this.square = new Obstical(this, 100, 100, 'square', 0, 1, 5);
        //console.log("working");
    }
    update(){
        this.square.update();
    }
}