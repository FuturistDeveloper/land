<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="36"
    height="36"
    viewBox="0 0 36 36"
    fill="none"
    role="img"
    aria-hidden="true"
  >
    <path
      d="M2.625 9H13.875C15.3225 9 16.5 7.8225 16.5 6.375V2.625C16.5 1.1775 15.3225 0 13.875 0H2.625C1.1775 0 0 1.1775 0 2.625V6.375C0 7.8225 1.1775 9 2.625 9Z"
      :fill="gradientUrl('paint0')"
    />
    <path
      d="M2.625 22.5H13.875C15.3225 22.5 16.5 21.3225 16.5 19.875V16.125C16.5 14.6775 15.3225 13.5 13.875 13.5H2.625C1.1775 13.5 0 14.6775 0 16.125V19.875C0 21.3225 1.1775 22.5 2.625 22.5Z"
      :fill="gradientUrl('paint1')"
    />
    <path
      d="M2.625 36H13.875C15.3225 36 16.5 34.8225 16.5 33.375V29.625C16.5 28.1775 15.3225 27 13.875 27H2.625C1.1775 27 0 28.1775 0 29.625V33.375C0 34.8225 1.1775 36 2.625 36Z"
      :fill="gradientUrl('paint2')"
    />
    <path
      d="M33.3749 0H22.1249C20.6774 0 19.4999 1.1775 19.4999 2.625V33.375C19.4999 34.8225 20.6774 36 22.1249 36H33.3749C34.8224 36 35.9999 34.8225 35.9999 33.375V2.625C35.9999 1.1775 34.8224 0 33.3749 0Z"
      :fill="gradientUrl('paint3')"
    />
    <defs>
      <radialGradient
        :id="gradientId('paint0')"
        cx="0"
        cy="0"
        r="1"
        gradientTransform="matrix(26.3762 -34.2 -11.8343 98.4168 -1.96039 40.95)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#00CFF9" />
        <stop offset="0.324312" stop-color="#0499F7" />
        <stop offset="0.759615" stop-color="#0762F4" />
      </radialGradient>
      <radialGradient
        :id="gradientId('paint1')"
        cx="0"
        cy="0"
        r="1"
        gradientTransform="matrix(26.3762 -34.2 -11.8343 98.4168 -1.96039 40.95)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#00CFF9" />
        <stop offset="0.324312" stop-color="#0499F7" />
        <stop offset="0.759615" stop-color="#0762F4" />
      </radialGradient>
      <radialGradient
        :id="gradientId('paint2')"
        cx="0"
        cy="0"
        r="1"
        gradientTransform="matrix(26.3762 -34.2 -11.8343 98.4168 -1.96039 40.95)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#00CFF9" />
        <stop offset="0.324312" stop-color="#0499F7" />
        <stop offset="0.759615" stop-color="#0762F4" />
      </radialGradient>
      <radialGradient
        :id="gradientId('paint3')"
        cx="0"
        cy="0"
        r="1"
        gradientTransform="matrix(26.3762 -34.2 -11.8343 98.4168 -1.96039 40.95)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#00CFF9" />
        <stop offset="0.324312" stop-color="#0499F7" />
        <stop offset="0.759615" stop-color="#0762F4" />
      </radialGradient>
    </defs>
  </svg>
</template>

<script setup lang="ts">
const instanceId = `semantic-blocks-icon-${Math.random().toString(36).slice(2, 9)}`;
const gradientId = (suffix: string) => `${instanceId}-${suffix}`;
const gradientUrl = (suffix: string) => `url(#${gradientId(suffix)})`;
</script>


