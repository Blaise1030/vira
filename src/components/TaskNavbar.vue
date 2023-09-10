<template>
  <div
    class="border-b flex flex-row px-4 md:px-6 sticky items-center top-0 left-0 h-16 md:h-20 justify-between"
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
          <v-card class="py-2 pb-4 overflow-hidden w-fit my-2">
            <v-date-picker
              :model-value="store.boardSearchDateState.map((a) => new Date(a))"
              @update:model-value="store.setDateRange($event)"
              :min="new Date()"
              color="primary"
              class="m-auto"
              elevation="0"
              hide-actions
              rounded="sm"
              landscape
              multiple
            ></v-date-picker>
            <v-btn
              class="ml-4 tracking-tighter text-black"
              @click="store.setDateRange([])"
              color="grey-lighten-4"
              variant="flat"
            >
              Clear Filter
            </v-btn>
          </v-card>
        </v-menu>
      </div>
    </div>

    <add-task></add-task>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from "@/store/app";
//@ts-ignore
import AddTask from "./AddTask.vue";
import { ref } from "vue";
const store = useAppStore();
import dayjs from "dayjs";

const categories = ref([
  { id: "1", title: "Bug" },
  { id: "1", title: "Features" },
  { id: "1", title: "Bug" },
]);
</script>