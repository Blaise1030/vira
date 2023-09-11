<template>
  <v-menu :close-on-content-click="false" transition="slide-y-transition">
    <template v-slot:activator="{ props }">
      <v-btn
        append-icon="mdi-chevron-down"
        class="tracking-tight"
        v-bind="props"
      >
        Date
      </v-btn>
    </template>
    <v-card class="py-2 pb-4 overflow-hidden w-fit my-2">
      <v-date-picker
        :model-value="store.boardSearchDateState.map((a) => new Date(a))"
        @update:model-value="store.setDateRange($event)"
        color="primary"
        class="m-auto"
        elevation="0"
        hide-actions
        rounded="sm"
        landscape
        multiple
      ></v-date-picker>
      <div class="flex flex-row justify-end pr-4">
        <v-btn
          class="tracking-tighter text-black"
          @click="store.setDateRange([])"
          color="grey-lighten-4"
          variant="flat"
        >
          Clear Filter
        </v-btn>
      </div>
    </v-card>
  </v-menu>
</template>


<script setup lang="ts">
import { useAppStore } from "../store/app";
const store = useAppStore();
</script>