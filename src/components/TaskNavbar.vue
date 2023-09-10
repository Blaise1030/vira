<template>
  <div
    class="flex flex-row pl-4 pr-4 md:pl-6 md:pr-6 sticky items-center top-0 left-0 h-16 md:h-20 justify-between"
  >
    <div class="flex md:flex-row space-x-4 items-center">
      <v-icon
        icon="$vuetify"
        color="primary"
        size="large"
        class="mr-2"
      ></v-icon>
      <div class="md:block hidden">
        <title-filter />
      </div>
      <div class="hidden md:flex flex-row space-x-2">
        <status-filter />
        <date-range-filter />
      </div>
    </div>
    <div class="flex flex-row space-x-4">
      <v-btn
        class="md:hidden block"
        color="primary"
        size="small"
        variant="text"
        icon="mdi-filter"
        @click="showModal = true"
      />
      <add-task></add-task>
    </div>
  </div>
  <v-overlay
    class="justify-center items-start overflow-y-scroll"
    transition="scroll-y-transition"
    v-model="showModal"
  >
    <v-card class="w-screen rounded-t-none flex flex-col space-y-2 p-1 px-4">
      <div class="flex flex-row items-center space-x-2">
        <title-filter />
      </div>
      <div class="flex-row space-x-2 flex">
        <v-card variant="flat" color="grey-lighten-4">
          <status-filter />
        </v-card>
        <v-card variant="flat" color="grey-lighten-4">
          <date-range-filter />
        </v-card>
      </div>
    </v-card>
  </v-overlay>
</template>

<script setup lang="ts">
//@ts-ignore
import AddTask from "./AddTask.vue";
//@ts-ignore
import StatusFilter from "./StatusFilter.vue";
//@ts-ignore
import DateRangeFilter from "./DateRangeFilter.vue";
//@ts-ignore
import TitleFilter from "./TitleFilter.vue";
import { ref } from "vue";

const showModal = ref(false);
</script>