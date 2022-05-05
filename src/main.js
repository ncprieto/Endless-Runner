/*
Robo Runner
By:
Dylan Higashionna
Nathan Prieto
Christopher Mathie
05/04/2022

Our group decided to implement a system where the player ran upward instead of to the side.
This ended up being quite a bit harder to program but overall looked cooler. 

The art, sounds and music are all original and the background music made by Chris was something we thought was especially cool
considering our lack of background in music composition.
*/ 
let config = {
    type: Phaser.auto,
    width: 704,
    height: 720,
    //pixelArt: true,
    scene: [Menu, Play]
}

let game = new Phaser.Game(config);
let laneWidth = config.width / 11;
let keyRIGHT, keyLEFT, keySPACE, keyF, keyR;
