<template>
  <div class="modal">fghfghdfgvb ds ds</div>
</template>

<script>
import ListSchedule from './../views/ListScheduled'
export default {
  components:{
    ListSchedule
  },
  data() {},
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
.model {
  margin-top: 50px;
  background-color: chartreuse;
  width: 400px;
  height: 300px;
}
</style>