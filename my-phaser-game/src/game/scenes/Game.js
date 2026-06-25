import { Scene, Input, Cameras, Physics } from 'phaser';
import { EventBus } from '../EventBus';
// import {fs} from "fs"

class Bird extends Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'animal');
        //existing() is pointing THIS so, can eaiser apply  velocity, acceleration, gravity, and other physics properties
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setGravityY(1000)
        this.setCollideWorldBounds(true)
        this.setScale(0.4)
    }
    flap() {
        this.setVelocityY(-300)
    }

}

export class Game extends Scene {
    constructor() {
        super('Game');
    }



    //assets loading
    preload() {
        this.load.image("background", "/blue_grass.png")
        this.load.image("animal", "/buffalo.png")
        this.load.image('pole', '/elementMetal020.png');
    }
    // creating objects,physic,output
    create() {
        this.add.image(512, 384, 'background');
        this.physics.world.setBounds(0, 0, 1000, 900)

        this.player = new Bird(this, 100, 150)

        this.pipes = this.physics.add.staticGroup()

        this.pipes = this.physics.add.group()
        //pipes spawning
        this.time.addEvent({
            delay: 2000,
            callback: this.spawnPipe,
            callbackScope: this,
            loop: true
        });

        this.physics.add.collider(this.player, this.pipes)



        this.input.keyboard.on("keydown-SPACE", () => {
            this.player.flap()
        })

    }
    spawnPipe() {
        const gap = 120;
        const minY = 60;
        const maxY = 300;
        // const randomY = Phaser.Math.Between(minY, maxY);
        const randomY = Math.random() * (maxY - minY) + minY

        this.pipes.create(1024, randomY, "pole").setScale(1, 2);

        this.pipes.create(1024, randomY + gap + 100, 'pole').setScale(1, 2);

        const spawnX = this.scale.width + 50

        const top = this.pipes.create(spawnX, randomY, "pole");
        top.setScale(1, 2);
        top.setImmovable(true);
        top.body.allowGravity = false;
        top.setVelocityX(-200);

        const bottom = this.pipes.create(spawnX, randomY + gap + 100, 'pole');
        bottom.setScale(1, 2);
        bottom.setImmovable(true);
        bottom.body.allowGravity = false;
        bottom.setVelocityX(-200);


    }
    // frame loop, controls
    update() {
        this.pipes.getChildren().forEach(pipe => {

            if (pipe.x < -pipe.displayWidth) pipe.destroy()
        })
    }
}
