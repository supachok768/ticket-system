<template>
  <h2 class="intro-y text-lg font-medium mt-10">
    {{ $route.params.type == "me" ? "My Task" : "Task list" }}
  </h2>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style scoped>
</style>