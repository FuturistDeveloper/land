<template>
  <section id="technology" class="technology">
    <div class="technology__inner">
      <header class="technology__headline">
        <h2>
          <span>{{ headline.lead }}</span>
          <span class="technology__headline-accent">{{ headline.accent }}</span>
        </h2>
      </header>

      <div class="technology__grid" ref="gridRef">
        <article class="tech-card tech-card--input" :ref="el => { if(el) cardRefs[0] = el as HTMLElement }">
          <div class="tech-card__icon-box" aria-hidden="true">
            <UniversalInputIcon class="tech-card__icon" />
          </div>
          <div class="tech-card__content">
            <h3>{{ sections.universalInput.title }}</h3>
            <p>
              {{ sections.universalInput.description }}
            </p>
          </div>
        </article>

        <article class="tech-card tech-card--chunks" :ref="el => { if(el) cardRefs[1] = el as HTMLElement }">
          <div class="tech-card__icon-box" aria-hidden="true">
            <SemanticBlocksIcon class="tech-card__icon" />
          </div>
          <div class="tech-card__content">
            <h3>{{ sections.semanticChunks.title }}</h3>
            <p>
              {{ sections.semanticChunks.description }}
            </p>
          </div>
        </article>

        <article class="tech-card tech-card--core" :ref="el => { if(el) cardRefs[2] = el as HTMLElement }">
          <h3>{{ sections.core.title }}</h3>
          <p>
            {{ sections.core.description }}
          </p>
        </article>

        <article class="tech-card tech-card--knowledge" :ref="el => { if(el) cardRefs[3] = el as HTMLElement }">
          <div class="tech-card__icon-box" aria-hidden="true">
            <LivingKnowledgeIcon class="tech-card__icon" />
          </div>
          <div class="tech-card__content">
            <h3>{{ sections.livingKnowledge.title }}</h3>
            <p>
              {{ sections.livingKnowledge.description }}
            </p>
          </div>
        </article>

        <article class="tech-card tech-card--context" :ref="el => { if(el) cardRefs[4] = el as HTMLElement }">
          <div class="tech-card__icon-box" aria-hidden="true">
            <UnlimitedContextIcon class="tech-card__icon" />
          </div>
          <div class="tech-card__content">
            <h3>{{ sections.unlimitedContext.title }}</h3>
            <p>
              {{ sections.unlimitedContext.description }}
            </p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import UniversalInputIcon from './icons/UniversalInputIcon.vue';
import SemanticBlocksIcon from './icons/SemanticBlocksIcon.vue';
import LivingKnowledgeIcon from './icons/LivingKnowledgeIcon.vue';
import UnlimitedContextIcon from './icons/UnlimitedContextIcon.vue';
import { useLandingContentSection } from '@/i18n/useLandingContent';
import { createTimeline, stagger } from 'animejs';

const technologyContent = useLandingContentSection('technology');
const headline = computed(() => technologyContent.value.headline);
const sections = computed(() => technologyContent.value.cards);

const gridRef = ref<HTMLElement | null>(null);
const cardRefs = ref<HTMLElement[]>([]);

onMounted(() => {
  if (!gridRef.value) return;

  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 640px)').matches;

  // Initially hide cards
  cardRefs.value.forEach((card) => {
    if (card) {
      card.style.opacity = '0';
      card.style.transform = 'scale(0.9)';
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          
          const tl = createTimeline({});

          const coreCard = cardRefs.value[2];

          if (isMobile) {
            // On mobile, animate in visual order with core first
            const mobileOrder = [
              coreCard,
              cardRefs.value[0], // input
              cardRefs.value[1], // chunks
              cardRefs.value[3], // knowledge
              cardRefs.value[4], // context
            ].filter(Boolean);

            tl.add(mobileOrder, {
              opacity: [0, 1],
              scale: [0.9, 1],
              duration: 600,
              delay: stagger(120),
              easing: 'easeOutCubic',
            });
          } else {
            // Desktop / tablet: keep hero core card popping in after outer cards
            const outerCards = [
              cardRefs.value[0], // input
              cardRefs.value[1], // chunks
              cardRefs.value[4], // context
              cardRefs.value[3], // knowledge
            ].filter(Boolean);

            tl.add(outerCards, {
              opacity: [0, 1],
              scale: [0.9, 1],
              duration: 600,
              delay: stagger(100),
              easing: 'easeOutCubic'
            });

            if (coreCard) {
              tl.add(coreCard, {
                opacity: [0, 1],
                scale: [0.8, 1],
                duration: 800,
                easing: 'easeOutElastic(1, .8)'
              }, '-=200');
            }
          }
        }
      });
    },
    { threshold: 0.2 }
  );

  observer.observe(gridRef.value);
});
</script>

