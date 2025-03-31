<template>
  <div>
    <h1>Button Component</h1>
    <UiButton size="size-lg">Button</UiButton>
    <UiButton size="size-md">Button</UiButton>
    <UiButton size="size-sm">Button</UiButton>

    <UiButton size="size-lg" :disabled="true">Button</UiButton>
    <UiButton size="size-md" :disabled="false">Button</UiButton>
    <UiButton size="size-sm" :disabled="true">Button</UiButton>

    <UiButton size="size-lg" :active="true">Button</UiButton>
    <UiButton size="size-md" :active="true">Button</UiButton>
    <UiButton size="size-sm" :active="false">Button</UiButton>
  </div>
</template>

<script setup></script>
