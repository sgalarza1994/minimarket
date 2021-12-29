<template>
    <v-card>
        <v-card-title v-if="llevaTitulo" style="font-weight: bold">{{titulo}}</v-card-title>
        <v-data-table
            :headers="headers"
            :items="items"
            class="elevation-1"
        >   
            <template v-slot:item.acciones="item" v-if="llevaBotones">
                <v-tooltip bottom v-for="(boton, index) in botones" :key="index">
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon
                            v-bind="attrs"
                            v-on="on"
                            v-if="boton.necesitaIndex"
                            @click="$emit(boton.action, item)" class="ma-1" 
                        >
                        {{boton.icon}}
                        </v-icon>
                        <v-icon
                            v-bind="attrs"
                            v-on="on"
                            v-if="!boton.necesitaIndex"
                            @click="$emit(boton.action, item.item)" class="ma-1" 
                        >
                        {{boton.icon}}
                        </v-icon>
                    </template>
                    <span>{{boton.tooltip}}</span>
                </v-tooltip>
            </template>
            <template v-slot:no-data>
                <p>No hay registros</p>
            </template>
        </v-data-table>
    </v-card>
</template>

<script>
export default {
    
    props:{
        llevaTitulo:{
            type:Boolean
        },
        titulo:{
            type:String
        },
        headers:{
            type:Array
        },
        llevaBotones:{
            type : Boolean
        },
        botones:{
            type : Array
        },
        items:{
            type : Array
        }
    }
}
</script>