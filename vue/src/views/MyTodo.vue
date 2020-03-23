<template>
  <div>
      <div v-for="(todo ,index) in todos" :key='index'>
sdgfdfgdg
      </div>
    476655677
  </div>
</template>

<script>

export default {
    mounted(){
        this.$store.dispatch('LOAD')
    },
    computed:{
        ...mapGetters(['todos'])
    }
}
</script>