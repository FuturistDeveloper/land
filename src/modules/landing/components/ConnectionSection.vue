<template>
  <section class="connection">

    <div class="connection__intro">
      <h2 class="connection__title">
        <template v-for="line in titleLines" :key="line">
          {{ line }}<br />
        </template>
        <span>{{ titleAccent }}</span>
      </h2>
      <p class="connection__subtitle">
        {{ subtitle }}
      </p>
    </div>

    <div class="connection__chat connection__chat--top">
      <div class="connection__avatar" aria-hidden="true">F</div>
      <div class="connection__bubble connection__bubble--dialog" ref="typingBubble">
        <span class="connection__bubble-text" ref="typingText" />
      </div>
    </div>

    <div class="connection__network">
      <!-- Light sphere for traveling animation -->
      <div class="connection__sphere" ref="sphereRef" />

      <div class="connection__nodes" ref="nodesRef">
        <article class="connection__node" v-for="(node, index) in nodes" :key="node.id" :ref="el => { if(el) nodeRefs[index] = el as HTMLElement }">
          <div class="connection__node-icon" aria-hidden="true">
            <component :is="getNodeIcon(node.id)" class="connection__node-svg" />
          </div>
          <p class="connection__node-label">{{ node.label }}</p>
        </article>
      </div>
    </div>

    <div class="connection__chat connection__chat--bottom">
      <div class="connection__avatar" aria-hidden="true">F</div>
      <div class="connection__bubble connection__bubble--response" ref="responseBubble">
        <span class="connection__bubble-text" ref="responseText" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import type { Component } from 'vue';
import { createTimeline, splitText, stagger } from 'animejs';
import KnowledgeIcon from './icons/KnowledgeIcon.vue';
import ProcessesIcon from './icons/ProcessesIcon.vue';
import PeopleIcon from './icons/PeopleIcon.vue';
import { useLandingContentSection } from '@/i18n/useLandingContent';

type NodeId = 'knowledge' | 'processes' | 'people';

const nodeIconMap: Record<NodeId, Component> = {
  knowledge: KnowledgeIcon,
  processes: ProcessesIcon,
  people: PeopleIcon,
};

const typingBubble = ref<HTMLDivElement | null>(null);
const typingText = ref<HTMLSpanElement | null>(null);
const responseText = ref<HTMLSpanElement | null>(null);
const responseBubble = ref<HTMLDivElement | null>(null);
const nodesRef = ref<HTMLDivElement | null>(null);
const nodeRefs = ref<HTMLElement[]>([]);
const sphereRef = ref<HTMLDivElement | null>(null);

const getNodeIcon = (node: NodeId) => nodeIconMap[node] ?? PeopleIcon;

const connectionContent = useLandingContentSection('connection');
const titleLines = computed(() => connectionContent.value.titleLines);
const titleAccent = computed(() => connectionContent.value.titleAccent);
const subtitle = computed(() => connectionContent.value.subtitle);
const nodes = computed(() => connectionContent.value.nodes);
const typingMessage = computed(() => connectionContent.value.typingContent);
const responseMessage = computed(() => connectionContent.value.responseContent);

