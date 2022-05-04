class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }
    preload(){
        this.load.image('background', './assets/title_screen.png');
        this.load.audio('music', './assets/RoboRunner_Game_Music.wav');
        this.load.audio('select', './assets/select.wav');
    }
    create(){
        this.add.image(0,0, 'background').setOrigin(0,0);
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#87ceeb',
            color: '#000000',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 0
        }
        this.add.text(game.config.width/2, game.config.height/2-32, 'Use the ←→ arrows to move', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Press "space" to jump', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2+32, 'Press (f) to Start', menuConfig).setOrigin(0.5);
    }
    update(){
        if(Phaser.Input.Keyboard.JustDown(keyF)){
            this.sound.play('music');   
            this.sound.play('select');
            this.scene.start('playScene');
        }
    }
}