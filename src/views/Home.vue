<template>
  <v-app
    :style="{
      background: $vuetify.theme.themes[theme].background,
      color: $vuetify.theme.themes[theme].color,
    }"
    :class="{
      'app-admin-wrap-layout-1 sidebar-mini': getThemeMode.verticalSidebarMini,
      'sidebar-close': !getThemeMode.verticalSidebarDrawer,
    }"
  >
    <side-bar>
      <!-- -->
    </side-bar>

   
    <!-- <sub-header>
      
    </sub-header> -->
    <!-- Sizes your content based upon application components -->

    <base-view />
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  components: {
    BaseView: () => import("@/components/Home/View"),
    SideBar: () => import("@/components/Home/Sidebar"),
    AppBar: () => import("@/components/Home/AppBar"),
    SubHeader: () => import("@/components/Home/SubHeader"),
  },

  computed: {
    ...mapGetters(["getThemeMode"]),

    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
