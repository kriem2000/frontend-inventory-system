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
                <h2 class="mb-2">اضافة عنصر</h2>
                <vee-form
                  @submit="addNewItem"
                  :validationSchema="newItemSchema"
                  autocomplete="off"
                >
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="form-floating form-group">
                        <vee-field
                          class="form-control"
                          id="item_name"
                          type="text"
                          placeholder=" "
                          required=""
                          autocomplete="off"
                          name="item_name"
                        /><label class="text-secondary" for="item_name"
                          >اسم العنصر<span class="text-danger">*</span></label
                        ><!---->
                        <ErrorMessage name="item_name" class="text-danger" />
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="form-floating form-group">
                        <vee-field
                          class="form-control"
                          id="quantity"
                          type="number"
                          placeholder=" "
                          required=""
                          autocomplete="off"
                          name="quantity"
                        /><label class="text-secondary" for="quantity">
                          <span class="text-danger">*</span> العدد</label
                        ><!---->
                        <ErrorMessage name="quantity" class="text-danger" />
                      </div>
                    </div>
                    <div class="col-lg-12">
                      <div class="form-floating form-group">
                        <vee-field
                          class="form-control"
                          id="item_owner"
                          type="text"
                          placeholder=" "
                          required=""
                          autocomplete="off"
                          name="item_owner"
                        /><label
                          class="text-secondary text-end"
                          for="item_owner"
                        >
                          مستخدم بواسطة<span class="text-danger">*</span></label
                        ><!---->
                        <ErrorMessage name="item_owner" class="text-danger" />
                      </div>
                    </div>
                    <div class="col-lg-12">
                      <label class="text-secondary" for="category_id">
                        اختيار صنف العنصر
                        <span class="text-danger">*</span></label
                      ><vee-field
                        class="form-select my-2"
                        as="select"
                        name="category_id"
                      >
                        <template
                          v-for="category in indvAllItemsCategory"
                          :key="category.id"
                        >
                          <option :value="category.id">
                            {{ category.category_name }}
                          </option>
                        </template> </vee-field
                      ><!---->
                      <ErrorMessage name="category_id" class="text-danger" />
                    </div>
                    <div class="col-lg-12">
                      <label class="text-secondary" for="status_id">
                        اختيار حالة العنصر
                        <span class="text-danger">*</span></label
                      ><vee-field
                        class="form-select my-2"
                        as="select"
                        name="status_id"
                      >
                        <template
                          v-for="status in indvAllItemsStatus"
                          :key="status.id"
                        >
                          <option :value="status.id">
                            {{ status.status_name }}
                          </option>
                        </template> </vee-field
                      ><!---->
                      <ErrorMessage name="status_id" class="text-danger" />
                    </div>
                    <div class="col-lg-12">
                      <div class="form-floating">
                        <vee-field
                          class="form-control my-2"
                          placeholder="Leave a comment here"
                          id="item_note"
                          name="item_note"
                        ></vee-field>
                        <label for="item_note">ملاحظة</label>
                        <ErrorMessage name="item_note" class="text-danger" />
                      </div>
                    </div>
                  </div>
                  <div class="d-flex flex-row">
                    <button
                      type="submit"
                      class="btn btn-primary"
                      :disabled="in_submission"
                    >
                      ادراج العنصر
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
                src="/img/business-3d-bamboo-board-2.png"
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
import loading from "../loading.vue";

export default {
  name: "newItemForm",
  components: {
    loading,
  },
  props: {
    close: {
      required: true,
      type: Function,
    },
    allDestinationItems: {
      required: true,
      type: Object,
    },
    fetchAllitems: {
      type: Function,
    },
    allItemsCategory: {
      require: true,
    },
    allItemsStatus: {
      required: true,
    },
  },
  data() {
    return {
      in_submission: false,
      show_alert: false,
      alert_clase: "",
      alert_msg: "",
      newItemSchema: {
        item_name: "required",
        quantity: "required|numeric",
        category_id: "required|numeric",
        status_id: "required|numeric",
        item_note: "max:500",
      },
      indvAllItemsCategory: this.allItemsCategory,
      indvAllItemsStatus: this.allItemsStatus,
      currentTaskId: this.allDestinationItems.task_id,
    };
  },
  computed: {
    ...mapGetters({
      config: "config",
    }),
  },
  methods: {
    async addNewItem(val) {
      this.in_submission = true;
      await axiosConfig
        .post(`create-item/${this.currentTaskId}`, val, this.config)
        .then(() => {
          this.show_alert = true;
          this.alert_clase = "alert alert-info";
          this.alert_msg = "تم انشاء العنصر بنجاح";
          setTimeout(() => {
            this.show_alert = false;
          }, 3000);
          this.in_submission = false;
          document.getElementById("resetNewItemForm").click();
          this.fetchAllitems(this.currentTaskId);
        })
        .catch(() => {
          this.show_alert = true;
          this.alert_clase = "alert alert-danger";
          this.alert_msg =
            "لقد حدث خطأ ما, او هذه الوحدة التنظيمية منجزة بالفعل";
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
