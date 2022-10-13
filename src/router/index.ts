import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
NProgress.configure({ showSpinner: true }); // 进度环显示/隐藏
import useStore from "@/store";

const Layout = () => import("@/layout/index.vue");
export const routes: Array<RouteRecordRaw> = [
  /*
   * meta: {
   * title: 菜单、面包屑、tagview标题
   * icon: 菜单图标
   * hidden: 是否在菜单中隐藏
   * affix: 是否在tagview中固定
   * keepAlive: 是否在<keep-alive>中缓存
   *  使用缓存时，需要在组件中添加name属性，且name属性必须和路由name属性一致
   *  比如：<script setup lang="ts" name="atomicService">
   * }
   */
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    meta: { hidden: true, title: "页面不存在！" },
    component: () => import("@/views/404/404.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index.vue"),
    meta: { hidden: true, title: "登录-场景引擎管理系统" },
  },
  {
    path: "/redirect",
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/components/Redirect/index.vue"),
      },
    ],
  },
  {
    path: "/",
    component: Layout,
    redirect: "/car-model",
    children: [
      {
        path: "car-model",
        component: () => import("@/views/car-model/index.vue"),
        name: "carModel",
        meta: {
          title: "车型管理",
          icon: "homepage",
          affix: true,
          keepAlive: true,
        },
      },
    ],
  },
  {
    path: "/atomic-service",
    component: Layout,
    children: [
      {
        path: "/atomic-service",
        component: () => import("@/views/atomic-service/index.vue"),
        name: "atomicService",
        meta: {
          title: "原子级服务及接口管理",
          icon: "homepage",
          keepAlive: true,
        },
      },
    ],
  },
  {
    path: "/scene-interface",
    component: Layout,
    redirect: "/scene-interface/condition",
    name: "sceneInterface",
    meta: { title: "场景接口配置", icon: "nested" },
    children: [
      {
        path: "condition",
        component: () => import("@/views/scene-interface/condition/index.vue"),
        name: "condition",
        meta: {
          title: "条件级场景接口参数配置",
          icon: "nested",
          keepAlive: true,
        },
      },
      {
        path: "implement",
        component: () => import("@/views/scene-interface/implement/index.vue"),
        name: "implement",
        meta: {
          title: "执行级场景接口参数配置",
          icon: "nested",
          keepAlive: true,
        },
      },
    ],
  },
  {
    path: "/scene-manage",
    component: Layout,
    redirect: "/scene-manage/custom-scene",
    name: "sceneManage",
    meta: { title: "场景管理", icon: "nested" },
    children: [
      {
        path: "custom-scene",
        component: () => import("@/views/scene-manage/custom-scene/index.vue"),
        name: "customScene",
        meta: { title: "用户场景汇总", icon: "nested", keepAlive: true },
      },
      {
        path: "scene-query",
        component: () => import("@/views/scene-manage/scene-query/index.vue"),
        name: "sceneQuery",
        meta: { title: "场景查询", icon: "nested", keepAlive: true },
      },
    ],
  },
  {
    path: "/icon-manage",
    component: Layout,
    children: [
      {
        path: "/icon-manage",
        component: () => import("@/views/icon-manage/index.vue"),
        name: "iconManage",
        meta: { title: "图标管理", icon: "homepage", keepAlive: true },
      },
    ],
  },
  {
    path: "/scene-template",
    component: Layout,
    children: [
      {
        path: "/scene-template",
        component: () => import("@/views/scene-template/index.vue"),
        name: "sceneTemplate",
        meta: { title: "场景模板管理", icon: "homepage", keepAlive: true },
      },
    ],
  },
  // 外部链接
  // {
  //   path: "/external-link",
  //   component: Layout,
  //   children: [
  //     {
  //       path: "https://www.linlangxiazi.com/",
  //       meta: { title: "外部链接", icon: "link" },
  //       redirect: "https://www.linlangxiazi.com/",
  //     },
  //   ],
  // },
];

// 创建路由
const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_BASE_URL),
  routes: routes as RouteRecordRaw[],
});

//前置守卫
const whiteList = ["/login"]; //白名单路由
router.beforeEach(async (to, from, next) => {
  NProgress.start();
  const { user } = useStore();
  const hasToken = user.token;
  if (hasToken) {
    // 登录成功，跳转到首页
    if (to.path === "/login") {
      next({ path: "/" });
      NProgress.done();
    } else {
      const hasGetUserInfo = user.nickname.length > 0;
      if (hasGetUserInfo) {
        if (to.matched.length === 0) {
          from.name ? next({ name: from.name as any }) : next("/404");
        } else {
          next();
        }
      } else {
        try {
          await user.getUserInfo();
          next({ ...to, replace: true });
        } catch (error) {
          // 移除 token 并跳转登录页
          await user.resetToken();
          ElMessage.error((error as any) || "登录信息失效，请重新登录");
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      }
    }
  } else {
    // 未登录可以访问白名单页面(登录页面)
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
