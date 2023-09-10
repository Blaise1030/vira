<template>
  <div class="flex flex-col space-y-2 w-full">
    <input
      @change="onAddedFile($event)"
      class="h-0 w-0 overflow-hidden opacity-0"
      ref="fileRef"
      type="file"
      id="file"
    />
    <div class="flex flex-row justify-between w-full items-center">
      <p class="text-xs text-gray-500 font-semibold mb-1">Attachments</p>
    </div>
    <div class="grid md:grid-cols-5 grid-cols-3 gap-2">
      <v-card
        class="aspect-square group"
        v-for="(f, i) in value"
        :key="i"
        border
      >
        <v-btn
          class="absolute top-1 right-1 z-20 hidden group-hover:block text-xs"
          @click="onRemoveFile(f.fileId)"
          icon="mdi-delete"
          rounded="sm"
          color="red"
          size="sm"
        />
        <v-img
          v-if="f.fileType.includes('image')"
          :src="f.fileUrl"
          height="100%"
          cover
        ></v-img>
        <v-card-text
          class="text-gray-500 flex flex-col justify-center h-full text-center"
          v-else
        >
          {{ f.fileName }}
        </v-card-text>
      </v-card>
      <v-card
        class="aspect-square flex items-center justify-center"
        @click="fileRef.click()"
        variant="flat"
        border
      >
        <v-icon size="large">mdi-plus</v-icon>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(["change", "remove"]);
import { ref } from "vue";
const fileRef = ref();

defineProps({
  value: {
    required: true,
    type: Array<{
      fileUrl: string;
      fileName: string;
      fileType: string;
      fileId: string;
    }>,
  },
});

function onRemoveFile(fileId: string) {
  emit("remove", fileId);
}

function onAddedFile(event: Event) {
  const files = (event.target as HTMLInputElement).files;
  if (files.length > 0) {
    let f = [];
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      f.push({
        fileUrl: URL.createObjectURL(file),
        fileId: new Date().toJSON(),
        fileName: file.name,
        fileType: file.type,
      });
    }
    emit("change", f);
    fileRef.value.value = "";
  }
}
</script>
