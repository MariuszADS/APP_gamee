import { Scene, Physics } from 'phaser';

class Bird extends Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'animal');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setGravityY(1000)
        this.setCollideWorldBounds(true)
        this.setScale(0.4)
    }
    flap() {
        this.setVelocityY(-400)
    }

}

export class Game extends Scene {
    constructor() {
        super('Game');
        this.isGameOver = false;
    }

    preload() {
        this.load.image("background", "/blue_grass.png")
        this.load.image("animal", "/buffalo.png")
        this.load.image('pole', '/elementMetal020.png');
    }
    create() {
        this.isGameOver = false;

        this.add.image(512, 384, 'background');
        this.physics.world.setBounds(0, 0, 1000, 900)

        this.player = new Bird(this, 100, 150)

        this.pipes = this.physics.add.group()
        this.physics.add.overlap(this.player, this.pipes, this.handlePipeHit, null, this)
        this.time.addEvent({
            delay: 2000,
            callback: this.spawnPipe,
            callbackScope: this,
            loop: true
        });

        this.physics.add.collider(this.player, this.pipes)

        this.gameOverText = this.add.text(512, 200, 'GAME OVER\nSPACE = restart', {
            fontSize: '40px',
            fontFamily: 'Arial',
            color: '#0b0a0a',
            fontStyle: 'bold',
            align: 'center'
        }).setOrigin(0.5).setVisible(false).setDepth(1000);

        this.input.keyboard.on("keydown-SPACE", () => {
            if (this.isGameOver) {
                this.scene.restart();
                return;
            }

            this.player.flap();
        });

    }
    handleGameOver() {
        if (this.isGameOver) return;

        this.isGameOver = true;
        this.physics.pause();
        this.player.setTint(0xff0000);
        this.gameOverText.setVisible(true);
    }

    handlePipeHit() {
        this.handleGameOver();
    }
    spawnPipe() {

        if (this.isGameOver) return;
        const gap = 420;
        const minY = 200;
        const maxY = 300;
        const randomY = Math.random() * (maxY - minY) + minY
        const spawnX = this.scale.width + 50

        const top = this.pipes.create(spawnX, randomY, "pole");
        top.setImmovable(true);
        top.body.allowGravity = false;
        top.setVelocityX(-200);
        top.setDisplaySize(80, 300);

        const bottom = this.pipes.create(spawnX, randomY + gap + 100, 'pole');
        bottom.setImmovable(true);
        bottom.body.allowGravity = false;
        bottom.setVelocityX(-200);
        bottom.setDisplaySize(80, 300);

    }
    update() {
        if (this.isGameOver) return

        if (this.player.y < 0 || this.player.y > this.physics.world.bounds.height) {
            this.handleGameOver();
            return;
        }

        this.pipes.getChildren().forEach(pipe => {
            if (pipe.x < -pipe.displayWidth) pipe.destroy()
        })
    }
}
