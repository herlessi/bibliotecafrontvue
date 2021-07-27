<template>
  <div class="text-center">
    <v-dialog
      v-model="exibir"
      width="500"
    >
      <!-- <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="red lighten-2"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Click Me
        </v-btn>
      </template> -->

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          {{titulo}}
        </v-card-title>

        <v-card-text style="padding-top:20px;">
          {{texto}}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="$emit('setarModal')" > OK </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


  </div>
</template>

<script>
  export default {
    props:["exibirModal", "titulo", "texto"],
    data () {
      return {
        exibir:false
      }
    },
    watch: {
      exibirModal(valor) {
        this.exibir = valor
      }
    },
    methods:{

    },
    created(){
        this.exibir = this.exibirModal
    }
  }
</script>