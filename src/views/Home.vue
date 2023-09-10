<template>
  <v-app class="h-screen w-screen relative">
    <task-navbar></task-navbar>
    <v-progress-linear
      :model-value="store.getProgress"
      color="primary"
      height="6"
    ></v-progress-linear>
    <v-container class="h-100 overflow-x-auto overflow-y-hidden pr-2" fluid>
      <div class="flex flex-row h-100 space-x-2 w-fit pr-4">
        <draggable
          class="flex flex-row space-x-2 h-100"
          :list="store.board"
          group="items"
          itemKey="id"
          :animation="300"
          ghostClass="ghost"
        >
          <template #item="{ element }">
            <task-board
              :board-id="element.id"
              :title="element.title"
              :key="element.id"
            ></task-board>
          </template>
        </draggable>
        <add-task-board></add-task-board>
      </div>
    </v-container>
  </v-app>
</template>

<script lang="ts" setup>
//@ts-ignore
import draggable from "vuedraggable";
//@ts-ignore
import TaskBoard from "@/components/TaskBoard.vue";
//@ts-ignore
import AddTaskBoard from "@/components/AddTaskBoard.vue";
//@ts-ignore
import TaskNavbar from "@/components/TaskNavbar.vue";
import { useAppStore } from "@/store/app";

const store = useAppStore();
</script>

<style scoped>
.ghost {
  opacity: 0;
}
</style>
