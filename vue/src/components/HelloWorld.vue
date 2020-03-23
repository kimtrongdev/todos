<template>
    <ul class="list-group">
      <li  class="list-group-item " v-bind:class="active===index?'active':null" @click="active=index" v-for="(item, index) in items" :key='item'>
        {{item}}
        <button  @click="deleteItem(index)" type="button" class="btn btn-danger">X</button>
      </li>
      <li class="list-group-item" @click="addItem()">+</li>
    </ul>
</template>

<script>


export default {
  name: 'HelloWorld',
  data : ()=>{
    return {
      items : [
        'item 1',
        'item 2',
        'item 3'
      ],
      active:-1
    }
  },
  computed:{
   
  },
  methods:{
    addItem(){
      this.items.push('tesstst')
    },
    deleteItem(index){
      let list=[...this.items]
      list.splice(index,1)
     this.items=list
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
