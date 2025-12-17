<template>
  <footer class="landing-footer" aria-labelledby="landing-footer-title">
    <div class="landing-footer__surface">
      <div class="landing-footer__grid">
        <div class="landing-footer__brand">
          <LogoMark class="landing-footer__logo" />
          <p id="landing-footer-title" class="landing-footer__line landing-footer__line--primary">
            {{ taglinePrimary }}
          </p>
          <p class="landing-footer__line landing-footer__line--secondary">
            {{ taglineSecondary }}
          </p>
        </div>

        <div
          v-for="column in navColumns"
          :key="column.title"
          class="landing-footer__column"
        >
          <p class="landing-footer__column-title">
            {{ column.title }}
          </p>
          <ul class="landing-footer__list">
            <li v-for="link in column.links" :key="link">
              <a class="landing-footer__link" href="#" @click.prevent="noop">
                {{ link }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="landing-footer__contacts">
        <address class="landing-footer__location">
          <span class="landing-footer__contact-icon" aria-hidden="true">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              role="img"
              focusable="false"
            >
              <g opacity="0.9">
                <path
                  d="M24.9554 4.22427C20.0087 -0.52007 11.9887 -0.52007 7.04201 4.22427C2.09537 8.97016 2.09537 16.6633 7.04201 21.4077L15.9979 29.9993L24.9554 21.4077C29.902 16.6633 29.902 8.97016 24.9554 4.22427ZM15.9979 16.8764C14.9402 16.8764 13.9474 16.475 13.1984 15.7462C11.6546 14.241 11.6546 11.7924 13.1984 10.2871C13.9458 9.55838 14.9402 9.15697 15.9979 9.15697C17.0556 9.15697 18.05 9.55838 18.7974 10.2871C20.3413 11.7924 20.3413 14.2425 18.7974 15.7462C18.05 16.475 17.0556 16.8764 15.9979 16.8764Z"
                  fill="url(#footer_location_gradient)"
                />
              </g>
              <defs>
                <radialGradient
                  id="footer_location_gradient"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientTransform="matrix(18.5611 -27.8667 -8.32785 80.1915 1.95249 34.0327)"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#00CFF9" />
                  <stop offset="0.324" stop-color="#0499F7" />
                  <stop offset="0.76" stop-color="#0762F4" />
                </radialGradient>
              </defs>
            </svg>
          </span>
          <span>{{ location }}</span>
        </address>

        <div class="landing-footer__contact-links">
          <a
            v-for="contact in contactLinks"
            :key="contact.label"
            class="landing-footer__contact-link"
            :href="contact.href"
            :target="contact.external ? '_blank' : undefined"
            :rel="contact.external ? 'noreferrer noopener' : undefined"
          >
            <span class="landing-footer__contact-icon" aria-hidden="true">
              <svg
                v-if="contact.icon === 'link'"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                role="img"
                focusable="false"
              >
                <g opacity="0.9">
                  <path
                    d="M25.9336 13.061L7.95401 4.91206C7.52927 4.69564 7.04692 4.61924 6.57608 4.69381C6.10525 4.76838 5.67011 4.99009 5.33303 5.32717C4.99595 5.66425 4.77424 6.09939 4.69967 6.57022C4.6251 7.04106 4.7015 7.52341 4.91792 7.94815L13.0668 25.9277C13.2453 26.3368 13.5411 26.6839 13.9168 26.925C14.2924 27.166 14.7311 27.2903 15.1774 27.2821H15.4596C16.0039 27.2301 16.5171 27.0046 16.9235 26.6388C17.33 26.2731 17.6081 25.7864 17.7169 25.2505L18.9923 18.9526L25.2902 17.6772C25.8261 17.5684 26.3128 17.2903 26.6786 16.8838C27.0443 16.4774 27.2698 15.9642 27.3218 15.4199C27.3807 14.9289 27.2768 14.4322 27.026 14.006C26.7752 13.5799 26.3914 13.2478 25.9336 13.061Z"
                    fill="url(#footer_link_gradient)"
                  />
                </g>
                <defs>
                  <radialGradient
                    id="footer_link_gradient"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientTransform="matrix(16.6068 -21.4856 -7.45102 61.8289 3.43759 30.3922)"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#00CFF9" />
                    <stop offset="0.324" stop-color="#0499F7" />
                    <stop offset="0.76" stop-color="#0762F4" />
                  </radialGradient>
                </defs>
              </svg>

              <svg
                v-else
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                role="img"
                focusable="false"
              >
                <g opacity="0.9" clip-path="url(#footer_mail_clip)">
                  <path
                    d="M26.132 6H5.86536C4.4657 6 3.3447 7.11875 3.3447 8.5L3.33203 23.5C3.33203 24.8813 4.4657 26 5.86536 26H26.132C27.5317 26 28.6654 24.8813 28.6654 23.5V8.5C28.6654 7.11875 27.5317 6 26.132 6ZM26.132 11L15.9987 17.25L5.86536 11V8.5L15.9987 14.75L26.132 8.5V11Z"
                    fill="url(#footer_mail_gradient)"
                  />
                </g>
                <defs>
                  <radialGradient
                    id="footer_mail_gradient"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientTransform="matrix(18.5611 -19 -8.32785 54.676 1.95249 28.75)"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#00CFF9" />
                    <stop offset="0.324" stop-color="#0499F7" />
                    <stop offset="0.76" stop-color="#0762F4" />
                  </radialGradient>
                  <clipPath id="footer_mail_clip">
                    <rect width="32" height="32" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </span>
            <span>{{ contact.label }}</span>
          </a>
        </div>
      </div>

      <div class="landing-footer__legal">
        <span>{{ legal.notice }}</span>
        <span>{{ legal.rights }}</span>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import LogoMark from '@/ui/LogoMark.vue';
import { useLandingContentSection } from '@/i18n/useLandingContent';

type NavColumn = {
  title: string;
  links: string[];
};

type ContactLink = {
  icon: 'link' | 'mail';
  label: string;
  href: string;
  external?: boolean;
};

const noop = () => {};
const footerContent = useLandingContentSection('footer');
const taglinePrimary = computed(() => footerContent.value.taglinePrimary);
const taglineSecondary = computed(() => footerContent.value.taglineSecondary);
const navColumns = computed<NavColumn[]>(() => footerContent.value.navColumns);
const contactLinks = computed<ContactLink[]>(() => footerContent.value.contactLinks);
const location = computed(() => footerContent.value.location);
const legal = computed(() => footerContent.value.legal);
</script>

<style scoped>
.landing-footer {
  padding: 86px 70px 42px;
  background: linear-gradient(0deg, #111 0%, #111 100%), #fff;
  font-family: 'Chakra Petch', sans-serif;
}

.landing-footer__surface {
  width: min(1220px, 100%);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.landing-footer__grid {

  display: grid;
  grid-template-columns: minmax(320px, 2fr) repeat(2, minmax(180px, 1fr));
  gap: clamp(32px, 4vw, 80px);
}

.landing-footer__brand {
  display: flex;
  flex-direction: column;
  gap: 0;
  color: #737373;
  font-family: 'Chakra Petch', sans-serif;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.landing-footer__line {
  margin: 0;
}

.landing-footer__logo {
  transform: scale(1.1);
  transform-origin: left center;
  margin-bottom: 36px;
}

.landing-footer__line + .landing-footer__line {
  margin-top: 12px;
}

.landing-footer__column-title {
  margin: 0 0 20px;
  color: #fff;
  font-family: 'Chakra Petch', sans-serif;
  font-size: 20px;
  font-style: normal;
  line-height: normal;
}

.landing-footer__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.landing-footer__link {
  position: relative;
  display: inline-flex;
  text-decoration: none;
  color: #737373;
  font-family: 'Chakra Petch', sans-serif;
  font-size: 20px;
  font-style: normal;

  line-height: normal;
  transition: color 160ms ease;
}

.landing-footer__link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 100%;
  height: 1px;
  background: rgba(82, 132, 255, 0.9);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 200ms ease;
}

.landing-footer__link:hover {
  color: #f6f8ff;
}

.landing-footer__link:hover::after {
  transform: scaleX(1);
}

.landing-footer__contacts {
  display: grid;
  grid-template-columns: minmax(320px, 2fr) repeat(2, minmax(180px, 1fr));
  gap: clamp(32px, 4vw, 80px);
  margin-top: 40px;
  margin-bottom: 86px;
  align-items: start;
}

.landing-footer__location {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  color: rgba(246, 248, 255, 0.92);
  font-size: 16px;
  font-style: normal;
  grid-column: 1 / 2;
}

.landing-footer__contact-links {
  display: grid;
  grid-template-columns: repeat(2, minmax(180px, 1fr));
  gap: clamp(32px, 4vw, 80px);
  grid-column: 2 / 4;
  width: 100%;
}

.landing-footer__contact-link {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  justify-content: flex-start;
  color: rgba(235, 240, 255, 0.85);
  font-size: 16px;
  text-decoration: none;
  transition: color 160ms ease;
}

.landing-footer__contact-link:hover {
  color: #ffffff;
}

.landing-footer__contact-icon {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.landing-footer__contact-icon svg {
  width: 32px;
  height: 32px;
}

.landing-footer__legal {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 42px;
  color: #737373;
  font-family: 'Chakra Petch', sans-serif;
  font-size: 17px;
  font-style: normal;
  line-height: normal;
}

.landing-footer__legal::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  width: 100vw;
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
  transform: translateX(-50%);
  pointer-events: none;
}

.landing-footer__legal span:last-child {
  letter-spacing: 0.08em;
}

@media (max-width: 1100px) {
  .landing-footer__grid {
    grid-template-columns: repeat(2, minmax(220px, 1fr));
  }

  .landing-footer__brand {
    grid-column: span 2;
  }

  .landing-footer__contacts {
    grid-template-columns: repeat(2, minmax(220px, 1fr));
  }

  .landing-footer__contact-links {
    grid-column: span 2;
    grid-template-columns: repeat(2, minmax(180px, 1fr));
  }
}

@media (max-width: 768px) {
  .landing-footer__grid {
    grid-template-columns: 1fr;
  }

  .landing-footer__contacts {
    grid-template-columns: 1fr;
  }

  .landing-footer__contact-links {
    grid-column: 1 / -1;
    grid-template-columns: 1fr;
  }

  .landing-footer__legal {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
}

@media (max-width: 520px) {
  .landing-footer__contact-links {
    flex-direction: column;
    align-items: flex-start;
    gap: 18px;
  }
}

@media (max-width: 640px) {
  .landing-footer {
    padding: 64px 22px 32px;
  }

  .landing-footer__surface {
    gap: 32px;
  }
}
</style>

