import Phaser from 'phaser'
import { Planet } from '../objects/Planet'
import { eventBridge } from '../EventBridge'

interface PlanetDef {
  label: string
  section: string
  color: number
  px: number
  py: number
}

const PLANETS: PlanetDef[] = [
  { label: 'About', section: 'about', color: 0x4fc3f7, px: 0.18, py: 0.35 },
  { label: 'Skills', section: 'skills', color: 0x81c784, px: 0.42, py: 0.25 },
  { label: 'Experience', section: 'experience', color: 0xffb74d, px: 0.65, py: 0.4 },
  { label: 'Projects', section: 'projects', color: 0xba68c8, px: 0.35, py: 0.65 },
  { label: 'Contact', section: 'contact', color: 0xe57373, px: 0.78, py: 0.7 },
]

export class SpaceScene extends Phaser.Scene {
  private planets: Planet[] = []
  private spaceship!: Phaser.GameObjects.Graphics
  private bgStars: Phaser.GameObjects.Graphics[] = []
  private easterEggStar!: Phaser.GameObjects.Star

  constructor() {
    super({ key: 'SpaceScene' })
  }

  create(): void {
    const { width, height } = this.scale

    this.cameras.main.fadeIn(800, 0, 0, 0)

    // Parallax starfield layers
    this.createStarfield(width, height)

    // Create planets
    this.planets = PLANETS.map(
      (def) =>
        new Planet({
          scene: this,
          x: width * def.px,
          y: height * def.py,
          radius: 28,
          color: def.color,
          label: def.label,
          section: def.section,
        })
    )

    // Cursor-following spaceship
    this.spaceship = this.add.graphics()
    this.drawSpaceship()
    this.spaceship.setPosition(width / 2, height / 2)

    this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      this.tweens.add({
        targets: this.spaceship,
        x: pointer.x,
        y: pointer.y,
        duration: 300,
        ease: 'Power2',
      })
    })

    // Easter egg star (mini-game)
    this.easterEggStar = this.add.star(width * 0.92, height * 0.12, 5, 6, 14, 0xffdd00, 0.7)
    this.easterEggStar.setInteractive({ useHandCursor: true })

    this.tweens.add({
      targets: this.easterEggStar,
      angle: 360,
      duration: 4000,
      repeat: -1,
      ease: 'Linear',
    })

    this.tweens.add({
      targets: this.easterEggStar,
      alpha: 0.3,
      duration: 1500,
      yoyo: true,
      repeat: -1,
    })

    this.easterEggStar.on('pointerdown', () => {
      this.cameras.main.fadeOut(500, 0, 0, 0)
      this.cameras.main.once('camerafadeoutcomplete', () => {
        this.scene.start('GameScene')
      })
    })

    // Navigation hint
    this.add
      .text(width / 2, height - 30, 'Click a planet to explore  |  Find the hidden star for a mini-game', {
        fontSize: '13px',
        color: '#666666',
        fontFamily: 'Inter, sans-serif',
      })
      .setOrigin(0.5)

    // Listen for navigateTo events (returning from mini-game)
    const handleNavigate = (scene: string) => {
      if (scene === 'SpaceScene') return
      this.scene.start(scene)
    }
    eventBridge.on('navigateTo', handleNavigate)

    this.events.on('shutdown', () => {
      eventBridge.off('navigateTo', handleNavigate)
    })

    this.scale.on('resize', this.onResize, this)
  }

  private createStarfield(width: number, height: number): void {
    // Clean up existing
    this.bgStars.forEach((g) => g.destroy())
    this.bgStars = []

    for (let layer = 0; layer < 3; layer++) {
      const gfx = this.add.graphics()
      const count = 60 + layer * 40
      const maxSize = 1 + layer * 0.5
      const alpha = 0.3 + layer * 0.2

      for (let i = 0; i < count; i++) {
        const x = Phaser.Math.Between(0, width)
        const y = Phaser.Math.Between(0, height)
        const size = Math.random() * maxSize + 0.5
        gfx.fillStyle(0xffffff, alpha)
        gfx.fillCircle(x, y, size)
      }

      this.bgStars.push(gfx)
    }
  }

  private drawSpaceship(): void {
    this.spaceship.clear()
    // Simple triangle spaceship
    this.spaceship.fillStyle(0x88ccff, 0.6)
    this.spaceship.fillTriangle(0, -10, -6, 6, 6, 6)
    this.spaceship.fillStyle(0x4fc3f7, 0.8)
    this.spaceship.fillTriangle(0, -6, -3, 4, 3, 4)
  }

  private onResize(gameSize: Phaser.Structs.Size): void {
    const { width, height } = gameSize

    this.createStarfield(width, height)

    this.planets.forEach((planet, i) => {
      const def = PLANETS[i]
      if (def) {
        planet.setPosition(width * def.px, height * def.py)
      }
    })

    this.easterEggStar.setPosition(width * 0.92, height * 0.12)
  }
}
