<template>
  <section id="capabilities" class="capabilities">
    <div class="capabilities__inner">
      <header class="capabilities__header">
        <h2 class="capabilities__title">{{ title }}</h2>
      </header>
      <div class="capabilities__grid" ref="gridRef">
        <article
          v-for="(card, index) in cards"
          :key="card.title"
          class="cap-card"
          :style="{ '--card-bg': card.background }"
          :ref="el => { if(el) cardRefs[index] = el as HTMLElement }"
        >
          <div class="cap-card__icon">
            <CapabilityIcon />
          </div>

          <div class="cap-card__body" :class="{ 'cap-card__body--compact': card.compact }">
            <h3 class="cap-card__title type-card-title">{{ card.title }}</h3>
            <div class="cap-card__content">
              <p class="cap-card__description type-card-text">{{ card.description }}</p>

              <div v-if="card.chips?.length" class="cap-card__chips">
                <span v-for="chip in card.chips" :key="chip" class="type-tag">{{ chip }}</span>
              </div>

              <p class="cap-card__footer type-card-text">{{ card.footer }}</p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import CapabilityIcon from './icons/CapabilityIcon.vue';
import { useLandingContentSection } from '@/i18n/useLandingContent';
import { createTimeline, stagger } from 'animejs';

type CapabilityCard = {
  title: string;
  description: string;
  chips?: string[];
  footer: string;
  background: string;
  compact?: boolean;
};

const capabilitiesContent = useLandingContentSection('capabilities');
const title = computed(() => capabilitiesContent.value.title);
const cards = computed<CapabilityCard[]>(() => capabilitiesContent.value.cards);

const gridRef = ref<HTMLElement | null>(null);
const cardRefs = ref<HTMLElement[]>([]);

onMounted(() => {
  if (!gridRef.value) return;

  // Initial set opacity to 0
  cardRefs.value.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          
          const tl = createTimeline({});
          tl.add(cardRefs.value, {
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 600,
            delay: stagger(150), // Stagger reveal
            easing: 'easeOutQuad'
          });
        }
      });
    },
    { threshold: 0.2 }
  );

  observer.observe(gridRef.value);
});
</script>

<style scoped>
.capabilities {
  padding: 86px 70px;
  background: linear-gradient(180deg, #030409 0%, #07090f 100%);
}

.capabilities__inner {
  max-width: 1220px;
  margin: 0 auto;
}

.capabilities__header {
  text-align: center;
  margin-bottom: 57px;
}

.capabilities__title {
  margin: 0;
  font-family: 'Chakra Petch', sans-serif;
  font-size: clamp(42px, 6vw, 64px);
  font-weight: 400;
  line-height: 1.1;
  color: #f5f7ff;
}

.capabilities__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Fixed 2 columns */
  gap: clamp(20px, 3vw, 36px);
  grid-auto-rows: 1fr;
}

.cap-card {
  border-radius: 32px;
  padding: 32px;
  border: 1px solid #18182b;
  background: linear-gradient(150deg, rgba(9, 14, 27, 0.95), rgba(5, 7, 14, 0.9));
  box-shadow:
    0 24px 60px rgba(0, 0, 0, 0.55),
    inset 0 1px 0 rgba(255, 255, 255, 0.03);
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-height: 260px;
  height: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease; /* Hover transitions */
  will-change: transform, opacity; /* Optimize animations */
}

.cap-card:hover {
  transform: translateY(-8px);
  box-shadow: 
    0 32px 70px rgba(0, 0, 0, 0.65),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
  border-color: #305bda;
}

.cap-card__icon {
  flex-shrink: 0;
  width: 74px;
  height: 74px;
  border-radius: 20px;
  border: 1px solid #161f2c;
  background: #0d121a;
  display: grid;
  place-items: center;
  color: #f6fbff;
  transition: transform 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}

.cap-card:hover .cap-card__icon {
  transform: scale(1.05) rotate(3deg);
  color: #3c8bf5;
  border-color: #3c8bf5;
}

.cap-card__icon svg {
  width: 44px;
  height: auto;
}

.cap-card__body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 29px;
}

.cap-card__body--compact {
  gap: 12px;
}

.cap-card__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.cap-card__title {
color: #FFF;
-webkit-text-stroke-width: 0.2px;
-webkit-text-stroke-color: #FFF;
font-family: 'Chakra Petch', sans-serif;
font-size: 24px;
font-style: normal;
font-weight: 400;
line-height: normal;
  margin: 0;
}

.cap-card__description {
  color: #FFF;
  opacity: 0.8;
  margin: 0;
}

.cap-card__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: flex-start;
}

.cap-card__chips span {
  padding: 4px 12px;
  border-radius: 100px;
  background: #2158e6;
}

.cap-card__footer {
  margin-top: auto;
  padding-top: 24px;
}

@media (max-width: 980px) {
  .capabilities {
    padding: 72px 40px;
  }

  .cap-card {
    padding: 28px;
  }

  /* Keep 2 columns on tablet, but shrink gap */
  .capabilities__grid {
      gap: 20px;
  }
}

@media (max-width: 640px) {
  .capabilities {
    padding: 64px 22px 96px;
  }

  .capabilities__grid {
    grid-template-columns: 1fr; /* 1 column on mobile */
  }

  .cap-card {
    flex-direction: column;
    padding: 24px;
  }
}

@media (max-width: 480px) {
  .capabilities {
    padding: 54px 16px 80px;
  }

  .cap-card {
    padding: 20px;
    border-radius: 24px;
  }

  .cap-card__chips span {
    font-size: 13px;
  }
}
</style>

