<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { onMounted, watchEffect } from "vue";
import { useI18n } from "vue-i18n";
const { locale } = useI18n();
const setFontFamily = (locale: string) => {
  const body = document.body as HTMLAnchorElement;
  if (body) {
    body.classList.remove("noto-sans-jp");
    body.classList.remove("noto-sans-sc");
    body.classList.remove("noto-sans-en");
    if (locale === "ja-JP") {
      body.classList.add("noto-sans-jp");
    } else if (locale === "zh-CN") {
      body.classList.add("noto-sans-sc");
    } else {
      body.classList.add("noto-sans-en");
    }
  }
};
watchEffect(() => {
  setFontFamily(locale.value);
});
onMounted(() => {
  setFontFamily(locale.value);
});
</script>

<style scoped></style>
