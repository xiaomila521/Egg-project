"use strict";

module.exports = (app) => {
  const { validator } = app;
  // 自定义校验规则
  validator.addRule("username", (rule, value) => {
    if (value.length == 0) {
      return "用户名不能为空";
    }
    if (value.length < 2 || value.length > 10) {
      return "用户名的长度应该在2-10之间";
    }
  });
  validator.addRule("password", (rule, value) => {
    if (value.length == 0) {
      return "密码不能为空";
    }
    if (value.length < 6 || value.length > 20) {
      return "密码的长度应该在6-20之间";
    }
  });
};
