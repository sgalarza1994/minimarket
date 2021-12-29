<template>
    <v-tooltip
          top
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              :color="colorCustomerButton"
              :icon="iconCustomer"
              v-bind="attrs"
              v-on="on"
              :disabled="disabled"
              :class="classCustomer"
              @click="$emit('click')"
            >
            {{textoCustomer}}
              <v-icon 
              :color="colorCustomerIcon"
              right
              
              >
                {{icono}}
              </v-icon>
            </v-btn>
          </template>
          <span>{{mensaje}}</span>
        </v-tooltip>
</template>

<script>
export default {
    data()
    {
        return{

        }
    },
    computed:{
        textoCustomer()
        {
            if(this.texto === true)
            {
                return this.textoButton
            }
            else
            {
            return "";
            }
        },
        classCustomer()
        {
            if(this.classButton === "")
            {
                return "";
            }
            else
            {
                return this.classButton;
            }
        },
        iconCustomer()
        {
            if(this.textoButton === "")
            {
                return true;
            }
            else 
            {
                return false;
            }
        },
        colorCustomerButton()
        {
            if(this.textoButton === "")
            {
                return "";
            }
            else 
            {
                return this.color;
            }
        },
        colorCustomerIcon()
        {
            if(this.textoButton === "")
            {
                return this.color;
            }
            else 
            {
                return "white";
            }
        }
    },
    props:{
        mensaje:{
            default : ""
        },
        icono:{
            default :"",
        },
        color :{
            default : ""
        },
        disabled:{
            default:false
        },
        texto:{
            default :""
        },
        textoButton:{
            default:""
        },
        classButton:{
            default:""
        }
    }
    
}
</script>