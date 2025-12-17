<template>
  <section class="hero">
    <div class="hero__bg" aria-hidden="true">
      <div class="hero__grid" />
      <div class="hero__glow hero__glow--left" />
      <div class="hero__glow hero__glow--right" />
      <span class="hero__streak" />
      <img class="hero__glass" :src="heroGlassImage" alt="" role="presentation" />
    </div>

    <div class="hero__inner">
      <div class="hero__headline" ref="headlineRef" style="opacity: 0">
        <h1 class="hero__title type-display">
          {{ title.lead }}
          <span>{{ title.accent }}</span>
        </h1>
        <p class="hero__subtitle type-subtitle">
          {{ subtitle }}
        </p>
      </div>

      <div class="hero-card">
        <div class="hero-card__meta">
          <div class="hero-card__avatar">F</div>
          <span class="hero-card__chip">{{ cardChip }}</span>
        </div>
        <div class="hero-card__content" ref="contentRef" style="visibility: hidden">
          <p class="hero-card__title" ref="cardTitleRef">{{ cardTitle }}</p>
          <ul class="hero-card__list">
            <li v-for="line in cardLines" :key="`${line.accent}-${line.text}`" ref="lineRefs">
              <span class="hero-card__accent">{{ line.accent }}</span>
              <span class="hero-card__text">{{ line.text }}</span>
            </li>
          </ul>
        </div>
      </div>

      <AppButton class="hero__cta" variant="primary" @click="openChatWidget" ref="ctaRef" style="opacity: 0">
        {{ ctaLabel }}
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M5 12h14m0 0-4-4m4 4-4 4"
            stroke="currentColor"
            stroke-width="1.6"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </AppButton>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, nextTick } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { useChatWidget } from '@/composables/useChatWidget';
import AppButton from '@/ui/AppButton.vue';
import heroGlassImage from '@/assets/hero-glass.png';
import { useLandingContentSection } from '@/i18n/useLandingContent';
import { createTimeline, splitText, stagger } from 'animejs';

const { open: openChatWidget } = useChatWidget();
const heroContent = useLandingContentSection('hero');

const title = computed(() => heroContent.value.title);
const subtitle = computed(() => heroContent.value.subtitle);
const cardChip = computed(() => heroContent.value.cardChip);
const cardTitle = computed(() => heroContent.value.cardTitle);
const cardLines = computed(() => heroContent.value.cardLines);
const ctaLabel = computed(() => heroContent.value.ctaLabel);

const contentRef = ref<HTMLElement | null>(null);
const cardTitleRef = ref<HTMLElement | null>(null);
const headlineRef = ref<HTMLElement | null>(null);
const lineRefs = ref<HTMLElement[]>([]);
const ctaRef = ref<ComponentPublicInstance | null>(null);

onMounted(async () => {
  await nextTick();

  if (!contentRef.value || !cardTitleRef.value) return;

  try {
    const tl = createTimeline({
      autoplay: true,
    });

    // Add headline animation
    if (headlineRef.value) {
      tl.add({
        targets: headlineRef.value,
        opacity: [0, 1],
        duration: 800,
        easing: 'easeOutQuad'
      });
    }

    // Split Title
    const titleSplit = splitText(cardTitleRef.value, { chars: true });
    titleSplit.chars.forEach((char) => {
      char.style.opacity = '0';
      char.style.display = 'inline-block'; // Ensure transforms work if we add them
    });

    // Split Lines
    const lineChars: HTMLElement[] = [];
    lineRefs.value.forEach((li) => {
      const accent = li.querySelector('.hero-card__accent');
      const text = li.querySelector('.hero-card__text');

      if (accent) {
        const accentSplit = splitText(accent, { chars: true });
        accentSplit.chars.forEach((char) => {
          char.style.opacity = '0';
          char.style.display = 'inline-block';
          lineChars.push(char as HTMLElement);
        });
      }
      
      if (text) {
        const textSplit = splitText(text, { chars: true });
        textSplit.chars.forEach((char) => {
          char.style.opacity = '0';
          char.style.display = 'inline-block';
          lineChars.push(char as HTMLElement);
        });
      }
    });

    // Add animations to timeline
    tl.add(titleSplit.chars, {
      opacity: [0, 1],
      translateY: ['4px', '0px'],
      duration: 60,
      delay: stagger(30),
      easing: 'easeOutQuad'
    });

    // Add lines animation
    if (lineChars.length > 0) {
      tl.add(lineChars, {
        opacity: [0, 1],
        translateY: ['4px', '0px'],
        duration: 60,
        delay: stagger(15),
        easing: 'easeOutQuad'
      }, '-=100');
    }

    // Add CTA animation
    const ctaEl = ctaRef.value?.$el;
    if (ctaEl) {
      tl.add(ctaEl, {
        opacity: [0, 1],
        translateY: ['20px', '0px'],
        duration: 800,
        easing: 'easeOutElastic(1, .8)'
      }, '-=100');
    }

  } finally {
    // Reveal container
    if (contentRef.value) {
      contentRef.value.style.visibility = 'visible';
    }
    // Ensure headline is visible in case of error
    if (headlineRef.value) {
      headlineRef.value.style.opacity = '1';
    }
  }
});
</script>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
  padding: 130px 16px 85px;
}

