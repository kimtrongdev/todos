<template>
  <div>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="true"
      :style="'background-color:'+$store.state.Color.color_primary"
    >
    
      <el-submenu v-for="(item ,index) in Routes" :key="index" :index="index+''" class="menu-item">
        <template slot="title" class="item-link">
          <router-link :to="{name:item.name}" class="item-link">
            <i :class="item.icon" style="color:#fff"></i>
            <span slot="title">{{item.name}}</span>
          </router-link>
        </template>

        <el-menu-item-group style="background-color:#1fbb7a" v-if="item.children">
          <el-menu-item
            v-for="(children , indexChild) in item.children"
            :key="indexChild"
            :index="index+'-'+indexChild"
            class="el-menu-item"
          >
            <router-link :to="{name:children.name}" class="link">{{children.name}}</router-link>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>
<style>
.el-menu-vertical-demo {
  height: 100vh;
}
.link {
  color: #fff;
  text-decoration: none;
}
.el-menu-item:hover .link {
  color: #1fbb7a;
}

</style>

<script>
import Routes from "./../router/routes";

export default {
  data() {
    return {
      isCollapse: true,
      Routes: Routes.filter(item => {
        return !item.redirect && !item.hidden;
      })
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>