import { Scene, Input, Cameras,Physics } from 'phaser';
import { EventBus } from '../EventBus';

class Bird extends Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'animal');
        //existing() is pointing THIS so, can eaiser apply  velocity, acceleration, gravity, and other physics properties
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setGravity(1000)
        this.setCollideWorldBounds(true)
        this.setScale(0.4)
    }
    flap(){
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

        // //input 
        // this.cursor = this.input.keyboard.createCursorKeys();

        // /*
        // ==============================================
        // //next: random respown pole from top and bottom ||
        // choose beetwen sprite / staticGroup
        // ==============================================
        // */

        // //pole obj physic
        // // this.pole = this.physics.add.sprite(500,150,"pole")
        // // this.pole.setCollideWorldBounds(true) 
        // // this.pole.setRandomPosition()
        // this.pole = this.physics.add.staticGroup(500, 150, "pole")


        // //player obj physic with dynamic body
        // this.player = this.physics.add.sprite(10, 150, "animal").setScale(0.4);
        // this.player.setGravityY(100);
        // this.player.setCollideWorldBounds(true)
        // this.player.setGravityX(60)
        // // this.player.setBounce(0, 1)



        // // this.cameras.main.startFollow(this.player)



        // //pole and player colider
        // this.physics.add.collider(
        //     this.player,
        //     this.pole
        // );

        // ----

        this.player = new Bird(this,100,150)

        this.pipes = this.physics.add.staticGroup()
        this.pipes.create(500,150,"pole")

        this.physics.add.collider(this.player,this.pipes)

        this.input.keyboard.on("keydown-SPACE",()=>{
            this.player.flap()
        })

    }
    // frame loop, controls
    update() {
        if (Input.Keyboard.JustDown(this.cursor.up)) {
            this.player.flap()
        }

        // if(this.player.x > this.background)

    }
}
