<template>
  <section class="app-main">
    <router-view v-slot="{ Component, route }">
      <transition name="router-fade" mode="out-in">
        <keep-alive :include="cachedViews">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
      </transition>
    </router-view>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import useStore from "@/store";

const { tagsView } = useStore();

const cachedViews = computed(() => tagsView.cachedViews);
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header + .app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header + .app-main {
    padding-top: 84px;
  }
}
</style>

<!-- <style lang="scss">
// 开启后，当右侧有滚动条并有el-dialog弹窗时，固定头部的部分宽度保持不变
// 但是，当右侧没有滚动条时，固定头部的部分宽度会变小
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style> -->
