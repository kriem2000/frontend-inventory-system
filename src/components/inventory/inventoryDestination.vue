<template>
  <div class="content-page">
    <!--all destinations-->
    <div class="container-fluid m-3">
      <div
        class="d-sm-flex flex-row justify-content-between d-block my-2"
        v-if="allDestinationTask"
      >
        <div>
          <h2 class="mb-2">اخر المهام المنجزة</h2>
          <p>
            {{ allDestinationTask.building.building_name }}/{{
              allDestinationTask.unit.unit_name
            }}
          </p>
        </div>
        <div class="d-flex justify-content-between my-4">
          <button
            v-show="inAssignedUsers"
            class="btn btn-primary mx-2"
            @click.prevent="showNewTaskForm()"
          >
            <i class="fas fa-plus mx-1"></i>
            بدء عملية جرد جديدة
          </button>
          <button
            v-if="user.id == created_by_id"
            class="btn bg-light-warning mx-2"
            @click.prevent="changeDestinationStatus(destinationId)"
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
            @click.prevent="changeComponent('DestinationsList')"
          >
            <i class="fas fa-undo mx-1"></i>
            الرجوع للخلف
          </button>
        </div>
      </div>
      <hr />
      <!--there is no destinations-->
      <div class="container-fluid" v-show="allTasks.length == 0">
        <div class="row align-items-center justify-content-center">
          <div class="col-8 position-relative text-center vh-100">
            <div class="position-absolute top-50 start-50 translate-middle">
              <span class="mt-5">
                <img src="/img/side-bkg.png" />
                <p class="fs-4 text-muted fw-bold">
                  لا توجد مهام جرد في هذه الوحدة التنظيمية
                </p>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="row" v-show="allTasks.length > 0">
        <div
          class="col-lg-5 col-sm-12 col-md-6"
          v-for="task in allTasks"
          :key="task.id"
        >
          <div
            @click.prevent="
              changeComponent('tasksList');
              goToItemsList(
                task.items,
                task.id,
                task.created_by,
                task.task_status_id,
                allDestinationTask.assigned_users,
                allDestinationTask.building.building_name +
                  `/` +
                  allDestinationTask.unit.unit_name +
                  `/` +
                  task.sub_unit_name
              );
            "
            class="card card-block card-stretch card-height-helf cursor-pointer"
          >
            <div class="card-body card-item-right">
              <div class="d-flex flex-row">
                <div class="bg-warning-light rounded">
                  <img
                    src="/img/sub_unit.png"
                    class="style-img img-fluid m-auto"
                    alt="image"
                  />
                </div>
                <div class="style-text text-right w-100">
                  <h5 class="mb-2">{{ task.sub_unit_name }}</h5>
                  <p class="mb-2">المجرودات : {{ task.items.length }}</p>
                  <p class="mb-2">منشأ بواسطة : {{ task.created_by.name }}</p>
                  <p class="mb-0">
                    الحالة :
                    <span
                      v-if="task.task_status.id == 3"
                      class="badge rounded-pill bg-warning"
                      >{{ task.task_status.status_name }}</span
                    >
                    <span
                      v-else-if="task.task_status.id == 2"
                      class="badge rounded-pill bg-danger"
                      >{{ task.task_status.status_name }}</span
                    >
                    <span v-else class="badge rounded-pill bg-success">{{
                      task.task_status.status_name
                    }}</span>
                  </p>
                </div>
              </div>
            </div>

            <div class="d-flex flex-row justify-content-between px-3 my-1">
              <small class="mb-2">
                تاريخ البدء:
                <span class="badge bg-secondary p-1">{{
                  getFulldate(task.created_at)
                }}</span>
              </small>
              <small class="mb-2">
                المسؤول:
                <span class="badge bg-secondary p-1"
                  >{{ task.created_by.name }}
                </span>
              </small>
            </div>
          </div>
        </div>
      </div>
      <div v-show="false" class="userUpdateFormContainer" id="userUpdateForm">
        <newTaskFormVue
          :close="close"
          :destinationId="destinationId"
          :fetchAllTasks="fetchAllTasks"
        ></newTaskFormVue>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import newTaskFormVue from "@/components/inventory/newTaskForm.vue";
import axiosConfig from "../../includes/axiosConfig";

