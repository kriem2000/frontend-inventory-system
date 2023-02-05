<template>
  <!--item form-->
  <div
    v-show="false"
    class="itemUpdateFormContainer"
    :id="`itemUpdateForm${item.id}`"
  >
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
                  @click.prevent="closeUpdateForm(item.id)"
                  ><i class="fas fa-times-circle"></i
                ></span>
                <div class="p-3">
                  <h2 class="mb-2">تعديل العنصر</h2>
                  <!-- Session Status -->

                  <!-- Validation Errors -->
                  <vee-form
                    autocomplete="off"
                    @submit="itemUpdate"
                    :validationSchema="updateItemSchema"
                  >
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-floating form-group">
                          <vee-field
                            class="form-control"
                            :id="`name${item.id}`"
                            name="item_name"
                            type="text"
                            placeholder=" "
                            required=""
                            autocomplete="off"
                            :value="item.item_name"
                          />
                          <label class="text-secondary" for="name">
                            اسم العنصر<span class="text-danger">*</span>
                          </label>
                          <ErrorMessage class="text-danger" name="item_name" />
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-floating form-group">
                          <vee-field
                            class="form-control"
                            :id="`quantity${item.id}`"
                            name="quantity"
                            :value="item.quantity"
                            type="text"
                            placeholder=" "
                            required=""
                            autocomplete="off"
                          />
                          <label class="text-secondary" for="quantity"
                            >العدد</label
                          >
                          <ErrorMessage class="text-danger" name="quantity" />
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <div class="form-floating form-group">
                          <vee-field
                            class="form-control"
                            :id="`item_owner${item.id}`"
                            type="text"
                            placeholder=" "
                            required=""
                            autocomplete="off"
                            name="item_owner"
                            :value="item.item_owner"
                          /><label
                            class="text-secondary text-end"
                            for="item_owner"
                          >
                            مستخدم بواسطة<span class="text-danger"
                              >*</span
                            ></label
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
                            :value="item.item_note"
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
                        تحديث العنصر
                      </button>
                      <loading v-show="in_submission" />
                    </div>
                    <div
                      class="text-center m-3 border-0 p-0"
                      v-show="show_alert"
                      :class="alert_clase"
                    >
                      {{ alert_msg }}
                    </div>
                    <vee-field
                      type="hidden"
                      :value="item.id"
                      name="currentItemId"
                    />
                  </vee-form>
                </div>
              </div>
              <div class="col-lg-5 content-right">
                <img
                  src="/img/business-3d-gears-3.png"
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
import axiosConfig from "@/includes/axiosConfig";
import { mapGetters } from "vuex";
import loading from "../loading.vue";

export default {
  name: "updateIte,Form",
  components: {
    loading,
  },
  props: {
    item: {
      required: true,
      type: Object,
    },
    closeUpdateForm: {
      required: true,
      type: Function,
    },
    currentTaskId: {
      required: true,
    },
    allItemsCategory: {
      required: true,
    },
    allItemsStatus: {
      required: true,
    },
    fetchAllitems: {
      type: Function,
    },
  },
  data() {
    return {
      in_submission: false,
      show_alert: false,
      alert_clase: "",
      alert_msg: "",
      updateItemSchema: {
        quantity: "required|numeric",
        category_id: "numeric",
        status_id: "numeric",
        item_note: "max:500",
      },
      indvAllItemsCategory: this.allItemsCategory,
      indvAllItemsStatus: this.allItemsStatus,
      UpdatecurrentTaskId: this.currentTaskId,
    };
  },
  computed: {
    ...mapGetters({
      config: "config",
    }),
  },
  created() {},
  methods: {
    async itemUpdate(val) {
      this.in_submission = true;

      await axiosConfig
        .post(
          `item/update/${this.UpdatecurrentTaskId}/${val.currentItemId}`,
          val,
          this.config
        )
        .then(() => {
          this.show_alert = true;
          this.alert_clase = "alert alert-info";
          this.alert_msg = "تم تحديث العنصر بنجاح";
          setTimeout(() => {
            this.show_alert = false;
          }, 3000);
          this.in_submission = false;

          this.fetchAllitems(this.UpdatecurrentTaskId);
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
