<template>
  <div class="content-page">
    <!--there is no destinations-->
    <div class="container-fluid" v-show="allDestinations.length == 0">
      <div class="row align-items-center justify-content-center">
        <div class="col-8 position-relative text-center vh-100">
          <div class="position-absolute top-50 start-50 translate-middle">
            <span class="">
              <img src="/img/side-bkg.png" />
              <p class="fs-4 text-muted fw-bold">لاتوجد عمليات جرد قائمة</p>
            </span>
          </div>
        </div>
      </div>
    </div>
    <!--all destinations-->
    <div class="container-fluid m-3" v-show="allDestinations.length > 0">
      <h2 class="mb-2">عمليات جرد قائمة</h2>
      <hr />
      <div class="row">
        <div
          class="col-lg-4 col-sm-12 col-md-6"
          v-for="des in allDestinations"
          :key="des.id"
        >
          <div class="card card-block card-stretch card-height-helf shadow-sm">
            <div class="card-body card-item-right">
              <div class="">
                <div class="bg-warning-light rounded text-center my-3">
                  <img
                    src="/img/business-3d-browser-1.png"
                    class="style-img img-fluid m-auto mw-45"
                    alt="image"
                  />
                </div>
                <div class="style-text text-left">
                  <h5 class="mb-2">
                    {{ des.building.building_name }}
                    <i class="fas fa-chevron-circle-left"></i>
                    {{ des.unit.unit_name }}
                  </h5>
                  <p class="mb-2">
                    <b>رئيس الوحدة</b> : {{ des.unit.unit_head.name }}
                  </p>
                  <p class="mb-2">
                    <b>عدد المشاركين في عملية الجرد</b> :
                    {{ des.assigned_users.length }}
                  </p>
                  <p class="mb-2">
                    <b>الحالة</b> :
                    <span
                      v-if="des.destination_status.id == 3"
                      class="badge bg-warning"
                    >
                      {{ des.destination_status.status_name }}</span
                    >
                    <span
                      v-else-if="des.destination_status.id == 2"
                      class="badge bg-danger"
                    >
                      {{ des.destination_status.status_name }}</span
                    >
                    <span v-else class="badge bg-success">
                      {{ des.destination_status.status_name }}</span
                    >
                  </p>
                  <p class="mb-2"><b>عدد المهام</b> : {{ des.tasks.length }}</p>
                  <p class="mb-1">
                    <b>تم الاعتماد</b> :
                    <span
                      v-if="des.approved == 0"
                      class="badge rounded-pill bg-warning"
                      >لا</span
                    >
                    <span v-else class="badge rounded-pill bg-success"
                      >نعم</span
                    >
                  </p>
                  <p v-if="des.approved_by != null" class="mb-2">
                    تم الاعتماد بواسطة : {{ des.approved_by.name || "" }}
                  </p>
                  <div class="d-flex flex-row justify-content-between">
                    <button
                      @click.prevent="
                        setCurrentDestinationTasks(des);
                        changeComponent('inventoryDestination');
                      "
                      class="btn btn-sm btn-primary fs-3rm mx-1"
                    >
                      التفاصيل <i class="fas fa-eye"></i>
                    </button>
                    <button
                      @click.prevent="approveDestination(des.id)"
                      v-if="
                        user.isHead == 1 &&
                        des.approved == 0 &&
                        user.unit_id == des.unit_id
                      "
                      class="btn btn-sm btn-danger fs-3rm mx-1"
                    >
                      اعتماد <i class="fas fa-clipboard-check"></i>
                    </button>
                    <button
                      @click.prevent="approveDestination(des.id, des.approved)"
                      v-if="
                        user.isHead == 1 &&
                        des.approved == 1 &&
                        user.unit_id == des.unit_id
                      "
                      class="btn btn-sm btn-danger fs-3rm mx-1"
                    >
                      الغاء الاعتماد <i class="fas fa-clipboard-check"></i>
                    </button>
                  </div>
                </div>
              </div>

              <div class="d-flex flex-row justify-content-between px-2">
                <small class="mt-2">
                  تاريخ البدء:
                  <span class="badge bg-secondary">{{
                    getFulldate(des.created_at)
                  }}</span>
                </small>
                <small class="mt-2">
                  المسؤول:
                  <span class="badge bg-secondary"
                    >{{ des.created_by.name }}
                  </span>
                </small>
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

export default {
  name: "DestinationsList",
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
  computed: {
    ...mapGetters({
      config: "config",
      user: "user",
    }),
  },
  data() {
    return {
      allDestinations: [],
    };
  },
  async created() {
    await this.fetchAllDestination();
  },
  methods: {
    getFulldate(fullDate) {
      const date = new Date(fullDate);
      return (
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
      );
    },
    async approveDestination(desId, approved = 0) {
      let title =
        approved == 0
          ? "هل تريد اعتماد هذه الوجهة ؟ "
          : "هل تريد الغاء اعتماد هذه الوجهة";
      this.$swal
        .fire({
          title: title,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#32BDEA",
          cancelButtonColor: "#e08db4",
          confirmButtonText: "نعم",
          cancelButtonText: "تراجع",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            await axiosConfig
              .get(`destination/approve/${desId}`, this.config)
              .then(async () => {
                this.$swal.fire({
                  title: "تمت العملية بنجاح",
                  icon: "success",
                  confirmButtonColor: "#32BDEA",
                  confirmButtonText: "حسنا",
                });
                await this.fetchAllDestination();
              })
              .catch(() => {
                this.$swal.fire({
                  title: " يجب الانتهاء من عملية جرد هذه  الوجهة اولا",
                  icon: "error",
                  confirmButtonColor: "#32BDEA",
                  confirmButtonText: "حسنا",
                });
                return;
              });
          }
        });
    },

    async fetchAllDestination() {
      await axiosConfig
        .get("inventory-destinations", this.config)
        .then((res) => {
          this.allDestinations = res.data;
        })
        .catch(() => {
          return;
        });
    },
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

.fs-3rm {
  font-size: 0.9rem !important;
}

.mw-45 {
  max-width: 45% !important;
}
</style>
