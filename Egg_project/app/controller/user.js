"use strict";

const BaseController = require("./base");

class UserController extends BaseController {
  // 获取用户列表
  async index() {
    const { ctx } = this;
    let name = ctx.query.name;
    const userlist = await this.service.user.find(name);
    this.success("success", userlist);
  }

  // 根据id获取单条文档
  async show() {
    const { ctx } = this;
    let id = ctx.params.id;
    const userList = await this.service.user.findOne(id);
    this.success("success", userList);
  }

  // 添加用户
  async create() {
    const { ctx } = this;
    // 校验参数
    let data = ctx.request.body;
    ctx.validate({
      username: { type: "username", required: true },
      password: {
        type: "password",
        required: true,
      },
    });
    await this.service.user.create(data);
    this.success("创建成功");
  }

  // 更新
  async update() {
    const { ctx } = this;
    let data = ctx.request.body;
    let id = ctx.params.id;
    console.log(id);
    await this.service.user.update(id, data);
    this.success("更新成功");
  }

  // 删除用户
  async destroy() {
    const ctx = this.ctx;
    let id = ctx.params.id;

    await this.service.user.destroy(id);
    this.success("删除成功");
  }
}

module.exports = UserController;
