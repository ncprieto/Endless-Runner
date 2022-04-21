class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }
    preload(){
    }
    create(){
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 0
        }
        this.add.text(game.config.width/2, game.config.height/2, 'press f to play', menuConfig).setOrigin(0.5);
    }
    update(){
        if(Phaser.Input.Keyboard.JustDown(keyF)){
            this.scene.start('playScene');
        }
    }
}