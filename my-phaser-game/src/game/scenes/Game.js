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
        let pole;
        this.add.image(512, 384, 'background');
        this.add.image(400, 300, "animal")
        pole = this.physics.add.staticGroup()
        pole.create(400, 568, "ground").setScale(1).refreshBody()
        pole.create(600, 400, 'ground');
        pole.create(100, 250, 'ground');
        pole.create(750, 220, 'ground');

        EventBus.emit('current-scene-ready', this);
    }
}
