<template>
  <div class="bg">
    <p class="title">Escrow UI - Wormhole Interface</p>
    <div>
      <div class="mb-1">
        <p>This is a placeholder for the Wormhole interface.</p>
        <p>Wormhole functionality is not yet implemented in this escrow application.</p>
      </div>
      <div class="mb-1">
        <input 
          class="cursor-pointer border-none bg-btn normal-font-size" 
          type="button" 
          value="Go Back" 
          @click="goBack"
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const router = useRouter();

    const goBack = () => {
      router.push('/');
    };

    return {
      goBack
    };
  }
});
</script>
