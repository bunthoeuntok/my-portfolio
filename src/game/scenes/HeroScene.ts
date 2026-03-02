import Phaser from 'phaser'

export class HeroScene extends Phaser.Scene {
  private nameText!: Phaser.GameObjects.Text
  private subtitleText!: Phaser.GameObjects.Text
  private promptText!: Phaser.GameObjects.Text
  private particles!: Phaser.GameObjects.Particles.ParticleEmitter

  constructor() {
    super({ key: 'HeroScene' })
  }

  create(): void {
    const { width, height } = this.scale

    // Starfield particles
    this.particles = this.add.particles(0, 0, 'star-particle', {
      x: { min: 0, max: width },
      y: { min: 0, max: height },
      lifespan: 4000,
      speed: { min: 5, max: 30 },
      scale: { start: 0, end: 0.6, ease: 'Sine.easeInOut' },
      alpha: { start: 0, end: 0.8, ease: 'Sine.easeInOut' },
      frequency: 100,
      blendMode: 'ADD',
    })

    // Animated name
    this.nameText = this.add.text(width / 2, height * 0.38, 'Bunthoeun Tok', {
      fontSize: '52px',
      color: '#ffffff',
      fontFamily: 'Orbitron, sans-serif',
      fontStyle: 'bold',
    }).setOrigin(0.5).setAlpha(0)

    this.subtitleText = this.add.text(width / 2, height * 0.48, 'Full-Stack Developer', {
      fontSize: '22px',
      color: '#8ec8f7',
      fontFamily: 'Inter, sans-serif',
    }).setOrigin(0.5).setAlpha(0)

    this.promptText = this.add.text(width / 2, height * 0.62, '[ Click anywhere to explore ]', {
      fontSize: '16px',
      color: '#aaaaaa',
      fontFamily: 'Inter, sans-serif',
    }).setOrigin(0.5).setAlpha(0)

    // Animate in sequence
    this.tweens.add({
      targets: this.nameText,
      alpha: 1,
      y: height * 0.35,
      duration: 1200,
      ease: 'Power2',
    })

    this.tweens.add({
      targets: this.subtitleText,
      alpha: 1,
      duration: 1000,
      delay: 600,
      ease: 'Power2',
    })

    this.tweens.add({
      targets: this.promptText,
      alpha: 1,
      duration: 800,
      delay: 1200,
      ease: 'Power2',
      onComplete: () => {
        this.tweens.add({
          targets: this.promptText,
          alpha: 0.3,
          duration: 1000,
          yoyo: true,
          repeat: -1,
        })
      },
    })

    // Click to transition
    this.input.once('pointerdown', () => {
      this.cameras.main.fadeOut(800, 0, 0, 0)
      this.cameras.main.once('camerafadeoutcomplete', () => {
        this.scene.start('SpaceScene')
      })
    })

    this.scale.on('resize', this.onResize, this)
  }

  private onResize(gameSize: Phaser.Structs.Size): void {
    const { width, height } = gameSize

    this.nameText.setPosition(width / 2, height * 0.35)
    this.subtitleText.setPosition(width / 2, height * 0.48)
    this.promptText.setPosition(width / 2, height * 0.62)

    this.particles.setPosition(0, 0)
    this.particles.addEmitZone({
      source: new Phaser.Geom.Rectangle(0, 0, width, height),
      type: 'random',
      quantity: 1,
    })
  }
}
