import { defineStore } from "pinia";
import { LoginFormData } from "@/types/api/system/login";
import { UserState } from "@/types/store/user";

import { localStorage } from "@/utils/storage";
import { login, logout } from "@/api/login";
import { getUserInfo } from "@/api/system/user";

const useUserStore = defineStore({
  id: "user",
  state: (): UserState => ({
    token: localStorage.get("token") || "",
    nickname: "",
    avatar: "",
    id: 0,
  }),
  actions: {
    /**
     * 登录
     */
    login(loginData: LoginFormData) {
      const { username, password } = loginData;
      return new Promise((resolve, reject) => {
        login({
          username: username?.trim(),
          password: password,
          type: "account",
        })
          .then((response: { data: { access_token: any } }) => {
            const { access_token } = response.data;
            localStorage.set("token", access_token);
            this.token = access_token;
            resolve(access_token);
          })
          .catch((error: any) => {
            reject(error);
          });
      });
    },
    /**
     *  获取用户信息（昵称、头像）
     */
    getUserInfo() {
      return new Promise((resolve, reject) => {
        getUserInfo()
          .then(({ data }) => {
            if (!data) {
              return reject("认证失败，请重新登录");
            }
            const { nickname, avatar } = data;
            this.nickname = nickname;
            this.avatar = avatar;
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    /**
     *  注销
     */
    logout() {
      return new Promise((resolve, reject) => {
        logout({
          id: this.id,
        })
          .then(() => {
            localStorage.remove("token");
            this.$reset();
            resolve(null);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    /**
     * 清除 Token
     */
    resetToken() {
      return new Promise((resolve) => {
        localStorage.remove("token");
        this.$reset();
        resolve(null);
      });
    },
  },
});

export default useUserStore;
