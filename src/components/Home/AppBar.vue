<template>
  <div>
    <v-sheet class="header-backup"></v-sheet>
    <v-app-bar
      :color="$vuetify.theme.dark ? 'dark' : getThemeMode.appBarColor"
      :dark="getThemeMode.appBarColor != 'white' ? true : false"
      app
      class="px-sm text-left shadow-sm ma-4 rounded-lg"
      flat
      height="75"
    >
      <v-app-bar-nav-icon
        v-ripple="{ class: 'primary--text' }"
        @click="toggleVerticalSidebarDrawer"
      />
     
      <v-progress-linear
        :active="getThemeMode.isLoading"
        :indeterminate="getThemeMode.isLoading"
        absolute
        bottom
        color="primary"
      />

      <!-- <v-toolbar-title>Egret Vue</v-toolbar-title> -->

      <v-spacer />

     

      <v-btn icon @click="searchDrawer = !searchDrawer">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      
    </v-app-bar>
    <!-- userDrawer -->
  <!--  <v-navigation-drawer
      v-model="userDrawer"
      fixed
      right
      height="100%"
      temporary
      floating
      width="350"
    >
      

      <template v-slot:append>
        <div class="my-4 mx-4">
          <base-hover-button
            @click.native="logoutUser"
            text="Logout"
            block
            bg-color="primary lighten-5 primary--text"
            icon-name="mdi-logout"
          />
        </div>
      </template>
    </v-navigation-drawer>

 -->
    <!-- searchDrawer -->
   
  </div>
</template>

<script>
import { mapGetters, mapActions,mapState } from "vuex";

export default {
  name: "VerticallAppBar",
  components: {
   
    
  },
  computed: {
    ...mapGetters(["getThemeMode"]),
    ...mapState("usuarioAuth",['fullName'])
  },
  data() {
    return {
      userDrawer: false,
      notificationDrawer: false,
      searchDrawer: false,
      navbarOptions: {
        elementId: "main-navbar",
        isUsingVueRouter: true,
        mobileBreakpoint: 992,
        brandImagePath: "./",
        brandImageAltText: "brand-image",
        collapseButtonOpenColor: "#661c23",
        collapseButtonCloseColor: "#661c23",
        showBrandImageInMobilePopup: true,
        ariaLabelMainNav: "Main Navigation",
        tooltipAnimationType: "shift-away",
        menuOptionsLeft: [
          {
            type: "link",
            text: "Dashboard",
            iconLeft: '<i class="mdi mdi-view-dashboard"></i>',
            subMenuOptions: [
              {
                type: "link",
                text: "Learning Management",
                path: { name: "learning-management" },
                iconLeft: '<i class="mdi mdi-circle-medium"></i>'
              },

              {
                type: "link",
                text: "Job Management",
                path: { name: "job-management" },
                iconLeft: '<i class="mdi mdi-circle-medium"></i>'
              },
              {
                type: "link",
                text: "Analytic",
                path: { name: "analytic" },
                iconLeft: '<i class="mdi mdi-circle-medium"></i>'
              },
              {
                type: "link",
                text: "Cryptocurrency",
                path: { name: "crypto-currency" },
                iconLeft: '<i class="mdi mdi-circle-medium"></i>'
              },
              {
                type: "link",
                text: "Sales",
                path: { name: "sales" },
                iconLeft: '<i class="mdi mdi-circle-medium"></i>'
              },
              {
                type: "link",
                text: "Subscription",
                path: { name: "donation" },
                iconLeft: '<i class="mdi mdi-circle-medium"></i>'
              }
            ]
          }
        ]
      }
    };
  },
  methods: {
    ...mapActions([
      "changeVerticalSidebarDrawer",
      ,
      "changeVerticalSidebarMini",
      "signOut"
    ]),
    toggleVerticalSidebarDrawer() {
      this.changeVerticalSidebarDrawer();

      // this.$emit("update:mini-variant");
      // console.log("check");
    },
    logoutUser() {
      this.signOut();

      this.$router.push("/app/sessions/sign-in-two");
    }
  }
};
</script>

<style lang="scss">
.header-backup {
  display: block;
  width: 100%;
  height: 102px;
  position: fixed;
  top: 0;
  z-index: 5;
  background: linear-gradient(
    180deg,
    hsla(0, 0%, 97.3%, 0.95) 44%,
    hsla(0, 0%, 97.3%, 0.46) 73%,
    hsla(0, 0%, 100%, 0)
  ) !important;
  left: 0;
  &.theme--dark {
    background: linear-gradient(
      180deg,
      rgba(5, 5, 5, 0.95) 44%,
      rgba(0, 0, 0, 0.46) 3%,
      hsla(0, 0%, 100%, 0)
    ) !important;
  }
}
.tippy-box[data-theme~="light"] {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
.vnb {
  background: transparent !important;
  &__menu-options {
    margin-top: 3px !important;
    &__option {
      &__link {
        &:focus {
          outline: none;
          border: 1px solid none;
        }
        &:hover {
          color: #0081ff;
          .vnb__menu-options__option__arrow {
            fill: #0081ff;
          }
        }

        &__icon {
          svg {
            fill: #0081ff !important;
          }
        }
      }
    }
  }

  &__sub-menu-options {
    &__option {
      &__link {
        &:focus {
          outline: none;
          border: 1px solid none;
        }
        color: #000 !important;
        &:hover {
          color: #0081ff !important;
        }
      }
    }
  }
}

.vnb__collapse-button {
  &:focus {
    border: 1px solid none;
    outline: none;
  }
  &:after {
    content: "\F035C";
    font-size: 25px;
    font-weight: 600;
    font-family: "Material Design Icons";
  }
  svg {
    display: none !important;
  }
}

.vnb__popup {
  max-height: 80vh;
  overflow-x: hidden;
  overflow-y: scroll !important;
  .vnb__popup__top__close-button {
    &:focus {
      border: 1px solid none;
      outline: none;
    }
    top: 20px;
    right: -33px;
    svg {
      fill: #000 !important;
    }
  }
}
</style>
