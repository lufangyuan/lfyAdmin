import request from "@/utils/request";
export function testApi() {
  return request({
    url: "/qm/login/login.php",
    method: "post",
  });
}
