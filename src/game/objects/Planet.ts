import Phaser from 'phaser'
import { eventBridge } from '../EventBridge'

export interface PlanetConfig {
  scene: Phaser.Scene
  x: number
  y: number
  radius: number
  color: number
  label: string
  section: string
}

export class Planet extends Phaser.GameObjects.Container {
  private gfx: Phaser.GameObjects.Graphics
  private glowRing: Phaser.GameObjects.Graphics
  private labelText: Phaser.GameObjects.Text
  private radius: number
  private color: number
  private section: string

  constructor(config: PlanetConfig) {
    super(config.scene, config.x, config.y)

    this.radius = config.radius
    this.color = config.color
    this.section = config.section

    // Glow ring
    this.glowRing = config.scene.add.graphics()
    this.drawGlow(0.15)
    this.add(this.glowRing)

    // Planet body
    this.gfx = config.scene.add.graphics()
    this.drawPlanet()
    this.add(this.gfx)

    // Label
    this.labelText = config.scene.add.text(0, this.radius + 18, config.label, {
      fontSize: '14px',
      color: '#cccccc',
      fontFamily: 'Inter, sans-serif',
      align: 'center',
    }).setOrigin(0.5)
    this.add(this.labelText)

    // Interactive hit area
    this.setSize(this.radius * 2.5, this.radius * 2.5 + 30)
    this.setInteractive({ useHandCursor: true })

    // Hover effects
    this.on('pointerover', () => {
      config.scene.tweens.add({
        targets: this,
        scaleX: 1.15,
        scaleY: 1.15,
        duration: 200,
        ease: 'Sine.easeOut',
      })
      this.drawGlow(0.35)
      this.labelText.setColor('#ffffff')
    })

    this.on('pointerout', () => {
      config.scene.tweens.add({
        targets: this,
        scaleX: 1,
        scaleY: 1,
        duration: 200,
        ease: 'Sine.easeOut',
      })
      this.drawGlow(0.15)
      this.labelText.setColor('#cccccc')
    })

    // Click emits openSection
    this.on('pointerdown', () => {
      eventBridge.emit('openSection', this.section)
    })

    // Idle rotation tween
    config.scene.tweens.add({
      targets: this.glowRing,
      angle: 360,
      duration: 8000,
      repeat: -1,
      ease: 'Linear',
    })

    config.scene.add.existing(this)
  }

  private drawPlanet(): void {
    this.gfx.clear()
    this.gfx.fillStyle(this.color, 1)
    this.gfx.fillCircle(0, 0, this.radius)

    // Highlight
    this.gfx.fillStyle(0xffffff, 0.15)
    this.gfx.fillCircle(-this.radius * 0.25, -this.radius * 0.25, this.radius * 0.5)
  }

  private drawGlow(alpha: number): void {
    this.glowRing.clear()
    this.glowRing.lineStyle(2, this.color, alpha)
    this.glowRing.strokeCircle(0, 0, this.radius + 8)
    this.glowRing.lineStyle(1, this.color, alpha * 0.5)
    this.glowRing.strokeCircle(0, 0, this.radius + 16)
  }
}
