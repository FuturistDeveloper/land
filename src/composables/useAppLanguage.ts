import { inject, ref } from 'vue';
import { AppLanguageKey } from '@/constants/injectionKeys';
import { defaultAppConfig } from '@/config/appConfig';

export const useAppLanguage = () => {
  const language = inject(AppLanguageKey, ref(defaultAppConfig.lang));

  return {
    language,
  };
};

