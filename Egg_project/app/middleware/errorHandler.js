"use startic";
const HttpExcelption = require("../exception/http");
module.exports = (options, app) => {
  return async function errorHandler(ctx, next) {
    const method = ctx.request.method;
    if (method === "OPTIONS") {
      ctx.status = 204;
      return;
    }
    try {
      await next();
    } catch (err) {
      console.log(err);
      ctx.app.emit("error", err, ctx);
      if (err instanceof HttpExcelption) {
        ctx.status = err.HttpCode;
        ctx.body = {
          code: err.code,
          data: err.data,
          msg: err.msg,
        };
        return;
      }
      const status = err.status || 500;
      const error =
        status === 500 && ctx.app.config.env === "prod"
          ? "Internal Server Error"
          : err.message;
      ctx.body = { error };
      if (status === 422) {
        ctx.body.detail = err.errors;
      }
      ctx.status = status;
    }
  };
};
