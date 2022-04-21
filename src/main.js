let config = {
    type: Phaser.auto,
    width: 704,
    height: 720,
    scene: [Menu, Play]
}

let game = new Phaser.Game(config);
let laneWidth = config.width / 11;
let keyRIGHT, keyLEFT, keySPACE, keyF;
