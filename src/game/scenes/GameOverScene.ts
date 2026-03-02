import Phaser from 'phaser'

export class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOverScene' })
  }

  create(data: { score: number }): void {
    const { width, height } = this.scale

    this.add.text(width / 2, height / 2 - 60, 'GAME OVER', {
      fontSize: '48px',
      color: '#ff4444',
      fontStyle: 'bold',
    }).setOrigin(0.5)

    this.add.text(width / 2, height / 2, `Final Score: ${data.score}`, {
      fontSize: '28px',
      color: '#ffffff',
    }).setOrigin(0.5)

    const restartText = this.add.text(width / 2, height / 2 + 60, 'Click to Restart', {
      fontSize: '22px',
      color: '#ffdd00',
    }).setOrigin(0.5)

    this.tweens.add({
      targets: restartText,
      alpha: 0.3,
      duration: 600,
      yoyo: true,
      repeat: -1,
    })

    this.input.once('pointerdown', () => {
      this.scene.start('GameScene')
    })
  }
}
