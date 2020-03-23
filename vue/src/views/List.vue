<template>
  <div class="list">
    <div class="modal-task" v-if="activeList!==false">
      <div class="btn-hide-model" @click="activeList=false">X</div>
      <ListSchedule v-bind:todos="todos" v-bind:listsProp="itemLists" />
    </div>

    <div
      class="item-list"
      data-toggle="modal"
      data-target="#exampleModal"
      v-for="(item, index) in lists"
      :key="index"
      @click="activeList=item._id+'';itemLists=[{_id:item.id,name:item.name}]"
    >
      <div class="item-name" @click="(e)=>{e.stopPropagation()}">
        <div class="input-group mb-3" v-if="(activeEdit!==false && activeEdit===item._id)">
          <input
            type="text"
            class="form-control"
            placeholder="Name"
            aria-describedby="button-addon2"
            v-model="newName"
          />
          <button class="btn btn-secondary" type="button" @click="updateList()">Update</button>
        </div>

        <div v-else @click="activeEdit=item._id ; newName=item.name">{{item.name}}</div>
      </div>
      <!--item-name-->
      <div style="over-flow:auto">
        <div class="notask text-center" v-if="item.children.length===0">No Task</div>
        <div class="item-todo" v-for="(todo, indexTodo) in item.children" :key="indexTodo">
          <div v-if="indexTodo<5" class="name-todo" v-bind:style="'color:'+GetColorPriority(todo.priority)">
            * {{todo.name}}
          </div>
        </div>
        <div class="item-todo" v-if="item.children.length>5">
          <div class="name-todo larget-text">. . .</div>
        </div>
      </div>
    </div>

    <div class="item-list btn-new" @blur="acticeAdd=false">
      <div class="text-center" v-if="activeAdd===false" @click="activeAdd=true">+</div>

      <div v-else>
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="Name"
            aria-describedby="button-addon2"
            v-model="newName"
          />
        </div>
        <center>
          <div class="input-group mb-3">
            <center>
              <button
                class="btn btn-secondary"
                style="margin-left:12px"
                type="button"
                @click="activeAdd=false"
              >Cancel</button>
              <button
                class="btn btn-info"
                style="margin-left:15px"
                type="button"
                @click="onCreateList()"
              >Create</button>
            </center>
          </div>
        </center>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ListSchedule from "./ListScheduled";
import GetColorPriority from "./../common/colorPriority";
export default {
  components: {
    ListSchedule
  },
  data() {
    return {
      newName: "",
      activeAdd: false,
      activeEdit: false,

      itemLists: [],
      todos: [],
      activeList: false
    };
  },
  mounted() {
    this.$store.dispatch("LOAD");
  },
  watch: {
    lists: function() {},
    allTodo: function() {},
    activeList: function() {
      if (this.activeList !== false) {
        let todoByIdList = [];
        const dupTodos = [...this.allTodo];

        dupTodos.forEach(item => {
          let newChildren = [];
          item.children.forEach(todo => {
            if (todo.id_list === this.activeList + "") newChildren.push(todo);
          });
          if (newChildren.length > 0) {
            let obNew = { ...item };
            obNew.children = newChildren;
            todoByIdList.push(obNew);
          }
        });
        this.todos = todoByIdList;
      }
    },
    todos: function() {
      //console.log(this.todos);
    }
  },
  computed: {
    ...mapGetters(["lists", "allTodo"])
  },
  methods: {
    GetColorPriority,
    onCreateList() {
      this.$store.dispatch("CREATE_LIST", { name: this.newName });
      this.activeAdd = false;
      this.newName = "";
    },
    updateList() {
      this.$store.dispatch("UPDATE_LIST", {
        _id: this.activeEdit,
        name: this.newName
      });
      this.activeEdit = false;
      this.newName = "";
    }
  }
};
</script>

<style scoped>
.list {
  padding: 50px;
}
.item-list {
  width: 200px;
  height: 200px;
  background-color: rgb(104, 148, 150);
  color: #fff;
  border-radius: 10px;
  float: left;
  margin: 15px;
  margin-top: 50px;
  overflow: auto;
  overflow-x: hidden;
  position: relative;
  cursor: pointer;
}

.item-todo {
  margin-left: 10px;
  position: relative;
  left: 5px;
}

.btn-new {
  cursor: pointer;
  text-align: center;
  background-color: cornsilk;
  color: #000;
  padding: 5px;
  padding-top: 20px;
}
.text-center {
  font-size: 24px;
  font-weight: bold;
  margin-top: 60px;
}
.notask {
  margin-top: 40px;
  user-select: none;
}
.modal-task {
  width: 90%;
  height: 96%;
  background-color: rgb(201, 201, 201);
  position: fixed;
  z-index: 9;
  border-radius: 5px;
  animation: showModal 0.2s ease-in-out forwards;
  left: 5%;
}
@keyframes showModal {
  0% {
    top: 90%;
  }
  100% {
    top: 2%;
  }
}
.btn-hide-model {
  width: 30px;
  height: 30px;
  border-radius: 20px;
  position: fixed;
  top: 3%;
  left: 6%;
  background-color: rgb(182, 29, 75);
  color: #fff;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
}
.btn-hide-model:hover {
  background-color: rgb(209, 59, 104);
}
.item-name {
  background-color: rgb(116, 129, 116);
  height: 40px;
  line-height: 40px;
}
.name-todo {
  width: 100%;
  text-align: left;
  font-weight: bold;
}
.larget-text {
  font-size: 20px;
  font-weight: bold;
}
</style>