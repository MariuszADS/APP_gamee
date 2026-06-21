import { Game as MainGame } from './scenes/Game';
import { AUTO, Game } from 'phaser';

// Find out more information about the Game Config at:
// https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config = {
    type: AUTO,
    width: 1000,
    height: 900,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [
        MainGame
    ],
}

const StartGame = (parent) => {
    return new Game({ ...config, parent });
}

export default StartGame;
