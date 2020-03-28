<template>
  <div id="app" 
      v-loading="$store.getters.isLoaddingApp"
      element-loading-text="Wait"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <div class="main">
      <Sidebar/>
      <div class="content">
        <Navbar/>
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import Sidebar from '../components/Sidebar'
export default {
  components: {
    Sidebar,
    Navbar
  }
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.main{
    background-color: #f0f0f0;
    display: flex;
}
.content{
  height: 100vh;
  flex:auto;
  width: 100vw;
  overflow: scroll;
  overflow-x: hidden;
  padding-bottom:40px;
  float: left;
}
</style>
