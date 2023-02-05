<template>
  <div class="container-fluid p-3">
    <div class="row">
      <div class="col-lg-12">
        <div
          class="d-flex flex-wrap align-items-center justify-content-between mb-4"
        >
          <div class="mb-1">
            <h2>الأحصائيات</h2>
          </div>
        </div>
      </div>
      <!-- منظومة الجرد في ارقام -->
      <div class="col-lg-12" v-if="statistics != null">
        <div class="row">
          <!-- جميع ما تم جرده -->
          <div class="col-lg-4 col-md-6 col-sm-12">
            <div class="card card-block card-stretch shadow">
              <div class="card-body">
                <div class="d-flex align-items-center mb-4 card-total-item">
                  <div class="icon iq-icon-box-2 bg-info-light ms-3">
                    <img
                      src="/img/business-3d-magnifier-2.png"
                      class="img-fluid"
                      alt="image"
                    />
                  </div>
                  <div>
                    <p class="mb-2">جميع العنصار التي تم جردها</p>
                    <h4>{{ statistics.items }}</h4>
                  </div>
                </div>
                <div class="iq-progress-bar mt-2">
                  <span
                    class="bg-info iq-progress progress-1"
                    data-percent="85"
                    style="transition: width 2s ease 0s; width: 85%"
                  ></span>
                </div>
              </div>
            </div>
          </div>
          <!--  جميع الوحدات التي تم جردها  -->
          <div class="col-lg-4 col-md-6 col-sm-12">
            <div class="card card-block card-stretch shadow">
              <div class="card-body">
                <div class="d-flex align-items-center mb-4 card-total-item">
                  <div class="icon iq-icon-box-2 bg-success-light ms-3">
                    <img
                      src="/img/business-3d-arrow.png"
                      class="img-fluid"
                      alt="image"
                    />
                  </div>
                  <div>
                    <p class="mb-2">جميع الوحدات التي تم جردها</p>
                    <h4>
                      تم جرد {{ statistics.finished_units }} من اصل
                      {{ statistics.all_units }}
                    </h4>
                  </div>
                </div>
                <div class="iq-progress-bar mt-2">
                  <span
                    class="bg-info iq-progress progress-1"
                    data-percent="85"
                    style="transition: width 2s ease 0s; width: 85%"
                  ></span>
                </div>
              </div>
            </div>
          </div>
          <!-- النسبة المئوية  لعملية الجرد -->
          <div class="col-lg-4 col-md-6 col-sm-12">
            <div class="card card-block card-stretch shadow">
              <div class="card-body">
                <div class="d-flex align-items-center mb-4 card-total-item">
                  <div class="icon iq-icon-box-2 bg-danger-light ms-3">
                    <img
                      src="/img/business-3d-grafic.png"
                      class="img-fluid"
                      alt="image"
                    />
                  </div>
                  <div>
                    <p class="mb-2">النسبة المئوية المنجزة</p>
                    <div class="progress">
                      <div
                        class="progress-bar bg-danger-light"
                        role="progressbar"
                        :style="{ width: `${inventoryProcess}%` }"
                        aria-valuenow="100"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    {{ inventoryProcess + "%" }}
                  </div>
                </div>
                <div class="iq-progress-bar mt-2">
                  <span
                    class="bg-info iq-progress progress-1"
                    data-percent="85"
                    style="transition: width 2s ease 0s; width: 85%"
                  ></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-12">
        <div
          class="d-flex flex-wrap align-items-center justify-content-between mb-4"
        >
          <div class="mb-1">
            <h2>البحث المتقدم</h2>
          </div>
        </div>
      </div>
      <div class="col-lg-12">
        <div class="row">
          <!-- الفلاتر المتقدمة -->
          <div class="col-lg-8 col-md-10 col-sm-12 mb-4">
            <div class="d-flex flex-row">
              <!-- اسم المبني -->
              <div class="form-floating mx-2">
                <select
                  class="form-select"
                  id="buildId"
                  aria-label="Floating label select example"
                >
                  <option value="" selected>الكل</option>
                  <template v-for="build in allBuildings" :key="build.id">
                    <option :value="build.id">{{ build.building_name }}</option>
                  </template>
                </select>
                <label for="floatingSelect">اسم المبني</label>
              </div>
              <!-- اسم الوحدة التنظيمية -->
              <div class="form-floating mx-2">
                <select
                  class="form-select"
                  id="unitId"
                  aria-label="Floating label select example"
                >
                  <option value="" selected>الكل</option>
                  <template v-for="unit in allUnits" :key="unit.id">
                    <option :value="unit.id">{{ unit.unit_name }}</option>
                  </template>
                </select>
                <label for="floatingSelect">اسم الوحدة</label>
              </div>
              <!-- اسم التصنيف -->
              <div class="form-floating mx-2">
                <select
                  class="form-select"
                  id="categoryId"
                  aria-label="Floating label select example"
                >
                  <option value="" selected>الكل</option>
                  <template
                    v-for="category in allCategories"
                    :key="category.id"
                  >
                    <option :value="category.id">
                      {{ category.category_name }}
                    </option>
                  </template>
                </select>
                <label for="floatingSelect">التصنيف</label>
              </div>
              <!-- رز البحث -->
              <button
                @click.prevent="fetchAllItems"
                class="btn btn-primary mx-2"
              >
                <i class="fas fa-search"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-12">
        <table
          class="data-table table mb-0 tbl-server-info dataTable no-footer"
          id="DataTables_Table_0"
          role="grid"
          aria-describedby="DataTables_Table_0_info"
          v-show="allItems.length != 0"
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
                اسم العنصر
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
                tabindex="0"
                aria-controls="DataTables_Table_0"
                rowspan="1"
                colspan="1"
                aria-label="Awors Points: activate to sort column ascending"
                style="width: 101.156px"
              >
                مُسجل بواسطة
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
                الوحدة التنظيمية
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
            </tr>
          </thead>
          <tbody class="ligth-body">
            <template v-for="item in allItems" :key="item.id">
              <tr role="row" class="odd">
                <td>{{ item.item_name }}</td>
                <td>{{ item.quantity }}</td>
                <td>{{ item.category.category_name }}</td>
                <td>{{ item.item_owner }}</td>
                <td>{{ item.assigned_by.name }}</td>
                <td>{{ item.task.unit.unit_name }}</td>
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
              </tr>
            </template>
          </tbody>
        </table>
        <loading class="text-center" v-show="in_submission" />
      </div>
      <!-- there's no items -->
      <!--there is no destinations-->
      <div class="container-fluid" v-show="allItems.length == 0">
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
  </div>
