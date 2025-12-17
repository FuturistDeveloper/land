<template>
  <section id="security" class="security">


    <div class="security__inner">
      <header class="security__intro">
        <h2 class="security__title type-display">{{ title }}</h2>
        <p class="security__subtitle type-subtitle">
          {{ subtitle }}
        </p>
      </header>

      <div 
        class="security__cards"
        ref="cardsRef"
        :class="{ 'is-visible': isVisible }"
      >
        <article
          v-for="card in cards"
          :key="card.id"
          class="security-card"
        >
          <span class="security-card__badge" aria-hidden="true">{{ card.id }}</span>
          <div class="security-card__body">
            <h3 class="security-card__title">{{ card.title }}</h3>
            <p class="security-card__text">
              {{ card.description }}
            </p>
          </div>
          <span class="security-card__index" aria-hidden="true">{{ card.id }}</span>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useLandingContentSection } from '@/i18n/useLandingContent';

type SecurityCard = {
  id: string;
  title: string;
  description: string;
  accent?: boolean;
};

const securityContent = useLandingContentSection('security');
const title = computed(() => securityContent.value.title);
const subtitle = computed(() => securityContent.value.subtitle);
const cards = computed<SecurityCard[]>(() => securityContent.value.cards);

const cardsRef = ref<HTMLElement | null>(null);
const isVisible = ref(false);

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        isVisible.value = true;
        observer.disconnect();
      }
    },
    { threshold: 0.2 }
  );

  if (cardsRef.value) {
    observer.observe(cardsRef.value);
  }
});
</script>

<style scoped>
.security {
  position: relative;
  overflow: hidden;
  padding: 86px 120px;
  color: #f6f8ff;
  isolation: isolate;
}

.security__bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.security__glow {
  position: absolute;
  width: clamp(280px, 40vw, 560px);
  height: clamp(280px, 40vw, 560px);
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.35;
}

.security__glow--left {

  background: radial-gradient(circle, rgba(79, 146, 255, 0.7), transparent 70%);
}

.security__glow--right {
  top: -5%;
  right: -5%;
  background: radial-gradient(circle, rgba(155, 77, 255, 0.5), transparent 70%);
}

.security__inner {
  position: relative;
  z-index: 1;
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 80px;
}

.security__intro {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 32px;
}

.security__anchor {
  margin: 0;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.55);
  text-align: center;
}

.security__title {
  margin: 0;
  font-size: clamp(42px, 6vw, 68px);
  line-height: 1.1;
}

.security__subtitle {
  margin: 0;
  max-width: 840px;
  font-size: clamp(18px, 2vw, 24px);
  color: rgba(255, 255, 255, 0.78);
}

.security__cards {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 32px;
}

.security-card {
  position: relative;
  overflow: hidden;
  border-radius: 32px;
  padding: 60px;
  border: 1px solid rgba(24, 24, 43, 0.65);
  background: linear-gradient(120deg, rgba(4, 4, 6, 0.95), rgba(5, 6, 12, 0.9));
  box-shadow: 0 30px 60px rgba(2, 4, 11, 0.65);
  min-height: 260px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  opacity: 0;
  transform: translateY(30px);
  transition: border-color 0.4s ease, background 0.4s ease, box-shadow 0.4s ease;
}

.security__cards.is-visible .security-card {
  animation: fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}

.security__cards.is-visible .security-card:nth-child(1) { animation-delay: 0.1s; }
.security__cards.is-visible .security-card:nth-child(2) { animation-delay: 0.25s; }
.security__cards.is-visible .security-card:nth-child(3) { animation-delay: 0.4s; }
.security__cards.is-visible .security-card:nth-child(4) { animation-delay: 0.55s; }

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.security-card:hover {
  border-color: rgba(132, 163, 255, 0.55);
  background: radial-gradient(circle at 30% 10%, rgba(50, 115, 255, 0.35), transparent 58%),
    linear-gradient(130deg, #04040a 0%, #0b1f4b 38%, #0b1a3a 60%, #05060d 100%);
  box-shadow: 0 40px 80px rgba(10, 24, 56, 0.7);
}

.security-card__badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #2158e6;
  font-family: 'Chakra Petch', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  z-index: 1;
}

.security-card__body {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.security-card__title {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  font-family: 'Chakra Petch', sans-serif;
}

.security-card__text {
  margin: 0;
  font-size: 17px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.78);
}

.security-card__index {
  position: absolute;
  top: 16px;
  right: clamp(18px, 3vw, 32px);
  font-size: clamp(120px, 17vw, 180px);
  font-family: 'Chakra Petch', sans-serif;
  font-weight: 600;
  color: rgba(85, 90, 154, 0.18);
  line-height: 1;
  z-index: 0;
}

@media (max-width: 1024px) {
  .security {
    padding: 80px 48px;
  }

  .security__inner {
    gap: 56px;
  }

  .security-card {
    padding: 40px;
  }
}

@media (max-width: 960px) {
  .security__cards {
    grid-template-columns: 1fr;
  }

  .security-card__index {
    font-size: clamp(100px, 30vw, 160px);
  }
}

@media (max-width: 640px) {
  .security {
    padding: 100px 18px 140px;
  }

  .security__cards {
    grid-template-columns: 1fr;
  }

  .security-card {
    padding: 32px 24px 40px;
  }
}

@media (max-width: 520px) {
  .security {
    padding: 72px 16px 110px;
  }

  .security-card {
    border-radius: 24px;
    padding: 26px 20px 32px;
    gap: 24px;
  }

  .security-card__title {
    font-size: 20px;
  }

  .security-card__text {
    font-size: 16px;
  }
}
</style>

