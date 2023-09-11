<template>
  <div class="flex flex-col space-y-2 mt-6">
    <div class="flex flex-col space-y-2">
      <p class="text-xs text-gray-500 font-semibold">Activity</p>
      <div class="w-full flex items-center space-x-2">
        <v-icon
          icon="$vuetify"
          color="primary"
          size="large"
          class="mx-2"
        ></v-icon>
        <v-text-field
          v-model="comments"
          placeholder="Add a comment"
          label="Add a comment"
          density="compact"
          single-line
          color="primary"
          variant="solo-filled"
          hide-details
        />
      </div>
      <div class="w-full flex justify-end">
        <v-btn
          v-if="comments.length > 0"
          class="tracking-tight min-w-[80px] ml-auto"
          @click="submitComments"
          variant="flat"
          color="primary"
        >
          Save
        </v-btn>
      </div>
    </div>
    <v-card
      v-for="c in store.getComments(viraID)"
      :key="c.id"
      elevation="0"
      class="flex flex-col space-y-2"
    >
      <div class="flex flex-row space-x-2 items-center">
        <v-icon
          icon="$vuetify"
          color="primary"
          size="large"
          class="mx-2"
        ></v-icon>
        <div class="flex flex-col space-y-2">
          <p class="text-xs text-gray-500 font-semibold">
            {{ dayjs(c.date).format("DD MMMM YYYY - hh:mma") }}
          </p>
          <p class="">{{ c.title }}</p>
        </div>
        <div class="ml-auto">
          <v-menu transition="slide-y-transition">
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
              :items="[{ id: 2, name: 'Delete Task' }]"
              class="min-w-[150px] mt-2"
              @click:select="store.removeComments(c.id)"
              density="compact"
              item-title="name"
              item-value="id"
              lines="one"
            />
          </v-menu>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import { useCommentsStore } from "../store/comments";
import { ref } from "vue";
import dayjs from "dayjs";
const props = defineProps({ viraID: String });
const comments = ref("");

const submitComments = () => {
  store.addComments({
    title: comments.value,
    viraID: props.viraID,
    date: "",
  });
  comments.value = "";
};

const store = useCommentsStore();
</script>
