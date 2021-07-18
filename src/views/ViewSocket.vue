<template>
    <div class="">
        <ConexaoSocket v-bind:recuperarsenha="false" />
    </div>
</template>

<script>
import ConexaoSocket from '../componentes/ConexaoSocket.vue'
export default {
  name: 'HelloWorld',
  components:{
      ConexaoSocket
  },
  methods(){
      
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
   
</style>