</template>

<script>
import axiosConfig from "../../includes/axiosConfig";
import { mapGetters } from "vuex";
import loading from "../loading.vue";

export default {
  name: "statistics",
  data() {
    return {
      allItems: [],
      statistics: null,
      allBuildings: [],
      allCategories: [],
      allUnits: [],
      in_submission: false,
    };
  },
  components: {
    loading,
  },
  computed: {
    ...mapGetters({
      config: "config",
      user: "user",
    }),
    inventoryProcess() {
      return parseInt(
        (this.statistics.finished_units / this.statistics.all_units) * 100
      );
    },
  },
  async created() {
    this.in_submission = true;
    /* to fetch statistics */
    await axiosConfig
      .get("statistics", this.config)
      .then((res) => {
        this.statistics = res.data;
      })
      .catch(() => {
        return;
      });
    /* get all items */
    this.fetchAllItems();

    /* to get all buildings and units */
    await axiosConfig
      .get("buildings", this.config)
      .then((res) => {
        this.allBuildings = res.data;
      })
      .catch((err) => {
        console.l9og(err.response);
      });
    /* to get all units and units */
    await axiosConfig
      .get("units", this.config)
      .then((res) => {
        this.allUnits = res.data.info;
      })
      .catch((err) => {
        console.l9og(err.response);
      });
    /* to get all categories and units */
    await axiosConfig
      .get("categories", this.config)
      .then((res) => {
        this.allCategories = res.data;
      })
      .catch((err) => {
        console.l9og(err.response);
      });
    this.in_submission = false;
  },
  methods: {
    taskInfoDailog(desc) {
      desc == null ? (desc = "لا توجد ملاحظات حول هذا العنصر") : "";
      this.$swal.fire({
        icon: "info",
        text: desc,
        confirmButtonColor: "#78c091",
        confirmButtonText: "حسنا",
      });
    },
    async fetchAllItems() {
      let buildId = document.getElementById("buildId").value || "%";
      let unitId = document.getElementById("unitId").value || "%";
      let categoryId = document.getElementById("categoryId").value || "%";

      /* to get all items */
      await axiosConfig
        .get(`item-statistics/${buildId}/${unitId}/${categoryId}`, this.config)
        .then((res) => {
          this.allItems = res.data;
        })
        .catch(() => {
          return;
        });
    },
  },
};
</script>
