<template>
  <section id="showcase" class="showcase">
    <div class="showcase__backdrop" aria-hidden="true" :style="{ '--showcase-bg': `url(${showcaseBackdrop})` }" />
    <div class="showcase__inner">
      <header class="showcase__intro">
        <h2 class="showcase__title">{{ title }}</h2>
        <p class="showcase__subtitle">
          {{ subtitle }}
        </p>
      </header>

      <figure class="showcase__preview">
        <AnimatedChat
          :messages="chatMessages"
          :aria-label="imageAlt"
        />
      </figure>

      <div class="showcase__cards">
        <article
          v-for="(card, index) in cards"
          :key="card.badge"
          class="showcase-card"
          :style="{ zIndex: index + 1 }"
        >
          <header class="showcase-card__header">
            <div class="showcase-card__avatar" aria-hidden="true">
              <img
                :src="personAvatar"
                alt=""
                class="showcase-card__avatar-image"
                loading="lazy"
              />
            </div>
            <span class="showcase-card__badge" :style="{ backgroundColor: card.badgeColor }">
              {{ card.badge }}
            </span>
          </header>

          <p class="showcase-card__question">
            {{ card.question }}
          </p>

          <div class="showcase-card__response">
            <span class="showcase-card__response-icon" aria-hidden="true">
              <svg viewBox="0 0 16 16" role="presentation">
                <path
                  d="M5 3l6 5-6 5"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
            <span>{{ card.response }}</span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import showcaseBackdrop from '@/assets/source_20251104_2324_Blue Glass Bolt_remix_01k981rg96eeatw131qqqc1y6n 2-Photoroom.png';
import personAvatar from '@/assets/person.png';
import { useLandingContentSection } from '@/i18n/useLandingContent';
import AnimatedChat from './AnimatedChat.vue';

const showcaseContent = useLandingContentSection('showcase');
const title = computed(() => showcaseContent.value.title);
const subtitle = computed(() => showcaseContent.value.subtitle);
const cards = computed(() => showcaseContent.value.cards);
const imageAlt = computed(() => showcaseContent.value.imageAlt);
const chatMessages = computed(() => showcaseContent.value.chatMessages);
</script>

<style scoped>
.showcase {
  position: relative;
  padding: 86px 120px;
  color: #f6f8ff;
  overflow: hidden;
   background: linear-gradient(180deg, #030409 0%, #07090f 100%);
}

.showcase__backdrop {

  position: absolute;
  inset: 0;
  left: -40px;
  background-image:
    var(--showcase-bg);
  background-size: cover;
  background-position: center;
  filter: saturate(0.85);
  pointer-events: none;
  background-repeat: no-repeat;
  width: 80%;
  height: 80%;
  top: 0%;
}

.showcase__inner {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  text-align: center;
}

.showcase__intro {
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: center;
}

.showcase__eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.28em;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.55);
  margin: 0;
}


.showcase__title {
  margin: 0;
  font-family: 'Chakra Petch', sans-serif;
  font-size: clamp(42px, 6vw, 68px);
  font-weight: 400;
}

.showcase__subtitle {
  max-width: 720px;
  margin: 0;
  font-size: 22px;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.8);
}

.showcase__preview {
  margin: 52px 0 74px 0;
}


.showcase__preview-image {
  position: relative;
  display: block;
  margin: 52px auto 74px auto;
  width: 70%;
  border-radius: 28px;
  box-shadow: 0 60px 120px rgba(4, 8, 16, 0.75);
}

.showcase__cards {
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 0;
  flex-wrap: nowrap;
  max-width: 1100px;
  width: max-content;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}

.showcase-card {
  position: relative;
  flex: 0 0 clamp(280px, 30vw, 360px);
  padding: 32px;
  border-radius: 24px;
  border: 1px solid #305bda;
  background: rgba(185, 206, 251, 0.1);
  backdrop-filter: blur(24px);
  box-shadow: 0 40px 120px rgba(12, 23, 52, 0.65);
  display: flex;
  flex-direction: column;
  gap: 0;
  text-align: left;
  transition: transform 250ms ease, box-shadow 250ms ease;
}

@media (min-width: 960px) {
  .showcase-card + .showcase-card {
    margin-left: -20px;
  }
}

.showcase-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 50px 140px rgba(20, 36, 84, 0.8);
}

.showcase-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 32px;
}

.showcase-card__avatar {
  display: flex;
  align-items: center;
  justify-content: center;
}

.showcase-card__avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.showcase-card__badge {
  padding: 3px 12px;
  border-radius: 999px;
  font-size: 15px;
  font-weight: 600;
  color: #f9fbff;
  white-space: nowrap;
}

.showcase-card__question {
  margin: 0 0 14px;
  font-size: 20px;
  font-weight: 500;
  color: white;
  flex: 1 1 auto;
}

.showcase-card__response {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 18px;
  border-radius: 999px;
  background: #2158e6;
  font-size: 15px;
  font-weight: 500;
  color: white;
  width: fit-content;
  margin-top: auto;
}

.showcase-card__response-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.18);
  display: grid;
  place-items: center;
}

.showcase-card__response-icon svg {
  width: 14px;
  height: 14px;
  color: white;
}

@media (max-width: 1100px) {
  .showcase {
    padding: 80px 60px;
  }

  .showcase__preview-image {
    width: 80%;
  }
}

@media (max-width: 900px) {
  .showcase {
    padding: 72px 40px;
  }

  .showcase__cards {
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .showcase {
    padding: 70px 24px 96px;
  }

  .showcase__subtitle {
    font-size: 20px;
  }

  .showcase__preview-image {
    width: 100%;
  }

  .showcase__cards {
    flex-direction: column;
    align-items: stretch;
    flex-wrap: nowrap;
    width: 100%;
    max-width: none;
    left: 0;
    transform: none;
    gap: 18px;
  }

  .showcase-card {
    width: 100%;
    flex: 1 1 auto;
    margin-left: 0;
  }
}

@media (max-width: 520px) {
  .showcase {
    padding: 60px 18px 80px;
  }

  .showcase-card {
    padding: 24px 20px;
  }

  .showcase-card__header {
    flex-direction: column;
    align-items: flex-start;
  }

  .showcase-card__question {
    font-size: 18px;
  }
}
</style>

