<template>
  <div class="sidebar">
    <div class="topbar"></div>
    <ul class="list-group">
      <li
        class="list-group-item"
        v-for="(item) in items"
        :key="item"
      >
        <router-link
          :to="{ name: item.name }"
          exact
          class="nav-link"
          active-class="active"
        >{{item.name}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import routes from "./../router/routes";

export default {
  data() {
    return {
      items: routes,
      active: 0
    };
  }
};
</script>

<style scoped>
.sidebar {
  width: 20vw;
  height: 100vh;
  background-color: bisque;
  float: left;
}
.topbar {
  width: 100%;
  height: 150px;
  background-color: rgb(59, 59, 238);
}
</style>