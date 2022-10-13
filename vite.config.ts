import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"; // svg图标
import path from "path";

import VueSetupExtend from "vite-plugin-vue-setup-extend"; // vue3.0 setup语法糖时使用name

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    //根目录
    base: env.VITE_APP_BASE_URL,
    //打包目录
    outDir: "dist",
    plugins: [
      vue(),
      VueSetupExtend(),
      AutoImport({
        imports: ["vue", "vue-router", "vuex"],
        dts: "src/auto-import.d.ts",
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
        dts: "src/components.d.ts",
      }),
      //SVG图标
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        // 指定symbolId格式
        symbolId: "icon-[dir]-[name]",
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        store: "@/store",
        components: "@/components",
      },
    },
    build: {
      // 取消计算文件大小，加快打包速度
      reportCompressedSize: false,
      sourcemap: false,
      assetsDir: "assets",
      rollupOptions: {
        output: {
          chunkFileNames: "js/[name]-[hash].js",
          entryFileNames: "js/[name]-[hash].js",
          assetFileNames: "[ext]/[name]-[hash].[ext]",
        },
      },
    },
    // 本地反向代理解决浏览器跨域限制
    server: {
      host: "0.0.0.0",
      port: Number(env.VITE_APP_PORT),
      open: true, // 运行自动打开浏览器
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: "https://www.linlangxiazi.com", // 代理地址
          changeOrigin: true,
          rewrite: (path) =>
            path.replace(new RegExp("^" + env.VITE_APP_BASE_API), ""),
        },
      },
    },
  };
});
