<template>
    <div>

        <div v-if="formulariologin && !recuperarsenha" class="corpologin">

            <h1 class="loginheader loginfontepadrao">Login</h1>
            
            <div class="loginlinhaheader"></div>

            <div class="loginlinha">
                <v-text-field label="Email" class="logininput" type="text" id="login" name="login" v-model="login" />
            </div>

            <div class="loginlinha">
                <v-text-field label="Senha" class="logininput" type="text" id="login" name="login" v-model="senha"/>
            </div>

            <div class="loginlinha">
                <a class="loginlink loginfontepadrao" @click="recuperarSenha()">Esqueci minha senha</a>
            </div>

            <div class="loginlinha">
                <v-btn class="loginbtnentrar" @click="logar()" >Entrar</v-btn>
            </div>

            <div class="loginlinha">
                <v-btn class="loginbtnentrar" @click="formulariologin = false" >Quero me Cadastrar</v-btn>
            </div>

        </div>

        <div v-if="!formulariologin && !recuperarsenha" class="corpologin">

            <h1 class="loginheader loginfontepadrao">Novo Cadastro</h1>
            
            <div class="loginlinhaheader"></div>

            <div class="loginlinha">
                <v-text-field label="Nome"  class="logininput" type="text" id="nome" name="nome" v-model="nome" />
            </div>

            <div class="loginlinha">
                <v-text-field label="Sobrenome"  class="logininput" type="text" id="sobrenome" name="sobrenome" v-model="sobrenome" />
            </div>

            <div class="loginlinha">
                <v-text-field label="Login"  class="logininput" type="text" id="login" name="login" v-model="login" />
            </div>

            <div class="loginlinha">
                <v-text-field label="Senha"  class="logininput" type="text" id="login" name="login" v-model="senha" />
            </div>

            <div class="loginlinha">
                <v-text-field label="Repita a Senha"  class="logininput" type="text" id="login" name="login" v-model="senhaconfirmacao" />
            </div>

            <div class="loginlinha">
                <v-btn class="loginbtnentrar" @click="cadastrar()" >Cadastrar</v-btn>
            </div>

            <div class="loginlinha">
                <v-btn class="loginbtnentrar" @click="formulariologin = true" >Já sou Cadastrado</v-btn>
            </div>

        </div>

        <div v-if="recuperarsenha" class="corpologin">

            <h1 class="loginheader loginfontepadrao">Recuperar Senha</h1>
            
            <div class="loginlinhaheader"></div>

            <div class="loginlinha">
                <v-text-field label="Senha" class="logininput" type="text" id="login" name="login" v-model="senha" />
            </div>

            <div class="loginlinha">
                <v-text-field label="Repita a Senha" class="logininput" type="text" id="login" name="login" v-model="senhaconfirmacao" />
            </div>

            <div class="loginlinha">
                <v-btn class="loginbtnentrar" @click="alterarSenha()" >Alterar Senha</v-btn>
            </div>


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
            senhaconfirmacao:null,
            formulariologin:true
        }
    },
    methods:{
        logar(){
            let dados = { email:this.login, senha:this.senha }
            this.$http.post("/usuario/login", dados)
                .then((resp) => {
                    if(resp.status == 200){
                        this.$router.push("/home")
                    }else{
                        this.$alert(resp["statusText"]);
                    }
                })
                .catch((error) =>{
                    this.$alert(error.response.data.msg);
                })
            
        },

        cadastrar(){

            if( !this.nome || !this.sobrenome || !this.login || !this.senha ){
                this.$alert("Todos os campos são obrigatórios");
                return
            }
            if( this.senha != this.senhaconfirmacao ){
                this.$alert("As senhas não estão iguais");
                return
            }

            let dados = { 
                nome:this.nome, sobrenome:this.sobrenome,
                email:this.login, senha:this.senha 
            }
            this.$http.post("/usuario/cadastro", dados)
                .then((resp) => {
                    if(resp.status == 200){
                        this.$alert("Usuário Cadastrado com Sucesso!");
                        this.$router.push("/home")
                    }else{
                        this.$alert(resp["statusText"]);
                    }
                })
                .catch((error) =>{
                    this.$alert(error.response.data.msg);
                })
            
        },

        alterarSenha(){
            if( !this.senhaconfirmacao || !this.senha ){
                this.$alert("Todos os campos são obrigatórios");
                return
            }

            if( this.senha != this.senhaconfirmacao ){
                this.$alert("As senhas não estão iguais");
                return
            }

            let dados = { 
                id:this.idusuario,
                senha:this.senha 
            }

            this.$http.post("/usuario/alterarsenha", dados)
                .then((resp) => {
                    if(resp.status == 200){
                        this.$alert("Senha Atualizada com Sucesso!");
                        this.$router.push("/home")
                    }else{
                        this.$alert(resp["statusText"]);
                    }
                })
                .catch((error) =>{
                    this.$alert(error.response.data.msg);
                })
            
        },

        recuperarSenha(){

            if(this.login){
                let dados = {email:"herlessi@gmail.com"}
                this.$http.post("/usuario/recuperarsenha", dados)
                    .then((resp) => {
                            this.$alert(resp["statusText"]);
                    })
                    .catch((error) =>{
                        this.$alert(error.response.data.msg);
                    })
            }else{
                this.$alert("Informe um email válido");
            }

            
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
