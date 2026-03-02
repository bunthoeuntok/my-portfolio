import Phaser from 'phaser'

const MAX_LIVES = 3

export class GameScene extends Phaser.Scene {
  private score = 0
  private lives = MAX_LIVES
  private scoreText!: Phaser.GameObjects.Text
  private livesText!: Phaser.GameObjects.Text
  private spawnTimer!: Phaser.Time.TimerEvent

  constructor() {
    super({ key: 'GameScene' })
  }

  create(): void {
    this.score = 0
    this.lives = MAX_LIVES

    const { width } = this.scale

    this.add.text(width / 2, 30, 'Click the stars!', {
      fontSize: '24px',
      color: '#ffffff',
    }).setOrigin(0.5)

    this.scoreText = this.add.text(16, 16, 'Score: 0', {
      fontSize: '18px',
      color: '#ffff00',
    })

    this.livesText = this.add.text(width - 16, 16, this.getLivesDisplay(), {
      fontSize: '18px',
      color: '#ff4444',
    }).setOrigin(1, 0)

    this.spawnTimer = this.time.addEvent({
      delay: 1000,
      callback: this.spawnStar,
      callbackScope: this,
      loop: true,
    })

    this.spawnStar()
  }

  private getLivesDisplay(): string {
    return '\u2764 '.repeat(this.lives).trim()
  }

  private loseLife(): void {
    this.lives--
    this.livesText.setText(this.getLivesDisplay())

    if (this.lives <= 0) {
      this.gameOver()
    }
  }

  private gameOver(): void {
    this.spawnTimer.remove()
    this.scene.start('GameOverScene', { score: this.score })
  }

  private spawnStar(): void {
    const { width, height } = this.scale
    const x = Phaser.Math.Between(50, width - 50)
    const y = Phaser.Math.Between(80, height - 50)

    const star = this.add.star(x, y, 5, 15, 30, 0xffdd00, 1)
    star.setInteractive({ useHandCursor: true })

    this.tweens.add({
      targets: star,
      scaleX: 1.2,
      scaleY: 1.2,
      duration: 500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    })

    let collected = false

    star.on('pointerdown', () => {
      collected = true
      this.score += 10
      this.scoreText.setText(`Score: ${this.score}`)

      this.tweens.add({
        targets: star,
        scale: 0,
        alpha: 0,
        duration: 200,
        onComplete: () => star.destroy(),
      })
    })

    // Auto-remove after 3 seconds — lose a life if not clicked
    this.time.delayedCall(3000, () => {
      if (!star.active) return

      if (!collected) {
        this.loseLife()
      }

      this.tweens.add({
        targets: star,
        alpha: 0,
        duration: 300,
        onComplete: () => star.destroy(),
      })
    })
  }
}
