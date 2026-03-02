<template>
  <section class="contact-section">
    <h2>Contact</h2>
    <p>Feel free to reach out — I'd love to hear from you!</p>
    <div class="contact-links">
      <a href="mailto:hello@bunthoeun.dev" class="contact-link">
        <span class="link-icon">&#9993;</span>
        <span>hello@bunthoeun.dev</span>
      </a>
      <a href="https://github.com/bunthoeuntok" target="_blank" rel="noopener" class="contact-link">
        <span class="link-icon">&#128187;</span>
        <span>GitHub</span>
      </a>
      <a href="https://linkedin.com/in/bunthoeuntok" target="_blank" rel="noopener" class="contact-link">
        <span class="link-icon">&#128101;</span>
        <span>LinkedIn</span>
      </a>
    </div>
  </section>
</template>

<style scoped>
.contact-section h2 {
  font-family: 'Orbitron', sans-serif;
  font-size: 1.6rem;
  color: #e57373;
  margin-bottom: 0.8rem;
}

.contact-section > p {
  color: #aaa;
  margin-bottom: 1.4rem;
}

.contact-links {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.contact-link {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem 1rem;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  color: #ccc;
  text-decoration: none;
  transition: border-color 0.2s, color 0.2s;
}

.contact-link:hover {
  border-color: rgba(229, 115, 115, 0.4);
  color: #fff;
}

.link-icon {
  font-size: 1.2rem;
}
</style>
