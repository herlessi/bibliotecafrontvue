<template>
    <div>

        <div  class="corpologin">

            <h1 class="loginheader loginfontepadrao">Perfil</h1>
            
            <div class="loginlinhaheader"></div>

            <div class="loginlinha">
                <label class="loginlabel loginfontepadrao" for="nome">Nome</label>
                <input class="logininput" type="text" id="nome" name="nome" v-model="nome">
            </div>

            <div class="loginlinha">
                <label class="loginlabel loginfontepadrao" for="sobrenome">Sobrenome</label>
                <input class="logininput" type="text" id="sobrenome" name="sobrenome" v-model="sobrenome">
            </div>

            <!-- <div class="loginlinha">
                <label class="loginlabel loginfontepadrao" for="login">Email</label>
                <input class="logininput" type="text" id="login" name="login" v-model="login">
            </div> -->

            <div class="loginlinha">
                <label class="loginlabel loginfontepadrao" for="login">Senha</label>
                <input class="logininput" type="text" id="login" name="login" v-model="senha">
            </div>

            <div class="loginlinha">
                <label class="loginlabel loginfontepadrao" for="login">Repetir Senha</label>
                <input class="logininput" type="text" id="login" name="login" v-model="senhaconfirmacao">
            </div>

            <div class="loginlinha">
                <v-btn class="loginbtnentrar" @click="atualizar()" >Atualizar</v-btn>
            </div>

            <!-- <div class="loginlinha">
                <v-btn class="loginbtnentrar" @click="formulariologin = true" >Já sou Cadastrado</v-btn>
            </div> -->

        </div>

      
    </div>

    

    
</template>

<script>
export default {
    name: 'Login',
    props:["recuperarsenha","idusuario"],
    data: () => {
        return {
            nome:null,
            sobrenome:null,
            login:null,
            senha:null,
            senhaconfirmacao:null
        }
    },
    methods:{
        
        atualizar(){

            if( !this.nome || !this.sobrenome || !this.senha || !this.senhaconfirmacao ){
                this.$alert("Todos os campos são obrigatórios");
                return
            }
            if( this.senha != this.senhaconfirmacao ){
                this.$alert("As senhas não estão iguais");
                return
            }

            let dados = { 
                id:this.idusuario,
                nome:this.nome, sobrenome:this.sobrenome, senha:this.senha 
            }
            this.$http.put("/usuario", dados)
                .then((resp) => {
                    if(resp.status == 200){
                        this.$alert("Usuário Atualizado com Sucesso!")
                    }else{
                        this.$alert(resp["statusText"]);
                    }
                })
                .catch((error) =>{
                    this.$alert(error.response.data.msg);
                })
            
        },

        
    },
    mounted(){
        if(this.idusuario){
            this.$http.get("/usuario?id="+this.idusuario)
                .then((resp) => {
                    console.log(resp.data[0])
                    if(resp.status == 200){
                        this.nome = resp.data[0].nome
                        this.sobrenome = resp.data[0].sobrenome
                        // this.login = resp.data[0].email
                        // this.senha = resp.data[0].senha
                    }else{
                        this.$alert(resp["statusText"]);
                    }
                })
                .catch((error) =>{
                    this.$alert(error.response.data.msg);
                })
        }else{
            this.$alert("Usuário não encontrado!");
        }
    }
}
</script>

<style scoped>

    .loginheader{
        margin-bottom: 5px;
    }

    .loginfontepadrao{
        color:#757575;
    }

    .corpologin{
        display:flex;
        flex-direction: column;
        justify-content:center;
        align-items: center;
        padding-left:5%;
        padding-right:5%;
    }

    .loginlinhaheader{
        min-height:5px;
        width: 100%;
        border-bottom: 2px solid black;
        margin-bottom: 20px;
    }

    .loginlinha{
        display:flex;
        flex-direction: column;
        width:100%;
        padding:5px;
        margin-bottom: 5px;
    }

    .loginlinha .loginlabel{
        margin-bottom:2px;
        font-size: 1em;
        font-weight: bold;
        
    }

    .loginlinha .logininput{
        margin-top:0.4em;
        height: 2.5em;
    }

    .loginlinha .loginbtnentrar{
        background-color: #000000;
        height:2.5em;
        color:white;
        display:flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        cursor:pointer;
    }

    .loginlinha .loginlink{
        text-decoration: underline;
        font-size: 1.1em;
        font-weight: bold;
        cursor:pointer;
    }

</style>
