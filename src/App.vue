

<template>
  <router-view />
</template>

<script lang="ts" setup>
import { useAppStore } from "./store/app";
import { onMounted, watch } from "vue";
import { useCommentsStore } from "./store/comments";

const store = useAppStore();
const commentStore = useCommentsStore();

onMounted(() => {
  store.$state = JSON.parse(localStorage.getItem("piniaState") || "{}");
  commentStore.$state = JSON.parse(localStorage.getItem("comments") || "{}");
});

watch(
  store,
  (store) => localStorage.setItem("piniaState", JSON.stringify(store.$state)),
  { deep: true }
);
watch(
  commentStore,
  (commentStore) => {
    localStorage.setItem("comments", JSON.stringify(commentStore.$state));
  },
  { deep: true }
);
</script>