<style scoped>
.technology {
  padding: 86px 70px;
  background: linear-gradient(180deg, #05060b 0%, #04050a 100%);
  color: #f6f8ff;
}

.technology__inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: clamp(40px, 5vw, 72px);
}

.technology__headline {
  display: flex;
  justify-content: center;
}

.technology__headline h2 {
  margin: 0;
  text-align: center;
  font-family: 'Chakra Petch', sans-serif;
  font-weight: 400;
  font-size: clamp(40px, 5.6vw, 68px);
  line-height: 1.05;
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 880px;
}

.technology__headline-accent {
  background: linear-gradient(90deg, #2b8eff 0%, #54f5ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.technology__grid {
  display: grid;
  gap: clamp(18px, 2.6vw, 32px);
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-auto-rows: minmax(170px, auto);
}

.tech-card {
  position: relative;
  border-radius: 28px;
  padding: clamp(24px, 3vw, 36px);
  border: 1px solid rgba(45, 117, 255, 0.55);
background: linear-gradient(150deg, rgba(9, 14, 27, 0.95), rgba(5, 7, 14, 0.9));
  box-shadow: 0 30px 80px rgba(1, 5, 14, 0.7);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.tech-card__icon-box {
  width: fit-content;
  border-radius: 20px;
  border: 1px solid #161f2c;
  background: #0d121a;
  display: grid;
  place-items: center;
  color: #bcd6ff;
  box-shadow: 0 12px 30px rgba(11, 30, 66, 0.6);
  padding: 12px;
}

.tech-card__icon {
  width: 45px;
  height: 45px;
  flex-shrink: 0;
}

.tech-card__content {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.tech-card h3 {
  margin: 0;
  font-size: 24px;
  font-weight: 500;
  font-family: 'Chakra Petch', sans-serif;
}

.tech-card p {
  margin: 0;
  font-size: 17px;
  line-height: 1.6;
  opacity: 0.7;
  color: rgba(246, 248, 255, 0.82);
}

.tech-card--input {
  grid-column: 1 / span 1;
  grid-row: 1 / span 2;
  justify-content: flex-start;
}

.tech-card--chunks {
  grid-column: 2 / span 2;
  grid-row: 1;
}

.tech-card--core {
  grid-column: 2;
  grid-row: 2;
  border-color: rgba(19, 144, 255, 0.9);
  background: linear-gradient(135deg, rgba(18, 32, 68, 0.95), rgba(6, 10, 24, 0.95));
  padding: clamp(24px, 2.4vw, 32px);
}

.tech-card--core h3 {
  font-size: clamp(26px, 2.8vw, 34px);
  background: linear-gradient(90deg, #1c7bff 0%, #6de3ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.tech-card--knowledge {
  grid-column: 1 / span 2;
  grid-row: 3;
}

.tech-card--context {
  grid-column: 3;
  grid-row: 2 / span 2;
  min-height: 420px;
  justify-content: flex-start;
}

@media (max-width: 980px) {
  .technology__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-auto-rows: auto;
  }

  .tech-card--input,
  .tech-card--chunks,
  .tech-card--core,
  .tech-card--knowledge,
  .tech-card--context {
    grid-column: auto;
    grid-row: auto;
    min-height: auto;
  }

  .tech-card--core {
    order: -1;
  }
}

@media (max-width: 1100px) {
  .technology__grid {
   
  }
}

@media (max-width: 768px) {
  .technology {
    padding: 78px 28px 108px;
  }

  .technology__headline h2 {
    font-size: clamp(34px, 8vw, 52px);
    line-height: 1.15;
  }

  .technology__grid {
    grid-template-columns: 1fr;
  }

  .tech-card {
    padding: 24px;
  }
}

@media (max-width: 640px) {
  .technology {
    padding: 72px 20px 100px;
  }

  .technology__inner {
    gap: 32px;
  }

  .technology__headline {
    justify-content: flex-start;
  }

  .technology__headline h2 {
    text-align: left;
    max-width: none;
    gap: 6px;
  }

  .technology__grid {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  .tech-card {
    border-radius: 22px;
    padding: 20px;
    gap: 14px;
  }

  .tech-card__icon-box {
    border-radius: 18px;
    padding: 10px;
  }
}

@media (max-width: 480px) {
  .technology {
    padding: 64px 16px 90px;
  }

  .technology__headline h2 {
    font-size: clamp(30px, 9vw, 46px);
  }

  .tech-card {
    padding: 18px;
    gap: 12px;
  }

  .tech-card h3 {
    font-size: 20px;
  }

  .tech-card p {
    font-size: 15px;
    line-height: 1.5;
  }
}
</style>

