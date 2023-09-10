
<template>
  <v-btn color="primary" class="tracking-tight" @click="showModal = true">
    Create
  </v-btn>
  <v-overlay
    class="justify-center items-end md:items-center"
    transition="scroll-y-reverse-transition"
    v-model="showModal"
    @click:outside="closeModal"
  >
    <v-card class="max-w-4xl w-screen rounded-b-none md:rounded p-2">
      <v-card-title>Create Task</v-card-title>
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
        </v-card-text>

        <v-card-actions class="justify-end p-4">
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

const defaultFormValue = {
  taskType: "",
  board: "",
  taskTitle: "",
  taskDescription: "",
};

const isRequired = (value: any) => {
  if (value) return true;
  return "Field Is Required";
};

const formValidation = {
  taskType: [isRequired],
  board: [isRequired],
  taskTitle: [isRequired],
  taskDescription: [isRequired],
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
    description: formFields.value.taskDescription,
    category: formFields.value.taskType,
    boardId: formFields.value.board,
    title: formFields.value.taskTitle,
    media: "",
  });
  closeModal();
}
</script>

