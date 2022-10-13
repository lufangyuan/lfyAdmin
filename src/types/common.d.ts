/**
 * 弹窗类型
 */
export interface Dialog {
  title: string;
  visible: boolean;
}

/**
 * 通用组件选择项类型
 */
export interface Option {
  value: string;
  label: string;
  checked?: boolean;
  children?: Option[];
}

declare module "path-to-regexp" {
  export function compile(path: string): (params: any) => string;
}
