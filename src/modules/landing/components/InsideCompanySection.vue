<template>
  <section class="inside-company">
    <div class="inside-company__bg" aria-hidden="true">
      <div class="inside-company__grid" />
      <div class="inside-company__glow inside-company__glow--top" />
      <div class="inside-company__glow inside-company__glow--bottom" />
    </div>

    <div class="inside-company__inner">
      <header class="inside-company__intro">
        <h2 class="inside-company__title type-display">{{ title }}</h2>
        <p class="inside-company__subtitle type-subtitle">
          {{ subtitle }}
        </p>
      </header>

      <img class="inside-company__icon" :src="centerIcon" alt="" role="presentation" />

      <div class="inside-company__cards" ref="cardsRef">
        <article
          v-for="(card, index) in cards"
          :key="card.title"
          class="inside-company__card"
          :ref="el => { if(el) cardRefs[index] = el as HTMLElement }"
        >
          <div
            class="inside-company__card-icon"
            :class="{ 'inside-company__card-icon--wide': card.icon === 'reach' }"
          >
            <img
              :src="iconSources[card.icon]"
              alt=""
              loading="lazy"
              class="inside-company__card-icon-image"
              aria-hidden="true"
              role="presentation"
            />
          </div>
          <div class="inside-company__card-body">
            <h3 class="inside-company__card-title">{{ card.title }}</h3>
            <p class="inside-company__card-text">
              {{ card.description }}
            </p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import centerIcon from '@/assets/Group 1142813310.png';
import iconAnywhere from '@/assets/icons/icon-anywhere.svg';
import iconAnything from '@/assets/icons/icon-anything.svg';
import { useLandingContentSection } from '@/i18n/useLandingContent';
import { createTimeline } from 'animejs';

type CardIcon = 'reach' | 'integrations';

type InfoCard = {
  title: string;
  description: string;
  icon: CardIcon;
};

const iconSources: Record<CardIcon, string> = {
  reach: iconAnywhere,
  integrations: iconAnything,
};

const insideContent = useLandingContentSection('insideCompany');
const title = computed(() => insideContent.value.title);
const subtitle = computed(() => insideContent.value.subtitle);
const cards = computed<InfoCard[]>(() => insideContent.value.cards);

const cardsRef = ref<HTMLElement | null>(null);
const cardRefs = ref<HTMLElement[]>([]);

onMounted(() => {
  if (!cardsRef.value) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          
          if (cardsRef.value) {
            cardsRef.value.classList.add('is-visible');
          }
          
          // Initial setup
          if (cardRefs.value.length === 2) {
             cardRefs.value[0].style.opacity = '0';
             cardRefs.value[0].style.transform = 'translateX(-100px)';
             
             cardRefs.value[1].style.opacity = '0';
             cardRefs.value[1].style.transform = 'translateX(100px)';

             const tl = createTimeline({});
             
             tl.add(cardRefs.value[0], {
               opacity: [0, 1],
               translateX: [-100, 0],
               duration: 800,
               easing: 'easeOutCubic'
             });

             tl.add(cardRefs.value[1], {
               opacity: [0, 1],
               translateX: [100, 0],
               duration: 800,
               easing: 'easeOutCubic'
             }, '-=600');
          }
        }
      });
    },
    { threshold: 0.2 }
  );

  observer.observe(cardsRef.value);
});
</script>

<style scoped>
.inside-company {
  position: relative;
  overflow: hidden;
  padding: 86px 120px;
  background: linear-gradient(180deg, #04060c 0%, #050509 100%);
  isolation: isolate;
  color: #f6f8ff;
   background: linear-gradient(180deg, #030409 0%, #07090f 100%);
}

.inside-company__bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.inside-company__grid {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(rgba(255, 255, 255, 0.055) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.055) 1px, transparent 1px);
  background-size: 96px 96px;
  opacity: 0.55;
}

.inside-company__glow {
  position: absolute;
  width: clamp(320px, 45vw, 680px);
  height: clamp(320px, 45vw, 680px);
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.45;
}

.inside-company__glow--top {
  background: radial-gradient(circle, rgba(59, 132, 255, 0.7), transparent 70%);
}

.inside-company__glow--bottom {
  background: radial-gradient(circle, rgba(28, 183, 255, 0.6), transparent 70%);
}

.inside-company__inner {
  position: relative;
  z-index: 1;
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

}

.inside-company__intro {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.inside-company__title {
  margin: 0;
  font-size: clamp(40px, 5vw, 64px);
  font-weight: 400;
  font-family: 'Chakra Petch', sans-serif;
}

.inside-company__subtitle {
  margin: 0;
  font-size: clamp(18px, 2vw, 24px);
  color: rgba(255, 255, 255, 0.8);
}

.inside-company__icon {
  width: 40%;
  height: auto;
  display: block;
  margin: 92px auto;
  filter: drop-shadow(0 40px 80px rgba(8, 19, 43, 0.65));
}

.inside-company__cards {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: clamp(18px, 3vw, 32px);
  opacity: 0;
  transition: opacity 0.5s ease;
}

.inside-company__cards.is-visible {
  opacity: 1;
}

.inside-company__card {
  position: relative;
  padding: clamp(24px, 4vw, 40px);
  border-radius: 32px;
  border: 1px solid rgba(93, 138, 255, 0.4);
  background: linear-gradient(150deg, rgba(9, 14, 27, 0.95), rgba(5, 7, 14, 0.9));
  display: flex;
  flex-direction: column;
  gap: 32px;
  text-align: left;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}

.inside-company__card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  border-color: rgba(93, 138, 255, 0.8);
}

.inside-company__card-icon {
  width: 62px;
  height: 62px;
  flex: 0 0 62px;
  padding: 12px;
  box-sizing: border-box;
  border-radius: 13.474px;
  border: 0.561px solid #305bda;
  background: rgba(185, 206, 251, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #e2ecff;
  overflow: hidden;
  transition: transform 0.3s ease, background-color 0.3s ease;
}

.inside-company__card:hover .inside-company__card-icon {
  transform: scale(1.05);
  background: rgba(185, 206, 251, 0.15);
}

.inside-company__card-icon-image {
  width: 38px;
  height: 38px;
  display: block;
  object-fit: contain;
}

.inside-company__card-icon--wide {
  width: 62px;
  height: 62px;
  min-height: 62px;
}

.inside-company__card-title {
  margin: 0;
  font-size: 24px;
  font-family: 'Chakra Petch', sans-serif;
  font-weight: 500;
}

.inside-company__card-body {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.inside-company__card-text {
  margin: 0;
  font-size: 17px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.7);
}

@media (max-width: 1040px) {
  .inside-company {
    padding: 80px 60px;
  }

  .inside-company__icon {
    width: 55%;
    margin: 72px auto;
  }

  .inside-company__cards {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  }
}

@media (max-width: 768px) {
  .inside-company {
    padding: 80px 28px 120px;
  }

  .inside-company__title {
    font-size: clamp(36px, 10vw, 52px);
  }

  .inside-company__subtitle {
    font-size: 20px;
  }

  .inside-company__icon {
    width: 70%;
    margin: 64px auto;
  }
}

@media (max-width: 640px) {
  .inside-company__cards {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 520px) {
  .inside-company {
    padding: 70px 18px 110px;
  }

  .inside-company__icon {
    width: 90%;
    margin: 48px auto;
  }

  .inside-company__card {
    border-radius: 24px;
    padding: 22px;
  }
}
</style>


