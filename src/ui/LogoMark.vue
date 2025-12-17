<template>
  <div class="logo-mark" aria-label="Futurist OS">
    <span class="logo-mark__wordmark" :style="wordmarkStyle" aria-hidden="true" />
    <span class="logo-mark__badge">OS</span>
  </div>
</template>

<script setup lang="ts">
import logoSrc from '@/assets/Futurist logo black 3.png';

const wordmarkStyle = {
  '--logo-src': `url(${logoSrc})`,
};
</script>

<style scoped>
.logo-mark {
  display: inline-flex;
  align-items: center;
  gap: 8px; /* Increased gap slightly */
  flex-direction: row; /* Force row direction */
  flex-wrap: nowrap; /* Prevent wrapping */
}

.logo-mark__wordmark {
  display: block;
  width: 98px;
  height: 24.9px;
  background-color: #fff;
  -webkit-mask: var(--logo-src) center / contain no-repeat;
  mask: var(--logo-src) center / contain no-repeat;
  flex-shrink: 0; /* Prevent shrinking */
}

.logo-mark__badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 18px; /* Fixed height */
  padding: 0 6px;
  border-radius: 4px;
  background: #2158e6;
  font-family: 'Chakra Petch', sans-serif;
  font-size: 10px;
  font-style: normal;
  font-weight: 600;
  line-height: 1;
  letter-spacing: 0.02em;
  color: var(--Azure, #f4f7fb);
  text-align: center;
  flex-shrink: 0; /* Prevent shrinking */
}
</style>

