<template>
  <section class="container">
    <h1> 你好 欢迎你  {{ username }} </h1>

    <button @click="register">注册axios请求</button>
  </section>
</template>

<script>
import { UserRegister } from '~/api/index'
 
export default {
  data() {
    return {
      username: ''
    }
  },

  methods: {
    register() {
      UserRegister({}).then(res => {

      })
    }
  },

  mounted() {
    this.username = this.$store.state.userName;
  }
}
</script>

<style>
.container {
  text-align: center;
}
</style>
