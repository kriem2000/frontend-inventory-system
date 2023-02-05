<template>
  <div
    class="row align-items-center justify-content-center height-self-center mt-5"
  >
    <div class="col-lg-8">
      <div class="card auth-card">
        <div class="card-body p-0">
          <div class="d-flex align-items-center auth-content">
            <div class="col-lg-7 align-self-center">
              <span @click.prevent="close()" class="pe-2 close-userUpdateForm"
                ><i class="fas fa-times-circle"></i
              ></span>
              <div class="p-3">
                <h2 class="mb-2">اضافة وجهة فرعية</h2>
                <vee-form
                  @submit="createNewTask"
                  :validationSchema="newTaskSchema"
                  autocomplete="off"
                >
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="form-floating form-group">
                        <vee-field
                          class="form-control"
                          id="sub_unit"
                          type="text"
                          placeholder=" "
                          autocomplete="off"
                          name="sub_unit"
                        /><label class="text-secondary" for="sub_unit"
                          >اسم الوجهة<span class="text-danger">*</span></label
                        >
                        <ErrorMessage class="text-danger" name="sub_unit" />
                      </div>
                    </div>
                    <div class="col-lg-12">
                      <div class="form-floating">
                        <vee-field
                          as="textarea"
                          class="form-control my-2"
                          placeholder="Leave a comment here"
                          id="floatingTextarea"
                          name="description"
                        ></vee-field>
                        <label class="text-secondary" for="floatingTextarea"
                          >ملاحظات حول المكان</label
                        >
                        <ErrorMessage class="text-danger" name="description" />
                      </div>
                    </div>
                  </div>
                  <div class="d-flex flex-row">
                    <button
                      type="submit"
                      class="btn btn-primary"
                      :disabled="in_submission"
                    >
                      البدء
                    </button>
                    <button type="reset" class="d-none" id="resetNewItemForm" />
                    <loading v-show="in_submission" />
                  </div>
                  <div
                    class="text-center m-3 border-0 p-0"
                    v-show="show_alert"
                    :class="alert_clase"
                  >
                    {{ alert_msg }}
                  </div>
                </vee-form>
                <div
                  class="text-center m-3 border-0 p-0"
                  style="display: none"
                ></div>
              </div>
            </div>
            <div class="col-lg-5 content-right">
              <img
                src="/img/business-3d-374.png"
                class="img-fluid image-right"
                alt=""
              />
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
  components: {
    loading,
  },
  props: {
    close: {
      required: true,
      type: Function,
    },
    destinationId: {
      required: true,
    },
    fetchAllTasks: {
      type: Function,
    },
  },
  computed: {
    ...mapGetters({
      config: "config",
    }),
  },
  data() {
    return {
      in_submission: false,
      show_alert: false,
      alert_clase: "",
      alert_msg: "",
      newTaskSchema: {
        sub_unit: "required|min:5|max:100",
        desription: "alpha_spaces",
      },
    };
  },
  methods: {
    async createNewTask(val) {
      this.in_submission = true;
      await axiosConfig
        .post(`create-task/${this.destinationId}`, val, this.config)
        .then(() => {
          this.show_alert = true;
          this.alert_clase = "alert alert-info";
          this.alert_msg = "تم انشاء الوجهة بنجاح";
          setTimeout(() => {
            this.show_alert = false;
          }, 3000);
          this.in_submission = false;
          document.getElementById("resetNewItemForm").click();
          this.fetchAllTasks();
        })
        .catch(() => {
          this.show_alert = true;
          this.alert_clase = "alert alert-danger";
          this.alert_msg = "لقد حدث خطأ ما ";
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

<style>
.close-userUpdateForm {
  cursor: pointer;
}

.close-userUpdateForm:hover {
  color: #ff9770 !important;
}
</style>
