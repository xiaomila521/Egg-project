"use strict";

const Controller = require("egg").Controller;
const DisposePassword = require("../exception/disposepas");

class LoginController extends Controller {
  async index() {
    const { ctx, service } = this;
    const user = ctx.request.body;
    // 校验参数
    const rule = {
      username: { type: "string", required: true },
      password: { type: "string", required: true },
    };
    ctx.validate(rule, user);
    // 将密码进行加密
    // user.password = await DisposePassword.hashPassword(user.password);
    // console.log(user);
    // return;
    let result = await service.login.login(user);
    // 生成token签名;
    const token = await ctx.app.jwt.sign(
      { username: result.username, password: result.password },
      ctx.app.config.jwt.secret,
      {
        expiresIn: "24h",
      }
    );
    ctx.status = 200;
    ctx.body = {
      code: 200,
      data: token,
    };
  }
}

module.exports = LoginController;