onMounted(() => {
  // Initially hide text (display: none to prevent layout shift)
  if (typingText.value) {
    typingText.value.style.opacity = '0';
    typingText.value.style.display = 'none';
  }
  if (responseText.value) {
    responseText.value.style.opacity = '0';
    responseText.value.style.display = 'none';
  }

  const animateUserBubble = () => {
    const tl = createTimeline({});

    // Type User Text
    if (typingText.value) {
       typingText.value.style.display = 'inline-block';
       typingText.value.textContent = typingMessage.value;
       const split = splitText(typingText.value, { chars: true });
       
       split.chars.forEach(char => {
         const w = char.offsetWidth;
         char.style.width = '0px';
         char.style.opacity = '0';
         char.style.overflow = 'hidden';
         char.style.display = 'inline-block';
         char.style.verticalAlign = 'bottom';
         char.dataset.width = w + 'px';
       });
       
       typingText.value.style.display = 'none';
       typingText.value.style.opacity = '1';

       tl.add(split.chars, {
         width: (el: HTMLElement) => el.dataset.width || 'auto',
         opacity: [0, 1],
         translateY: ['4px', '0px'],
         duration: 30,
         delay: stagger(20),
         easing: 'easeOutQuad',
         begin: () => { 
            if (typingText.value) typingText.value.style.display = 'inline-block';
        }
       });
    }
  };

  const animateResponseBubble = () => {
    const tl = createTimeline({});

     // Type Response Text
     if (responseText.value) {
       responseText.value.style.display = 'inline-block';
       responseText.value.textContent = responseMessage.value;
       const splitResp = splitText(responseText.value, { chars: true });
       
       splitResp.chars.forEach(char => {
         const w = char.offsetWidth;
         char.style.width = '0px';
         char.style.opacity = '0';
         char.style.overflow = 'hidden';
         char.style.display = 'inline-block';
         char.style.verticalAlign = 'bottom';
         char.dataset.width = w + 'px';
       });
       
       responseText.value.style.display = 'none';
       responseText.value.style.opacity = '1';

       tl.add(splitResp.chars, {
         width: (el: HTMLElement) => el.dataset.width || 'auto',
         opacity: [0, 1],
         translateY: ['4px', '0px'],
         duration: 30,
         delay: stagger(15),
         easing: 'easeOutQuad',
         begin: () => { 
            if (responseText.value) responseText.value.style.display = 'inline-block';
        }
       });
    }
  };

  const userObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          userObserver.disconnect();
          animateUserBubble();
        }
      });
    },
    { threshold: 0.5 }
  );

  const responseObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          responseObserver.disconnect();
          animateResponseBubble();
        }
      });
    },
    { threshold: 0.5 }
  );

  const animateNodes = () => {
    if (!nodesRef.value || !sphereRef.value || nodeRefs.value.length === 0) return;

    const tl = createTimeline({});
    const sphere = sphereRef.value;

    // Initial setup
    nodeRefs.value.forEach(node => {
      node.style.opacity = '0';
      node.style.transform = 'translateY(20px)';
    });
    sphere.style.opacity = '0';

    // Get coordinates for all nodes
    const getCoords = (el: HTMLElement) => {
      const icon = el.querySelector('.connection__node-icon');
      const target = icon || el;
      const rect = target.getBoundingClientRect();
      const parentRect = nodesRef.value!.getBoundingClientRect();
      return {
        x: rect.left - parentRect.left + rect.width / 2,
        y: rect.top - parentRect.top + rect.height / 2
      };
    };

    const coords = nodeRefs.value.map(getCoords);

    // 1. Show sphere at first node
    tl.add(sphere, {
      opacity: [0, 1],
      translateX: coords[0].x,
      translateY: coords[0].y,
      scale: [0, 1.5],
      duration: 400,
      easing: 'easeOutQuad',
      begin: () => {
        // Set color for first node
        sphere.style.background = 'radial-gradient(circle, rgba(60, 139, 245, 0.9) 0%, rgba(60, 139, 245, 0.4) 60%, transparent 100%)';
      }
    });

    // 2. Reveal first node
    tl.add(nodeRefs.value[0], {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 400,
      easing: 'easeOutQuad'
    }, '-=200');

    // 3. Move to second node
    tl.add(sphere, {
      translateX: coords[1].x,
      translateY: coords[1].y,
      duration: 500,
      easing: 'easeInOutQuad',
      change: (anim) => {
        if (anim.progress > 50) {
           sphere.style.background = 'radial-gradient(circle, rgba(0, 207, 249, 0.9) 0%, rgba(0, 207, 249, 0.4) 60%, transparent 100%)';
        }
      }
    });

    // 4. Reveal second node
    tl.add(nodeRefs.value[1], {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 400,
      easing: 'easeOutQuad'
    }, '-=200');

    // 5. Move to third node
    tl.add(sphere, {
      translateX: coords[2].x,
      translateY: coords[2].y,
      duration: 500,
      easing: 'easeInOutQuad',
      change: (anim) => {
         if (anim.progress > 50) {
            sphere.style.background = 'radial-gradient(circle, rgba(60, 139, 245, 0.9) 0%, rgba(60, 139, 245, 0.4) 60%, transparent 100%)';
         }
      }
    });

    // 6. Reveal third node
    tl.add(nodeRefs.value[2], {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 400,
      easing: 'easeOutQuad'
    }, '-=200');

    // 7. Hide sphere
    tl.add(sphere, {
      opacity: 0,
      scale: 0,
      duration: 300,
      easing: 'easeInQuad'
    });
  };

  const nodesObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          nodesObserver.disconnect();
          if (nodesRef.value?.parentElement) {
            nodesRef.value.parentElement.classList.add('is-visible');
          }
          animateNodes();
        }
      });
    },
    { threshold: 0.5, rootMargin: "0px 0px -100px 0px" }
  );

  if (typingBubble.value) userObserver.observe(typingBubble.value);
  if (responseBubble.value) responseObserver.observe(responseBubble.value);
  if (nodesRef.value) nodesObserver.observe(nodesRef.value);
});
</script>

