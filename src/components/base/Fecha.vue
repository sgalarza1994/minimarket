<template>
      <v-menu                   
        :disabled="disabled"
        v-model="menuLocal"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="auto"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    v-model="fechaLocal"
                    :label="label"
                    persistent-hint
                    :prepend-icon="iconoShow"
                    :readonly="readonly"
                    v-bind="attrs"
                    v-on="on"
                ></v-text-field>
            </template>
            <v-date-picker
                v-model="fechaLocal"
                no-title
                @input="cerrar"
                        
                ></v-date-picker>
         </v-menu>
</template>

<script>
import moment from 'moment';
export default {
    name : 'Fecha',
    components:{

    },
    data(){
        return{
            menuLocal:false,
            fechaLocal:''
        }
    },
    props:{
        menu:{
            type:Boolean
        },
        label:{
            type:String
        },
        icono:{
            type:String
        },
        fecha:{
            type:String
        },
        disabled:{
           type:Boolean
        },
        readonly:{
            type:Boolean
        },
        close:{
            type:Function
        }
    },
    computed:{
        fechaC()
        {
            return moment(new Date()).format("YYYY-MM-DD");
        },
        menuC()
        {
            var newMenu = this.menu;
            return newMenu;
        },
        iconoShow()
        {
            if(this.icono !== "")
            {
                return this.icono;
            }
            return "";
        }
    },
    methods:{
        cerrar()
        {
            this.close(this.fechaLocal);
            this.menuLocal = false;
        }
    },
    mounted(){
        this.menuLocal = this.menu;
        this.fechaLocal = moment(new Date()).format("YYYY-MM-DD");
    }
}
</script>