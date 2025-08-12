<template>
  <div id="app">
    <Navigation />
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Navigation from './components/Navigation.vue';

export default defineComponent({
  name: 'App',
  components: {
    Navigation
  }
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=PT+Serif:wght@400;700&display=swap');

html, body {
  font-family: 'PT Serif', serif;
  margin: 0;
}

#app {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.bg {
  margin: 0;
  margin-top: .5rem;
  padding: .1rem 1rem;
  border-radius: 0.4rem;
  background-color: #f0f4f8;
}

.title {
  font-weight: bold;
}

.mb-1 {
    margin-bottom: 1rem;
}

.display-block {
    display:block
}

.cursor-pointer {
    cursor: pointer
}

.border-none {
  border: none;
}

.bg-btn {
  background-color: #ededed;
  transition: .3s;
}

.bg-btn:hover {
  background-color: #02b57b;
}

.bg-btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
  opacity: 0.6;
}

.normal-font-size {
  font-size: .85rem;
}

.error-message {
  color: #d32f2f;
  background-color: #ffebee;
  padding: 0.5rem;
  border-radius: 0.25rem;
  border-left: 4px solid #d32f2f;
  font-weight: 500;
}

.success-message {
  color: #2e7d32;
  background-color: #e8f5e8;
  padding: 0.5rem;
  border-radius: 0.25rem;
  border-left: 4px solid #2e7d32;
  font-weight: 500;
}

input:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

input[type="text"], input[type="number"] {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  font-size: 0.85rem;
  width: 100%;
  box-sizing: border-box;
}

input[type="text"]:focus, input[type="number"]:focus {
  outline: none;
  border-color: #02b57b;
  box-shadow: 0 0 0 2px rgba(2, 181, 123, 0.2);
}

label {
  font-weight: 500;
  margin-bottom: 0.25rem;
  display: block;
  color: #333;
}
</style>