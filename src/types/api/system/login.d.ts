/**
 * 登录表单类型声明
 */
export interface LoginFormData {
  type: "account" | "mobile";
  username?: string;
  password?: string;
  mobile?: string;
  captcha?: string;
}

/**
 * 登录响应类型声明
 */
export interface LoginResponseData {
  data: {
    access_token: string;
  };
}

/**
 * 退出登录类型声明
 */
export interface LogoutFormData {
  id: Number;
}
