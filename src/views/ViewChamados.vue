<template>
    <div class="viewcorpochamados">
        <Chamados  />
    </div>
</template>

<script>
import Chamados from '../componentes/Chamados.vue'
export default {
  name: 'HelloWorld',
  components:{
      Chamados
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .viewcorpochamados{
        /* background-color:red; */
        padding-top:0px!important;
        width: 80vw;
        max-width: 80vw;
        min-height: 50vh;
        max-height: 80vh;
        overflow: auto;
    }
</style>
