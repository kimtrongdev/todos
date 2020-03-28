<template>
  <el-menu
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-submenu index="2">
    <template slot="title">Workspace</template>
    <div class='todo'>

    </div>
  </el-submenu>

    <el-menu-item index="1" @click="$store.dispatch('LOGOUT')">Logout</el-menu-item>
  </el-menu>
</template>
<script>
export default {
  data() {
    return {
      
    };
  },
  computed: {

  },
  methods:{
    handleSelect(){

    }
  }
};
</script>

<style scoped>
.todo{
  width: 600px;
  height: 100px;
}
</style>