import request from "@/utils/request";

/**
 *
 * @param {Object} data
 * @returns 登录
 */
export function login(data) {
  return request({
    url: "/login",
    method: "post",
    data,
  });
}

/**
 *
 * @param {String} id
 * @returns 返回单个用户
 */
export function getOneUserInfoAPI(id) {
  return request({
    url: `/user/${id}`,
    method: "get",
  });
}

/**
 *
 * @param {string} id
 * @param {Object} data
 * @returns 更新用户
 */
export function updateOneUserInfoAPI(id, data) {
  return request({
    url: `/user/${id}`,
    method: "put",
    data,
  });
}

/**
 *
 * @param {Object} data
 * @returns 添加用户
 */
export function addUserAPI(data) {
  return request({
    url: "/user",
    method: "post",
    data,
  });
}

/**
 *
 * @returns 获取用户列表
 */
export function getUserListAPI(param = {}) {
  return request({
    url: "/user",
    method: "get",
    params: param,
  });
}

/**
 *
 * @param {String} id
 * @returns 删除用户
 */
export function delUserAPI(id) {
  return request({
    url: `/user/${id}`,
    method: "delete",
  });
}