.hero__bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(180deg, #05070f 0%, #05060b 100%);
}

.hero__grid {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(rgba(255, 255, 255, 0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.045) 1px, transparent 1px);
  background-size: 96px 96px;
  opacity: 0.7;
}

.hero__glow {
  position: absolute;
  width: clamp(320px, 45vw, 720px);
  height: clamp(320px, 45vw, 720px);
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.45;
}

.hero__glow--left {
  top: -18%;
  left: -20%;
  background: radial-gradient(circle, rgba(66, 139, 255, 0.5), transparent 60%);
}

.hero__glow--right {
  bottom: -10%;
  right: -10%;
  background: radial-gradient(circle, rgba(248, 162, 59, 0.6), transparent 60%);
}

.hero__glass {
  position: absolute;
  right: -8%;
  top: 10%;
  width: min(70vw, 720px);
  max-width: none;
  object-fit: contain;
  opacity: 0.95;
  filter: drop-shadow(0 30px 60px rgba(0, 0, 0, 0.6));
}


.hero__inner {
  position: relative;
  z-index: 1;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 55px;
}

.hero__eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.35em;
  font-size: 0.85rem;
  color: rgba(245, 248, 255, 0.65);
}

.hero__title {
  margin: 0;
}

.hero__title span {
  display: block;
}

.hero__subtitle {
  margin: 0;
  max-width: 720px;
}

.hero__headline {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  margin-top: 86px;
}

.hero-card {
  width: min(723px, 100%);
  padding: 32px;
  border-radius: 24px;
  background: rgba(185, 206, 251, 0.10);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 25px 60px rgba(5, 6, 12, 0.8);
  backdrop-filter: blur(30px);
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-align: left;
}

.hero-card__meta {
  display: flex;
  align-items: center;
  gap: 16px;
}

.hero-card__content {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-left: 50px;
}

.hero-card__avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: radial-gradient(circle, #57b0ff, #1a7dff);
  display: grid;
  place-items: center;
  font-weight: 700;
  color: #fff;
}

.hero-card__chip {
  padding: 9px 16px;
  border-radius: 999px;
  border: 1px solid #305bda;
  background: rgba(48, 91, 218, 0.12);
  font-family: 'Chakra Petch', sans-serif;
  font-size: 12px;
  letter-spacing: 0.12em;
  color: #d2edff;
  text-transform: uppercase;
}

.hero-card__title {
  font-size: 24px;
  margin: 0;
}

.hero-card__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: #a8adb4;
  font-size: 16px;
  line-height: 1.5;
}

.hero-card__accent {
  color: #e9eaec;
  font-weight: 600;
  margin-right: 6px;
}

.hero__cta {
  border-radius: 300px;
  border: 1px solid #305BDA;
  background: radial-gradient(275.35% 119.97% at -5.45% 113.75%, #00CFF9 0%, #0498F7 32.43%, #0762F4 75.96%);

  color: #fff;
  padding-inline: 40px;
  min-width: 252px;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease;
}

.hero__cta:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 10px 30px rgba(4, 152, 247, 0.5);
}

.hero__cta svg {
  width: 22px;
  height: 22px;
}

@media (max-width: 960px) {
  .hero {
    padding-bottom: 200px;
  }

  .hero__glass {
    opacity: 0.4;
    width: 85vw;
    right: -20%;
  }

  .hero-card {
    padding: 28px;
  }
}

@media (max-width: 768px) {
  .hero {
    padding: 110px 20px 140px;
  }

  .hero__inner {
    gap: 36px;
  }

  .hero__headline {
    margin-top: 48px;
    gap: 20px;
  }

  .hero__subtitle {
    max-width: none;
  }

  .hero__glass {
    width: 120vw;
    right: -60%;
    top: auto;
    bottom: -15%;
    opacity: 0.25;
  }

  .hero-card {
    padding: 26px 22px;
    border-radius: 22px;
    gap: 20px;
  }

  .hero-card__meta {
    width: 100%;
    justify-content: space-between;
    gap: 10px;
  }

  .hero-card__content {
    padding-left: 0;
  }

  .hero-card__title {
    font-size: 21px;
  }

  .hero-card__list {
    font-size: 15px;
  }

  .hero__cta {
    width: 100%;
  }
}

@media (max-width: 640px) {
  .hero {
    padding-top: 96px;
    padding-inline: 18px;
  }

  .hero-card__chip {
    letter-spacing: 0.08em;
  }

  .hero__eyebrow {
    letter-spacing: 0.25em;
  }

  .hero-card__meta {
    flex-direction: column;
    align-items: flex-start;
  }

  .hero-card__avatar {
    width: 44px;
    height: 44px;
  }
}

@media (max-width: 480px) {
  .hero {
    padding: 86px 16px 120px;
  }

  .hero__glass {
    display: none;
  }

  .hero-card {
    padding: 22px 18px;
    border-radius: 18px;
  }

  .hero-card__chip {
    font-size: 11px;
    letter-spacing: 0.05em;
  }

  .hero__cta {
    min-width: 0;
    padding-inline: 0;
  }
}
</style>

