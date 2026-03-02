<template>
  <section class="skills-section">
    <h2>Skills & Tech Stack</h2>
    <div class="skill-group" v-for="group in skillGroups" :key="group.category">
      <h3>{{ group.category }}</h3>
      <div class="skill-bar" v-for="skill in group.skills" :key="skill.name">
        <div class="skill-label">
          <span>{{ skill.name }}</span>
          <span class="skill-pct">{{ skill.level }}%</span>
        </div>
        <div class="bar-track">
          <div class="bar-fill" :style="{ width: skill.level + '%', background: skill.color }"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const skillGroups = [
  {
    category: 'Frontend',
    skills: [
      { name: 'Vue.js / Nuxt', level: 92, color: '#42b883' },
      { name: 'TypeScript', level: 88, color: '#3178c6' },
      { name: 'React', level: 80, color: '#61dafb' },
      { name: 'CSS / Tailwind', level: 85, color: '#38bdf8' },
    ],
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Node.js', level: 85, color: '#68a063' },
      { name: 'Python', level: 75, color: '#ffd43b' },
      { name: 'PostgreSQL', level: 78, color: '#336791' },
    ],
  },
  {
    category: 'Other',
    skills: [
      { name: 'Phaser / Game Dev', level: 70, color: '#ba68c8' },
      { name: 'Docker / DevOps', level: 72, color: '#2496ed' },
      { name: 'Git / CI-CD', level: 88, color: '#f05032' },
    ],
  },
]
</script>

<style scoped>
.skills-section h2 {
  font-family: 'Orbitron', sans-serif;
  font-size: 1.6rem;
  color: #81c784;
  margin-bottom: 1.2rem;
}

.skill-group {
  margin-bottom: 1.4rem;
}

.skill-group h3 {
  font-size: 0.95rem;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 0.6rem;
}

.skill-bar {
  margin-bottom: 0.6rem;
}

.skill-label {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  margin-bottom: 0.25rem;
}

.skill-pct {
  color: #888;
}

.bar-track {
  height: 8px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.8s ease;
}
</style>
