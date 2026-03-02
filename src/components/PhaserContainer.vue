<template>
  <div ref="gameContainer" class="game-container">
    <PortfolioOverlay :section="activeSection" @close="closeSection" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Phaser from 'phaser'
import { createGame } from '../game/PhaserGame'
import { eventBridge } from '../game/EventBridge'
import PortfolioOverlay from './PortfolioOverlay.vue'

const gameContainer = ref<HTMLDivElement>()
const activeSection = ref<string | null>(null)
let game: Phaser.Game | null = null

function openSection(section: string) {
  activeSection.value = section
}

function closeSection() {
  activeSection.value = null
  eventBridge.emit('closeSection')
}

onMounted(() => {
  if (gameContainer.value) {
    game = createGame(gameContainer.value)
  }
  eventBridge.on('openSection', openSection)
})

onUnmounted(() => {
  eventBridge.off('openSection', openSection)
  if (game) {
    game.destroy(true)
    game = null
  }
})
</script>

<style scoped>
.game-container {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
