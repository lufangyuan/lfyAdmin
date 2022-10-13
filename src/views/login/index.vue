<template>
  <div class="login-container">
    <el-form
      ref="loginFormRef"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
    >
      <div class="title-container">
        <h3 class="title">登录</h3>
      </div>

      <el-form-item prop="username">
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="用户名"
          tabindex="1"
          :prefix-icon="User"
        />
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          ref="passwordRef"
          v-model="loginForm.password"
          type="password"
          show-password
          :prefix-icon="Lock"
          placeholder="密码"
          tabindex="2"
          @keyup.enter="handleLogin"
        />
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%"
        @click.prevent="handleLogin"
        >登录
      </el-button>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, toRefs, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import useStore from "@/store";
import { LoginFormData } from "@/types/api/system/login";
import { User, Lock } from "@element-plus/icons-vue";
import { ElForm, ElFormItem, ElInput, ElButton } from "element-plus";

const { user } = useStore();
const route = useRoute();
const router = useRouter();

const loginFormRef = ref();
const passwordRef = ref();

const state = reactive({
  redirect: "",
  loginForm: {
    username: "",
    password: "",
  } as LoginFormData,
  loginRules: {
    username: [
      { required: true, trigger: "blur", validator: validateUserName },
    ],
    password: [
      { required: true, trigger: "blur", validator: validatePassword },
    ],
  },
  loading: false,
  otherQuery: {},
});

function validateUserName(rule: any, value: any, callback: any) {
  if (value.length < 2) {
    callback(new Error("用户名不能少于2个字符"));
  } else {
    callback();
  }
}
function validatePassword(rule: any, value: any, callback: any) {
  if (value.length < 6) {
    callback(new Error("密码长度不能小于6位"));
  } else {
    callback();
  }
}

const { loginForm, loginRules, loading } = toRefs(state);

function handleLogin() {
  loginFormRef.value.validate((valid: boolean) => {
    if (valid) {
      state.loading = true;
      user
        .login(state.loginForm)
        .then(() => {
          router.push({ path: state.redirect || "/", query: state.otherQuery });
          state.loading = false;
        })
        .catch(() => {
          state.loading = false;
        });
    } else {
      return false;
    }
  });
}

watch(
  route,
  () => {
    const query = route.query;
    if (query) {
      state.redirect = query.redirect as string;
      state.otherQuery = getOtherQuery(query);
    }
  },
  {
    immediate: true,
  }
);

function getOtherQuery(query: any) {
  return Object.keys(query).reduce((acc: any, cur: any) => {
    if (cur !== "redirect") {
      acc[cur] = query[cur];
    }
    return acc;
  }, {});
}
</script>

<style lang="scss" scoped>
.login-container {
  height: 100%;
  width: 100%;
  background-color: #ececec;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
}
</style>
