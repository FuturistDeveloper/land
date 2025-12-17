import type { InjectionKey, Ref } from 'vue';
import type { AppConfig, SupportedLanguage } from '@/config/appConfig';

export const AppConfigKey: InjectionKey<AppConfig> = Symbol('AppConfig');
export const AppLanguageKey: InjectionKey<Ref<SupportedLanguage>> = Symbol('AppLanguage');

