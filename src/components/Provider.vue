<script lang="ts" setup>
import { StarIcon } from "@heroicons/vue/24/solid";

const props = defineProps({
  name: {
    type: String,
    required: false,
    default: "aa",
  },
  image: {
    type: String,
    required: false,
  },
});
</script>
<template>
  <div
    class="flex flex-row justify-between items-center p-2 hover:bg-gray-400 hover:text-white"
  >
    <div class="flex flex-row gap-3 items-center">
      <img class="w-10 h-10" :src="props.image" loading="lazy" />
      <p class="font-semibold">
        {{ props.name }}
      </p>
    </div>
    <div>
      <StarIcon class="w-8 h-8 text-gray-400" />
    </div>
  </div>
  <hr />
</template>
