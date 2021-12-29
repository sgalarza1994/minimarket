<template>
    <div class="session-bg">
        <div class="signup4-container">
            <base-card>
                <v-row no-gutters>
                    <v-col cols="12" md="6" class="pa-10" align-self="center">
                        <img
                            class=""
                            src="@/assets/3ALogo.png"
                        />
                    </v-col>
                    <v-col cols="12" md="6" class="bg-gray-300">
                        <div class="pa-4 mt-3">
                            <v-text-field label="Username"
                            v-model="userName" />
                            <v-text-field
                                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="show ? 'text' : 'password'"
                                name="input-10-2"
                                label="Password"
                                @click:append="show = !show"
                                v-model="password"
                            />
                            <div>
                                <v-btn 
                                :disabled="validarUsuario"
                                block
                                @click="loginUser"
                                color="primary">Iniciar Sesión
                                 </v-btn>
                                 <br />
                                  <v-btn 
                                  v-show="mostrarOcultarBoton"
                                block
                                @click="ModalRegistrar"
                                color="primary">Registrarse
                                 </v-btn>
                            </div>
                        </div>
                    </v-col>
                </v-row>
            </base-card>

            <v-dialog
        v-model="modal"
        max-width="400px"
        >
       <v-card>
        <v-toolbar color="primary" class="text-center">
            <v-toolbar-title class="mx-auto white--text">REGISTRAR</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
            <v-text-field  
            v-model="cedula"
            label="Ingrese la cedula"
            />
            <v-text-field  
            v-model="nombres"
            label="Ingrese los nombres"
            />
            <v-text-field  
            v-model="apellidos"
            label="Ingrese los apellidos"
            />
             <v-text-field  
            v-model="userName"
            label="Ingrese su nombre de usuario"
            />
            <v-text-field  
            v-model="email"
            label="Ingrese su email"
            />
            <v-text-field  
            v-model="passwordCrud"
            label="Ingrese su nombre password"
            :append-icon="show ? 'far fa-eye' : 'fas fa-eye-slash'"
            :type="show ? 'text' : 'password'"
            @click:append="show = !show"
            />
            <v-text-field  
            v-model="telefono"
            label="Ingrese su telefono"
            />
            <v-text-field  
            v-model="direccion"
            label="Ingrese su direccion"
            />
        </v-card-text>
        <v-card-actions class="justify-center">
            <v-btn 
                color="primary"
                @click="registrarUsuarioDb"
                >REGISTRAR
                
            </v-btn>
            <v-btn 
                color="danger"
                   @click="modal=false"
                >CANCELAR
             
            </v-btn>

        </v-card-actions>
    </v-card>

        </v-dialog>



        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
import {ObtenerJsonAsync,SaveAsync} from '@/plugins/conexiondb';
import {adminAxios} from '@/plugins/axios';
import isMobile from 'ismobilejs';
export default{
   name : 'Login',
   data(){
       return{
           userName: '',
           password : '',
           show:false,
           error:'',
           errorMessage: '',
           modal : false,
           cedula : '',
           nombres : '',
           apellidos : '',
           telefono : '',
           direccion : '',
           passwordCrud : '',
           email : '',
           mostrarBoton : true
       }
   },
   methods:{
       ...mapMutations({usuarioLogin : 'usuarioAuth/usuarioLogin',actualizarMaestro :'maestros/actualizarMaestro'}),
       async registrarUsuarioDb()
       {
            var loader = this.$loading.show({
                  container: null,
                  loader : 'spinner',
                   color: 'red',
                   opacity: 0.5,
                   height : 150,
                   width : 150
            });
            try
            {
                var json  =   {
                    'email': this.email,
                    'cedula': this.cedula,
                    'nombres': this.nombres,
                    'apellidos': this.apellidos,
                    'userName': this.userName,
                    'telefono': this.telefono,
                    'direccion': this.direccion,
                    'password': this.passwordCrud,
                    'tipo' : 2
                };
                console.log(json);
                var response = await SaveAsync('usuario/crearUsuario',json
              ,adminAxios);
                if(response == "OK")
                {
                    this.modal = false;
                    this.$notify({
                    title : 'Creacion de usuario',
                    text : 'Usuario Creado con exitoso',
                    position : 'bottom center',
                    type : 'success'
                    });
                    
                }
                else
                {
                    this.$notify({
                    title : 'Creacion de usuario',
                    text : response,
                    position : 'bottom center',
                    type : 'success'
                    });
                }
            }
            catch(error)
            {
                this.$notify({
                    title : 'Creacion de usuario',
                    text : error,
                    position : 'bottom center',
                    type : 'success'
                    });
            }
            finally
            {
                loader.hide();
            }
       },
        async loginUser()
        {
            var loader = this.$loading.show({
                  container: null,
                  loader : 'spinner',
                   color: 'red',
                   opacity: 0.5,
                   height : 150,
                   width : 150
            })
            
            try
            {
              let response = await ObtenerJsonAsync('usuario/loginUsuario',
              {'userName' :this.userName,'password':this.password},adminAxios)
              if(response !== "ERROR")
              {
                this.usuarioLogin(response);
                localStorage.setItem("token",response.token);
                //Administrador
                 if(response.tipo == 1)
                 {
                     this.$router.replace({name : 'ConsultaPedido'})
                 }
                 // Cliente
                 else
                 {
                     this.$router.replace({name : 'HomeCliente'})
                 }

                //
              }
              else 
              {
                  this.$notify({
                    title : 'Autenticacion',
                    text : response,
                    position : 'bottom center',
                    type : 'success'
                    });
              }

            }
            catch(error)
            {
                this.$notify({
                    title : 'Autenticacion',
                    text : error,
                    position : 'bottom center',
                    type : 'success'
                    });
            }
            finally
            {
               loader.hide();
            }
       },

       ModalRegistrar()
       {
           this.componenteName = 'registrarUsuario';
           this.modal = true;
       }
   },
   computed:{
       validarUsuario(){
           if(this.userName === "" || this.password === "")
           {
               return true;
           }
           return false;
       },
       mostrarOcultarBoton()
       {
           var width = screen.width;
        if(width < 1024)
        {
            return true;
        }
        else if(width < 1280)
        {
            return true;
        }
        else 
        {
            return false;
        }
       }
   },
   mounted(){
        
      
   }
}
</script>

<style lang="scss">
.session-bg {
    background-image: url('../../assets/logo3a.jpg');
    height: 100vh;
    align-items: center;
    place-content: center;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
}
.signup4-header img {
    width: 200px;
}
.signup4-container img {
    max-height: 300px;
    max-width: 100%;
}
@media only screen and (min-width: 1024px) {
    .signup4-container {
        max-width: 800px;
    }
}
</style>