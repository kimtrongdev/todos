<template>
  <div>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="true"
      :style="'background-color:'+$store.state.Color.color_primary"
      :router="true"
    >
      <template v-for="(item ,index) in router">
        <router-link  v-if='item.children && item.children.length>0' :key="index" :to="{name:item.name}" class="item-link">
        <el-submenu   :index="index+''" class="menu-item">
          <template slot="title" class="item-link">
              <i class='icon-sidebar' :class="item.icon"></i>
          </template>

          <el-menu-item-group style="background-color:#1fbb7a" v-if="item.children">
            <template v-for="(children , indexChild) in item.children">
                <router-link :key="indexChild" :to="{name:children.name}" class="link">
                  <el-menu-item
                    :index="index+'-'+indexChild"
                    class="el-menu-item">
                      <b class='text-item-menu'>{{children.name}}</b>
                  </el-menu-item>
                </router-link>
              </template>
          </el-menu-item-group>
        </el-submenu>
      </router-link>

        <router-link v-else :key="index" :to="{name:item.name}" class="link">
          <el-menu-item   class='menu-item'>
            <i class='icon-sidebar' :class="item.icon" ></i>
            <span slot="title">{{item.name}}</span>
          </el-menu-item>
        </router-link>

      </template>
    </el-menu>
  </div>
</template>
<style >
.el-menu-vertical-demo {
  height: 100vh;
}
.link {
  color: #fff;
  text-decoration: none;
}
.text-item-menu{
  text-decoration:none ;
  color:#fff ;
}
.el-menu-item:hover .text-item-menu {
  color: #1fbb7a;
}
.icon-sidebar{
  font-size: 25px;
  color:#ffffff !important;
}
.menu-item:hover .icon-sidebar{
  color:#1fbb7a !important;
}
</style>

<script>
import Routes from "./../router/routes";

export default {
  data() {
    return {};
  },
  computed:{
    router(){
      let routeSidebar=Routes
      routeSidebar.forEach(item => {
          if(item.children && item.children){
            const childrenFillter=item.children.filter( function (child){
              return !child.hidden || child.hidden!==true
            })
            item.children=childrenFillter
          }
      });
      return routeSidebar.filter(function (route) { return !route.redirect && !route.hidden })
    }
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