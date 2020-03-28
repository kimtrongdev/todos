<template>
  <div class="list">
    <router-view />
    <div class="modal-task" v-if="activeList!==false">
      <div class="btn-hide-model" @click="activeList=false">
         <el-button  circle icon="el-icon-close" type="danger"></el-button>
      </div>
      <ListSchedule v-bind:todos="todosProps" v-bind:listsProp="itemLists" />
    </div>

    <div
      :body-style="{ padding: '0px' }"
      shadow="hover"
      class="item-list"
      data-toggle="modal"
      data-target="#exampleModal"
      v-for="(item, index) in lists"
      :key="index"
      @click="activeList=item._id+'';itemLists=[{_id:item._id,name:item.name}]"
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
        <div class="item-todo" v-for="(todo, indexTodo) in item.children" :key="indexTodo">
          <div
            v-if="indexTodo<5"
            class="name-todo"
            v-bind:style="'color:'+GetColorPriority(todo.priority)"
          >* {{ ShortString(todo.name, 5) }}</div>
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
import ListSchedule from "../../components/ListScheduled";
import GetColorPriority from "../../common/colorPriority";
import {ShortString} from './../../common/helpers'
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
    allTodo: function() {}
  },
  computed: {
    todosProps() {
      let todoByIdList = [];
      if (this.activeList !== false) {
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
      }
      return todoByIdList;
    },
    ...mapGetters(["lists", "allTodo"])
  },
  methods: {
    ShortString,
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
  background-color: rgb(223, 223, 223);
  color: #1fbb7a;
  border-radius: 10px;
  float: left;
  margin: 15px;
  margin-top: 50px;
  overflow: auto;
  overflow-x: hidden;
  position: relative;
  cursor: pointer;
  padding: 0px;
}

.item-todo {
  margin-left: 10px;
  position: relative;
  left: 5px;
}

.btn-new {
  cursor: pointer;
  text-align: center;
  background-color: #1fbb7a;
  color: rgb(255, 255, 255);
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
  position: fixed;
  top: 3%;
  left: 6%;
}
.item-name {
  background-color: #1fbb7a;
  height: 40px;
  line-height: 40px;
  color: #fff;
  font-weight: bold;
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