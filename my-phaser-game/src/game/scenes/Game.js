import { Scene } from 'phaser';
import { EventBus } from '../EventBus';

export class Game extends Scene {
    constructor() {
        super('Game');
    }

    preload() {
        this.load.image("background", "/blue_grass.png")
        this.load.image("animal", "/buffalo.png")
        this.load.image('ground', '/elementMetal020.png');
    }


    create() {
        let player;
        let pole;
        this.add.image(512, 384, 'background');
        pole = this.physics.add.staticGroup()
        this.player = this.physics.add.sprite(550, 150, 'animal').setScale(0.4);
        // EventBus.emit('current-scene-ready', this);
    }

    update() {
        let cursor;
        cursor = this.input.keyboard.createCursorKeys();
        if (cursor.up.isDown) {
            this.player.setVelocityY(-500)
        }

    }
}
