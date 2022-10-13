import request from "@/utils/request";
import { AxiosPromise } from "axios";
import { UserInfo } from "@/types/api/system/user";
import { localStorage } from "@/utils/storage";
/**
 * 登录成功后获取用户信息（昵称、头像、权限集合和角色集合）
 */
// export function getUserInfo(): AxiosPromise<UserInfo> {
//   return request({
//     url: "/qm/login/getUserInfo.php",
//     method: "post",
//   });
// }

export function getUserInfo(): any {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        data: {
          nickname: localStorage.get("token"),
          avatar:
            "https://www.linlangxiazi.com/lfy/src/upload/image/thum/202208312129257057.jpeg",
        },
      });
    }, 1000);
  });
}
