"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
    /**
     * ユーザを追加 (ADD)
     */
    static async add(value) {
      try {
        const user = await this.create({
          username: value.username,
          email: value.email,
          password: value.password,
        });
        return user;
      } catch (e) {
        console.error(e);
        return false;
      }
    }
    /**
     * メール存在チェック (ADD)
     */
    static async existEmail(value) {
      console.log(
        "🚀 ~ file: user.js ~ line 28 ~ User ~ existEmail ~ value",
        value
      );
      try {
        const mail = await this.findOne({
          where: { email: value },
        });
        return mail;
      } catch (error) {
        console.error(error.message);
        return false;
      }
    }
    /**
     * メールアドレス、パスワード照合
     */
    static async compareMailPassword(email) {
      try {
        const compare = await this.findAll({
          attributes: ["email", "password"],
          where: { email: email },
        });
        return compare;
      } catch (error) {
        console.error(e);
        return false;
      }
    }
    /**
     * token追加
     */
    static async passwordReset(email, token) {
      try {
        const reset = await this.update(
          { token: token },
          { where: { email: email } }
        );
        return reset;
      } catch (error) {
        console.error(error.message);
        return false;
      }
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      token: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
