<template>
  <v-card
    class="bg-white mb-3 cursor-grab active:cursor-grabbing"
    @click="$emit('click', $event)"
    elevation="1"
    :class="{
      'opacity-30': !highlight,
      hidden: hideCard,
    }"
  >
    <v-img v-if="Boolean(media)" :src="media" height="120px" cover></v-img>
    <div class="flex flex-col space-y-1 p-3">
      <p class="text-sm font-semibold">{{ title }}</p>
      <p class="text-no-wrap text-sm text-truncate text-gray-400">
        {{ description }}
      </p>
      <div class="flex flex-wrap flex-row space-x-1">
        <div v-for="(label, index) in labels" :key="index">
          <v-chip
            size="x-small"
            :color="label.color"
            text-color="white"
            variant="flat"
            label
          >
            {{ label.title }}</v-chip
          >
        </div>
      </div>

      <div class="flex flex-row space-x-2 items-center pt-1">
        <p class="text-xs font-semibold text-gray-400">{{ id }}</p>
        <v-avatar
          icon="$vuetify"
          color="primary"
          class="ml-auto"
          size="small"
        ></v-avatar>
      </div>
    </div>
  </v-card>
</template>

<script lang="ts" setup>
defineProps({
  labels: {
    type: Array<{ id: string; title: string; color: string }>,
    required: true,
  },
  highlight: Boolean,
  hideCard: Boolean,
  description: String,
  title: String,
  media: String,
  id: String,
});

defineEmits(["click"]);
</script>