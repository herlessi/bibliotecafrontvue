<template>
    <div>
        
        <div v-if="pagina == 'datatable'" class="corpochamados">
            <v-card class="p-0 ma-2" style="padding:0px!important;width:100%;">
                <v-row class="ma-0" style="max-width: 100%;padding:15px 10px;display:flex;align-items:center;justify-content:flex-end;">
                   <v-btn color="error" @click="setarModal()" style="margin-right:20px;">
                        modal
                    </v-btn>

                    <v-btn color="info" @click="pagina = 'novochamado'">
                        <v-icon medium color="white" >
                            mdi-plus
                        </v-icon>
                       Abrir novo Chamado
                    </v-btn>

                </v-row>
            </v-card>
            <v-data-table v-if="itens.length > 0"
                :headers="headers"
                :items="itens"
                :items-per-page="5"
                class="elevation-1"
                style="padding:10px;width:100%;"
                no-data-text="Nenhum Chamado encontrado. "
            >
                <template v-slot:item.datacriacao="{ item }">
                    {{item.datacriacao | formatarDataHora}}
                </template>
            </v-data-table>

        </div>

        <div v-if="pagina == 'novochamado'" class="corpochamados">
            <div class="loginlinha">
                <v-select :items="areas" v-model="area" @change="carregarAreas()" item-value="id" item-text="descricao" label="Area" outlined >
                </v-select>
                <!-- <v-text-field label="Area" class="logininput" type="text" id="login" name="login" v-model="senhaconfirmacao" /> -->
            </div>

            <div class="loginlinha">
                <v-select :items="categorias" v-model="categoria" item-value="id" item-text="descricao" label="Categoria" outlined ></v-select>
                <!-- <v-text-field label="Categoria" class="logininput" type="text" id="login" name="login" v-model="senhaconfirmacao" /> -->
            </div>

            <div class="loginlinha" >
                 <v-textarea outlined name="input-7-4" label="Mensagem" v-model="mensagem">

                 </v-textarea>
                <!-- <v-text-field label="texto" class="logininput" type="text" id="login" name="login" v-model="senhaconfirmacao" /> -->
            </div>

            <div class="loginlinha">
                <v-btn class="info" @click="atualizar()" >Salvar</v-btn>
            </div>
            
            <div class="loginlinha">
                <v-btn class="error" @click="atualizar()" >Cancelar</v-btn>
            </div>


        </div>

        <Modal v-bind:exibirModal="exibirModal" 
            v-bind:titulo="'Novo Chamado'" v-bind:texto="'Aqui voce pode abrir um novo chamado'"
            @setarModal="()=>exibirModal = !exibirModal" />
    </div>

    

    
</template>

<script>

import Modal from './Modal.vue'
export default {
    components:{
        Modal
    },
    name: 'listagem',
    props:["recuperarsenha","idusuario"],
    data: () => {
        return {
            headers: [],
            itens:[],
            exibirModal:false,
            pagina:'novochamado',
            // pagina:'datatable',
            areas: [],
            area:null,
            categorias: [],
            categoria:null,
            mensagem:null
        }
    },
    watch: {
      headers: (valor) => {
        this.headers = valor
      }
      
    },
    methods:{
        setarModal(){
            this.exibirModal = !this.exibirModal
        },
        carregarchamados(){
            // alert(1)
            let idusuario = 43
            console.log("Carregando dados")
            this.$http.get("/chamados?idusuario="+idusuario)
                .then((resp) => {
                   
                    if(resp.status == 200){
                        for(var i=0; i < Object.keys(resp.data[0]).length; i++){

                            this.headers[i] = { 
                                text: Object.keys(resp.data[0])[i], 
                                value: Object.keys(resp.data[0])[i]
                            }

                        }

                        this.itens = resp.data
                    }else{
                        this.itens = []
                    }

                })
                .catch((error) =>{
                    this.$alert(error);
                })
        },
        carregarAreas(){
            this.$http.get("/chamados/areas").then(resp =>{
                this.areas = resp.data
                // alert(this.area)
                if(this.area){
                    this.carregarCategorias(this.area)
                }else{
                    this.carregarCategorias(resp.data[0].id)
                }
            })
        },
        carregarCategorias(idcategoria){
            // alert("/chamados/categorias/"+idcategoria)
            this.$http.get("/chamados/categorias/"+idcategoria).then(resp =>{
                this.categorias = resp.data
            })
        }
    },
    mounted () {
        this.carregarchamados()
        this.carregarAreas()
    },
}
</script>

<style scoped>

   
    .loginlinha{
        display:flex;
        flex-direction: column;
        width:100%;
        padding:5px;
        margin-bottom: 5px;
    }

    .corpochamados{
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
