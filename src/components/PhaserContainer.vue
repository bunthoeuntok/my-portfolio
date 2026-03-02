<template>
  <div ref="gameContainer" class="game-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Phaser from 'phaser'
import { createGame } from '../game/PhaserGame'

const gameContainer = ref<HTMLDivElement>()
let game: Phaser.Game | null = null

onMounted(() => {
  if (gameContainer.value) {
    game = createGame(gameContainer.value)
  }
})

onUnmounted(() => {
  if (game) {
    game.destroy(true)
    game = null
  }
})
</script>

<style scoped>
.game-container {
  width: 800px;
  max-width: 100%;
  aspect-ratio: 4 / 3;
}
</style>
