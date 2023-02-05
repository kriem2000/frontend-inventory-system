<template>
  <div class="container-fluid p-3 py-5">
    <div class="row">
      <div class="col-lg-12">
        <div
          class="d-flex flex-wrap align-items-center justify-content-between mb-4"
        >
          <div class="mb-2">
            <h4 class="mb-3">قائمةالمجرودات</h4>
            <p class="mb-0">{{ allDestinationItems.destinationFullName }}</p>
          </div>
          <div class="d-flex justify-content-between my-4">
            <button
              v-if="allItems.taskStatus != 1 && inAssignedUsers"
              @click.prevent="showItemForm('ItemNewForm')"
              class="btn btn-primary add-list"
            >
              <i class="fas fa-plus ms-2"></i> اضافة عنصر جديد
            </button>
            <button
              v-if="user.id == allItems.created_by.id"
              class="btn bg-light-warning mx-2"
              @click.prevent="changeTaskStatus(currentTaskId)"
              :class="{
                'cursor-prohibit disabled bg-secondary border-0':
                  destinationApproved,
              }"
              :disabled="in_submission"
            >
              <i class="fas fa-exclamation mx-1"></i>
              تغيير الحالة
            </button>
            <button
              class="btn bg-light-success mx-2"
              @click.prevent="changeComponent('inventoryDestination')"
            >
              <i class="fas fa-undo mx-1"></i>
              الرجوع للخلف
            </button>
          </div>
        </div>
      </div>
      <hr />
      <div class="col-lg-12" v-show="allItems.items.length > 0">
        <table
          class="data-table table mb-0 tbl-server-info dataTable no-footer"
          id="DataTables_Table_0"
          role="grid"
          aria-describedby="DataTables_Table_0_info"
        >
          <thead class="bg-light-purple text-uppercase">
            <tr class="ligth ligth-data" role="row">
              <th
                class="sorting"
                tabindex="0"
                aria-controls="DataTables_Table_0"
                rowspan="1"
                colspan="1"
                aria-label="Name: activate to sort column ascending"
                style="width: 93.25px"
              >
                الاسم
              </th>
              <th
                class="sorting"
                tabindex="0"
                aria-controls="DataTables_Table_0"
                rowspan="1"
                colspan="1"
                aria-label="Email: activate to sort column ascending"
                style="width: 121.266px"
              >
                العدد
              </th>
              <th
                class="sorting"
                tabindex="0"
                aria-controls="DataTables_Table_0"
                rowspan="1"
                colspan="1"
                aria-label="Company: activate to sort column ascending"
                style="width: 92.1562px"
              >
                الصنف
              </th>
              <th
                class="sorting"
                tabindex="0"
                aria-controls="DataTables_Table_0"
                rowspan="1"
                colspan="1"
                aria-label="Awors Points: activate to sort column ascending"
                style="width: 101.156px"
              >
                مستخدم بواسطة
              </th>
              <th
                class="sorting"
                rowspan="1"
                colspan="1"
                style="width: 120.016px"
              >
                الحالة
              </th>
              <th
                class="sorting"
                tabindex="0"
                aria-controls="DataTables_Table_0"
                rowspan="1"
                colspan="1"
                aria-label="Group: activate to sort column ascending"
                style="width: 48.1875px"
              >
                ملاحظات
              </th>
              <th
                class="sorting"
                rowspan="1"
                colspan="1"
                style="width: 120.016px"
              >
                الخيارات
              </th>
            </tr>
          </thead>
          <tbody
            class="ligth-body"
            v-for="item in allItems.items"
            :key="item.id"
          >
            <tr role="row" class="odd">
              <td>{{ item.item_name }}</td>
              <td>{{ item.quantity }}</td>
              <td>{{ item.category.category_name }}</td>
              <td>{{ item.item_owner }}</td>
              <td>
                <span v-if="item.status_id == 1" class="badge bg-success"
                  >ممتازة</span
                >
                <span v-else-if="item.status_id == 2" class="badge bg-warning"
                  >جيدة</span
                >
                <span v-else class="badge bg-danger">سيئة</span>
              </td>
              <td>
                <a
                  @click.prevent="taskInfoDailog(item.item_note)"
                  class="btn-primary fs-6 badge text-white mx-1 cursos-pointer"
                >
                  <i class="fas fa-info-circle"></i>
                </a>
              </td>
              <td>
                <button
                  v-if="user.id == allItems.created_by.id"
                  @click.prevent="showUpdateItemForm(item.id)"
                  class="bg-light-success fs-6 badge text-white mx-1 cursos-pointer border-0"
                  :disabled="allItems.taskStatus == 1"
                >
                  <i class="far fa-edit"></i>
                </button>
                <button
                  v-if="user.id == allItems.created_by.id"
                  @click.prevent="deleteItem(currentTaskId, item.id)"
                  class="bg-light-danger fs-6 badge text-white mx-1 cursos-pointer border-0"
                >
                  <i class="far fa-trash-alt"></i>
                </button>
              </td>
            </tr>
            <!--edit user form-->
            <updateItemForm
              v-if="allItemsCategory.length > 0 && allItemsStatus.length > 0"
              :item="item"
              :allItemsCategory="allItemsCategory"
              :allItemsStatus="allItemsStatus"
              :closeUpdateForm="closeUpdateForm"
              :currentTaskId="currentTaskId"
              :fetchAllitems="fetchAllitems"
              :key="item.id"
            />
          </tbody>
        </table>
      </div>
      <!-- there's no items -->
      <!--there is no destinations-->
      <div class="container-fluid" v-show="allItems.items.length == 0">
        <div class="row align-items-center justify-content-center">
          <div class="col-8 position-relative text-center vh-100">
            <div class="position-absolute top-50 start-50 translate-middle">
              <span class>
                <img src="/img/side-bkg.png" />
                <p class="fs-4 text-muted fw-bold">
                  لا توجد عناصر تم جردها حتي الان
                </p>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="false" class="ItemNewFormContainer" id="ItemNewForm">
      <new-item-form
        v-if="allItemsCategory.length > 0 && allItemsStatus.length > 0"
        :close="closeNewForm"
        :allDestinationItems="allDestinationItems"
        :allItemsCategory="allItemsCategory"
        :allItemsStatus="allItemsStatus"
        :fetchAllitems="fetchAllitems"
      ></new-item-form>
    </div>
  </div>
