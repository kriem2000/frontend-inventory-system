<template>
  <!--edit user form-->
  <div
    v-show="false"
    class="userUpdateFormContainer"
    :id="`userUpdateForm-${user.id}`"
  >
    <!--user form-->
    <div
      class="row align-items-center justify-content-center height-self-center mt-5"
    >
      <div class="col-lg-8">
        <div class="card auth-card">
          <div class="card-body p-0">
            <div class="d-flex align-items-center auth-content">
              <div class="col-lg-7 align-self-center">
                <span
                  class="pe-2 close-userUpdateForm"
                  @click.prevent="closeUserUpdateForm(user.id)"
                  ><i class="fas fa-times-circle"></i
                ></span>
                <div class="p-3">
                  <h2 class="mb-2">تعديل المستخدم</h2>
                  <p>تعديل بيانات {{ user.name }}</p>
                  <!-- Session Status -->

                  <!-- Validation Errors -->
                  <vee-form
                    autocomplete="off"
                    @submit="updateUser"
                    :validationSchema="updateUserSchema"
                  >
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-floating form-group">
                          <vee-field
                            class="form-control"
                            :id="`name${user.id}`"
                            name="name"
                            type="text"
                            placeholder=" "
                            required=""
                            autocomplete="off"
                            :value="user.name"
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
                            :id="`nickname${user.id}`"
                            name="nickname"
                            :value="user.nickname"
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
                            :id="`email${user.id}`"
                            name="email"
                            :value="user.email"
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
                            :id="`phone_number${user.id}`"
                            name="phone_number"
                            :value="user.phone_number"
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
                            :id="`password${user.id}`"
                            name="password"
                            value=""
                            type="password"
                            placeholder=" "
                            required=""
                            autocomplete="off"
                          />
                          <label class="text-secondary" for="password">
                            كلمة المرور<span class="text-danger">*</span></label
                          >
                          <ErrorMessage class="text-danger" name="password" />
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-floating form-group">
                          <vee-field
                            class="form-control"
                            :id="`confirmed_password${user.id}`"
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
                            :id="`flexSwitchCheckDefault${user.id}`"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="d-flex flex-row">
                      <button
                        type="submit"
                        class="btn btn-primary"
                        :disabled="in_submission"
                      >
                        تعديل المستخدم
                      </button>
                      <loading v-show="in_submission" />
                    </div>
                    <vee-field name="user_id" :value="user.id" type="hidden" />
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
                  src="/img/business-3d-tech-support.png"
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
</template>

<script>
import loading from "@/components/loading.vue";

export default {
  name: "userUpdateForm",
  components: {
    loading,
  },
  props: {
    user: {
      required: true,
      type: Object,
    },
    closeUserUpdateForm: {
      required: true,
      type: Function,
    },
    updateUser: {
      required: true,
      type: Function,
    },
    allUnits: {
      required: true,
      type: Object,
    },
    allRoles: {
      required: true,
      type: Object,
    },

    in_submission: {
      required: true,
    },
    show_alert: {
      required: true,
    },
    alert_clase: {
      required: true,
    },
    alert_msg: {
      required: true,
    },
  },
  data() {
    return {
      updateUserSchema: {
        name: "min:3|max:50|alpha_spaces",
        nickname: "alpha_spaces|min:3|max:50",
        email: "email",
        phone_number: "numeric|max:10|min:10",
        password: "min:8|max:20",
        confirmed_password: "confirmed:@password",
        role: "alpha_spaces",
        unit_id: "numeric",
        user_id: "required",
      },
    };
  },
};
</script>

<style></style>
