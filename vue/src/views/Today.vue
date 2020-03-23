<template>
  <div class="scheduled">
    <ListScheduled v-bind:todos="todo_today" v-bind:listsProp="lists"/>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ListScheduled from "./ListScheduled";

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
  },
  methods: {
    // addTodo() {
    //   if (this.newName.length > 1) {
    //     this.$store.dispatch("ADD_TODO", {
    //       name: this.newName,
    //       id_list: this.listSelect
    //     });
    //     this.newName = "";
    //   } else alert("Invalid  data input");
    // },
    // clickItem(index) {
    //   if (this.activeTodo === false) this.activeTodo = index;
    //   else this.activeTodo = false;
    // }
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