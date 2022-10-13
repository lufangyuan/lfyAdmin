import {
  LoginFormData,
  LoginResponseData,
  LogoutFormData,
} from "@/types/api/system/login";
import request from "@/utils/request";
import { AxiosPromise } from "axios";

/**
 * 登录
 * @param data
 */
export function login(data: LoginFormData): any {
  return new Promise((resolve) => {
    const res: LoginResponseData = {
      data: {
        access_token: data.username as string,
      },
    };
    setTimeout(() => {
      resolve(res);
    }, 1000);
  });
}
//实际请用下方
//export function login(data: LoginFormData): AxiosPromise<LoginResponseData> {
// return request({
//   url: "/qm/login/login.php",
//   method: "post",
//   params: data,
// });
//}

/**
 * 注销
 */
export function logout(data: LogoutFormData) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
  // return request({
  //   url: "/qm/login/logout.php",
  //   method: "post",
  //   data: data,
  // });
}
