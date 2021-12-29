<template>
    <div>
       <v-container fluid> 
          <v-data-iterator
          :items="productos"
          >
          <template v-slot:header>
            <v-toolbar class="mb-2"
          color="indigo darken-5"
          dark
          flat>
              <v-toolbar-title>Productos</v-toolbar-title>
            </v-toolbar>

          </template>

          <template v-slot:default="props">
            <v-row>
              <v-col
              v-for="item in props.items"
              :key="item.productoId"
              cols="12"
              sm="6"
              md="4"
              lg="3"
              >
              <v-card>
                <v-card-title class="subheading font-weight-bold">{{item.descripcion}}
                     <v-btn
                class="mx-2"
                fab
                dark
                color="indigo"
                small
                @click="agregarCarrito(item)"
                >
              <v-icon dark>
                fas fa-plus
              </v-icon>
              </v-btn>

                </v-card-title>
                
                <v-divider></v-divider>

                <v-list dense>
                  <v-list-item>
                  <v-list-item-content>Precio:</v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{ item.precio }}
                  </v-list-item-content>
                </v-list-item>
                </v-list>
              </v-card>

              </v-col>
            </v-row>


          </template>

          </v-data-iterator>
       </v-container>

      <v-bottom-navigation 
       v-show="mostrarOcultarBoton"
       absolute
    hide-on-scroll
    horizontal
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
  export default {
    name: 'Home',

    components: {
      
    },
    data()
    {
      return{
        productos : []
      }
    },
    methods:{
      ...mapMutations({addProducto:'maestros/addProduct'}),
      irRuta(ruta)
      {
        var actual = this.$route.name;
        if(actual !== ruta)
        {
          this.$router.replace({name : ruta});
        }
      
        
      },
      agregarCarrito(item)
      {
        this.addProducto(item);
        this.$notify({
                    title : 'Producto',
                    text : 'Producto Agregado',
                    position : 'bottom center',
                    type : 'success'
                    });
      },
      async CargarProducto()
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

            this.productos = await ObtenerAsync('producto/obtenerproductoall',adminAxios);
            
        }
        catch(error)
        {

        }
        finally
        {
          loader.hide();
        }
      }
    },
      computed:{
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
      await this.CargarProducto();
    }
  }
</script>
