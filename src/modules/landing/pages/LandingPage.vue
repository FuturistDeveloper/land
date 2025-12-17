<template>
  <div class="landing-page">
    <LandingHeader />
    <main class="landing-page__main">
      <HeroSection />
      <ConnectionSection />
      <CapabilitiesSection />
      <ShowcaseSection />
                  <InsideCompanySection />
      <TechnologySection />
      <SecuritySection />
      <IntelligenceSection />

    </main>
    <FooterSection />
  </div>
</template>

<script setup lang="ts">
import LandingHeader from '../components/LandingHeader.vue';
import HeroSection from '../components/HeroSection.vue';
import ConnectionSection from '../components/ConnectionSection.vue';
import CapabilitiesSection from '../components/CapabilitiesSection.vue';
import ShowcaseSection from '../components/ShowcaseSection.vue';
import TechnologySection from '../components/TechnologySection.vue';
import InsideCompanySection from '../components/InsideCompanySection.vue';
import IntelligenceSection from '../components/IntelligenceSection.vue';
import SecuritySection from '../components/SecuritySection.vue';
import FooterSection from '../components/FooterSection.vue';
</script>

<style scoped>
.landing-page {
  min-height: 100vh;
  color: #f6f8ff;
  position: relative;
}

.landing-page__main {
  position: relative;
  z-index: 1;
}
</style>

