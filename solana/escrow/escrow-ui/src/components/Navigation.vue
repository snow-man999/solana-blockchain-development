<template>
  <nav class="navigation">
    <div class="nav-container">
      <h1 class="nav-title">Solana Escrow</h1>
      <div class="nav-links">
        <router-link to="/" class="nav-link" active-class="active">Alice (Init)</router-link>
        <router-link to="/bob" class="nav-link" active-class="active">Bob (Trade)</router-link>
        <router-link to="/pap" class="nav-link" active-class="active">P@P</router-link>
        <router-link to="/wormhole" class="nav-link" active-class="active">Wormhole</router-link>
        <router-link to="/wormhole-test" class="nav-link" active-class="active">Wormhole Test</router-link>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Navigation'
});
</script>

<style scoped>
.navigation {
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  padding: 1rem 0;
  margin-bottom: 1rem;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-title {
  margin: 0;
  color: #02b57b;
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-links {
  display: flex;
  gap: 1rem;
}

.nav-link {
  text-decoration: none;
  color: #666;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  transition: all 0.3s ease;
  font-weight: 500;
}

.nav-link:hover {
  background-color: #f0f4f8;
  color: #02b57b;
}

.nav-link.active {
  background-color: #02b57b;
  color: white;
}

@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    gap: 1rem;
  }
  
  .nav-links {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
