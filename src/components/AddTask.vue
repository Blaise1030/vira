
<template>
  <v-btn color="primary" class="tracking-tight" @click="showModal = true">
    Create
  </v-btn>
  <v-overlay
    class="justify-center items-end md:items-center overflow-y-scroll"
    transition="scroll-y-reverse-transition"
    v-model="showModal"
    @click:outside="closeModal"
  >
    <v-card
      class="max-w-3xl w-screen rounded-b-none md:rounded max-h-[90vh] overflow-y-auto"
      @scroll="
        scrollPosition = [
          $event.target.scrollTop !== 0,
          $event.target.scrollTop !==
            $event.target.scrollHeight - $event.target.clientHeight,
        ]
      "
    >
      <v-card-title
        class="sticky top-0 left-0 z-20 bg-inherit p-4 px-6"
        :class="{ 'border-b': scrollPosition[0] }"
        >Create Task</v-card-title
      >
      <v-form @submit.prevent="onSubmit" ref="formRef">
        <v-card-text class="grid grid-cols-2 pt-2 gap-4 px-6">
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
          <v-divider
            :thickness="1"
            class="border-opacity-100 col-span-2"
          ></v-divider>
          <div class="flex flex-col space-y-2 col-span-2 md:col-span-1">
            <p class="text-xs text-gray-500 font-semibold">Board</p>
            <v-select
              :items="store.board.map((b) => ({ id: b.id, board: b.title }))"
              :rules="formValidation.board"
              v-model="formFields.board"
              hint="This is the task's initial board upon creation."
              placeholder="Select a board"
              variant="solo-filled"
              density="compact"
              single-line
              persistent-hint
              item-title="board"
              item-value="id"
            ></v-select>
          </div>
          <div class="flex flex-col space-y-2 col-span-2">
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
          <div class="flex flex-col space-y-2 col-span-2">
            <p class="text-xs text-gray-500 font-semibold">Task Description</p>
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
          <div class="flex flex-col space-y-2 col-span-2 md:col-span-1">
            <p class="text-xs text-gray-500 font-semibold">Target Due Date</p>
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
                  :model-value="formFields.taskCompletionDate"
                  @update:model-value="updateDate($event)"
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
          <div class="flex flex-col space-y-2 col-span-2 mb-4">
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
        </v-card-text>
        <v-card-actions
          class="justify-end p-6 sticky bottom-0 left-0 z-20 bg-white px-6"
          :class="{ 'border-t': scrollPosition[1] }"
        >
          <v-btn class="tracking-tight" variant="text" @click="closeModal"
            >Cancel</v-btn
          >
          <v-btn
            class="tracking-tight"
            variant="flat"
            color="primary"
            type="submit"
            >Save</v-btn
          >
        </v-card-actions>
      </v-form>
    </v-card>
  </v-overlay>
</template>


<script setup lang="ts">
import { useAppStore } from "../store/app";
// @ts-ignore
import FileUploader from "./FileUploader.vue";
import dayjs from "dayjs";
import { ref } from "vue";
const showModal = ref(false);
const formRef = ref(null);
const store = useAppStore();
const dateOpen = ref(false);
const scrollPosition = ref([false, false]);

const defaultFormValue = {
  taskCompletionDate: [new Date()],
  taskDescription: "",
  taskFiles: [],
  taskTitle: "",
  taskType: [],
  board: "",
};

const isRequired = (value: any) => {
  if (value) return true;
  return "Field Is Required";
};

const formFields = ref(defaultFormValue);
const formValidation = {
  taskCompletionDate: [isRequired],
  taskType: [isRequired],
  board: [isRequired],
  taskTitle: [isRequired],
  taskDescription: [],
  taskFiles: [],
};

function closeModal() {
  showModal.value = false;
  (formRef.value as any).reset();
  formFields.value = {
    taskType: [],
    board: "",
    taskTitle: "",
    taskDescription: "",
    taskCompletionDate: [new Date()],
    taskFiles: [],
  };
}

function updateDate(event: any) {
  formFields.value.taskCompletionDate = [event];
}

async function onSubmit(e: any) {
  if (!(await e).valid) return;
  store.addTasks({
    targetDate: formFields.value.taskCompletionDate[0].toJSON(),
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

