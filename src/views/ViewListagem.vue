<template>
    <div class="viewcorpologin">
        <Listagem  />
    </div>
</template>

<script>
import Listagem from '../componentes/Listagem.vue'
export default {
  name: 'HelloWorld',
  components:{
      Listagem
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .viewcorpologin{
        /* background-color:red; */
        padding-top:0px!important;
        width: 80vw;
        max-width: 80vw;
        height: 50vh;
        max-height: 80vh;
        overflow: auto;
    }
</style>
