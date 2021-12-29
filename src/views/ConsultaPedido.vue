<template>
 <div>
  
   <v-card>
    <v-card-text>
      <v-row>
        <v-col cols="8">
          <v-select
          :items="clientes"
           label="Clientes"
           placeholder="Clientes"
           text
           dense
           item-text="nombres"
          item-value="usuarioId"
           v-model="clienteId"
           clearable
          />
        </v-col>
        <v-col cols="4">
          <v-btn
      class="mx-2"
      fab
      dark
      small
      color="primary"
      @click="BuscarCompras"
    >
      <v-icon dark>
        fas fa-search
      </v-icon>
    </v-btn>
        </v-col>
      </v-row>
       
    </v-card-text>
     <v-card-text>
       <v-data-table
    :headers="header"
    :items="compras"
    class="elevation-1"
  >
     <template v-slot:item.despachar="{ item }">
       <v-btn color="primary"
       @click="despacharPedido(item)"
       >
      DESPACHAR
    </v-btn>


     </template>
  
  </v-data-table>
     </v-card-text>
   </v-card>
</div>
</template>

<script>
import {ObtenerJsonAsync,SaveAsync,ObtenerAsync} from '@/plugins/conexiondb';
import {adminAxios} from '@/plugins/axios';
  export default {
    name: 'Home',

    components: {
    },
    data()
    {
      return{
        header:[
                {text:"Fecha Registro",sortable:false,value:'fechaRegistro'},
                {text:"Cliente",sortable:false,value:'usuario'},
                {text:"Tracking",sortable:false,value:'tracking'}  ,
                {text:"Courier",sortable:false,value:'courier'}  ,
                {text:"Observacion",sortable:false,value:'observacion'},
                {text:"Estado",sortable:false,value:'estado'},
                {text:"Despachar",sortable:false,value:'despachar'}]
                ,
        compras : [],
        clientes : [],
        clienteId : "",
        items: [
          { title: 'Dashboard', icon: 'mdi-view-dashboard' },
          { title: 'Photos', icon: 'mdi-image' },
          { title: 'About', icon: 'mdi-help-box' },
        ],
      }
    },
    methods:{
      async despacharPedido(item)
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
          var response = await SaveAsync('compra/despachar',
          {
            'compraId' : item.compraId
          },
          adminAxios);
           if(response == "OK")
           {
               this.$notify({
                    title : 'Compras',
                    text : 'Producto despachado',
                    position : 'bottom center',
                    type : 'success'
                    });
           }
           else
           {
              this.$notify({
                    title : 'Compras',
                    text : 'response',
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
      },
      async ObtenerClienteAll()
      {
        try
        {
          var response = await ObtenerAsync('usuario/obtenercliente',adminAxios);
          this.clientes = response;
        }
        catch(error)
        {

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
            'usuarioId' : this.clienteId
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
    computed: {

    
  },
    mounted()
    {
      this.ObtenerClienteAll();
    }
  }
</script>
