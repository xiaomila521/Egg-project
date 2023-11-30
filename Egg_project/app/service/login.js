"use strict";

const { Service } = require("egg");
const disposePas = require("../exception/disposepas.js");

class LoginService extends Service {
  async login(data) {
    const { ctx } = this;
    let res = await ctx.model.User.find({ username: data.username });
    if (res.length == 0) {
      ctx.throw(401, "用户名或密码错误");
    } else {
      // 获取用户的密码进行校验
      let password = res[0].password;
      let id = res[0]._id;
      if (data.password == password) {
        // 对密码进行加密存入数据库中
        let dispose = await disposePas.hashPassword(data.password);
        await ctx.model.User.updateOne(
          { _id: new Object(id) },
          { $set: { password: dispose } }
        );
        return;
      }
      let result = await disposePas.comparePassword(data.password, password);
      if (result) {
        return res[0];
      } else {
        ctx.throw(401, "用户名或密码错误");
      }
    }
  }
}
module.exports = LoginService;
