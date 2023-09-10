<template>
  <v-overlay
    class="justify-center items-end md:items-center overflow-y-scroll"
    transition="scroll-y-reverse-transition"
    v-model="showModal"
    @click:outside="closeModal"
  >
    <v-form @submit.prevent="onSubmit" ref="formRef">
      <v-card
        class="max-w-6xl w-screen rounded-b-none md:rounded max-h-[90vh] overflow-y-auto"
        @scroll="
          scrollPosition = [
            $event.target.scrollTop !== 0,
            $event.target.scrollTop !==
              $event.target.scrollHeight - $event.target.clientHeight,
          ]
        "
      >
        <v-card-title
          class="sticky top-0 left-0 z-20 bg-inherit p-2 py-4 px-6 flex flex-row justify-between items-center"
          :class="{ 'border-b': scrollPosition[0] }"
        >
          <p class="font-strong text-xs text-gray-500">{{ formFields.id }}</p>
          <div class="flex flex-row space-x-2">
            <v-btn class="tracking-tight" variant="text" @click="closeModal"
              >Cancel</v-btn
            >
            <v-btn
              class="tracking-tight"
              variant="flat"
              color="primary"
              type="submit"
              >Update</v-btn
            >
          </div>
        </v-card-title>

        <v-card-text class="grid grid-cols-5 pt-2 pb-5 gap-6 px-6">
          <div class="flex flex-col space-y-1 col-span-5 md:col-span-3">
            <div class="flex flex-col space-y-1 col-span-2">
              <p class="text-xs text-gray-500 font-semibold">Task Title</p>
              <v-text-field
                :rules="formValidation.taskTitle"
                v-model="formFields.taskTitle"
                placeholder="Task Title"
                label="Task Title"
                density="compact"
                single-line
                color="primary"
                variant="solo-filled"
              />
            </div>
            <div class="flex flex-col space-y-1 col-span-2">
              <p class="text-xs text-gray-500 font-semibold">
                Task Description
              </p>
              <v-textarea
                :rules="formValidation.taskDescription"
                v-model="formFields.taskDescription"
                placeholder="Task Description"
                label="Task Description"
                density="compact"
                color="primary"
                variant="solo-filled"
                class="col-span-2"
                single-line
                flat
              ></v-textarea>
            </div>
            <div class="flex flex-col col-span-2">
              <file-uploader
                :value="formFields.taskFiles"
                @remove="
                  formFields.taskFiles = formFields.taskFiles.filter(
                    (f) => f.fileId !== $event
                  )
                "
                @change="
                  formFields.taskFiles = [...formFields.taskFiles, ...$event]
                "
              />
            </div>
          </div>
          <div
            class="flex flex-col space-y-2 col-span-5 md:col-span-2 sticky top-0 right-0"
          >
            <div class="flex flex-col space-y-2">
              <p class="text-xs text-gray-500 font-semibold">Board</p>
              <v-select
                :items="store.board.map((b) => ({ id: b.id, board: b.title }))"
                :rules="formValidation.board"
                v-model="formFields.board"
                placeholder="Select a board"
                variant="solo-filled"
                density="compact"
                class="w-fit"
                single-line
                hide-details
                persistent-hint
                item-title="board"
                item-value="id"
              ></v-select>
            </div>
            <v-card elevation="0" border class="p-4">
              <div class="flex flex-col space-y-2 col-span-2 md:col-span-1">
                <p class="text-xs text-gray-500 font-semibold">Task Type</p>
                <v-combobox
                  :rules="formValidation.taskType"
                  :items="store.taskCategories"
                  v-model="formFields.taskType"
                  placeholder="Task Type"
                  variant="solo-filled"
                  item-title="title"
                  item-value="id"
                  density="compact"
                  color="primary"
                  persistent-hint
                  single-line
                  multiple
                  chips
                  flat
                >
                  <template v-slot:chip="{ item }">
                    <v-chip
                      size="small"
                      :color="item.raw.color"
                      text-color="white"
                      variant="flat"
                      class="mr-1"
                      label
                    >
                      {{ item.raw.title }}</v-chip
                    ></template
                  >
                </v-combobox>
              </div>
              <div class="flex flex-col space-y-2 col-span-2 md:col-span-1">
                <p class="text-xs text-gray-500 font-semibold">
                  Target Due Date
                </p>
                <v-menu
                  v-model="dateOpen"
                  :close-on-content-click="false"
                  location="bottom"
                >
                  <template v-slot:activator="{ props }">
                    <v-text-field
                      v-bind="props"
                      :rules="formValidation.taskCompletionDate"
                      v-model="formFields.taskCompletionDate"
                      placeholder="Target Due Date"
                      variant="solo-filled"
                      density="compact"
                      color="primary"
                      hint="Target completion date"
                      persistent-hint
                      single-line
                      readonly
                    />
                  </template>
                  <v-card class="py-2 overflow-hidden w-fit my-2">
                    <v-date-picker
                      v-model="formFields.taskCompletionDate"
                      :min="dayjs().subtract(1, 'day').toDate()"
                      color="primary"
                      class="m-auto"
                      elevation="0"
                      hide-actions
                      rounded="sm"
                    ></v-date-picker>
                  </v-card>
                </v-menu>
              </div>
            </v-card>
          </div>
        </v-card-text>
        <v-card-actions
          class="p-4 border-t grid col-span-5 md:grid-cols-5 gap-4"
        >
          <div class="flex flex-row w-full col-span-3 space-x-2 items-center">
            <v-text-field
              placeholder="Add Comment"
              label="Add Comment"
              density="compact"
              single-line
              color="primary"
              variant="solo-filled"
              class="w-full flex-1"
              hide-details
            />
            <div>
              <v-btn
                class="tracking-tight"
                variant="flat"
                color="primary"
                type="submit"
                >Save</v-btn
              >
            </div>
          </div>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-overlay>
