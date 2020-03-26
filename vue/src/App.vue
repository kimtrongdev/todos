<template>
  <div id="app">
    <div class="main">
     
      <Sidebar/>
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
//import Navbar from "./components/Navbar";
import Sidebar from './components/Sidebar'
export default {
  components: {
    Sidebar
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
