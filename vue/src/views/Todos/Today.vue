<template>
  <div class="scheduled">
    <ListScheduled v-bind:todos="todo_today" v-bind:listsProp="lists"/>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ListScheduled from "./../../components/ListScheduled";

export default {
  components: {
    ListScheduled
  },
  data() {
    return {
      activeTodo: false,
      selected: null,
      newName: "",
      listSelect: -1,
    };
  },
  watch: {
    
  },
  mounted() {
    this.$store.dispatch("LOAD");
  },
  computed: {
    todo_today() {
      let todoByIdList = [];
      const dupTodos = [...this.allTodo];

      dupTodos.forEach(item => {
        if(item.dateName==='Today')
          todoByIdList.push(item)
      });
      return todoByIdList;
    },
    ...mapGetters(["lists", "listToday", "allTodo"])
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
</style>