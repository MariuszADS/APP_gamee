import { Scene } from 'phaser';
import { EventBus } from '../EventBus';

export class Game extends Scene {
    constructor() {
        super('Game');
    }

    preload() {
        this.load.image("background", "/blue_grass.png")
        this.load.image("animal", "/buffalo.png")
        this.load.image('pole', '/elementMetal020.png');
    }


    create() {
        let player;
        let pole;
        this.add.image(512, 384, 'background');
        this.add.image(550, 700, "pole")
        pole = this.physics.add.staticGroup()
        
        this.player = this.physics.add.sprite(550, 150, 'animal').setScale(0.4);
        this.player.setGravityY(300)
        // player.setBounce(0.2);
        // player.setCollideWorldBounds(true);
        this.physics.add.collider(pole,player)
        // EventBus.emit('current-scene-ready', this);
    }

    update() {
        let cursor;
        cursor = this.input.keyboard.createCursorKeys();
        if (cursor.up.isDown) {
            this.player.setVelocityY(-270)
        }

    }
}
