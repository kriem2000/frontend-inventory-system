<template>
  <div class="login-content">
    <div class="container">
      <div
        class="row align-items-center justify-content-center height-self-center-80"
      >
        <div class="col-lg-8">
          <div class="card auth-card">
            <div class="card-body p-0">
              <div class="d-flex align-items-center auth-content">
                <div class="col-lg-7 align-self-center">
                  <div class="p-3">
                    <h2 class="mb-2">اضافة مستخدم جديد</h2>
                    <p>انشاء مستخدم جديد في منظومة الجرد</p>
                    <!-- add user form  -->
                    <vee-form
                      autocomplete="off"
                      @submit="addNewUser"
                      :validationSchema="addUserSchema"
                    >
                      <div class="row">
                        <div class="col-lg-6">
                          <div class="form-floating form-group">
                            <vee-field
                              class="form-control"
                              id="name"
                              name="name"
                              value=""
                              type="text"
                              placeholder=" "
                              required=""
                              autocomplete="off"
                            />
                            <label class="text-secondary" for="name"
                              >الاسم الكامل<span class="text-danger"
                                >*</span
                              ></label
                            >
                            <ErrorMessage class="text-danger" name="name" />
                          </div>
                        </div>
                        <div class="col-lg-6">
                          <div class="form-floating form-group">
                            <vee-field
                              class="form-control"
                              id="nickname"
                              name="nickname"
                              value=""
                              type="text"
                              placeholder=" "
                              required=""
                              autocomplete="off"
                            />
                            <label class="text-secondary" for="nickname"
                              >اللقب</label
                            >
                            <ErrorMessage class="text-danger" name="nickname" />
                          </div>
                        </div>
                        <div class="col-lg-6">
                          <div class="form-floating form-group">
                            <vee-field
                              class="form-control"
                              id="email"
                              name="email"
                              value=""
                              type="email"
                              placeholder=" "
                              required=""
                              autocomplete="off"
                            />
                            <label class="text-secondary" for="email"
                              >البريد الالكتروني<span class="text-danger"
                                >*</span
                              ></label
                            >
                            <ErrorMessage class="text-danger" name="email" />
                          </div>
                        </div>
                        <div class="col-lg-6">
                          <div class="form-floating form-group">
                            <vee-field
                              class="form-control"
                              id="phone_number"
                              name="phone_number"
                              value=""
                              type="numeric"
                              placeholder=" "
                              required=""
                              autocomplete="off"
                            />
                            <label class="text-secondary" for="phone_number"
                              >رقم الهاتف</label
                            >
                            <ErrorMessage
                              class="text-danger"
                              name="phone_number"
                            />
                          </div>
                        </div>
                        <div class="col-lg-6">
                          <div class="form-floating form-group">
                            <vee-field
                              class="form-control"
                              id="password"
                              name="password"
                              value=""
                              type="password"
                              placeholder=" "
                              required=""
                              autocomplete="off"
                            />
                            <label class="text-secondary" for="password">
                              كلمة المرور<span class="text-danger"
                                >*</span
                              ></label
                            >
                            <ErrorMessage class="text-danger" name="password" />
                          </div>
                        </div>
                        <div class="col-lg-6">
                          <div class="form-floating form-group">
                            <vee-field
                              class="form-control"
                              id="confirmed_password"
                              name="confirmed_password"
                              value=""
                              type="password"
                              placeholder=" "
                              required=""
                              autocomplete="off"
                            />
                            <label
                              class="text-secondary"
                              for="confirmed_password"
                            >
                              تأكيد كلمة المرور<span class="text-danger"
                                >*</span
                              ></label
                            >
                            <ErrorMessage
                              class="text-danger"
                              name="confirmed_password"
                            />
                          </div>
                        </div>
                        <div class="col-lg-6">
                          <label class="text-secondary" for="role">
                            اختيار صلاحية المستخدم<span class="text-danger"
                              >*</span
                            ></label
                          >
                          <vee-field
                            class="form-select my-2"
                            name="role"
                            as="select"
                          >
                            <template v-for="role in allRoles" :key="role"
                              ><option :value="role">
                                {{ role }}
                              </option></template
                            >
                          </vee-field>
                          <ErrorMessage class="text-danger" name="role" />
                        </div>
                        <div class="col-lg-6">
                          <label class="text-secondary" for="role">
                            اختيار الوحدة التنظيمية
                            <span class="text-danger">*</span></label
                          >
                          <vee-field
                            class="form-select my-2"
                            name="unit_id"
                            as="select"
                          >
                            <template v-for="unit in allUnits" :key="unit.id">
                              <option :value="unit.id">
                                {{ unit.unit_name }}
                              </option>
                            </template>
                          </vee-field>
                          <ErrorMessage class="text-danger" name="unit_id" />
                        </div>
                        <div class="col-lg-12">
                          <div class="form-check form-switch d-flex flex-row">
                            <label class="form-check-label" for="policyCheck"
                              >اوافق علي شروط الاستخدام</label
                            >
                            <vee-field
                              name="policyCheck"
                              class="form-check-input mt-2 bg-info border-0 mx-2"
                              type="checkbox"
                              id="flexSwitchCheckDefault"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="d-flex flex-row">
                        <input
                          type="reset"
                          id="resetRegisterForm"
                          class="d-none"
                        />
                        <button
                          type="submit"
                          class="btn btn-primary"
                          :disabled="in_submission"
                        >
                          اضافة المستخدم
                        </button>
                        <loading v-show="in_submission" />
                      </div>
                    </vee-form>
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
                    src="/img/business-3d-online-business-meeting.png"
                    class="img-fluid image-right"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axiosConfig from "@/includes/axiosConfig";
import { mapGetters } from "vuex";
import loading from "@/components/loading.vue";

export default {
  name: "addUser.vue",
  props: {
    changeComponent: {
      required: true,
      type: Function,
    },
  },
  components: {
    loading,
  },
  data() {
    return {
      in_submission: false,
      show_alert: false,
      alert_clase: "",
      alert_msg: "",
      addUserSchema: {
        name: "required|min:3|max:50|alpha_spaces",
        nickname: "alpha|min:3|max:50",
        email: "required|email",
        phone_number: "numeric|max:10|min:10",
        password: "required|min:8|max:20",
        confirmed_password: "required|confirmed:@password",
        role: "required|alpha_spaces",
        unit_id: "required|numeric",
      },
    };
  },
  computed: {
    ...mapGetters({
      allRoles: "allRoles",
      allUnits: "allUnits",
      config: "config",
    }),
  },
  methods: {
    async addNewUser(val) {
      this.in_submission = true;

      await axiosConfig
        .post("register", val, this.config)
        .then(() => {
          this.show_alert = true;
          this.alert_clase = "alert alert-info";
          this.alert_msg = "تم تسجيل المستخدم بنجاح";
          setTimeout(() => {
            this.show_alert = false;
          }, 3000);
          this.in_submission = false;
          document.getElementById("resetRegisterForm").click();
        })
        .catch(() => {
          this.show_alert = true;
          this.alert_clase = "alert alert-danger";
          this.alert_msg =
            "الرجاء التأكد من المدخلات , او المستخدم موجود مسبقاً";
          setTimeout(() => {
            this.show_alert = false;
          }, 3000);
          this.in_submission = false;
          return;
        });
    },
  },
};
</script>

<style></style>
