<template>
    <div class="viewcorpologin">
        <Login v-bind:recuperarsenha="true" v-bind:idusuario="idusuario" />
    </div>
</template>

<script>
import Login from '../components/Login.vue'
export default {
  name: 'HelloWorld',
  components:{
      Login
  },
  data: () =>{
      return {
          idusuario:10
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .viewcorpologin{
        padding-top:0px!important;
        width: 80vw;
        max-width: 80vw;
        height: 50vh;
        max-height: 50vh;
    }
</style>
