<template>
  <v-sheet
    class="bg-grey-lighten-4 overflow-auto space-y-2 w-[300px] hide-scrollbar cursor-grab active:cursor-grabbing h-full"
    rounded="lg"
  >
    <div
      class="flex flex-row justify-between items-center text-sm font-semibold text-grey sticky top-0 left-0 z-10 bg-grey-lighten-4 px-4 pt-4 pb-2"
    >
      <p class="uppercase">{{ title }} {{ store.getTasks(boardId)?.length }}</p>
      <v-menu v-if="props.boardId !== 'DONE'" transition="slide-y-transition">
        <template v-slot:activator="{ props }">
          <v-btn
            icon="mdi-dots-vertical"
            size="x-small"
            variant="flat"
            rounded="sm"
            color="gray"
            v-bind="props"
          />
        </template>
        <v-list
          @click:select="
            ({ id }) => (id === 2 ? deleteBoard(props.boardId) : '')
          "
          class="min-w-[150px] mt-2"
          density="compact"
          item-title="name"
          item-value="id"
          lines="one"
          :items="[
            { id: 1, name: 'New Task' },
            { id: 2, name: 'Delete Board' },
          ]"
        />
      </v-menu>
      <div v-else class="h-8"></div>
    </div>
    <div class="flex flex-col px-3 pb-4 h-full">
      <draggable
        class="h-full pb-4"
        :list="store.getTasks(boardId)"
        group="tasks"
        itemKey="id"
        :animation="300"
        ghostClass="ghost"
      >
        <template #item="{ element }">
          <task-card
            @click="$router.push({ path: '/', query: { task: element.id } })"
            :highlight="store.getHighlightCards.includes(element.id)"
            :hideCard="store.getHideCards.includes(element.id)"
            :description="element.description"
            :title="element.title"
            :id="element.id"
            :media="
              element?.media?.filter(({ fileType }) =>
                fileType.includes('image')
              )[0]?.fileUrl || ''
            "
            :labels="
              store?.taskCategories?.filter(({ id }) =>
                element.category.includes(id)
              )
            "
          />
        </template>
        <div class="h-4" />
      </draggable>
    </div>
  </v-sheet>
</template>


<script setup lang="ts" >
//@ts-ignore
import TaskCard from "./TaskCard.vue";
//@ts-ignore
import draggable from "vuedraggable";
import { useAppStore } from "@/store/app";

const props = defineProps({
  title: String,
  boardId: {
    type: String,
    required: true,
  },
});

const store = useAppStore();
const deleteBoard = store.removeBoard;
</script>

<style scoped>
.ghost {
  opacity: 0;
}
</style>