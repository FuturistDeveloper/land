<template>
  <header ref="headerRef" class="landing-header">
    <div class="landing-header__surface">
      <LogoMark class="landing-header__logo" />

      <nav ref="navRef" class="landing-header__nav" :aria-label="navigationAriaLabel">
        <a
          v-for="item in navItems"
          :key="item.label"
          class="landing-header__link type-nav"
          :class="{ 'is-active': activeSection === item.target }"
          :href="item.target"
          @click.prevent="handleNavClick(item)"
        >
          {{ item.label }}
        </a>
      </nav>

      <AppButton class="landing-header__cta" variant="primary" @click="handleStartClick">
        {{ ctaLabel }}
      </AppButton>

      <button class="landing-header__burger" type="button" @click="toggleMenu">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 12H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M3 6H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>

    <div class="landing-header__mobile-menu" :class="{ 'is-open': isMenuOpen }">
      <div class="landing-header__mobile-menu-content">
        <nav class="landing-header__mobile-nav">
          <a
            v-for="item in navItems"
            :key="item.label"
            class="landing-header__mobile-link type-nav"
            :class="{ 'is-active': activeSection === item.target }"
            :href="item.target"
            @click.prevent="handleMobileNavClick(item)"
          >
            {{ item.label }}
          </a>
        </nav>
        <AppButton class="landing-header__mobile-cta" variant="primary" @click="handleStartClick">
          {{ ctaLabel }}
        </AppButton>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watchEffect } from 'vue';
import { useChatWidget } from '@/composables/useChatWidget';
import AppButton from '@/ui/AppButton.vue';
import LogoMark from '@/ui/LogoMark.vue';
import { useLandingContentSection } from '@/i18n/useLandingContent';

type NavItem = {
  label: string;
  target: string;
};

const headerContent = useLandingContentSection('header');
const navItems = computed(() => headerContent.value.navItems);
const ctaLabel = computed(() => headerContent.value.ctaLabel);
const navigationAriaLabel = computed(() => headerContent.value.navigationAriaLabel);
const navRef = ref<HTMLElement | null>(null);
const headerRef = ref<HTMLElement | null>(null);
const activeSection = ref('');
let observer: IntersectionObserver | null = null;
const { open: openChatWidget } = useChatWidget();
const isMenuOpen = ref(false);

watchEffect(() => {
  if (!activeSection.value && navItems.value.length > 0) {
    activeSection.value = navItems.value[0]?.target ?? '';
  }
});

const handleNavClick = (item: NavItem) => {
  const targetElement = document.querySelector<HTMLElement>(item.target);
  if (!targetElement) return;

  const headerHeight = headerRef.value?.offsetHeight ?? 0;
  const y = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight - 16;

  window.scrollTo({
    top: Math.max(y, 0),
    behavior: 'smooth',
  });

  activeSection.value = item.target;
};

const handleMobileNavClick = (item: NavItem) => {
  isMenuOpen.value = false;
  handleNavClick(item);
}

const handleStartClick = () => {
  isMenuOpen.value = false;
  openChatWidget();
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const observeSections = () => {
  if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return;

  observer?.disconnect();

  const headerHeight = headerRef.value?.offsetHeight ?? 0;

  observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible?.target?.id) {
        const targetId = `#${visible.target.id}`;
        if (navItems.value.some((item) => item.target === targetId)) {
          activeSection.value = targetId;
        }
      }
    },
    {
      root: null,
      rootMargin: `-${headerHeight + 20}px 0px -60% 0px`,
      threshold: [0.2, 0.4, 0.6, 0.8],
    },
  );

  navItems.value.forEach((item) => {
    const section = document.querySelector(item.target);
    if (section) observer?.observe(section);
  });
};

const handleResize = () => {
  observeSections();
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
  observeSections();
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
  observer?.disconnect();
});
</script>

<style scoped>
.landing-header {
  position: fixed;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  width: min(1120px, calc(100% - clamp(48px, 8vw, 200px)));
  display: flex;
  justify-content: center;
  z-index: 20;
  pointer-events: none;
}

