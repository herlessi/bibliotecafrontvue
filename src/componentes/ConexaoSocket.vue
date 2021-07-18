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

        }
    },
    methods:{
        
        conectarSocket(){
            this.$socket.disconnect();
            this.$socket.io.opts.query.idusuario = 1
            this.$socket.io.opts.query.tipo = 'CONEXAOPADRAO'
            this.$socket.connect();
             alert("SOCKET 4")
            this.sockets.subscribe("funcaocliente", (dados) => {
                 alert("SOCKET 5")
                this.$alert("Funcao Cliente Executada com sucesso: "+dados.msg)
            });

        }

    },
    mounted(){
        this.conectarSocket()
    }
}
</script>

<style scoped>

    

</style>
