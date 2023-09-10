/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";
import { VDatePicker } from "vuetify/labs/VDatePicker";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  components: { VDatePicker },
  defaults: {
    global: {
      ripple: false,
    },
    VBtn: { elevation: 0, style: "text-transform:none" },
    VSelect: { flat: true, "single-line": true },
    VTextField: { flat: true, "single-line": true },
  },
  theme: {
    themes: {
      light: {
        colors: {
          primary: "#1867C0",
          secondary: "#5CBBF6",
        },
      },
    },
  },
});
