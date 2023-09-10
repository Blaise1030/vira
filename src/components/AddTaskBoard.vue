<template>
  <v-sheet
    class="h-100 bg-grey-lighten-4 overflow-auto space-y-2 w-[300px]"
    v-if="dialog"
    rounded="lg"
  >
    <v-sheet class="bg-inherit p-2 relative" rounded>
      <form class="flex flex-col space-y-2" @submit.prevent="onSubmit">
        <v-text-field
          placeholder="Board Name"
          v-model="boardName"
          density="compact"
          variant="solo-filled"
          hide-details
          autofocus
        />
        <div class="flex flex-row space-x-2 justify-end">
          <v-btn
            type="submit"
            icon="mdi-check"
            variant="elevated"
            elevation="2"
            rounded="sm"
            size="x-small"
            color="white"
            border
          />
          <v-btn
            @click="dialog = !dialog"
            icon="mdi-close"
            variant="elevated"
            elevation="2"
            rounded="sm"
            size="x-small"
            color="white"
            border
          />
        </div>
      </form>
    </v-sheet>
  </v-sheet>
  <v-btn
    @click="dialog = !dialog"
    v-if="!dialog"
    color="grey-lighten-4"
    icon="mdi-plus"
    variant="flat"
    rounded="lg"
  />
  <div class="w-[300px]" />
</template>

<script lang="ts" setup>
import { useAppStore } from "@/store/app";
import { ref } from "vue";
const dialog = ref(false);
const boardName = ref("");
const store = useAppStore();

function onSubmit() {
  store.addBoard(boardName.value);
  dialog.value = !dialog.value;
  boardName.value = "";
}
</script>