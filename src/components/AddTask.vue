
<template>
  <v-btn
    color="primary"
    class="tracking-tight"
    @click="showModal = true"
    prepend-icon="mdi-plus"
  >
    Create Task
  </v-btn>
  <v-overlay
    class="justify-center items-end md:items-center overflow-y-scroll"
    transition="scroll-y-reverse-transition"
    v-model="showModal"
    @click:outside="closeModal"
  >
    <v-card
      class="max-w-4xl w-screen rounded-b-none md:rounded max-h-[90vh] overflow-y-auto"
      @scroll="
        scrollPosition = [
          $event.target.scrollTop !== 0,
          $event.target.scrollTop !==
            $event.target.scrollHeight - $event.target.clientHeight,
        ]
      "
    >
      <v-card-title
        class="sticky top-0 left-0 z-20 bg-inherit p-4"
        :class="{ 'border-b': scrollPosition[0] }"
        >Create Task</v-card-title
      >
      <v-form @submit.prevent="onSubmit" ref="formRef">
        <v-card-text class="grid grid-cols-2 pt-2 gap-4">
          <div class="flex flex-col space-y-2 col-span-2 md:col-span-1">
            <p class="text-xs text-gray-500 font-semibold">Task Type</p>
            <v-select
              :rules="formValidation.taskType"
              v-model="formFields.taskType"
              placeholder="Task Type"
              label="Task Type"
              density="compact"
              :items="store.taskCategories"
              single-line
              variant="solo-filled"
              item-title="title"
              item-value="id"
            ></v-select>
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
          <div class="flex flex-col space-y-2 col-span-2 md:col-span-1 mb-4">
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
                  v-model="formFields.taskCompletionDate"
                  :min="new Date()"
                  color="primary"
                  class="m-auto"
                  elevation="0"
                  hide-actions
                  rounded="sm"
                  landscape
                ></v-date-picker>
              </v-card>
            </v-menu>
          </div>
        </v-card-text>
        <v-card-actions
          class="justify-end p-6 sticky bottom-0 left-0 z-20 bg-white"
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
import { useAppStore } from "@/store/app";
import { ref } from "vue";
const showModal = ref(false);
const formRef = ref(null);
const store = useAppStore();
const dateOpen = ref(false);
const scrollPosition = ref([false, false]);

const defaultFormValue = {
  taskType: "",
  board: "",
  taskTitle: "",
  taskDescription: "",
  taskCompletionDate: "",
};

const isRequired = (value: any) => {
  if (value) return true;
  return "Field Is Required";
};

const formValidation = {
  taskCompletionDate: [isRequired],
  taskType: [isRequired],
  board: [isRequired],
  taskTitle: [isRequired],
  taskDescription: [],
};
const formFields = ref(defaultFormValue);

function closeModal() {
  showModal.value = false;
  (formRef.value as any).reset();
  formFields.value = defaultFormValue;
}

async function onSubmit(e: any) {
  if (!(await e).valid) return;
  store.addTasks({
    targetDate: new Date(formFields.value.taskCompletionDate).toJSON(),
    description: formFields.value.taskDescription,
    category: formFields.value.taskType,
    boardId: formFields.value.board,
    title: formFields.value.taskTitle,
    media: "",
  });
  closeModal();
}
</script>

