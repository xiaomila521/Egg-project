<template>
  <div>
    <el-dialog
      :visible="isShowDialog"
      :title="formData._id ? '编辑' : '新增'"
      width="40%"
      @close="onClose"
    >
      <el-form
        :model="formData"
        ref="formRef"
        label-width="40px"
        :inline="false"
        size="mini"
        label-position="top"
        :rules="rules"
      >
        <el-row type="flex" justify="space-around">
          <el-col :span="10">
            <el-form-item label="用户名:" prop="username">
              <el-input
                v-model.trim="formData.username"
                placeholder="请输入"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="密码:" prop="password">
              <el-input
                v-model="formData.password"
                placeholder="请输入"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-around">
          <el-col :span="10">
            <el-form-item label="年龄:">
              <el-input
                type="number"
                v-model.number="formData.age"
                placeholder="请输入"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="地址:">
              <el-input
                v-model="formData.address"
                placeholder="请输入"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-around">
          <el-col :span="10">
            <el-form-item label="邮箱:">
              <el-input
                v-model="formData.email"
                placeholder="请输入"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="电话:">
              <el-input
                v-model.number="formData.phone"
                placeholder="请输入"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="10" :push="1">
            <el-form-item label="激活状态:">
              <el-switch
                v-model="formData.state"
                active-text="激活"
                inactive-text="未激活"
                :active-value="1"
                :inactive-value="0"
              >
              </el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="end">
          <el-button
            size="mini"
            icon="el-icon-refresh-left"
            @click="isShowDialog = false"
            >取消</el-button
          >
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-plus"
            @click="confirmClick"
            >确定</el-button
          >
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import {
  getOneUserInfoAPI,
  updateOneUserInfoAPI,
  addUserAPI,
} from "@/api/user";
export default {
  name: "dialog-user",
  data() {
    return {
      isShowDialog: false,
      formData: {},
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "用户名长度在2-10个字符之间",
            trigger: "blur",
          },
        ],
        password: [
          {
            validator: (rule, value, callback) => {
              console.log(value);
              if (!this.formData._id && value == undefined) {
                callback(new Error("密码不能为空"));
              } else {
                callback();
              }
            },

            trigger: "blur",
          },
          {
            min: 6,
            max: 20,
            message: "密码长度在6-20个字符之间",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    onClose() {
      (this.isShowDialog = false), (this.formData = {});
      this.$refs.formRef.resetFields();
    },
    // 获取用户详情
    async getUserInfo(id) {
      try {
        let res = await getOneUserInfoAPI(id);
        this.formData = res.data[0];
      } catch (error) {}
    },
    async confirmClick() {
      this.$refs.formRef.validate(async (valid, obj) => {
        if (valid) {
          if (this.formData._id) {
            // 编辑
            try {
              let res = await updateOneUserInfoAPI(
                this.formData._id,
                this.formData
              );
              this.$message({
                type: "success",
                message: "修改成功",
              });
              this.isShowDialog = false;
              this.$parent.getUserData();
            } catch (error) {}
          } else {
            // 新增
            try {
              await addUserAPI(this.formData);
              this.$message({
                type: "success",
                message: "添加成功",
              });
              this.isShowDialog = false;
              this.$parent.getUserData();
            } catch (error) {}
          }
        } else {
          return;
        }
      });
    },
  },
};
</script>
<style scoped></style>