.landing-header__surface {
  position: relative;
  width: 100%;
  border-radius: 100px;
  height: 80px;
  padding: 20px 56px;
  background: rgba(185, 206, 251, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.14);
  box-shadow: 0 20px 40px rgba(3, 7, 18, 0.3);
  backdrop-filter: blur(30px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  flex-shrink: 0;
  pointer-events: auto;
  isolation: isolate;
  z-index: 20;
  animation: headerSlideDown 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}

@keyframes headerSlideDown {
  from {
    transform: translateY(-150%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.landing-header__logo {
  flex-shrink: 0;
}

.landing-header__nav {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  flex-wrap: wrap;
  gap: 28px;
  font-family: 'Chakra Petch', sans-serif;
  letter-spacing: 0.02em;
}

.landing-header__cta {
  flex-shrink: 0;
  border-radius: 46px;
  padding-inline: 28px;
}

.landing-header__burger {
  display: none;
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
}

.landing-header__burger svg {
  width: 100%;
  height: 100%;
}

.landing-header__link {
  color: #c7c7c7;
  text-decoration: none;
  position: relative;
  transition: color 180ms ease;
}

.landing-header__link.is-active {
  color: #ffffff;
  font-weight: 600;
}

.landing-header__link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -6px;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, #3d7bff, #61e4ff);
  border-radius: 999px;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 200ms ease;
}

.landing-header__link.is-active::after,
.landing-header__link:hover::after {
  transform: scaleX(1);
}

.landing-header__link:hover {
  color: #f6f8ff;
}

.landing-header__mobile-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  padding-top: 10px;
  opacity: 0;
  pointer-events: none;
  transform: translateY(-10px);
  transition: opacity 0.3s ease, transform 0.3s ease;
  width: 100%;
  box-sizing: border-box;
}

.landing-header__mobile-menu.is-open {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0);
}

.landing-header__mobile-menu-content {
  background: rgba(11, 15, 29, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 24px;
  padding: 24px;
  backdrop-filter: blur(30px);
  display: flex;
  flex-direction: column;
  gap: 24px;
  box-shadow: 0 20px 40px rgba(3, 7, 18, 0.5);
  pointer-events: auto;
  width: 100%;
  box-sizing: border-box;
}

.landing-header__mobile-nav {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.landing-header__mobile-link {
  color: #c7c7c7;
  text-decoration: none;
  font-family: 'Chakra Petch', sans-serif;
  font-size: 18px;
  padding: 8px 0;
  transition: color 0.2s ease;
}

.landing-header__mobile-link.is-active,
.landing-header__mobile-link:hover {
  color: #fff;
}

.landing-header__mobile-cta {
  width: 100%;
  justify-content: center;
}

@media (max-width: 1180px) {

  .landing-header__surface {
    padding-inline: clamp(24px, 6vw, 40px);
  }

  .landing-header__nav {
    gap: 20px;
  }
}

@media (max-width: 960px) {
  .landing-header {
    position: fixed;
    top: 16px;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% - 32px);
    max-width: 100%;
  }

  .landing-header__surface {
    height: auto;
    min-height: 72px;
    padding: 18px 24px;
    gap: 16px;
    justify-content: space-between;
  }

  .landing-header__nav,
  .landing-header__cta {
    display: none;
  }
  
  .landing-header__logo {

  }

  .landing-header__burger {
    display: block;
  }
}

@media (max-width: 768px) {
  .landing-header {
    position: fixed;
    top: 16px;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% - 32px);
    padding: 0;
  }

  .landing-header__surface {
    border-radius: 32px;
    padding: 16px 24px;
    gap: 14px;
    justify-content: space-between;
  }
  
  .landing-header__logo {

  }

  .landing-header__nav,
  .landing-header__cta {
    display: none;
  }
  
  .landing-header__burger {
    display: block;
  }
}

@media (max-width: 480px) {
  .landing-header__surface {
    padding: 12px 20px;
  }
}
</style>

