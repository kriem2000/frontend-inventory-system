<template>
  <div class="content-page py-4 px-2">
    <div class="container-fluid add-form-list">
      <div class="row">
        <div class="col-sm-12">
          <div class="card">
            <div class="card-header d-flex justify-content-between">
              <div class="header-title">
                <h4 class="card-title">اختيار وجهة جرد جديدة</h4>
              </div>
            </div>
            <div class="card-body">
              <vee-form
                @submit="createnewDestination"
                :validationSchema="newDestinationSchema"
              >
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group">
                      <label>
                        اسم المبني <span class="text-danger">*</span></label
                      >
                      <vee-field
                        @change.prevent="getCurrentUnits($event)"
                        name="build_id"
                        as="select"
                        class="selectpicker form-control"
                        id="buildingSelect"
                      >
                        <option selected disabled></option>
                        <template
                          v-for="building in allBuildings"
                          :key="building.id"
                        >
                          <option :value="building.id">
                            {{ building.building_name }}
                          </option>
                        </template>
                      </vee-field>
                      <ErrorMessage name="build_id" class="text-danger" />
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group">
                      <label>
                        الوحدة التنظيمية المستهدفة
                        <span class="text-danger">*</span></label
                      >
                      <vee-field
                        as="select"
                        name="unit_id"
                        id="currentUnitId"
                        class="selectpicker form-control"
                        data-style="py-0"
                        :disabled="allUnits.length == 0"
                      >
                        <template v-for="unit in allUnits" :key="unit.id">
                          <option :value="unit.id">{{ unit.unit_name }}</option>
                        </template>
                      </vee-field>
                      <ErrorMessage name="unit_id" class="text-danger" />
                    </div>
                  </div>
                </div>
                <div class="col-lg-6" v-if="allUnits.length > 0">
                  <div class="card card-block card-stretch card-height">
                    <div class="card-header d-flex justify-content-between">
                      <div class="header-title">
                        <h4 class="card-title">المستخدمين المشاركين</h4>
                      </div>
                      <div
                        class="header-action"
                        @click.prevent="showUsersDialog($event)"
                      >
                        <i
                          class="far fa-hand-point-down fs-4 cursor-pointer"
                        ></i>
                      </div>
                    </div>
                    <div class="card-body">
                      <div class="d-none" id="usersDialog" style="">
                        <div class="card bg-purple-dark">
                          <div
                            class="py-0 px-2 d-flex d-row justify-content-between"
                            v-for="user in allInventoryGroupUsers"
                            :key="user.id"
                          >
                            <p class="text-white">
                              <img
                                class="img-fluid avatar-20 rounded"
                                src="/img/user_img.png"
                                alt=""
                              />
                              {{ user.name }}
                              {{ user.nickname != null ? user.nickname : "" }}
                            </p>
                            <div class="text-start">
                              <span
                                :id="`removeUserIcon${user.id}`"
                                @click.prevent="
                                  removeUser(user);
                                  disableRemoveIcon(user.id);
                                "
                                class="text-white mx-1 cursor-pointer d-none"
                                ><i class="fas fa-minus-square"></i
                              ></span>
                              <span
                                :id="`addUserIcon${user.id}`"
                                @click.prevent="
                                  addUser(user);
                                  disableAddIcon(user.id);
                                "
                                class="text-white mx-1 cursor-pointer"
                                ><i class="fas fa-plus-square"></i
                              ></span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="iq-avatars d-flex flex-wrap align-items-center"
                      >
                        <div class="iq-avatar">
                          <div class="iq-media-group">
                            <a
                              v-for="user in addedUsers"
                              :key="user.id"
                              class="iq-media d-block badge bg-info m-1 text-white fs-6"
                            >
                              <small>{{ user.name }}</small>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="d-flex flex-row">
                  <button
                    type="submit"
                    class="btn btn-primary ms-2"
                    :disabled="in_submission"
                  >
                    بدء وجهة الجرد
                  </button>
                  <loading v-show="in_submission" />
                  <button
                    type="reset"
                    id="createnewDestinationForm"
                    class="btn btn-danger"
                  >
                    حذف والبدء من جديد
                  </button>
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
        </div>
      </div>
      <!-- Page end  -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axiosConfig from "@/includes/axiosConfig";
import loading from "@/components/loading.vue";

