<template>
<v-card>
    <v-text-field
    v-if="busqueda"
    v-model="search"
    append-icon="fa-search"
    label="Búsqueda"
    single-line
    hide-details
    style="width: 500px"
    />
    <v-data-table
    :headers="headers"
    :items="UpdateItems"
    :items-per-page="5"
    :search="search"
    >

    
     <template
    v-slot:item.estado="{item}"
    >
    <v-btn  @click="$emit('editarEstado',item)" :color="UpdateColor(item.estado)" >{{UpdateTitle(item.estado)}}</v-btn>
    </template>



     <template
    v-slot:item.actions="{item}"
    >
      <slot name="campo" v-bind="item">

      </slot>
    </template>

    </v-data-table>
</v-card>
</template>

<script >
export default 
{
    data(){
        return{
            search:""
        }
    },
    props:{
        headers:{
            default : []
        },
        items:{
            default:[]
        },
        busqueda:{
            default:""
        },
        textoEstado :{
            default:""
        }
    },
    computed:{
         UpdateItems()
        {
        if(this.items.length > 0)
        {
            return this.items;
        }
        else
        {
            return [];
        }
        
        }
    },
    methods:{
        UpdateTitle(estado)
        {
            let texto ="";
            if(this.textoEstado !== "")
            {
                if(estado == "A")
                {
                    texto = "ABIERTA";
                }
                else
                {
                    texto = "CERRADA";
                }
            }
            else
            {
                if(estado == true)
                {
                    texto = "ACTIVO";
                }
                else
                {
                    texto ="INACTIVO";
                }
            }
        return texto;
        },
        UpdateColor(estado)
        {
            let color ="primary";
            if(estado == true)
            {
                color = "primary";
            }
            else
            {
                color ="secondary";
            }
            return color;
        }
    }
   

   
    

    
}
</script>