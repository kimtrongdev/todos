<template>
  <div class="scheduled">
    <div class="input-group container-md item-todo">
      <div class="input-group-prepend" @click="addTodo()">
        <div class="input-group-text">+</div>
      </div>
      <input type="text" placeholder="New todo" class="form-control" v-model="newName" v-on:keyup.enter="addTodo()" />
      <select class="name-list" v-model="listSelect">
        <option value="-1">Select list</option>
        <option v-for="(item,index) in lists" :key="index" v-bind:value="item._id">{{item.name}}</option>
      </select>
    </div>

    <div v-for="(ob, index) in listTodo" :key="index">
      <h4 class="dateName">{{ob.dateName}}</h4>
      <div
        v-for="(item, index) in ob.children"
        :key="index"
        @click="clickActiveTodo(item._id)"
        v-bind:class="item.status === true?'input-group container-md item-todo disabled':'input-group container-md item-todo'"
        v-bind:style="'background-color: '+ColorPriority(item.priority)"
      >
        <div class="input-group-prepend" @click="(e)=>e.stopPropagation()">
          <div class="input-group-text">
            <input
              type="checkbox"
              :value="!item.status"
              v-model="item.status"
              @click="(e)=>checkItem(e,item._id,item.id_list)"
            />
          </div>
        </div>

        <input
          type="text"
          disabled
          class="form-control"
          aria-label="Text input with checkbox"
          v-model="item.name"
        />
        <div class="input-group-prepend">
          <div class="input-group-text name-list">{{item.listName}}</div>
        </div>
        <DetailTodo
          v-if="activeTodo===item._id"
          v-bind:id_todo="item._id"
          v-bind:id_list="item.id_list"
          v-bind:todo="{...item}"
        />
      </div>
    </div>

    <div class="item-todo-disabled" v-if="listCompled>0">
      <div class="input-group-prepend" @click="(e)=>e.stopPropagation()">
        <div class="input-group-text">
          <input type="checkbox" v-model="showCompleted"/>
        </div>
      </div>
      <input
        type="text"
        disabled
        class="form-control"
        v-bind:value='listCompled+" Item completed"'
      />
    </div>
  </div>
</template>

<script>
import DetailTodo from "./../components/DetailTodo";
import ColorPriority from "./../common/colorPriority";
export default {
  components: {
    DetailTodo
  },
  props: ["todos", "listsProp"],
  data() {
    return {
      selected: null,
      newName: "",
      activeTodo: false,
      listSelect: -1,
      lists: [],
      //status: false,
      showCompleted: false
    };
  },
  watch: {
    listsProp: function() {
      this.lists = this.$props.listsProp;
      if (this.$props.listsProp && this.$props.listsProp[0])
        this.listSelect = this.$props.listsProp[0]._id;
    }
  },
  computed: {
    listCompled() {
      let countCompleted = 0;
      this.$props.todos.forEach(item => {
        item.children.forEach(todo => {
          if (todo.status === true || todo.status === "true") {
            countCompleted++;
          }
        });
      });
      return countCompleted;
    },
    listTodo() {
      let list = [];
      this.$props.todos.forEach(item => {
        let children = [];
        item.children.forEach(todo => {
          if (this.showCompleted === true || todo.status === false) {
            children.push(todo);
          }
        });
        if (children.length > 0) {
          let newItem = { ...item, children };
          list.push(newItem);
        }
      });
      return list;
    }
  },
  mounted() {
    this.lists = this.$props.listsProp;
    if (this.$props.listsProp && this.$props.listsProp[0])
      this.listSelect = this.$props.listsProp[0]._id;
  },
  methods: {
    ColorPriority,
    addTodo() {
      if (this.newName.length > 1) {
        this.$store.dispatch("ADD_TODO", {
          name: this.newName,
          id_list: this.listSelect
        });

        this.newName = "";
      } else alert("Invalid  data input");
    },
    clickActiveTodo: function(index) {
      if (this.activeTodo === false) this.activeTodo = index;
      else {
        if (index === this.activeTodo) this.activeTodo = false;
        else this.activeTodo = index;
      }
      return this.activeTodo;
    },
    checkItem: function(e, id_todo, id_list) {
      if (e.target.value === "true" || e.target.value === true) {
        this.$store.dispatch("UPDATE_TODO", {
          id_todo: id_todo,
          id_list: id_list,
          status: e.target.value
        });
      } else {
        this.$store.dispatch("UPDATE_TODO", {
          id_todo: id_todo,
          id_list: id_list,
          status: e.target.value
        });
      }
    }
  }
};
</script>

<style scoped>
.scheduled {
  display: grid;
  align-items: center;
  padding-top: 30px;
  padding-bottom: 80px;
}
.item-todo {
  margin-top: 10px;
  border-radius: 5px;
}

.dateName {
  text-align: start;
  color: blue;
  margin-left: 50px;
}
.name-list {
  width: 100px;
}
.item-todo-disabled {
  width: 95%;
  position: fixed;
  bottom: 5%;
  left: 2%;
  display: flex;
}
.disabled {
  /* position: fixed;
  animation: disabledTodo 1s ease-in-out forwards;
  z-index: 99; */
}
@keyframes disabledTodo {
  0% {
    top: 50%;
    filter: blur(0.2px);
  }
  100% {
    top: 100%;
    filter: blur(0.8px);
  }
}
</style>