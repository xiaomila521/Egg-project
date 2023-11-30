const HttpExcelption = require("./http");

class NotFoundExcelption extends HttpExcelption {
  constructor(message = "资源不存在", errCode = 40004) {
    super(errCode, message, null, 404);
  }
}
