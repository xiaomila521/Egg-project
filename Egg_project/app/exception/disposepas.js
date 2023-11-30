const bcrypt = require("bcrypt");
class DisposePassword {
  constructor() {}
  // 密码加盐
  async hashPassword(password) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return Promise.resolve(hashedPassword); // 返回加密后的密码
  }

  /**
   * 密码解密
   * @param {String} inputPassword 需要校验的密码
   * @param {String} hashedPassword 要检验的哈希密码
   * @return {Boolean} 是否匹配
   */
  async comparePassword(inputPassword, hashedPassword) {
    let res = await bcrypt.compare(inputPassword, hashedPassword);
    return Promise.resolve(res);
  }
}

module.exports = new DisposePassword();
