"use strict";

module.exports = (app) => {
  // 用户
  const { router, controller } = app;
  router.resources("user", "/user", controller.user);
};
