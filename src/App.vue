<template>
  <div class="app-root">
    <router-view v-slot="{ Component, route }">
      <component :is="Component" />
      <!-- Show chat widget only on home page -->
    <chat-widget
        v-if="route.path === '/'"
      class="app-root__chat-widget"
      :api-endpoint="chatWidget.apiEndpoint"
      :bot-name="chatWidget.botName"
      :button-text="chatWidget.buttonText"
      :theme="chatWidget.theme"
      :welcome-message="chatWidget.welcomeMessage"
        :position="chatWidget.position"
        :offset-x="chatWidget.offsetX"
        :offset-y="chatWidget.offsetY"
        :primary-color="chatWidget.primaryColor"
        :button-bg-color="chatWidget.buttonBgColor"
        :text-color="chatWidget.textColor"
        :bg-color="chatWidget.bgColor"
        :border-color="chatWidget.borderColor"
        :user-bubble-bg="chatWidget.userBubbleBg"
        :user-bubble-text="chatWidget.userBubbleText"
        :quick-replies="chatWidget.quickReplies"
        :placeholder="chatWidget.placeholder"
        :hide-hints-text="chatWidget.hideHintsText"
        :show-hints-text="chatWidget.showHintsText"
    />
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useLandingContentSection } from '@/i18n/useLandingContent';
import { CHAT_WIDGET_API_ENDPOINT, CHAT_WIDGET_THEME } from '@/constants/chatWidget';

const widgetContent = useLandingContentSection('widget');
const chatWidget = computed(() => ({
  apiEndpoint: CHAT_WIDGET_API_ENDPOINT,
  botName: widgetContent.value.botName,
  buttonText: widgetContent.value.buttonLabel,
  theme: CHAT_WIDGET_THEME,
  welcomeMessage: widgetContent.value.welcomeMessage,
  position: 'bottom-right',
  offsetX: '20px',
  offsetY: '20px',
  primaryColor: '#3B82F6',
  buttonBgColor: '#1E293B',
  textColor: '#E2E8F0',
  bgColor: '#0F172A',
  borderColor: '#1E293B',
  userBubbleBg: '#1E293B',
  userBubbleText: '#E2E8F0',
  quickReplies: JSON.stringify(widgetContent.value.quickReplies ?? []),
  placeholder: widgetContent.value.placeholder,
  hideHintsText: widgetContent.value.hideHintsText,
  showHintsText: widgetContent.value.showHintsText,
}));
</script>
