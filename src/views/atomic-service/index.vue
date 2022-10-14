<template>
<div class="app-container">
    <div class="container">
      测试页面缓存:{{ c }}
      <el-button type="primary" @click="c++">+</el-button>
    </div>
  </div>
</template>

<script setup lang="ts" name="atomicService">
const c = ref(0);
</script>

<style scoped lang="scss"></style>
