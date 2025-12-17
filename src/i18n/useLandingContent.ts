import { computed } from 'vue';
import { useAppLanguage } from '@/composables/useAppLanguage';
import { landingContent, type LandingContent } from '@/i18n/landingContent';
import { defaultAppConfig } from '@/config/appConfig';

export const useLandingContent = () => {
  const { language } = useAppLanguage();

  return computed(() => landingContent[language.value] ?? landingContent[defaultAppConfig.lang]);
};

export const useLandingContentSection = <K extends keyof LandingContent>(section: K) => {
  const content = useLandingContent();

  return computed(() => content.value[section]);
};

