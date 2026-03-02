<template>
  <section class="experience-section">
    <h2>Experience</h2>
    <div class="timeline">
      <div class="timeline-item" v-for="item in experiences" :key="item.title">
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <h3>{{ item.title }}</h3>
          <span class="company">{{ item.company }}</span>
          <span class="period">{{ item.period }}</span>
          <p>{{ item.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const experiences = [
  {
    title: 'Senior Frontend Developer',
    company: 'Tech Company',
    period: '2023 — Present',
    description:
      'Leading frontend architecture with Vue 3 and TypeScript. Built interactive dashboards and real-time data visualization tools.',
  },
  {
    title: 'Full-Stack Developer',
    company: 'Digital Agency',
    period: '2021 — 2023',
    description:
      'Developed web applications using Vue, Node.js, and PostgreSQL. Improved page load times by 40% through performance optimization.',
  },
  {
    title: 'Junior Developer',
    company: 'Startup Inc.',
    period: '2019 — 2021',
    description:
      'Built responsive web interfaces and RESTful APIs. Collaborated with design teams to implement pixel-perfect UIs.',
  },
]
</script>

<style scoped>
.experience-section h2 {
  font-family: 'Orbitron', sans-serif;
  font-size: 1.6rem;
  color: #ffb74d;
  margin-bottom: 1.2rem;
}

.timeline {
  position: relative;
  padding-left: 24px;
  border-left: 2px solid rgba(255, 183, 77, 0.3);
}

.timeline-item {
  position: relative;
  margin-bottom: 1.8rem;
  padding-left: 16px;
}

.timeline-dot {
  position: absolute;
  left: -31px;
  top: 6px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #ffb74d;
  border: 2px solid #0c1228;
}

.timeline-content h3 {
  font-size: 1.05rem;
  color: #fff;
  margin-bottom: 0.2rem;
}

.company {
  font-size: 0.9rem;
  color: #ffb74d;
  margin-right: 0.8rem;
}

.period {
  font-size: 0.8rem;
  color: #777;
}

.timeline-content p {
  margin-top: 0.4rem;
  font-size: 0.9rem;
  line-height: 1.6;
  color: #aaa;
}
</style>
