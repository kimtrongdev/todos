<template>
  <div id="app">
    <div class="main">
      <Navbar />
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
export default {
  components: {
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
  display: flex;
}
.main{
    background-color: #a3a4a5;
}
.content{
  height: calc(100vh - 50px);
  overflow: scroll;
  overflow-x: hidden;
  padding-bottom:40px
}
</style>
