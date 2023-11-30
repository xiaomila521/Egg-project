"use strict";
module.exports = (options, app) => {
  return async function verifyToken(ctx, next) {
    let token = ctx.request.header.token;
    if (token == "undefined") {
      token = undefined;
    }
    if (token) {
      // 验证token
      try {
        let user = await ctx.app.jwt.verify(token, ctx.app.config.jwt.secret);
        let res = app.model.User.find({
          username: user.username,
          password: user.password,
        });
        let result = await res.exec();
        if (result.length == 0) {
          ctx.status = 403;
          ctx.body = {
            code: 403,
            message: "请重新登录",
          };
        } else {
          await next();
        }
      } catch (error) {
        console.log(error);
        ctx.throw(403, "token过期");
      }
    } else {
      ctx.status = 403;
      ctx.body = {
        code: 403,
        msg: "token不存在",
      };
    }
  };
};
