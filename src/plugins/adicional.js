import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import "vue-navigation-bar/dist/vue-navigation-bar.css";
import VueNavigationBar from "vue-navigation-bar";


// theme Main scss
import "@/assets/scss/octavia-design-system/octavia-design-system.scss";

export default{
    install(Vue){
        Vue.component("vue-navigation-bar", VueNavigationBar);
        Vue.component("VuePerfectScrollbar", VuePerfectScrollbar);

        Vue.component(
            "VerticalSidebar",
            // The `import` function returns a Promise.
      
            () => import("@/components/Home/Index")
          );
       
    }
}