export default {
  name: "newTask",
  props: {
    setCurrentDestinationTasks: {
      required: true,
      type: Function,
    },
    changeComponent: {
      required: true,
      type: Function,
    },
  },
  data() {
    return {
      in_submission: false,
      show_alert: false,
      alert_clase: "",
      alert_msg: "",
      allBuildings: [],
      allInventoryGroupUsers: [],
      addedUsers: [],
      allUnits: [],
      newDestinationSchema: {
        build_id: "required|numeric",
        unit_id: "required|numeric",
      },
    };
  },
  components: { loading },
  computed: {
    ...mapGetters({
      config: "config",
    }),
  },
  async created() {
    await axiosConfig.get("buildings", this.config).then((res) => {
      this.allBuildings = res.data;
    });
    await axiosConfig.get("inventory-members", this.config).then((res) => {
      this.allInventoryGroupUsers = res.data;
    });
  },
  methods: {
    getCurrentUnits(e) {
      this.allUnits = [];
      let buildId = e.currentTarget.value;
      for (let i in this.allBuildings) {
        if (this.allBuildings[i].id == buildId) {
          for (let j in this.allBuildings[i].units) {
            if (this.allBuildings[i].units[j].inventory_destination == null) {
              this.allUnits.push(this.allBuildings[i].units[j]);
            }
          }
        }
      }
    },
    showUsersDialog() {
      document.getElementById("usersDialog").classList.toggle("d-none");
    },
    addUser(user) {
      if (!this.addedUsers.includes(user)) {
        this.addedUsers.push(user);
      }
    },
    removeUser(user) {
      if (this.addedUsers.includes(user)) {
        for (let i in this.addedUsers) {
          if (this.addedUsers[i].id == user.id) {
            this.addedUsers.splice(i, 1);
          }
        }
      }
    },
    disableRemoveIcon(userId) {
      document
        .getElementById("removeUserIcon" + userId)
        .classList.toggle("d-none");
      document
        .getElementById("addUserIcon" + userId)
        .classList.toggle("d-none");
    },
    disableAddIcon(userId) {
      document
        .getElementById("addUserIcon" + userId)
        .classList.toggle("d-none");
      document
        .getElementById("removeUserIcon" + userId)
        .classList.toggle("d-none");
    },
    async createnewDestination(val) {
      let users = [];
      for (const i in this.addedUsers) {
        users.push(this.addedUsers[i].id);
      }
      let request = {
        build_id: val.build_id,
        unit_id: val.unit_id,
        users: users,
      };
      let unitInBuild = false;
      for (const i in this.allBuildings) {
        if (this.allBuildings[i].id == val.build_id) {
          for (const j in this.allBuildings[i].units) {
            if (this.allBuildings[i].units[j].id == val.unit_id) {
              unitInBuild = true;
            }
          }
        }
      }
      this.in_submission = true;

      if (unitInBuild) {
        await axiosConfig
          .post("create-destination", request, this.config)
          .then((res) => {
            this.show_alert = true;
            this.alert_clase = "alert alert-info";
            this.alert_msg = "تم بدء مهمة الجرد بنجاح";
            this.in_submission = false;
            document.getElementById("createnewDestinationForm").click();
            let tasks = res.data.info;
            this.startDestinationProcess(tasks);
          })
          .catch(() => {
            this.show_alert = true;
            this.alert_clase = "alert alert-danger";
            this.alert_msg = "لقد تم البدء مسبقا بهذه الوحدة التنظيمية";
            this.in_submission = false;
            return;
          });
      } else {
        this.show_alert = true;
        this.alert_clase = "alert alert-danger";
        this.alert_msg = "الحقول لا تتطابق";
        this.in_submission = false;
      }
      setTimeout(() => {
        this.alert_msg = "";
      }, 3000);
    },
    startDestinationProcess(tasks) {
      this.$swal
        .fire({
          title: "هل تريد البدء في هذه الوجهة الان ؟",
          icon: "question",
          iconHtml: "؟",
          confirmButtonText: "نعم",
          cancelButtonText: "لا",
          showCancelButton: true,
          showCloseButton: true,
          confirmButtonColor: "#32BDEA",
          cancelButtonColor: "#e08db4",
        })
        .then((res) => {
          if (res.isConfirmed) {
            this.setCurrentDestinationTasks(tasks);
            this.changeComponent("inventoryDestination");
          }
        });
    },
  },
};
</script>
