<template>
  <div class="container">
      <el-card class="box-card" :style="'background-color:'+$store.state.Color.color_primary">
          <h2>Login </h2>
    <el-form v-model="auth" ref="ruleForm" label-width="70px" class="demo-ruleForm">
      <el-form-item label="Email" prop="email" class='text'>
        <el-input v-model="auth.email"></el-input>
      </el-form-item>
      <el-form-item  label="Pass" prop="password" class='text'>
        <el-input v-model="auth.password"></el-input>
      </el-form-item>
      <el-button @click="login()">Login</el-button>
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
  methods:{
    login(){
      console.log('asd')
      this.$store.dispatch('LOGIN',this.auth)
    }
  }
};
</script>

<style >
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.box-card{
  border-radius: 5px;
}
.text{
  color:#fff !important;
  font-weight:bold
}
</style>