<template>
  <section class="projects-section">
    <h2>Projects</h2>
    <div class="projects-grid">
      <div class="project-card" v-for="project in projects" :key="project.name">
        <h3>{{ project.name }}</h3>
        <p>{{ project.description }}</p>
        <div class="tech-tags">
          <span v-for="tech in project.tech" :key="tech" class="tag">{{ tech }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const projects = [
  {
    name: 'Space Portfolio',
    description:
      'An interactive portfolio built with Vue and Phaser — the very site you are exploring right now!',
    tech: ['Vue 3', 'Phaser', 'TypeScript'],
  },
  {
    name: 'Dashboard Builder',
    description:
      'A drag-and-drop dashboard platform with real-time data visualization and customizable widgets.',
    tech: ['Vue 3', 'D3.js', 'Node.js'],
  },
  {
    name: 'E-Commerce Platform',
    description:
      'Full-stack e-commerce solution with payment integration, inventory management, and analytics.',
    tech: ['Nuxt', 'PostgreSQL', 'Stripe'],
  },
  {
    name: 'Task Flow',
    description:
      'A collaborative project management tool with real-time updates and Kanban boards.',
    tech: ['React', 'Firebase', 'Tailwind'],
  },
]
</script>

<style scoped>
.projects-section h2 {
  font-family: 'Orbitron', sans-serif;
  font-size: 1.6rem;
  color: #ba68c8;
  margin-bottom: 1.2rem;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1rem;
}

.project-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 1.2rem;
  transition: border-color 0.2s;
}

.project-card:hover {
  border-color: rgba(186, 104, 200, 0.4);
}

.project-card h3 {
  font-size: 1rem;
  color: #e0e0e0;
  margin-bottom: 0.4rem;
}

.project-card p {
  font-size: 0.85rem;
  color: #999;
  line-height: 1.5;
  margin-bottom: 0.8rem;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.tag {
  font-size: 0.72rem;
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  background: rgba(186, 104, 200, 0.15);
  color: #ba68c8;
}
</style>
