<template>
 <div>
  
   <v-card>
    <v-card-text>
      <v-row>
        <v-col cols="4">
          <v-btn
      class="mx-2"
      fab
      dark
      small
      color="primary"
      @click="modal = true"
    >
      <v-icon dark>
        fas fa-plus
      </v-icon>
    </v-btn>
        </v-col>
      </v-row>
       
    </v-card-text>
     <v-card-text>
       <v-data-table
    :headers="header"
    :items="productos"
    class="elevation-1"
  ></v-data-table>
     </v-card-text>
   </v-card>
   <v-dialog
   v-model="modal"
   
   >
   <v-card>
     <v-card-text>
       <v-text-field  
            v-model="descripcion"
            label="Ingrese la descripcion"
            />
             <v-text-field  
            v-model="precio"
            label="Ingrese el precio"
            />

     </v-card-text>
     <v-card-actions>
          <v-btn
      class="mx-2"
      color="primary"
      @click="guardarProducto"
    >
    GUARDAR
    </v-btn>
     <v-btn
      class="mx-2"
      color="danger"
      @click="modal = false"
    
    >
    CANCELAR
    </v-btn>
     </v-card-actions>
   </v-card>

   </v-dialog>
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
                {text:"Id",sortable:false,value:'productoId'},
                {text:"Cliente",sortable:false,value:'descripcion'},
                {text:"Precio",sortable:false,value:'precio'}]  ,
                
        productos : [],
        modal:false,
        descripcion : '',
        precio : 0
      }
    },
    methods:{
      async guardarProducto()
      {
         try
         {

            var loader = this.$loading.show({
                  container: null,
                  loader : 'spinner',
                   color: 'red',
                   opacity: 0.5,
                   height : 150,
                   width : 150
            });
            var json= {'descripcion' : this.descripcion, 'precio' : parseFloat(this.precio), 'productoId': 0};
            var rsp = await SaveAsync('producto/guardarproducto',json,adminAxios);
            if(rsp === "OK")
            {
                this.$notify({
                    title : 'Producto',
                    text : 'Producto Creado',
                    position : 'bottom center',
                    type : 'success'
                    });
              this.descripcion = "";
              this.precio = 0;
              this.modal = false;
              await this.ObtenerProductoAll();

            }
            else 
            {
              this.$notify({
                    title : 'Producto',
                    text : rsp,
                    position : 'bottom center',
                    type : 'success'
                    });
            }
         }
         catch(error)
         {
            this.$notify({
                    title : 'Producto',
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
      async ObtenerProductoAll()
      {
        try
        {
          var response = await ObtenerAsync('producto/obtenerproductoall',adminAxios);
          this.productos = response;
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
      this.ObtenerProductoAll();
    }
  }
</script>
