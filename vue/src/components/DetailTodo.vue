<template>
  <div class="detail-todo" @click.prevent="click">
    <!-- <textarea @blur="updateDescription()" class="text-des" v-model="description"></textarea> -->
    <el-input
      @blur="updateDescription()"
      class="text-des"
      type="textarea"
      :rows="9"
      placeholder="Description"
      v-model="description"
    ></el-input>
    <div class="container-right">
      <el-row :gutter="20">
        <el-col :span="16">
          <el-button slot="append" type="primary">Today</el-button>
        </el-col>
        <el-col :span="8">
          <el-button slot="append" type="primary">Today</el-button>
        </el-col>
      </el-row>

      <div class="container-time">
        <button type="button" class="btn btn-primary item" @click="setToday()">Today</button>
        <button type="button" class="btn btn-secondary item" @click="setTomorow()">Tomorow</button>
        <Datetime v-model="time" class="item" />
      </div>
      <div class="form-group">
        <label for="Priority">Priority:</label>
        <select class="form-control" v-model="priority" id="Priority">
          <option value="NONE">None</option>
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
        </select>
      </div>
      <button type="button" class="btn btn-danger btn-sm btn-delete" @click="deleteTodo()">Delete</button>
    </div>
  </div>
</template>

<script>
import { Datetime } from "vue-datetime";
import "vue-datetime/dist/vue-datetime.css";

export default {
  data() {
    return {
      time: "",
      description: "",
      priority: ""
    };
  },
  components: {
    Datetime
  },
  mounted: function() {
    this.time = this.$props.todo.time;
    this.description = this.$props.todo.description;
    this.priority = this.$props.todo.priority;
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
    click: function(e) {
      e.stopPropagation();
    },
    setToday: function() {
      this.$store.dispatch("UPDATE_TODO", {
        id_list: this.id_list,
        id_todo: this.id_todo,
        time: new Date()
      });
    },
    setTomorow: function() {
      this.$store.dispatch("UPDATE_TODO", {
        id_list: this.id_list,
        id_todo: this.id_todo,
        time: new Date().setDate(new Date().getDate() + 1)
      });
    },
    deleteTodo: function() {
      this.$store.dispatch("DELETE_TODO", {
        id_list: this.id_list,
        id_todo: this.id_todo
      });
    },
    updateDescription: function() {
      this.$store.dispatch("UPDATE_TODO", {
        id_list: this.id_list,
        id_todo: this.id_todo,
        description: this.description
      });
    }
  }
};
</script>

<style scoped>
.detail-todo {
  position: relative;
  width: 100%;
  height: 250px;
  background-color: #1fbb7a;
  animation: load 0.3s ease-in-out;
}

@keyframes load {
  0% {
    height: 0px;
  }
  100% {
    height: 300px;
  }
}
.text-des {
  width: 46%;
  margin: 2%;
  height: 80%;
  float: left;
  padding: 5px;
}
.container-right {
  float: left;
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