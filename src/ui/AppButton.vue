<template>
  <button
    class="app-button"
    :class="[`app-button--${variant}`, { 'is-full': block }]"
    :type="type"
    v-bind="$attrs"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'glass';
  block?: boolean;
  type?: 'button' | 'submit';
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  block: false,
  type: 'button',
});

const emit = defineEmits<{
  (event: 'click', payload: MouseEvent): void;
}>();

const handleClick = (event: MouseEvent) => {
  emit('click', event);
};
</script>

<style scoped>
.app-button {
  --btn-bg: rgba(0, 0, 0, 0.45);
  --btn-color: #f6f8ff;
  --btn-shadow: none;
  border: none;
  border-radius: 999px;
  padding: 10px 32px;
  font-family: 'Chakra Petch', sans-serif;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  background: var(--btn-bg);
  color: var(--btn-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: opacity 160ms ease;
  box-shadow: var(--btn-shadow);
  min-height: 40px;
  white-space: nowrap;
}

.app-button.is-full {
  width: 100%;
}

.app-button--primary {
  --btn-bg: linear-gradient(98deg, #111a2e 0%, #0b1021 100%);
}

.app-button--glass {
  --btn-bg: rgba(255, 255, 255, 0.08);
  --btn-shadow: inset 0 1px rgba(255, 255, 255, 0.08);
}

.app-button:hover {
  opacity: 0.9;
}

.app-button:focus-visible {
  outline: 2px solid rgba(79, 209, 255, 0.7);
  outline-offset: 3px;
}
</style>

