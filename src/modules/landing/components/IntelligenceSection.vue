<template>
  <section class="intelligence">
    <div class="intelligence__bg" aria-hidden="true">
      <div class="intelligence__grid" />
      <div class="intelligence__glow intelligence__glow--left" />
      <div class="intelligence__glow intelligence__glow--right" />
    </div>

    <div class="intelligence__inner">
      <div class="intelligence__content">
        <h2 class="intelligence__title">
          {{ title.lead }}
          <span>{{ title.accent }}</span>
          {{ title.tail }}
        </h2>
        <p class="intelligence__subtitle">
          {{ subtitle }}
        </p>
        <div class="intelligence__actions">
          <button
            type="button"
            class="intelligence__button intelligence__button--ghost"
            @click="openChatWidget"
          >
            <span>{{ buttons.demo }}</span>
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <path
                d="M5 12h14m-4-4 4 4-4 4"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.8"
              />
            </svg>
          </button>
          <button type="button" class="intelligence__button intelligence__button--filled">
            <span>{{ buttons.contact }}</span>
          </button>
        </div>
      </div>

      <div 
        class="intelligence__features"
        ref="featuresRef"
        :class="{ 'is-visible': isVisible }"
      >
        <article v-for="feature in features" :key="feature.title" class="intelligence-feature">
          <div class="intelligence-feature__icon" aria-hidden="true">
            <IntelligenceFeatureIcon class="intelligence-feature__icon-svg" :name="feature.icon" />
          </div>
          <div class="intelligence-feature__body">
            <h3 class="intelligence-feature__title">{{ feature.title }}</h3>
            <p class="intelligence-feature__text">
              {{ feature.description }}
            </p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useChatWidget } from '@/composables/useChatWidget';
import IntelligenceFeatureIcon from './icons/IntelligenceFeatureIcon.vue';
import { useLandingContentSection } from '@/i18n/useLandingContent';

type FeatureIcon = 'fast-launch' | 'agile-adaptation' | 'constant-growth';

type FeatureCard = {
  title: string;
  description: string;
  icon: FeatureIcon;
};

const { open: openChatWidget } = useChatWidget();
const intelligenceContent = useLandingContentSection('intelligence');
const title = computed(() => intelligenceContent.value.title);
const subtitle = computed(() => intelligenceContent.value.subtitle);
const buttons = computed(() => intelligenceContent.value.buttons);
const features = computed<FeatureCard[]>(() => intelligenceContent.value.features);

const featuresRef = ref<HTMLElement | null>(null);
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

  if (featuresRef.value) {
    observer.observe(featuresRef.value);
  }
});
</script>

<style scoped>
.intelligence {
  position: relative;
  overflow: hidden;
  isolation: isolate;
  padding: 86px 70px;

  color: #f6f8ff;
}



.intelligence__grid {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
  background-size: 110px 110px;
  opacity: 0.35;
}



.intelligence__inner {
  position: relative;
  z-index: 1;
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(32px, 5vw, 72px);
  align-items: center;
}

.intelligence__content {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.intelligence__title {
  margin: 0;
  font-family: 'Chakra Petch', sans-serif;
  font-size: 64px;
  font-weight: 400;
  line-height: 1.1;
}

.intelligence__title span {
  display: inline-block;
  background: linear-gradient(95deg, #6bb2ff 0%, #4e7dff 45%, #40c9ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

.intelligence__subtitle {
  margin: 0;
  font-size: 26px;
  color: #FFF;
  max-width: 520px;
}

.intelligence__actions {
  display: flex;
  flex-wrap: wrap;
  margin-top: 32px;
  gap: 24px;
}

.intelligence__button {
  --button-border: rgba(70, 118, 255, 0.8);
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 16px;
  padding: 14px 32px;
  border-radius: 999px;
  border: 1px solid var(--button-border);
  background: rgba(5, 6, 12, 0.8);
  font-family: 'Chakra Petch', sans-serif;
  font-weight: 600;
  font-size: clamp(16px, 1.4vw, 20px);
  color: #f6f8ff;
  cursor: pointer;
  transition: color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}

.intelligence__button svg {
  width: 24px;
  height: 24px;
}

.intelligence__button--ghost:hover {
  background: rgba(22, 33, 58, 0.85);
  border-color: rgba(125, 172, 255, 0.9);
}

.intelligence__button--filled {
  background: linear-gradient(100deg, #2f8bff 0%, #3db5ff 55%, #50c7ff 100%);
  box-shadow: 0 20px 40px rgba(50, 130, 255, 0.45);
  border-color: transparent;
}

.intelligence__button--filled:hover {
  box-shadow: 0 30px 50px rgba(48, 110, 255, 0.55);
}

.intelligence__features {
  display: flex;
  flex-direction: column;
  gap: clamp(18px, 3vw, 28px);
}

.intelligence-feature {
  position: relative;
  overflow: hidden;
  border-radius: 28px;
  border: 1px solid rgba(118, 163, 255, 0.35);
  background: linear-gradient(140deg, rgba(6, 7, 14, 0.95), rgba(5, 9, 22, 0.95) 55%, rgba(9, 20, 46, 0.9) 100%);
  padding: clamp(26px, 4.5vw, 32px);
  display: flex;
  flex-direction: column;
  gap: 20px;
  opacity: 0;
  transform: translateY(30px);
}

.intelligence__features.is-visible .intelligence-feature {
  animation: fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}

.intelligence__features.is-visible .intelligence-feature:nth-child(1) { animation-delay: 0.1s; }
.intelligence__features.is-visible .intelligence-feature:nth-child(2) { animation-delay: 0.25s; }
.intelligence__features.is-visible .intelligence-feature:nth-child(3) { animation-delay: 0.4s; }

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.intelligence-feature__icon {
 
}

.intelligence-feature__icon-svg {
  width: 30px;
  height: 30px;
}

.intelligence-feature__body {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.intelligence-feature__title {
  margin: 0;
  font-size: clamp(22px, 2vw, 26px);
  font-family: 'Chakra Petch', sans-serif;
  font-weight: 600;
}

.intelligence-feature__text {
  margin: 0;
  font-size: 17px;
  line-height: 1.6;
  color: rgba(245, 248, 255, 0.78);
}

@media (max-width: 1024px) {
  .intelligence__inner {
    grid-template-columns: 1fr;
  }

  .intelligence__content {
    text-align: center;
    align-items: center;
  }

  .intelligence__subtitle {
    max-width: none;
  }

  .intelligence__actions {
    justify-content: center;
  }
}

@media (max-width: 640px) {
  .intelligence__actions {
    flex-direction: column;
  }

  .intelligence__button {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 900px) {
  .intelligence {
    padding: 78px 32px 110px;
  }

  .intelligence__title {
    font-size: clamp(40px, 11vw, 60px);
  }
}

@media (max-width: 520px) {
  .intelligence {
    padding: 68px 18px 96px;
  }

  .intelligence__content {
    align-items: flex-start;
    text-align: left;
  }

  .intelligence__actions {
    width: 100%;
  }

  .intelligence__button {
    padding: 12px 18px;
    font-size: 16px;
  }
}
</style>