<style scoped>
.connection {
  position: relative;
  padding: 86px 16px;
  display: flex;
  flex-direction: column;
  gap: clamp(32px, 5vw, 72px);
  overflow: hidden;
  isolation: isolate;
  background: linear-gradient(180deg, #05070f 0%, #05060b 100%);
}

.connection__intro {
  position: relative;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: center;
}

.connection__title {
  font-family: 'Chakra Petch', sans-serif;
  font-size: clamp(40px, 6vw, 64px);
  font-weight: 400;
  line-height: 64px;
  margin: 0;
}

.connection__title span {
  color: #3c8bf5;
}

.connection__subtitle {
  font-size: 26px;
  color: rgba(255, 255, 255, 0.82);
  margin: 0;
}

.connection__chat {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: center;
}

.connection__chat--top {
  gap: clamp(12px, 2vw, 20px);
}

.connection__avatar {
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background: radial-gradient(circle, #57b0ff, #1a7dff);
  display: grid;
  place-items: center;
  font-weight: 700;
  font-size: 24px;
  color: #ffffff;
  font-family: 'Chakra Petch', sans-serif;
  box-shadow: 0 10px 25px rgba(26, 125, 255, 0.45);
}

.connection__bubble {
  background: rgba(17, 17, 17, 0.7);
  border-radius: 32px;
  padding: 18px 28px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  min-width: fit-content;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0px;
  font-family: 'Chakra Petch', sans-serif;
  font-size: 20px;
  line-height: 1.4;
  color: #fdfdff;
  opacity: 1;
}

.connection__bubble--dialog {
  border-radius: 32px 32px 32px 0;
  background: rgba(185, 206, 251, 0.10);
  min-height: 56px;
  padding: 16px 31px;
}

.connection__chat--bottom .connection__bubble {
  opacity: 1;
}

.connection__bubble--response {
  border-radius: 32px 32px 32px 0;
  background: rgba(185, 206, 251, 0.10);
  min-height: 56px;
  padding: 16px 31px;
  min-height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0px;
}

.connection__bubble-text {
  display: inline-block;
  min-height: 1.4em;
  min-width: 0;
  opacity: 0;
  transition: opacity 200ms ease;
  overflow: hidden;
}

.connection__network {
  position: relative;
  width: min(980px, 100%);
  margin: 0 auto;
  padding: clamp(32px, 6vw, 72px) 0;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.connection__network.is-visible {
  opacity: 1;
}

.connection__nodes {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 212px;
  z-index: 1;
}

.connection__node {
  position: relative;
  width: 155px;
  height: 155px;
  padding: 24px;
  border-radius: 32px;
  border: 1px solid rgba(64, 138, 255, 0.4);
  background: radial-gradient(circle at 20% 20%, rgba(63, 143, 255, 0.38), transparent 55%),
    radial-gradient(circle at 80% 0%, rgba(0, 207, 249, 0.45), transparent 55%),
    rgba(7, 10, 21, 0.9);
  box-shadow: 0 22px 45px rgba(4, 10, 26, 0.75), inset 0 1px rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  text-align: center;
  overflow: hidden;
  transition: transform 220ms ease, box-shadow 220ms ease;
  z-index: 0;
}


.connection__node:hover {
  transform: translateY(-6px) scale(1.01);
  box-shadow: 0 32px 65px rgba(7, 18, 42, 0.85);
}

.connection__node-icon {
  position: relative;
  width: 64px;
  height: 64px;
  border-radius: 26px;
  display: grid;
  place-items: center;
  color: #8fd0ff;
  z-index: 1;
}

.connection__sphere {
  position: absolute;
  top: 0;
  left: 0;
  width: 60px;
  height: 60px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(60, 139, 245, 0.4) 60%, transparent 100%);
  border-radius: 50%;
  filter: blur(15px);
  pointer-events: none;
  z-index: 2;
  opacity: 0;
  margin-top: 50px; 
  margin-left: -30px;
}

.connection__node-svg {
  width: 100%;
  height: auto;
  display: block;
  filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.45));
}

.connection__node-label {
  margin: 0;
 color: #FFF;
font-family: 'Chakra Petch', sans-serif;
font-size: 20px;
font-style: normal;
font-weight: 500;
line-height: normal;
  z-index: 1;
}

.connection__char {
  display: inline-block;
  will-change: transform;
}

@media (max-width: 960px) {
  .connection__nodes {
    flex-wrap: wrap;
    justify-content: center;
  }

  .connection__node {
    width: min(260px, 100%);
  }
}

@media (max-width: 820px) {
  .connection {
    padding: 72px 24px;
  }

  .connection__title {
    font-size: clamp(32px, 9vw, 48px);
    line-height: 1.2;
  }

  .connection__subtitle {
    font-size: 20px;
  }

  .connection__chat {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .connection__bubble {
    width: 100%;
    max-width: 420px;
  }

  .connection__nodes {
    flex-direction: column;
    gap: 40px;
  }

  .connection__node {
    width: min(320px, 100%);
  }
}

@media (max-width: 520px) {
  .connection {
    padding: 64px 16px;
  }

  .connection__title {
    text-align: left;
  }

  .connection__subtitle {
    text-align: left;
    font-size: 18px;
  }

  .connection__avatar {
    width: 48px;
    height: 48px;
    font-size: 20px;
  }

  .connection__bubble {
    font-size: 17px;
    padding: 14px 18px;
    border-radius: 22px;
  }

  .connection__bubble--dialog,
  .connection__bubble--response {
    min-width: unset;
    padding: 14px 18px;
  }

  .connection__node {
    padding: 22px;
    border-radius: 24px;
  }

  .connection__node-icon {
    width: 52px;
    height: 52px;
    border-radius: 20px;
  }
}
</style>

