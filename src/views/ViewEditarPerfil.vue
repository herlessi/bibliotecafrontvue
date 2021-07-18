E<template>
    <div class="viewcorpousuario">
        <Usuario v-bind:idusuario="idusuario" />
    </div>
</template>

<script>
import Usuario from '../componentes/Usuario.vue'
export default {
  name: 'HelloWorld',
  components:{
      Usuario
  },
  data:() => {
      return {
          idusuario:43
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .viewcorpousuario{
        padding-top:0px!important;
        width: 50vw;
        max-width: 80vw;
        height: 50vh;
        max-height: 50vh;
    }
</style>
