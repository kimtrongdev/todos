<template>
  <div class="nav">
    <router-link
    active-class="active"
      @click="active=index"
      v-for="(item, index) in items"
      :key="index"
      class='item-nav'
      :to="{ name: item.name }"
    >{{item.name}}</router-link>
  </div>
</template>
<script>
import routes from "./../router/routes";
export default {
  data() {
    return {
      routes: routes,
      active: 0
    };
  },
  computed: {
    items: function() {
      return routes.filter(item => {
        return !item.redirect;
      });
    },
    checkActiveRoute: function() {
      return true;
    }
  }
};
</script>

<style scoped>
.link {
  text-decoration: none;
  color: #fff;
}
.nav {
  height: 50px;
  width: 100vw;
  background-color: rgb(135, 138, 148);
  display: flex;
  justify-content: center;
  align-items: center;
}
.item-nav {
  width: 110px;
  height: 70%;
  background-color: rgb(180, 180, 180);
  border-radius: 3px;
  padding: 5px;
  font-weight: bold;
  color: #fff;
  margin-left: 10px;
  cursor: pointer;
  text-decoration: none;
}
.item-nav:hover {
  background-color: rgb(150, 150, 151);
}
.nav .active {
  background-color: rgb(15, 119, 62);
}
</style>