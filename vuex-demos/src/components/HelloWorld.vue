<template>
  <div class="hello">
      <h2>vuex</h2>
      <p>姓名s: {{this.$data.names}}</p>
      <p>姓名: {{this.name}}</p>
      <p>getter姓名： {{ this.getNewName() }} </p>
      <p><button @click="() => {this.changeName(back()) }">同步改变名字</button></p>
      <p><button @click="() => {this.asyncChangeName() }">异步改变名字</button></p>
  </div>
</template>

<script>
import {mapState, mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  name: 'HelloWorld',
  data () {
    return {
      names: this.$store.state.moduleA.name
    }
  },
  computed: {
    ...mapGetters('moduleA', ['getNewName']),
    name() { 
      return this.$store.state.moduleA.name
    }
  },
  methods: {
    ...mapMutations('moduleA', ['changeName']),
    ...mapActions('moduleA', ['asyncChangeName']),
    back() {
      console.log(this.$store.state.moduleA.name, '2222')
    }

  },
  created() {
    console.log(this,'aaa')
    console.log(this.$store,'aaa')
  }
}
</script>
