import Phaser from 'phaser'
import { BootScene } from './scenes/BootScene'
import { HeroScene } from './scenes/HeroScene'
import { SpaceScene } from './scenes/SpaceScene'
import { GameScene } from './scenes/GameScene'
import { GameOverScene } from './scenes/GameOverScene'

export function createGame(parent: HTMLElement): Phaser.Game {
  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    parent,
    backgroundColor: '#050a18',
    scene: [BootScene, HeroScene, SpaceScene, GameScene, GameOverScene],
    scale: {
      mode: Phaser.Scale.RESIZE,
      parent,
      width: '100%',
      height: '100%',
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
  }

  return new Phaser.Game(config)
}
