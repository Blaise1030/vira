<template>
  <v-menu :close-on-content-click="false" transition="slide-y-transition">
    <template v-slot:activator="{ props }">
      <v-btn
        append-icon="mdi-chevron-down"
        class="tracking-tight"
        v-bind="props"
      >
        Task Type
      </v-btn>
    </template>
    <v-list class="min-w-[300px] mt-2" density="compact" lines="one">
      <v-list-item
        v-for="(item, index) in store.taskCategories"
        density="compact"
        class="flex flex-row"
        :key="index"
      >
        <v-checkbox
          v-model="store.boardSearchCategoryState"
          density="compact"
          :value="item.id"
          color="primary"
          hide-details
        >
          <template v-slot:label>
            <p class="ml-2">{{ item.title }}</p>
          </template>
        </v-checkbox>
      </v-list-item>
      <v-list-item class="flex flex-row items-end justify-end w-full">
        <v-btn
          class="tracking-tighter text-black"
          @click="store.boardSearchCategoryState = []"
          color="grey-lighten-4"
          variant="flat"
        >
          Clear Filter
        </v-btn>
      </v-list-item>
    </v-list>
  </v-menu>
</template>


<script setup lang="ts">
import { useAppStore } from "@/store/app";
const store = useAppStore();
</script>