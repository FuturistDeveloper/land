<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="45"
    height="45"
    viewBox="0 0 45 45"
    fill="none"
    role="img"
    aria-hidden="true"
  >
    <path
      d="M22.4998 4.5C13.7982 4.5 7.23828 7.69717 7.23828 11.935C7.23828 16.1729 13.7983 19.3701 22.4998 19.3701C31.2014 19.3701 37.7614 16.1729 37.7614 11.935C37.7614 7.69717 31.2014 4.5 22.4998 4.5Z"
      fill="black"
    />
    <path
      d="M22.4998 4.5C13.7982 4.5 7.23828 7.69717 7.23828 11.935C7.23828 16.1729 13.7983 19.3701 22.4998 19.3701C31.2014 19.3701 37.7614 16.1729 37.7614 11.935C37.7614 7.69717 31.2014 4.5 22.4998 4.5Z"
      :fill="gradientUrl('paint0')"
    />
    <path
      d="M22.4998 21.7173C15.6425 21.7173 10.1696 20.0212 7.23828 17.2776V19.3693C7.23828 23.3842 13.7983 26.4131 22.4998 26.4131C31.2014 26.4131 37.7614 23.3842 37.7614 19.3693V17.2777C34.8301 20.0214 29.3572 21.7173 22.4998 21.7173Z"
      fill="black"
    />
    <path
      d="M22.4998 21.7173C15.6425 21.7173 10.1696 20.0212 7.23828 17.2776V19.3693C7.23828 23.3842 13.7983 26.4131 22.4998 26.4131C31.2014 26.4131 37.7614 23.3842 37.7614 19.3693V17.2777C34.8301 20.0214 29.3572 21.7173 22.4998 21.7173Z"
      :fill="gradientUrl('paint1')"
    />
    <path
      d="M22.4998 28.7609C15.6425 28.7609 10.1696 27.0648 7.23828 24.3213V26.4129C7.23828 30.4278 13.7983 33.4567 22.4998 33.4567C31.2014 33.4567 37.7614 30.4278 37.7614 26.4129V24.3213C34.8301 27.0649 29.3572 28.7609 22.4998 28.7609Z"
      fill="black"
    />
    <path
      d="M22.4998 28.7609C15.6425 28.7609 10.1696 27.0648 7.23828 24.3213V26.4129C7.23828 30.4278 13.7983 33.4567 22.4998 33.4567C31.2014 33.4567 37.7614 30.4278 37.7614 26.4129V24.3213C34.8301 27.0649 29.3572 28.7609 22.4998 28.7609Z"
      :fill="gradientUrl('paint2')"
    />
    <path
      d="M22.4998 35.8041C15.6425 35.8041 10.1696 34.108 7.23828 31.3645V33.4562C7.23828 37.4711 13.7982 40.5 22.4998 40.5C31.2014 40.5 37.7614 37.4711 37.7614 33.4562V31.3645C34.8301 34.1081 29.3572 35.8041 22.4998 35.8041Z"
      fill="black"
    />
    <path
      d="M22.4998 35.8041C15.6425 35.8041 10.1696 34.108 7.23828 31.3645V33.4562C7.23828 37.4711 13.7982 40.5 22.4998 40.5C31.2014 40.5 37.7614 37.4711 37.7614 33.4562V31.3645C34.8301 34.1081 29.3572 35.8041 22.4998 35.8041Z"
      :fill="gradientUrl('paint3')"
    />
    <defs>
      <radialGradient
        :id="gradientId('paint0')"
        cx="0"
        cy="0"
        r="1"
        gradientTransform="matrix(22.3635 -34.2 -10.0339 98.4168 5.57613 45.45)"
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
        gradientTransform="matrix(22.3635 -34.2 -10.0339 98.4168 5.57613 45.45)"
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
        gradientTransform="matrix(22.3635 -34.2 -10.0339 98.4168 5.57613 45.45)"
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
        gradientTransform="matrix(22.3635 -34.2 -10.0339 98.4168 5.57613 45.45)"
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
const instanceId = `unlimited-context-icon-${Math.random().toString(36).slice(2, 9)}`;
const gradientId = (suffix: string) => `${instanceId}-${suffix}`;
const gradientUrl = (suffix: string) => `url(#${gradientId(suffix)})`;
</script>


