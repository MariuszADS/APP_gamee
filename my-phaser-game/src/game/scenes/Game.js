import { Scene, Input, Cameras } from 'phaser';
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
        this.add.image(512, 384, 'background');
        this.physics.world.setBounds(0, 0, 1000, 900)
        
        //input 
        this.cursor = this.input.keyboard.createCursorKeys();
        
        /*
        ==============================================
        //next: random respown pole from top and bottom ||
        ==============================================
        */
       
        //pole obj physic
        // this.pole = this.physics.add.sprite(500,150,"pole")
        // this.pole.setCollideWorldBounds(true) 
        // this.pole.setRandomPosition()
        this.pole = this.physics.add.staticGroup(500,150,"pole")
        
        
        //player obj physic with dynamic body
        this.player = this.physics.add.sprite(10, 150, "animal").setScale(0.4);
        this.player.setGravityY(100);
        this.player.setCollideWorldBounds(true)
        this.player.setGravityX(60)
        // this.player.setBounce(0, 1)
        
        
        
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
