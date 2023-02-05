<template>
  <!--login secction-->
  <section class="login-content">
    <div class="container">
      <div
        class="row align-items-center justify-content-center height-self-center"
      >
        <div class="col-lg-8">
          <div class="card auth-card">
            <div class="card-body">
              <div class="d-flex align-items-center auth-content">
                <div class="col-lg-7 align-self-center">
                  <div class="p-3">
                    <h2 class="mb-2">تسجيل الدخول</h2>
                    <p>املأ الخانات لتسجيل الدخول</p>

                    <!--login form-->
                    <veeForm
                      @submit="signIn"
                      :validationSchema="signInSchema"
                      :initialValues="signInValues"
                    >
                      <div class="row">
                        <div class="col-lg-12">
                          <div
                            class="floating-label form-group has-error has-danger"
                          >
                            <veeField
                              class="floating-input form-control"
                              id="email"
                              type="email"
                              name="email"
                              value=""
                              placeholder=""
                            />
                            <label class="p-0 m-0"
                              >بريدك الالكتروني<span class="text-danger"
                                >*</span
                              ></label
                            >
                            <ErrorMessage
                              name="email"
                              class="text-danger fw-bold"
                            />
                          </div>
                        </div>
                        <div class="col-lg-12">
                          <div class="floating-label form-group">
                            <veeField
                              class="floating-input form-control"
                              type="password"
                              placeholder=""
                              name="password"
                              autocomplete="current-password"
                            />
                            <label class="p-0 m-0"
                              >كلمة المرور<span class="text-danger"
                                >*</span
                              ></label
                            >
                            <ErrorMessage
                              name="password"
                              class="text-danger fw-bold"
                            />
                          </div>
                        </div>
                        <div class="col-lg-6">
                          <div class="custom-control custom-checkbox mb-3">
                            <veeField
                              name="rememberMe"
                              type="checkbox"
                              class="custom-control-input"
                              id="customCheck1"
                              @change="
                                signInValues.rememberMe =
                                  !signInValues.rememberMe
                              "
                              v-model="signInValues.rememberMe"
                            />
                            <label
                              class="custom-control-label control-label-1"
                              for="customCheck1"
                              >تذكرني</label
                            >
                          </div>
                        </div>
                        <div class="col-lg-6">
                          <a href="" class="text-primary float-end mb-2"
                            >هل نسيت كلمة المرور؟</a
                          >
                        </div>
                      </div>
                      <div class="d-flex flex-row">
                        <button
                          type="submit"
                          class="btn btn-primary"
                          :disabled="in_submission"
                        >
                          تسجيل الدخول
                        </button>
                        <loading v-show="in_submission" />
                      </div>
                    </veeForm>
                    <!--message alert-->
                    <div
                      class="text-center m-3 border-0 p-0"
                      v-show="show_alert"
                      :class="alert_clase"
                    >
                      {{ alert_msg }}
                    </div>
                  </div>
                </div>
                <div class="col-lg-5 content-right">
                  <img
                    src="/img/business-3d.png"
                    class="img-fluid image-right p-2"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!--footer-->
  <ISfooter></ISfooter>
</template>

<script>
import { setCookie, getCookie } from "@/includes/manageCookies.js";
import store from "@/store";
import loading from "@/components/loading.vue";
import ISfooter from "./footer.vue";
export default {
  name: "signIn",
  components: { loading, ISfooter },
  data() {
    return {
      in_submission: false,
      show_alert: false,
      alert_clase: "",
      alert_msg: "",
      signInSchema: {
        email: "required|email",
        password: "required|min:5|max:20",
      },
      signInValues: {
        email: getCookie("userEmail") || "",
        password: getCookie("userPassword") || "",
        rememberMe: false,
      },
    };
  },
  methods: {
    async signIn(values) {
      if (values.rememberMe) {
        setCookie("userEmail", values.email, 365);
        setCookie("userPassword", values.password, 365);
      }
      let cred = {
        email: values.email,
        password: values.password,
      };

      this.in_submission = true;
      let res = await this.$store.dispatch("signInAction", cred);
      if (res) {
        this.show_alert = true;
        this.alert_clase = "alert alert-info";
        this.alert_msg = "تم تسجيل الدخول بنجاح";
        this.$router.push({ name: "home" });
      } else {
        this.show_alert = true;
        this.alert_clase = "alert alert-danger";
        this.alert_msg = "لقد حدث خطأ ما, الرجاء التأكد من المدخلات";
        this.in_submission = false;
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    if (!store.state.authenticated) {
      next();
    } else {
      next({ name: "home" });
    }
  },
};
</script>

<style></style>
