"use strict";

const { Service } = require("egg");
const disposePas = require("../exception/disposepas.js");

class UserService extends Service {
  async find(name) {
    const { ctx } = this;
    if (name) {
      const userlist = ctx.model.User.find({ name }, { password: 0 });
      return userlist;
    } else {
      const userlist = ctx.model.User.find({}, { password: 0 });
      return userlist;
    }
  }
  async findOne(id) {
    const { ctx } = this;
    const userlist = ctx.model.User.find(
      { _id: new Object(id) },
      { password: 0 }
    );
    return userlist;
  }

  async create(data) {
    const { ctx } = this;
    // 密码加密
    data.password = await disposePas.hashPassword(data.password);
    // 判断用户名是否有存在
    let res = await ctx.model.User.find({ username: data.username });
    console.log(res);
    if (res.length > 0) {
      ctx.throw(400, "用户名已存在");
    } else {
      await ctx.model.User.create(data);
    }
  }

  async update(id, data) {
    const { ctx } = this;
    // 密码加盐
    if (data.password) {
      data.password = await disposePas.hashPassword(data.password);
    } else {
      await ctx.model.User.updateOne({ _id: new Object(id) }, { $set: data });
    }
  }

  async destroy(id) {
    const { ctx } = this;
    return await ctx.model.User.deleteOne({ _id: new Object(id) });
  }
}

module.exports = UserService;
