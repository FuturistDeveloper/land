import { createApp } from 'vue';
import { ref, watch } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import { defaultAppConfig, loadAppConfig } from '@/config/appConfig';
import { AppConfigKey, AppLanguageKey } from '@/constants/injectionKeys';
import { initInstructionInterceptor, updateInstructionLanguage } from '@/utils/instructionInterceptor';

initInstructionInterceptor(defaultAppConfig.lang);

const bootstrap = async () => {
  const config = await loadAppConfig();
  const language = ref(config.lang);

  const applyDocumentLanguage = (value: string) => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = value;
    }
  };

  applyDocumentLanguage(language.value);
  updateInstructionLanguage(language.value);

  watch(language, (nextLang) => {
    applyDocumentLanguage(nextLang);
    updateInstructionLanguage(nextLang);
  });

  const app = createApp(App);
  app.use(router);
  app.provide(AppConfigKey, config);
  app.provide(AppLanguageKey, language);
  app.mount('#app');
};

bootstrap();
