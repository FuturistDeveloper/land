export const CONFIG_ENDPOINT = '/config.json';

export const SUPPORTED_LANGUAGES = ['ru', 'en'] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export type AppConfig = {
  lang: SupportedLanguage;
};

const SUPPORTED_LANGUAGE_SET = new Set<SupportedLanguage>(SUPPORTED_LANGUAGES);

const coerceLanguage = (value: unknown): SupportedLanguage => {
  if (typeof value === 'string') {
    const lowered = value.trim().toLowerCase();
    if (SUPPORTED_LANGUAGE_SET.has(lowered as SupportedLanguage)) {
      return lowered as SupportedLanguage;
    }
  }

  return 'ru';
};

const envDefaultLanguage = coerceLanguage(import.meta.env.VITE_DEFAULT_LANG);

export const defaultAppConfig: AppConfig = {
  lang: envDefaultLanguage,
};

type RawConfig = {
  lang?: string;
};

export const loadAppConfig = async (): Promise<AppConfig> => {
  if (typeof window === 'undefined') {
    return defaultAppConfig;
  }

  try {
    const response = await fetch(CONFIG_ENDPOINT, {
      cache: 'no-store',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Config request failed with status ${response.status}`);
    }

    const data = (await response.json()) as RawConfig;
    return {
      lang: coerceLanguage(data?.lang),
    };
  } catch (error) {
    console.warn('[app-config] Failed to load config, fallback to default', error);
    return defaultAppConfig;
  }
};

