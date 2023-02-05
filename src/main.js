import store from "./store";
import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import VeeValidatePlugin from "./includes/validation";
import VueAxios from "vue-axios";
import axios from "./includes/axiosConfig";

/*import fontawesome Library*/
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

/*bootstrap 5*/
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

/*custom css*/
import "@/assets/signIn.css";
import "@/assets/dashboard.css";
import "@/assets/usersList.css";

/*sweet alert 2*/
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

if (localStorage.getItem("IS-token") != null) {
  store.dispatch("restoreSession").then(() => {
    creatVueInctance();
  });
} else {
  creatVueInctance();
}

function creatVueInctance() {
  const app = createApp(App);

  app.use(store);
  app.use(router);
  app.use(VeeValidatePlugin);
  app.use(VueAxios, axios);
  app.use(VueSweetalert2);

  app.mount("#app");
}