</template>

<script>
import newItemForm from "@/components/inventory/newItemForm.vue";
import axiosConfig from "../../includes/axiosConfig";
import { mapGetters } from "vuex";
import updateItemForm from "@/components/inventory/updateItemForm.vue";

export default {
  name: "taskslist",
  props: {
    changeComponent: {
      required: true,
      type: Function,
    },
    allDestinationItems: {
      required: true,
      type: Object,
    },
  },
  components: {
    newItemForm,
    updateItemForm,
  },
  data() {
    return {
      allItems: this.allDestinationItems,
      currentTaskId: this.allDestinationItems.task_id,
      DestinationAssigneduser: this.allDestinationItems.destinationAssineduser,
      allItemsCategory: [],
      allItemsStatus: [],
      taskStatus: [],
    };
  },
  computed: {
    ...mapGetters({
      config: "config",
      user: "user",
    }),
    inAssignedUsers() {
      let currentUserID = this.user.id;
      for (let i in this.DestinationAssigneduser) {
        if (this.DestinationAssigneduser[i].id == currentUserID) {
          return true;
        }
      }
      return false;
    },
  },
  async beforeMount() {
    /*get all categories*/
    await axiosConfig
      .get("categories", this.config)
      .then((res) => {
        this.allItemsCategory = res.data;
      })
      .catch(() => {});
    /*get all item posible status*/
    await axiosConfig
      .get("item-status", this.config)
      .then((res) => {
        this.allItemsStatus = res.data;
      })
      .catch(() => {
        return;
      });
  },
  async created() {
    this.in_submission = true;
    await axiosConfig
      .get("task-status", this.config)
      .then((res) => {
        this.taskStatus = res.data;
        this.in_submission = false;
      })
      .catch(() => {
        return;
      });
  },
  methods: {
    showItemForm(idName, index = "") {
      document.getElementById(idName + index).style.display = "block";
    },
    closeNewForm() {
      document.getElementById("ItemNewForm").style.display = "none";
    },
    closeUpdateForm(index) {
      document.getElementById("itemUpdateForm" + index).style.display = "none";
    },
    showUpdateItemForm(index) {
      document.getElementById("itemUpdateForm" + index).style.display = "block";
    },
    taskInfoDailog(desc) {
      desc == null ? (desc = "لا توجد ملاحظات حول هذا العنصر") : "";
      this.$swal.fire({
        icon: "info",
        text: desc,
        confirmButtonColor: "#78c091",
        confirmButtonText: "حسنا",
      });
    },
    async deleteItem(taskId, itemId) {
      this.$swal
        .fire({
          title: "هل تريد حذف هذا العنصر نهائيا ؟",
          text: "لن تستطيع التراجع عن هذا الاجراء",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#32bdea",
          cancelButtonColor: "#FF9770",
          confirmButtonText: "نعم",
          cancelButtonText: "تراجع",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            await axiosConfig
              .get(`item/delete/${taskId}/${itemId}`, this.config)
              .then(() => {
                this.$swal.fire({
                  title: "تم الحذف نهائياََ",
                  icon: "success",
                  confirmButtonColor: "#32BDEA",
                });

                this.fetchAllitems(taskId);
              })
              .catch((err) => {
                this.$swal.fire({
                  title: err.response.data.message,
                  icon: "error",
                  confirmButtonColor: "#32BDEA",
                });
                return;
              });
          }
        });
    },
    async fetchAllitems(taskId) {
      await axiosConfig
        .get(`items/${taskId}`, this.config)
        .then((res) => {
          this.allItems.items = res.data;
        })
        .catch(() => {
          return;
        });
    },
    async changeTaskStatus(taskId) {
      let alltaskStatus = [];
      for (let i in this.taskStatus) {
        alltaskStatus.push(this.taskStatus[i].status_name);
      }

      await this.$swal.fire({
        title: "تغيير حالة  المهمة الحالية",
        input: "select",
        inputOptions: alltaskStatus,
        inputPlaceholder: "ارجو اختيار الحالة",
        showCancelButton: true,
        cancelButtonColor: "#e08db4",
        cancelButtonText: "الغاء",
        confirmButtonText: "تغيير",
        confirmButtonColor: "#32BDEA",
        inputValidator: (value) => {
          let statusId = parseInt(value) + 1;
          axiosConfig
            .get(`task/change-status/${taskId}/${statusId}`, this.config)
            .then((res) => {
              this.allItems.taskStatus = res.data.info.task_status_id;
              this.fetchAllitems(this.currentTaskId);
              this.$swal.fire({
                title: "تمت العملية بنجاح",
                icon: "success",
                confirmButtonColor: "#32BDEA",
                confirmButtonText: "حسنا",
              });
            })
            .catch(() => {
              this.$swal.fire({
                title: "هذة الوحدة التنظيمية منجزة بالفعل",
                icon: "warning",
                confirmButtonColor: "#e08db4",
                confirmButtonText: "حسنا",
              });
              return;
            });
        },
      });
    },
  },
};
</script>

<style scoped>
.ItemNewFormContainer,
.itemUpdateFormContainer {
  width: 100%;
  height: 100%;
  background: rgba(12, 12, 12, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  overflow: auto;
  display: none;
}
</style>
