<template>
  <div class="container">
      <el-card class="box-card">
          <h2>Login </h2>
    <el-form v-model="auth" ref="ruleForm" label-width="70px" class="demo-ruleForm">
      <el-form-item label="Email" prop="email">
        <el-input v-model="auth.email"></el-input>
      </el-form-item>
      <el-form-item  label="Pass" prop="password">
        <el-input v-model="auth.password"></el-input>
      </el-form-item>
      <el-button>Login</el-button>
    </el-form>
    </el-card>
  </div>
</template>

<script>

export default {
  data() {
    return {
      auth: {
        email: "",
        password: ""
      }
    };
  },
  mounted(){
     
  }
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

</style>