<template>
  <v-app id="app" >
    <v-container class="home">
      Home
    </v-container>
   
    <v-main>
      <router-view/>
    </v-main>

  </v-app>
</template>

<script>

export default {
  name: 'App',
 components:{
   
 },

 data: () => ({
        drawer:true,
    }),
};
</script>

<style>
#app {
    background-color: rgb(241, 239, 239);
}
</style>
