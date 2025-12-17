<template>
  <div
    ref="containerRef"
    class="animated-chat"
    :class="{ 'animated-chat--visible': isInView }"
    role="group"
    :aria-label="ariaLabel"
  >
    <div class="animated-chat__panel">
      <div class="animated-chat__messages">
        <div
          v-for="(message, index) in messages"
          :key="index"
          class="animated-chat__message"
          :class="[
            message.role === 'user'
              ? 'animated-chat__message--user'
              : 'animated-chat__message--bot',
            index < visibleCount ? 'animated-chat__message--visible' : '',
          ]"
        >
          <div
            class="animated-chat__row"
            :class="{
              'animated-chat__row--user': message.role === 'user',
            }"
          >
            <div
              v-if="message.role === 'bot'"
              class="animated-chat__avatar animated-chat__avatar--bot"
              aria-hidden="true"
            >
              <span class="animated-chat__avatar-initial">F</span>
            </div>
            <div
              v-else
              class="animated-chat__avatar animated-chat__avatar--user"
              aria-hidden="true"
            >
              <span class="animated-chat__avatar-initial">U</span>
            </div>

            <div
              class="animated-chat__bubble"
              :class="{
                'animated-chat__bubble--bot': message.role === 'bot',
                'animated-chat__bubble--user': message.role === 'user',
              }"
            >
              <p class="animated-chat__text">
                {{ message.text }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';

export type AnimatedChatMessage = {
  role: 'user' | 'bot';
  text: string;
};

const props = defineProps<{
  messages: AnimatedChatMessage[];
  ariaLabel?: string;
}>();

const containerRef = ref<HTMLElement | null>(null);
const isInView = ref(false);
const visibleCount = ref(0);

let observer: IntersectionObserver | null = null;
let timer: number | null = null;

const clearTimer = () => {
  if (timer !== null) {
    window.clearTimeout(timer);
    timer = null;
  }
};

onMounted(() => {
  if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
    isInView.value = true;
    return;
  }

  observer = new IntersectionObserver(
    (entries) => {
      const isVisible = entries.some((entry) => entry.isIntersecting);

      if (isVisible) {
        isInView.value = true;
        observer?.disconnect();
        observer = null;
      }
    },
    {
      root: null,
      rootMargin: '-100px 0px 0px 0px',
      threshold: 0.2,
    },
  );

  if (containerRef.value) {
    observer.observe(containerRef.value);
  }
});

watch(
  [isInView, visibleCount, () => props.messages.length],
  ([visible, count, total]) => {
    clearTimer();

    if (!visible || total === 0 || count >= total) {
      return;
    }

    timer = window.setTimeout(() => {
      visibleCount.value = Math.min(
        visibleCount.value + 1,
        props.messages.length,
      );
    }, 900);
  },
  { immediate: true },
);

onBeforeUnmount(() => {
  observer?.disconnect();
  observer = null;
  clearTimer();
});
</script>

<style scoped>
.animated-chat {
  max-width: 760px;
  width: 100%;
  margin: 52px auto 74px auto;
  opacity: 0;
  transform: scale(0.95);
  transition:
    opacity 0.8s ease,
    transform 0.8s ease;
  transition-delay: 0.3s;
}

.animated-chat--visible {
  opacity: 1;
  transform: scale(1);
}

.animated-chat__panel {
  border-radius: 28px;
  padding: 24px 24px 28px;
  background: radial-gradient(circle at top left, rgba(61, 123, 255, 0.18), transparent 55%),
    radial-gradient(circle at bottom right, rgba(97, 228, 255, 0.16), transparent 50%),
    rgba(7, 11, 26, 0.96);
  border: 1px solid rgba(255, 255, 255, 0.14);
  box-shadow:
    0 40px 120px rgba(3, 7, 18, 0.8),
    0 0 0 1px rgba(61, 123, 255, 0.2) inset;
  backdrop-filter: blur(26px);
}

.animated-chat__messages {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.animated-chat__message {
  display: flex;
  opacity: 0;
  transform: translateY(10px);
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
}

.animated-chat__message--bot {
  justify-content: flex-start;
}

.animated-chat__message--user {
  justify-content: flex-end;
}

.animated-chat__message--visible {
  opacity: 1;
  transform: translateY(0);
}

.animated-chat__row {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  max-width: 80%;
}

.animated-chat__row--user {
  flex-direction: row-reverse;
}

.animated-chat__avatar {
  flex-shrink: 0;
}

.animated-chat__avatar--bot {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 999px;
  background: radial-gradient(circle, #57b0ff, #1a7dff);
  box-shadow: 0 10px 25px rgba(26, 125, 255, 0.45);
}

.animated-chat__avatar--user {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 999px;
  background: rgba(10, 16, 38, 0.98);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.animated-chat__avatar-initial {
  display: inline-block;
  font-family: 'Chakra Petch', system-ui, -apple-system, BlinkMacSystemFont,
    'Segoe UI', sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #f6f8ff;
}

.animated-chat__bubble {
  border-radius: 18px;
  padding: 10px 14px;
  font-size: 14px;
  line-height: 1.5;
  color: #f6f8ff;
}

.animated-chat__bubble--bot {
  background: linear-gradient(
    130deg,
    rgba(15, 39, 112, 0.95),
    rgba(32, 88, 230, 0.95)
  );
  text-align: left;
}

.animated-chat__bubble--user {
  background: rgba(12, 19, 48, 0.96);
  text-align: right;
}

.animated-chat__text {
  margin: 0;
  white-space: pre-line;
}

@media (max-width: 768px) {
  .animated-chat {
    margin: 40px auto 56px auto;
  }

  .animated-chat__panel {
    padding: 20px 18px 22px;
    border-radius: 22px;
  }

  .animated-chat__row {
    max-width: 100%;
  }
}
</style>


