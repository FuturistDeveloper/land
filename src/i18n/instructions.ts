import type { SupportedLanguage } from '@/config/appConfig';
import widgetInstructionRu from '@/i18n/prompts/widget.ru.txt?raw';
import widgetInstructionEn from '@/i18n/prompts/widget.en.txt?raw';

const widgetInstructions: Record<SupportedLanguage, string> = {
  ru: widgetInstructionRu.trim(),
  en: widgetInstructionEn.trim(),
};

export const getWidgetInstruction = (language: SupportedLanguage) => {
  if (language in widgetInstructions) {
    return widgetInstructions[language];
  }

  return widgetInstructions.ru;
};

