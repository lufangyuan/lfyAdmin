import request from "@/utils/request";
import { AxiosPromise } from "axios";
import { UserInfo } from "@/types/api/system/user";

/**
 * 登录成功后获取用户信息（昵称、头像、权限集合和角色集合）
 */
export function getUserInfo(): AxiosPromise<UserInfo> {
  return request({
    url: "/qm/login/getUserInfo.php",
    method: "post",
  });
}
