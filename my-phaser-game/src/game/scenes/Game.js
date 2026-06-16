import { Scene, Input,Cameras } from 'phaser';
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


    create() {
        this.add.image(512, 384, 'background');
        // this.add.image(550, 700, "pole")

        //input 
        this.cursor = this.input.keyboard.createCursorKeys();

        //pole obj physic
        this.pole = this.physics.add.staticGroup();
        this.pole.create(550, 700, "pole");

        //player obj physic with dynamic body
        this.player = this.physics.add.sprite(550, 150, "animal").setScale(0.4);
        this.player.setGravityY(0);
        this.player.setBounce(0,1)
        this.player.setGravityX(0)
        
        this.cameras.main.startFollow(this.player)
        
        
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

    }
}
