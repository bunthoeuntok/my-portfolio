import Phaser from 'phaser'

const MAX_LIVES = 3
const BASE_STAR_LIFETIME = 3000
const MIN_STAR_LIFETIME = 800
const LIFETIME_DECREASE_PER_LEVEL = 200

export class GameScene extends Phaser.Scene {
  private score = 0
  private lives = MAX_LIVES
  private level = 1
  private scoreText!: Phaser.GameObjects.Text
  private livesText!: Phaser.GameObjects.Text
  private levelText!: Phaser.GameObjects.Text
  private titleText!: Phaser.GameObjects.Text
  private backText!: Phaser.GameObjects.Text
  private spawnTimer!: Phaser.Time.TimerEvent

  constructor() {
    super({ key: 'GameScene' })
  }

  create(): void {
    this.score = 0
    this.lives = MAX_LIVES
    this.level = 1

    const { width } = this.scale

    this.cameras.main.fadeIn(500, 0, 0, 0)

    this.titleText = this.add.text(width / 2, 30, 'Click the stars!', {
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

    this.levelText = this.add.text(width / 2, 60, 'Level 1', {
      fontSize: '16px',
      color: '#aaaaaa',
    }).setOrigin(0.5)

    // Back to Portfolio button
    this.backText = this.add.text(16, this.scale.height - 30, '< Back to Portfolio', {
      fontSize: '14px',
      color: '#4FC3F7',
      fontFamily: 'Inter, sans-serif',
    }).setInteractive({ useHandCursor: true })

    this.backText.on('pointerover', () => this.backText.setColor('#8ec8f7'))
    this.backText.on('pointerout', () => this.backText.setColor('#4FC3F7'))
    this.backText.on('pointerdown', () => {
      this.spawnTimer.remove()
      this.cameras.main.fadeOut(500, 0, 0, 0)
      this.cameras.main.once('camerafadeoutcomplete', () => {
        this.scene.start('SpaceScene')
      })
    })

    this.scale.on('resize', this.onResize, this)

    this.spawnTimer = this.time.addEvent({
      delay: 1000,
      callback: this.spawnStar,
      callbackScope: this,
      loop: true,
    })

    this.spawnStar()
  }

  private onResize(gameSize: Phaser.Structs.Size): void {
    const { width, height } = gameSize

    this.titleText.setX(width / 2)
    this.livesText.setX(width - 16)
    this.levelText.setX(width / 2)
    this.backText.setPosition(16, height - 30)
  }

  private getLivesDisplay(): string {
    return '\u2764 '.repeat(this.lives).trim()
  }

  private getStarLifetime(): number {
    const lifetime = BASE_STAR_LIFETIME - (this.level - 1) * LIFETIME_DECREASE_PER_LEVEL
    return Math.max(lifetime, MIN_STAR_LIFETIME)
  }

  private checkLevelUp(): void {
    const newLevel = Math.floor(this.score / 100) + 1
    if (newLevel > this.level) {
      this.level = newLevel
      this.levelText.setText(`Level ${this.level}`)

      this.tweens.add({
        targets: this.levelText,
        scale: 1.5,
        duration: 200,
        yoyo: true,
      })
    }
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
      this.checkLevelUp()

      this.tweens.add({
        targets: star,
        scale: 0,
        alpha: 0,
        duration: 200,
        onComplete: () => star.destroy(),
      })
    })

    // Auto-remove based on current difficulty — lose a life if not clicked
    this.time.delayedCall(this.getStarLifetime(), () => {
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
