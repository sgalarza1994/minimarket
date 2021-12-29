<template>
<div>
      <v-container>
          <v-card class="scroll"
          max-height="300px"
          >
              <v-card-actions>
                  <v-btn
                    depressed
                    color="primary"
                    @click="registrarPedido"
                    >
                    CREAR PEDIDO
                    </v-btn>
              </v-card-actions>
               <v-card-text>
              <v-row>
                  <v-col  md="6" lg="6" sm="12">
                      <v-text-field  
                    v-model="courier"
                    label="Ingrese el courier"
                    />

                     <v-text-field  
                    v-model="tracking"
                    label="Ingrese el tracking"
                    />
                    <v-text-field  
                    v-model="observacion"
                    label="Ingrese la observacion"
                    />
                    <v-text-field  
                    v-model="factura"
                    label="Ingrese la factura"
                    />
                  </v-col>
            
             
                   
                    

                  </v-row>

              </v-card-text>
               

              <v-card-text>

                  <v-data-table
          :headers="header"
          :items="productosAgregados"
          
          >
            <template v-slot:item.eliminar="{ item}">
                 <v-btn
                    class="mx-2"
                    small
                    icon
                    @click="eliminarProducto(item)"
               
            >
            <v-icon>
            far fa-trash-alt
            </v-icon>
            </v-btn>
            </template>

          </v-data-table>
              </v-card-text>
              
          </v-card>



          
      </v-container>

      <v-bottom-navigation 
    
    v-show="mostrarOcultarBoton"
    horizontal
    absolute
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
    name : 'Carrito',
    data(){
        return {
               header:[
                {text:"Descripcion",sortable:false,value:'descripcion'},
                {text:"Precio",sortable:false,value:'precio'},
                {text:"Eliminar",sortable:false,value:'eliminar'}
                ],
                factura: '',
                observacion : '',
                courier : '',
                tracking : ''
        }
    },
    methods:{
         ...mapMutations({deleteProduct:'maestros/deleteProduct', deleteProductAll : 'maestros/deleteProductAll'}),
      irRuta(ruta)
      {
        var actual = this.$route.name;
        if(actual !== ruta)
        {
          this.$router.replace({name : ruta});
        }
      
        
      },
      eliminarProducto(item)
      {
         this.deleteProduct(item);
      },
      limpiarFormulario()
      {
           this.courier = '';
           this.tracking = '';
           this.observacion = '';
           this.factura = '';
      },
      async registrarPedido()
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
            })
            if(this.productosAgregados.length <=0)
            {
                this.$notify({
                    title : 'Compras',
                    text : 'Debe agregar producto para enviar',
                    position : 'bottom center',
                    type : 'danger'
                });
                return;
            }
            var jsonEnviar = {
                'courier' : this.courier,
                'tracking' : this.tracking,
                'observacion' : this.observacion,
                'factura' : this.factura,
                'usuarioId' : this.usuarioId,
                'items' : this.productosAgregados
            }
            var response = await SaveAsync('compra/crearcompra',jsonEnviar,adminAxios);
            if(response === "OK")
            {
                 this.$notify({
                    title : 'Compras',
                    text : 'Pedido exitoso',
                    position : 'bottom center',
                    type : 'success'
                });
                this.limpiarFormulario();
                this.deleteProductAll();
            }
            else
            {
                this.$notify({
                    title : 'Compras',
                    text : response,
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
    }
}
</script>

<style>
.scroll {
   overflow-y: scroll
}

</style>