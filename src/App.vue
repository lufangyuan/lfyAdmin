<template>
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
// 导入 Element Plus 语言包
import zhCn from "element-plus/es/locale/lang/zh-cn";
</script>
