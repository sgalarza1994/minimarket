import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import es from 'vuetify/lib/locale/es';
import { themePreset } from "../../src/themeConfig";
Vue.use(Vuetify);

export default new Vuetify({
  theme: themePreset.theme,
  rtl: themePreset.rtl,
    lang: {
      locales: { es },
      current: 'es',
    },
  icons: {
    iconfont: 'fa',
  },
  
});
