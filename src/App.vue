<script setup lang="ts">
import PhaserContainer from './components/PhaserContainer.vue'
</script>

<template>
  <div class="app">
    <h1>Phaser + Vue</h1>
    <PhaserContainer />
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

h1 {
  margin: 0;
}
</style>
