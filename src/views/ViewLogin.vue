<template>
    <div class="viewcorpologin">
        <Login v-bind:recuperarsenha="false" />
    </div>
</template>

<script>
import Login from '../componentes/Login.vue'
export default {
  name: 'HelloWorld',
  components:{
      Login
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
