<template>
  <div
    class="border-b flex flex-row px-6 sticky items-center top-0 left-0 h-16 md:h-20 justify-between"
  >
    <div class="flex md:flex-row space-x-4 items-center">
      <v-icon
        icon="$vuetify"
        color="primary"
        size="large"
        class="mr-2"
      ></v-icon>
      <v-text-field
        v-model="store.boardSearchState"
        class="w-[300px] md:block hidden"
        variant="solo-filled"
        label="Search Tasks"
        density="compact"
        single-line
        hide-details
        clearable
      />
      <!-- </v-sheet> -->
      <div class="hidden md:flex flex-row space-x-2">
        <v-menu :close-on-content-click="false" transition="slide-y-transition">
          <template v-slot:activator="{ props }">
            <v-btn
              append-icon="mdi-chevron-down"
              class="tracking-tight"
              v-bind="props"
            >
              Status
            </v-btn>
          </template>
          <v-list density="compact" class="min-w-[150px] mt-2" lines="one">
            <v-list-item
              v-for="(item, index) in categories"
              density="compact"
              class="flex flex-row"
              :key="index"
            >
              <v-checkbox density="compact" color="primary" hide-details>
                <template v-slot:label>
                  <p class="ml-2">{{ item.title }}</p>
                </template>
              </v-checkbox>
            </v-list-item>
          </v-list>
        </v-menu>
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
          <v-list density="compact" class="min-w-[150px] mt-2" lines="one">
            <v-list-item
              v-for="(item, index) in categories"
              density="compact"
              :key="index"
            >
              <v-checkbox
                :label="`${item.title}`"
                density="compact"
                color="primary"
                hide-details
              ></v-checkbox>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <add-task></add-task>
    </div>
    <v-avatar icon="$vuetify" color="primary"></v-avatar>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from "@/store/app";
//@ts-ignore
import AddTask from "./AddTask.vue";
import { ref } from "vue";
const store = useAppStore();

const categories = ref([
  { id: "1", title: "Bug" },
  { id: "1", title: "Features" },
  { id: "1", title: "Bug" },
]);
</script>