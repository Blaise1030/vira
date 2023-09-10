

<template>
  <router-view />
</template>

<script lang="ts" setup>
import { useAppStore } from "./store/app";
import { onMounted, watch } from "vue";

const store = useAppStore();

onMounted(() => {
  store.$state = JSON.parse(localStorage.getItem("piniaState") || "{}");
});

watch(
  store,
  (state) => localStorage.setItem("piniaState", JSON.stringify(state.$state)),
  { deep: true }
);
</script>
