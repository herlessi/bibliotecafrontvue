<template>
    <div>
        
        <div  class="corpolistagem">
            <v-card class="p-0 ma-2"  
                style="padding:0px!important;width:100%;">
                <v-row class="ma-0" 
                 style="max-width: 100%;padding:5px 10px;display:flex;align-items:center;justify-content:flex-end;">
                    <v-text-field
                        class="inputfiltrolistagem"
                        type="text" label="Nome" v-model="filtronome" >
                    </v-text-field>

                    <v-text-field
                        class="inputfiltrolistagem"
                        type="text" label="Sobrenome" v-model="filtrosobrenome" >
                    </v-text-field>

                    <v-text-field
                        class="inputfiltrolistagem"
                        type="text" label="Apelido" v-model="filtroapelido" >
                    </v-text-field>

                    <v-text-field
                        class="inputfiltrolistagem"
                        type="text" label="Email" v-model="filtroemail" >
                    </v-text-field>

                    <v-btn @click="buscaReservas()" small color="light-blue" 
                        class="botaolistagem"  >
                        <v-icon color="white">mdi-magnify</v-icon>
                        Pesquisar
                    </v-btn>

                </v-row>
            </v-card>
            <v-data-table v-if="itens.length > 0"
                :headers="headers"
                :items="itens"
                :items-per-page="5"
                class="elevation-1"
                style="padding:10px;width:100%;"
            ></v-data-table>

        </div>



    </div>

    

    
</template>

<script>
export default {
    name: 'listagem',
    props:["recuperarsenha","idusuario"],
    data: () => {
        return {
            headers: [],
            itens:null
        }
    },
    watch: {
      headers: (valor) => {
        this.headers = valor
      }
    },
    methods:{
        carregardados(){
            console.log("Carregando dados")
            this.$http.get("/usuario")
                            .then((resp) => {

                                for(var i=0; i < Object.keys(resp.data[0]).length; i++){

                                    this.headers[i] = { 
                                        text: Object.keys(resp.data[0])[i], 
                                        value: Object.keys(resp.data[0])[i]
                                    }
                                }

                                this.itens = resp.data
  
                            })
                            .catch((error) =>{
                                this.$alert(error);
                            })
        }
    },
    mounted () {
        this.carregardados()
    },
}
</script>

<style scoped>

   

    .corpolistagem{
        background-color:pink;
        display:flex;
        flex-direction: column;
        justify-content:center;
        align-items: center;
        padding:5px;
    }

    .inputfiltrolistagem{
        width:5em;
        margin-left: 0.5em;
        margin-right: 0.5em;
    }

    .botaolistagem{
        color:white!important;
        min-height:40px;
        font-weight:bold;
        margin-left: 0.5em;
        margin-right: 0.5em;
    }

</style>
