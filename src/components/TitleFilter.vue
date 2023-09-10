<template>
  <v-text-field
    v-model="store.boardSearchState"
    class="w-[300px]"
    variant="solo-filled"
    label="Search Tasks"
    density="compact"
    single-line
    hide-details
    clearable
  />
</template>


<script setup lang="ts">
import { useAppStore } from "@/store/app";
const store = useAppStore();
</script>