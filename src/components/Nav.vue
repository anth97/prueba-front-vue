<script lang="ts" setup>
import { ArrowLeftIcon } from '@heroicons/vue/24/solid'

const props = defineProps({
  title: {
    type: String,
    required: false,
    default: "Hola mundo",
  },
});

function goBack() {
  window.history.back();
}
</script>



<template>
  <div class="h-20 bg-header rounded-b-xl text-white text-3xl flex items-center p-5 justify-between">
    <ArrowLeftIcon @click="goBack()" class="h-8 w-8 text-white hover:cursor-pointer" />
    <h1>{{ props.title}}</h1>
    <p></p>
  </div>
</template>
