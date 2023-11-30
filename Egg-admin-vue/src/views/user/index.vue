<template>
  <div class="dashboard-container">
    <!-- 表单 -->
    <el-row :gutter="20">
      <el-form
        ref="form"
        :model="formData"
        size="small"
        label-position="left"
        label-width="60px"
      >
        <el-col :span="5">
          <el-form-item label="用户名:">
            <el-input
              v-model="formData.username"
              clearable
              size="small"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="primary"
            icon="el-icon-search"
            size="small"
            @click="handleSearch"
            >搜索</el-button
          >
        </el-col>
        <el-col :span="1">
          <el-button
            type="primary"
            icon="el-icon-plus"
            size="small"
            @click="handleAdd"
            >新增</el-button
          >
        </el-col>
      </el-form>
    </el-row>

    <!-- 表格 -->
    <el-table :data="userList" border size="small" stripe>
      <el-table-column
        type="index"
        label="序号"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="username"
        label="用户名"
        align="center"
      ></el-table-column>
      <el-table-column prop="age" label="年龄" align="center"></el-table-column>
      <el-table-column
        prop="phone"
        label="电话"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="email"
        label="邮件"
        align="center"
      ></el-table-column>
      <el-table-column prop="state" label="激活状态" align="center">
        <template #default="{ row }">
          <el-tag v-if="row.state == 1" type="success" effect="dark">是</el-tag>
          <el-tag v-else type="danger" effect="dark">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center">
        <template #default="{ row }">
          {{ formatTime_CN(row.createTime) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="100px">
        <template #default="{ row }">
          <el-button
            type="primary"
            plain
            size="mini"
            icon="el-icon-edit"
            @click="editUserClick(row._id)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            plain
            size="mini"
            icon="el-icon-delete"
            @click="delUserClick(row._id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- /表格 -->
    <!-- 弹出层 -->
    <dialog-user ref="dialogUserRef" />
  </div>
</template>

<script>
import { getUserListAPI, delUserAPI } from "@/api/user";
import dialogUser from "./components/dialog-user.vue";

export default {
  name: "user",
  components: { dialogUser },
  data() {
    return {
      formData: {},
      userList: [],
    };
  },
  created() {
    this.getUserData();
  },
  methods: {
    async handleAdd() {
      this.$refs.dialogUserRef.isShowDialog = true;
    },
    async getUserData(params) {
      try {
        let res = await getUserListAPI(params);
        console.log(res);
        this.userList = res.data;
      } catch (error) {
        console.log(error);
      }
    },
    formatTime_CN(time) {
      const date = new Date(time);
      return date
        .toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" })
        .replace(/\//g, "-");
    },
    // 搜索
    handleSearch() {
      let name = this.formData.username;
      if (name) {
        let res = this.userList.filter((item) => item.username == name);
        if (res.length > 0) {
          this.userList = res;
        } else {
          this.getUserData({ name });
        }
      } else {
        this.getUserData();
      }
    },
    // 编辑
    async editUserClick(id) {
      this.$refs.dialogUserRef.isShowDialog = true;
      this.$refs.dialogUserRef.getUserInfo(id);
    },
    async delUserClick(id) {
      try {
        let res = await delUserAPI(id);
        if (res.code == 20000) {
          this.$message({
            type: "success",
            message: "删除成功",
          });
          this.getUserData();
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 20px;
    // margin-top: 20px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
