import Phaser from 'phaser'

export class GameOverScene extends Phaser.Scene {
  private gameOverText!: Phaser.GameObjects.Text
  private scoreText!: Phaser.GameObjects.Text
  private restartText!: Phaser.GameObjects.Text
  private portfolioText!: Phaser.GameObjects.Text

  constructor() {
    super({ key: 'GameOverScene' })
  }

  create(data: { score: number }): void {
    const { width, height } = this.scale

    this.gameOverText = this.add.text(width / 2, height / 2 - 80, 'GAME OVER', {
      fontSize: '48px',
      color: '#ff4444',
      fontStyle: 'bold',
    }).setOrigin(0.5)

    this.scoreText = this.add.text(width / 2, height / 2 - 20, `Final Score: ${data.score}`, {
      fontSize: '28px',
      color: '#ffffff',
    }).setOrigin(0.5)

    this.restartText = this.add.text(width / 2, height / 2 + 40, 'Click to Restart', {
      fontSize: '22px',
      color: '#ffdd00',
    }).setOrigin(0.5).setInteractive({ useHandCursor: true })

    this.tweens.add({
      targets: this.restartText,
      alpha: 0.3,
      duration: 600,
      yoyo: true,
      repeat: -1,
    })

    this.restartText.on('pointerdown', () => {
      this.scene.start('GameScene')
    })

    // Return to Portfolio option
    this.portfolioText = this.add.text(width / 2, height / 2 + 90, '< Return to Portfolio', {
      fontSize: '16px',
      color: '#4FC3F7',
      fontFamily: 'Inter, sans-serif',
    }).setOrigin(0.5).setInteractive({ useHandCursor: true })

    this.portfolioText.on('pointerover', () => this.portfolioText.setColor('#8ec8f7'))
    this.portfolioText.on('pointerout', () => this.portfolioText.setColor('#4FC3F7'))
    this.portfolioText.on('pointerdown', () => {
      this.cameras.main.fadeOut(500, 0, 0, 0)
      this.cameras.main.once('camerafadeoutcomplete', () => {
        this.scene.start('SpaceScene')
      })
    })

    this.scale.on('resize', this.onResize, this)
  }

  private onResize(gameSize: Phaser.Structs.Size): void {
    const { width, height } = gameSize

    this.gameOverText.setPosition(width / 2, height / 2 - 80)
    this.scoreText.setPosition(width / 2, height / 2 - 20)
    this.restartText.setPosition(width / 2, height / 2 + 40)
    this.portfolioText.setPosition(width / 2, height / 2 + 90)
  }
}