export default {
  name: "inventoryDestination",
  props: {
    changeComponent: {
      required: true,
      type: Function,
    },
    setCurrentDestinationItems: {
      required: true,
      type: Function,
    },
    allDestinationTask: {
      required: true,
      type: Object,
    },
  },
  components: {
    newTaskFormVue,
  },
  data() {
    return {
      in_submission: false,
      destinationCurrentStatus: this.allDestinationTask.destination_status_id,
      allTasks: this.allDestinationTask.tasks,
      allAssignedUsers: this.allDestinationTask.assigned_users,
      destinationId: this.allDestinationTask.id,
      destinationApproved: this.allDestinationTask.approved == 1 ? true : false,
      created_by_id: this.allDestinationTask.created_by_id,
      destinationStatus: [],
    };
  },

  computed: {
    ...mapGetters({
      config: "config",
      user: "user",
    }),
    inAssignedUsers() {
      let currentUserID = this.user.id;
      for (let i in this.allAssignedUsers) {
        if (this.allAssignedUsers[i].id == currentUserID) {
          return true;
        }
      }
      return false;
    },
  },
  methods: {
    showNewTaskForm() {
      document.getElementById("userUpdateForm").style.display = "block";
    },
    close() {
      document.getElementById("userUpdateForm").style.display = "none";
    },
    getFulldate(fullDate) {
      const date = new Date(fullDate);
      return (
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
      );
    },
    goToItemsList(
      items,
      task_id,
      created_by,
      taskStatus,
      destinationAssigneduser,
      desfullName
    ) {
      let itemsInfo = {
        items: items,
        task_id: task_id,
        destinationAssineduser: destinationAssigneduser,
        destinationFullName: desfullName,
        created_by: created_by,
        taskStatus: taskStatus,
      };

      this.setCurrentDestinationItems(itemsInfo);
    },
    async fetchAllTasks() {
      await axiosConfig
        .get(`destination-tasks/${this.destinationId}`, this.config)
        .then((res) => {
          this.allTasks = res.data;
        })
        .catch(() => {});
    },
    async changeDestinationStatus(destinationId) {
      let allDestinationStatus = [];
      for (let i in this.destinationStatus) {
        allDestinationStatus.push(this.destinationStatus[i].status_name);
      }

      await this.$swal.fire({
        title: "تغيير حالة الوجهة التنظيمية",
        input: "select",
        inputOptions: allDestinationStatus,
        inputPlaceholder: "ارجو اختيار الحالة",
        showCancelButton: true,
        cancelButtonColor: "#e08db4",
        cancelButtonText: "الغاء",
        confirmButtonText: "تغيير",
        confirmButtonColor: "#32BDEA",
        inputValidator: (value) => {
          let statusId = parseInt(value) + 1;
          axiosConfig
            .get(
              `destination/change-status/${destinationId}/${statusId}`,
              this.config
            )
            .then((res) => {
              this.destinationCurrentStatus =
                res.data.info.destination_status_id;
              this.$swal.fire({
                title: "تمت العملية بنجاح",
                icon: "success",
                confirmButtonColor: "#32BDEA",
                confirmButtonText: "حسنا",
              });
            })
            .catch((err) => {
              this.$swal.fire({
                title: err.response.data.message,
                icon: "error",
                confirmButtonColor: "#32BDEA",
                confirmButtonText: "حسنا",
              });
            });
        },
      });
    },
  },
  async created() {
    this.fetchAllTasks();
    this.in_submission = true;
    await axiosConfig
      .get("task-status", this.config)
      .then((res) => {
        this.destinationStatus = res.data;
        this.in_submission = false;
      })
      .catch(() => {
        return;
      });
  },
};
</script>

<style scoped>
.border-dotted {
  border-style: dotted !important;
  border-spacing: 47px;
  border-width: 8px !important;
}

.vh-100 {
  height: 100vh !important;
}

.card-block.card-stretch {
  align-items: stretch;
}

.card-block {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
}

.card-transparent {
  background: transparent;
  border-radius: 10px;
  margin-bottom: 30px;
  border: none;
  box-shadow: none;
}

.mw-70 {
  max-width: 70% !important;
}

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

.cursor-prohibit {
  cursor: not-allowed !important;
}

.cursor-prohibit:hover {
  cursor: not-allowed !important;
}
</style>
