<template>
  <Transition name="overlay">
    <div v-if="section" class="overlay-backdrop" @click.self="close">
      <div class="overlay-card">
        <button class="overlay-close" @click="close">&times;</button>
        <component :is="sectionComponent" />
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AboutSection from './sections/AboutSection.vue'
import SkillsSection from './sections/SkillsSection.vue'
import ExperienceSection from './sections/ExperienceSection.vue'
import ProjectsSection from './sections/ProjectsSection.vue'
import ContactSection from './sections/ContactSection.vue'

const props = defineProps<{ section: string | null }>()
const emit = defineEmits<{ close: [] }>()

const sectionMap: Record<string, any> = {
  about: AboutSection,
  skills: SkillsSection,
  experience: ExperienceSection,
  projects: ProjectsSection,
  contact: ContactSection,
}

const sectionComponent = computed(() =>
  props.section ? sectionMap[props.section] : null
)

function close() {
  emit('close')
}
</script>

<style scoped>
.overlay-backdrop {
  position: absolute;
  inset: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
}

.overlay-card {
  position: relative;
  max-width: 680px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  background: rgba(12, 18, 40, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2.5rem 2rem;
  color: #e0e0e0;
  font-family: 'Inter', sans-serif;
}

.overlay-close {
  position: absolute;
  top: 12px;
  right: 16px;
  background: none;
  border: none;
  color: #888;
  font-size: 28px;
  cursor: pointer;
  line-height: 1;
  transition: color 0.2s;
}

.overlay-close:hover {
  color: #fff;
}

/* Transition */
.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.35s ease;
}

.overlay-enter-active .overlay-card,
.overlay-leave-active .overlay-card {
  transition: transform 0.35s ease, opacity 0.35s ease;
}

.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}

.overlay-enter-from .overlay-card {
  transform: translateY(30px) scale(0.95);
  opacity: 0;
}

.overlay-leave-to .overlay-card {
  transform: translateY(-20px) scale(0.97);
  opacity: 0;
}
</style>
