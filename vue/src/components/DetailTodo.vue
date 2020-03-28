<template>
  <div class="detail-todo" @click.prevent="click">
    <!-- <textarea @blur="updateDescription()" class="text-des" v-model="description"></textarea> -->
    <div class="container">
      <el-input
        @blur="updateTodo()"
        class="text-input"
        type="text"
        placeholder="name"
        v-model="name"
      ></el-input>

      <el-input
        @blur="updateTodo()"
        class="text-des"
        type="textarea"
        :rows="8"
        placeholder="Description"
        v-model="description"
      ></el-input>
    </div>

    <div class="container">
      <el-date-picker
        v-model="time"
        type="date"
        placeholder="Pick a day"
        :picker-options="pickerOptions"
      ></el-date-picker>

      <div class="form-group">
        <label for="Priority">Priority:</label>
        <el-select v-model="priority" placeholder="Select">
          <el-option  :style="'background-color:'+ColorPriority('NONE')" value="NONE">None</el-option>
          <el-option :style="'background-color:'+ColorPriority('LOW')" value="LOW">LOW</el-option>
          <el-option :style="'background-color:'+ColorPriority('MEDIUM')" value="MEDIUM">MEDIUM</el-option>
          <el-option :style="'background-color:'+ColorPriority('HIGH')" value="HIGH">HIGH</el-option>
        </el-select>
      </div>
      <button type="button" class="btn btn-danger btn-sm btn-delete" @click="deleteTodo()">Delete</button>
    </div>
  </div>
</template>

<script>
import ColorPriority from './../common/colorPriority'
export default {
  data() {
    return {
      time: "",
      description: "",
      priority: "",
      name: "",

      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "Today",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "Tomorow",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          }
        ]
      }
    };
  },
  mounted: function() {
    this.time = this.$props.todo.time;
    this.description = this.$props.todo.description;
    this.priority = this.$props.todo.priority;
    this.name = this.$props.todo.name;
  },
  props: {
    todo: Object,
    id_todo: String,
    id_list: String
  },
  watch: {
    time: function() {
      if (this.time !== this.$props.todo.time) {
        this.$store.dispatch("UPDATE_TODO", {
          id_list: this.id_list,
          id_todo: this.id_todo,
          time: this.time
        });
      }
    },
    priority: function() {
      if (this.priority.length > 0) {
        this.$store.dispatch("UPDATE_TODO", {
          id_list: this.id_list,
          id_todo: this.id_todo,
          priority: this.priority
        });
      }
    }
  },
  computed: {},
  methods: {
    ColorPriority,
    click: function(e) {
      e.stopPropagation();
    },
    deleteTodo: function() {
      this.$store.dispatch("DELETE_TODO", {
        id_list: this.id_list,
        id_todo: this.id_todo
      });
    },
    updateTodo: function() {
      this.$store.dispatch("UPDATE_TODO", {
        id_list: this.id_list,
        id_todo: this.id_todo,
        description: this.description,
        name: this.name
      });
    }
  }
};
</script>

<style scoped>
.detail-todo {
  position: relative;
  width: 100%;
  height: 300px;
  background-color: #1fbb7a;
  animation: load 0.3s ease-in-out;
  display: flex;
}

@keyframes load {
  0% {
    height: 0px;
  }
  100% {
    height: 300px;
  }
}
.text-input {
  width: 100%;
}
.container {
  width: 46%;
  height: 80%;
  background-color: rgb(218, 218, 218);
  margin: 2%;
  position: relative;
  padding: 10px;
}
.btn-delete {
  position: absolute;
  right: 10px;
  bottom: 10px;
}
.container-setting-time {
  width: 100%;
  display: inline-flex;
}
.container-setting-time .item {
  flex: auto;
  float: left;

}
</style>