<template>
  <div class="scheduled">
    <ListSchedule v-bind:todos="allTodo" v-bind:listsProp="lists" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ListSchedule from "./ListScheduled";
export default {
  components: {
    ListSchedule
  },
  mounted() {
    this.$store.dispatch("LOAD");
  },
  watch: {
    lists: function() {},
    allTodo: function() {}
  },
  computed: {
    ...mapGetters(["lists", "allTodo"])
  }
};
</script>




<style scoped>
.scheduled {
  display: grid;
  align-items: center;
  padding-top: 30px;
}
.item-todo {
  margin-top: 10px;
}
.dateName {
  text-align: start;
  color: blue;
  margin-left: 50px;
}
</style>