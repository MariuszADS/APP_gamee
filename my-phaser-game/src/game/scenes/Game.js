import { Scene, Input, Cameras } from 'phaser';
// import Phaser from 'phaser';
import { EventBus } from '../EventBus';
// import {Phaser} from 'phaser';

export class Game extends Scene {
    constructor() {
        super('Game');
    }



    preload() {
        this.load.image("background", "/blue_grass.png")
        this.load.image("animal", "/buffalo.png")
        this.load.image('pole', '/elementMetal020.png');
    }

    /*
    ==============================================
    //next: moving bgc right | random respown pole ||
    ==============================================
    */
    create() {
        this.add.image(512, 384, 'background');
        this.physics.world.setBounds(0, 0, 1000, 900)

        //input 
        this.cursor = this.input.keyboard.createCursorKeys();

        //pole obj physic
        this.pole = this.physics.add.staticGroup();
        this.pole.create(100, 700, "pole")
        this.pole.create(350, 400, "pole")
        this.pole.create(550, 900, "pole")
        this.pole.create(650, 700, "pole")
        this.pole.create(750, 400, "pole")
        this.pole.create(850, 300, "pole")
        this.pole.create(950, 650, "pole")

        //player obj physic with dynamic body
        this.player = this.physics.add.sprite(10, 150, "animal").setScale(0.4);
        this.player.setGravityY(100);
        // this.player.setBounce(0, 1)
        this.player.setCollideWorldBounds(true)
        this.player.setGravityX(50)
        this

        // this.cameras.main.startFollow(this.player)



        //pole and player colider
        this.physics.add.collider(
            this.player,
            this.pole
        );
    }

    update() {
        if (Input.Keyboard.JustDown(this.cursor.up)) {
            this.player.setVelocityY(-250)
        }
        // if(this.player.x > this.background)

    }
}
