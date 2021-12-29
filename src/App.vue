<template>
  <v-app style="background: #f2f3f8">
   
    <notifications position="bottom center"/>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
