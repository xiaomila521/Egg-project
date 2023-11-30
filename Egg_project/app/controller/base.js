const { Controller } = require("egg");

class BaseController extends Controller {
  success(message = "success", data = null, code = 20000) {
    const { ctx } = this;
    (ctx.status = 200),
      (ctx.body = {
        code,
        message,
        data,
        time: Math.floor(Date.now()),
      });
  }
}

module.exports = BaseController;
