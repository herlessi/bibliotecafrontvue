<template>
    <div>

        <div  class="corpologin">

            <img style="border-radius: 50%;width:30%;margin-bottom:20px;" src="https://bookingagentinfo.com/wp-content/uploads/2014/12/Travis-Scott-Contact-Information.jpg" />
            
            <div style="height:100px;display:flex;justify-content:center;align-items:center;width:100%;">
              <label  for="file-upload-verso" style="height:40px;border-radius:5px;background-color:#00457b;color:white;font-weight:bold;width:100%;display:flex;justify-content:center;align-items:center;">
                    <span style="font-size:18px;font-weight:bold;color:white;">Trocar Foto</span>
              </label>    
              <input id="file-upload-verso" type="file" style="display:none;" accept="image/*"  @change="trocarFoto" />
            </div>


            <div class="loginlinhaheader"></div>

            <div class="loginlinha">
                <v-text-field label="Senha" class="logininput" type="text" id="login" name="login" v-model="nome" />
            </div>

            <div class="loginlinha">
                <v-text-field label="Senha" class="logininput" type="text" id="login" name="login" v-model="sobrenome" />
            </div>

            <div class="loginlinha">
                <v-text-field label="Senha" class="logininput" type="text" id="login" name="login" v-model="senha" />
            </div>

            <div class="loginlinha">
                <v-text-field label="Senha" class="logininput" type="text" id="login" name="login" v-model="senhaconfirmacao" />
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
            senhaconfirmacao:null,
            pathImg:null
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

        trocarFoto(e){
            const file = e.target.files[0];

            if (!file.type.includes("image/")) {
                alert("Please select an image file");
                return;
            }

            if (typeof FileReader === "function") {
                const reader = new FileReader();

                reader.onload = (event) => {
                    this.pathImg = event.target.result;
                    let index = event.target.result.indexOf(",") + 1;
                    this.pathImg = event.target.result.substring(index,event.target.result.length);
                    if(this.pathImg){
                        this.salvaLogo(file.type)
                    }
                };
                reader.readAsDataURL(file);
            } else {
                alert("Sorry, FileReader API not supported");
            }
        },

        async salvaLogo(tipoImg) {
            alert(tipoImg)
            alert(this.pathImg)
            // if (!this.pathImg.length > 0) {
            //     console.log("invalido");
            //     return;
            // }

            // let dados =   {
            //                 "token":'3c8478c895580214e0ff389448054854',
            //                 "tokenInfo":{"usuario":{"id":localStorage.getItem('userid')} },
            //                 "tipo" : tipoImg,
            //                 "nome" : this.ladodocnome,
            //                 "dados" : this.pathImg,
            //                 "tabela": "hospede",
            //                 "fk": this.ladodocfk,
            //                 "chave": "id",
            //                 "valor": this.idhospede
            //             }
            // await this.$http.post("/imagem/upinsertAuthSimples",dados,
            //     {timeout:60000 }
            //     )
            //     .then((response) => {
            //         if(response.status == 200){
            //             if(this.ladodocfk == 'docfrente'){
            //             this.pathImgFrente = this.pathImg
            //             }else{
            //             this.pathImgVerso = this.pathImg
            //             }
            //             console.log("Documento Frente Salvo com Sucesso!");
            //             // this.manipularDirecionamento(response.data.result.imagem[0])
            //         }else{
            //             console.log("Não foi possivel salvar Documento Frente!")
            //         }
            //     })
            //     .catch((error) => {
            //     console.log(error.response);
            //     });
        },

        
    },
    mounted(){
        if(this.idusuario){
            this.$http.get("/usuario?id="+this.idusuario)
                .then((resp) => {
                    // alert(resp.data[0])
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
        margin-top:10px;
        width:100%;
        /* background-color: #000000;
        height:2.5em;
        color:white;
        display:flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        cursor:pointer; */
    }

    .loginlinha .loginlink{
        text-decoration: underline;
        font-size: 1.1em;
        font-weight: bold;
        cursor:pointer;
    }

</style>