</template>

<script setup lang="ts">
import { useAppStore } from "@/store/app";
// @ts-ignore
import FileUploader from "./FileUploader.vue";
import dayjs from "dayjs";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const showModal = computed(() => Boolean(route.query.task));
const router = useRouter();
const route = useRoute();

const scrollPosition = ref([false, false]);
const store = useAppStore();
const dateOpen = ref(false);
const formRef = ref(null);

const isRequired = (value: any) => {
  if (value) return true;
  return "Field Is Required";
};

const task = store.getTask((route.query.task as string) || "");

const formValidation = {
  taskCompletionDate: [isRequired],
  taskType: [isRequired],
  board: [isRequired],
  taskTitle: [isRequired],
  taskDescription: [],
  taskFiles: [],
};
const formFields = ref({
  taskCompletionDate: new Date(),
  taskDescription: "",
  taskType: [],
  taskTitle: "",
  taskFiles: [],
  board: "",
  id: "",
});

function handleRouteChange() {
  if (!route.query.task) return;
  const items = store.getTask((route.query.task as string) || "");
  formFields.value = {
    id: items.id,
    taskCompletionDate: new Date(items.targetDate),
    taskDescription: items.description,
    taskTitle: items.title,
    taskFiles: items.media,
    board: items.boardId,
    taskType: store.taskCategories.filter(({ id }) =>
      items.category.includes(id)
    ),
  };
}

onMounted(handleRouteChange);
watch(() => route.fullPath, handleRouteChange);
const closeModal = () => router.push("/");

async function onSubmit(e: any) {
  if (!(await e).valid) return;
  store.updateTasks({
    id: route.query.task as string,
    targetDate: new Date(formFields.value.taskCompletionDate).toJSON(),
    category: formFields.value.taskType.map((t: any) => t.id),
    description: formFields.value.taskDescription,
    title: formFields.value.taskTitle,
    boardId: formFields.value.board,
    media: formFields.value.taskFiles as {
      fileUrl: string;
      fileName: string;
      fileType: string;
      fileId: string;
    }[],
  });
  closeModal();
}
</script>

