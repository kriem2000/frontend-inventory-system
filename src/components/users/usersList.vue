<template>
  <div class="content-page p-3 py-5">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-12">
          <div
            class="d-flex flex-wrap align-items-center justify-content-between mb-4"
          >
            <div class="mb-2">
              <h4 class="mb-3">قائمة المستخدمين</h4>
              <p class="mb-0">
                هذه الصفحة تعرض لك معلومات حول مستخدمين منظومة الجرد حيث بإمكانك
                تعديل او حذف بيانات المستخدمين
              </p>
            </div>
            <a
              @click.prevent="changeComponent('addUser')"
              href="#"
              class="btn btn-primary add-list"
              ><i class="fas fa-plus ms-2"></i> إضافة مستخدم</a
            >
          </div>
        </div>
        <div class="col-lg-12">
          <div class="table-responsive rounded mb-3 p-2">
            <div
              id="DataTables_Table_0_wrapper"
              class="dataTables_wrapper no-footer"
            >
              <div class="d-flex flex-column d-lg-block">
                <div id="DataTables_Table_0_filter" class="dataTables_filter">
                  <label class="d-flex flex-row">
                    <p class="px-2">بحث :</p>
                    <input
                      @focusout="
                        fetchAllusers();
                        clearInputSearch();
                      "
                      v-model="search"
                      type="search"
                      class="form-control w-50 h-25"
                      placeholder=""
                      aria-controls="DataTables_Table_0"
                  /></label>
                </div>
              </div>
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
                      البريد الالكتروني
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
                      الوحدة التنظيمية
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
                      صلاحية المستخدم
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
                      المجموعة
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
                <tbody class="ligth-body">
                  <tr
                    v-for="user in allUsers"
                    :key="user.id"
                    role="row"
                    class="odd"
                  >
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.unit.unit_name }}</td>
                    <td>
                      <template v-for="role in user.roles" :key="role.id">
                        {{ role.name + " " }}
                      </template>
                    </td>
                    <td v-if="user.isActive == 1">
                      <span class="badge rounded-pill bg-success">مفعل</span>
                    </td>
                    <td v-else>
                      <span class="badge rounded-pill bg-warning"
                        >غير مفعل</span
                      >
                    </td>
                    <td>{{ user.inventory_group.group_name }}</td>
                    <td>
                      <a
                        @click.prevent="showUserUpdateForm(user.id)"
                        class="bg-light-success fs-6 badge text-white mx-1 cursos-pointer"
                      >
                        <i class="fas fa-user-edit"></i>
                      </a>
                      <a
                        v-if="user.isActive == 1"
                        @click.prevent="showDeleteAlert(user.id, user.isActive)"
                        class="bg-light-danger fs-6 badge text-white mx-1 cursos-pointer"
                      >
                        <i class="fas fa-user-slash"></i>
                      </a>
                      <a
                        v-else
                        @click.prevent="showDeleteAlert(user.id, user.isActive)"
                        class="bg-info-light fs-6 badge mx-1 cursos-pointer"
                      >
                        <i class="fas fa-user-check"></i>
                      </a>
                    </td>
                    <userUpdateForm
                      :user="user"
                      :closeUserUpdateForm="closeUserUpdateForm"
                      :updateUser="updateUser"
                      :allUnits="allUnits"
                      :allRoles="allRoles"
                      :in_submission="in_submission"
                      :show_alert="show_alert"
                      :alert_clase="alert_clase"
                      :alert_msg="alert_msg"
                    ></userUpdateForm>
                  </tr>
                  <tr v-show="fetchUsers_in_sumbission">
                    <th colspan="6" class="text-center">
                      <loading />
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <!-- Page end  -->
    </div>
  </div>
</template>

<script>
import axiosConfig from "@/includes/axiosConfig";
import { mapGetters } from "vuex";
import userUpdateForm from "@/components/users/userUpdateForm.vue";
import loading from "../loading.vue";

export default {
  name: "usersList",
  components: {
    loading,
    userUpdateForm,
  },
  props: {
    changeComponent: {
      required: true,
    },
  },
  data() {
    return {
      in_submission: false,
      show_alert: false,
      alert_clase: "",
      alert_msg: "",
      fetchUsers_in_sumbission: false,
      allUsers: [],
      search: "",
    };
  },
  computed: {
    ...mapGetters({
      config: "config",
      allRoles: "allRoles",
      allUnits: "allUnits",
    }),
  },
  async created() {
    this.fetchAllusers();
  },
  methods: {
    async fetchAllusers(userName = "%") {
      this.fetchUsers_in_sumbission = true;
      await axiosConfig
        .get(`users/${userName}`, this.config)
        .then((res) => {
          this.fetchUsers_in_sumbission = false;

          if (res.data.length > 0) {
            this.allUsers = res.data;
          }
        })
        .catch(() => {
          this.fetchUsers_in_sumbission = false;
          return;
        });
    },
    showUserUpdateForm(index) {
      document.getElementById("userUpdateForm-" + index).style.display =
        "block";
    },
    closeUserUpdateForm(index) {
      document.getElementById("userUpdateForm-" + index).style.display = "none";
    },
    async updateUser(val) {
      this.in_submission = true;

      await axiosConfig
        .post(`user/update/${val.user_id}`, val, this.config)
        .then(() => {
          this.show_alert = true;
          this.alert_clase = "alert alert-info";
          this.alert_msg = "تم تعديل المستخدم بنجاح";
          this.in_submission = false;
        })
        .catch(() => {
          this.show_alert = true;
          this.alert_clase = "alert alert-danger";
          this.alert_msg = " لقد حدث خطأ ما,او الرجاء التأكد من المدخلات";
          this.in_submission = false;
          return;
        });
    },
    async activeDeactivateUser(id) {
      await axiosConfig
        .get(`user/active/${id}`, this.config)
        .then(() => {
          this.$swal.fire({
            title: "تم التعديل !",
            text: "تمت العملية بنجاح",
            confirmButtonColor: "#78c091",
          });
          this.fetchAllusers();
        })
        .catch(() => {
          return;
        });
    },
    showDeleteAlert(id, state) {
      let confirm_msg1 = "نعم الغاء تفعيل المستخدم";
      let confirm_mg2 = "نعم تغعيل المستخدم";
      let title_msg1 = "هل تريد الغاء تفعيل هذا المستخدم ؟";
      let title_msg2 = "هل تريد تفعيل هذا المستخدم ؟";

      this.$swal
        .fire({
          title: state == 0 ? title_msg2 : title_msg1,
          icon: "warning",
          showCancelButton: true,
          cancelButtonText: "الغاء",
          confirmButtonColor: "#32BDEA ",
          cancelButtonColor: "#FF9770 ",
          confirmButtonText: state == 0 ? confirm_mg2 : confirm_msg1,
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.activeDeactivateUser(id);
          }
        });
    },
    clearInputSearch() {
      this.search = "";
    },
  },
  watch: {
    search: async function () {
      if (/^\S*$/.test(this.search)) {
        await this.fetchAllusers(this.search);
      } else {
        await this.fetchAllusers();
      }
    },
  },
};
</script>

<style scoped>
.userUpdateFormContainer {
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

.close-userUpdateForm {
  cursor: pointer;
}

.close-userUpdateForm:hover {
  color: #ff9770 !important;
}
</style>
