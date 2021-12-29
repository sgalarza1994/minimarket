<template>
<div>
      <v-card>
          <v-data-table
          :headers="header"
          :items="compras"
          
          >

          </v-data-table>
      </v-card>

      <v-bottom-navigation 
    absolute
    hide-on-scroll
    horizontal
     v-show="mostrarOcultarBoton"
    >
    <v-btn @click="irRuta('HomeCliente')" >
      <span>Home</span>

      <v-icon>fas fa-home</v-icon>
    </v-btn>

    <v-btn @click="irRuta('Pedido')">
      <span>Pedido</span>

      <v-icon>fas fa-shopping-cart</v-icon>
    </v-btn>
    <v-btn @click="irRuta('Carrito')">
      <span>Carrito</span>

      <v-icon>fas fa-cart-arrow-down</v-icon>
    </v-btn>
  </v-bottom-navigation>
    </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex';
import {ObtenerJsonAsync,SaveAsync,ObtenerAsync} from '@/plugins/conexiondb';
import {adminAxios} from '@/plugins/axios';
export default 
{
    data()
    {
        return{
             header:[
                {text:"Fecha Registro",sortable:false,value:'fechaRegistro'},
                {text:"Tracking",sortable:false,value:'tracking'}  ,
                {text:"Courier",sortable:false,value:'courier'}  ,
                {text:"Observacion",sortable:false,value:'observacion'},
                {text:"Total",sortable:false,value:'total'},
                {text:"Estado",sortable:false,value:'estado'}],
        compras : [],
        }
    },
    methods:{
      irRuta(ruta)
      {
        var actual = this.$route.name;
        if(actual !== ruta)
        {
          this.$router.replace({name : ruta});
        }
      
        
      },
      async BuscarCompras()
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
          
          var response = await ObtenerJsonAsync('compra/obtenercomprafiltro/',{
            'usuarioId' : this.usuarioId
          },adminAxios);
          console.log(response);
          if(response.length > 0)
          {
            this.compras = response;
          }
          else 
          {
            this.$notify({
                    title : 'Compras',
                    text : 'No se encontro registros',
                    position : 'bottom center',
                    type : 'success'
                    });
          }
        }
        catch(error)
        {
          this.$notify({
                    title : 'Compras',
                    text : error,
                    position : 'bottom center',
                    type : 'success'
                    });
        }
        finally
        {
          loader.hide();
        }
      }
    },
    computed:{
        ...mapState("maestros",['productosAgregados']),
        ...mapState("usuarioAuth",['usuarioId']),
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
    async mounted()
    {
        await this.BuscarCompras();
    }
}
</script>