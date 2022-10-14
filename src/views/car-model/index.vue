<template>
  <div class="app-container">
    <div class="container">
      <el-button @click="test" :loading="loading">测试网络请求</el-button>
    </div>
  </div>
</template>

<script setup lang="ts" name="carModel">
import { testApi } from "@/api/test";
const loading = ref(false);
const test = (): void => {
  loading.value = true;
  testApi().then((res) => {
    loading.value = false;
    console.log(res);
  });
};
</script>

<style scoped lang="scss"></style>
