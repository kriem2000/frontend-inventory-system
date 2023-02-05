<template>
  <!--header-->
  <header class="navbar sticky-top flex-md-nowrap p-0 shadow-sm bg-white">
    <!-- title and navbarand -->
    <div
      class="overflow-auto iq-sidebar-logo d-flex align-items-center justify-content-between"
    >
      <a
        class="navbar-brand col-md-3 col-lg-2 me-0 px-3 text-dark-purple position-relative fw-bold fs-4 header-logo"
      >
        <img src="/img/logo.png" alt="" height="20" />
        <h5 class="logo-title light-logo ms-3">منظومة الجرد</h5>
      </a>
    </div>
    <!-- collapse button -->
    <button
      class="navbar-toggler position-absolute d-md-none collapsed mt-2"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#sidebarMenu"
      aria-controls="sidebarMenu"
      aria-expanded="false"
      aria-label="عرض/إخفاء لوحة التنقل"
    >
      <i class="fas fa-bars"></i>
    </button>
    <!-- search input -->
    <!-- <div class="w-75 d-none d-sm-none d-md-block">
      <div
        class="position-relative border border-1 d-flex flex-row p-1 rounded-pill float-start"
      >
        <a class="text-secondary p-1"><i class="fa fa-search"></i></a>
        <input
          class="form-control border-0 text-secondary"
          id="header-search-1"
          type="text"
          placeholder="بحث"
          aria-label="بحث"
        />
      </div>
    </div> -->
    <!-- user icon button -->
    <div class="d-none d-sm-none d-md-block ms-5">
      <div class="dropdown">
        <a
          href="#"
          class="d-block link-dark text-decoration-none dropdown-toggle"
          id="dropdownUser2"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src="/img/user_img.png"
            alt="mdo"
            width="32"
            height="32"
            class="rounded-circle p-1"
          />
        </a>
        <ul
          class="dropdown-menu dropdown-menu-start text-small shadow border-0 ms-2"
          aria-labelledby="dropdownUser2"
        >
          <li>
            <a class="dropdown-item disabled text-center" href="#"
              >{{ user.name }}
            </a>
          </li>
          <li>
            <a class="dropdown-item" href="#" @click.prevent="signOut"
              ><i class="fas fa-sign-out-alt"></i> تسجيل الخروج</a
            >
          </li>
        </ul>
      </div>
    </div>
  </header>

  <!--all page content-->
  <div class="container-fluid">
    <div class="row">
      <!--sidebar-->
      <nav
        id="sidebarMenu"
        class="col-md-3 col-lg-2 d-md-block bg-white sidebar collapse overflow-auto border-0 shadow-xs w-auto"
      >
        <div class="position-sticky pt-3" id="menu-container">
          <ul class="nav flex-column pe-0">
            <!-- المجرودات -->
            <li class="nav-item btn">
              <a
                @click.prevent="
                  changeComponent('DestinationsList');
                  changeComponentClass($event);
                "
                class="nav-link active-link"
                ><i class="fas fa-house-user ms-2"></i>
                عمليات جرد قائمة
              </a>
            </li>
            <li
              class="nav-item btn"
              v-if="
                allRoles.includes('Admin') ||
                allRoles.includes('Inventory Member')
              "
            >
              <a
                @click.prevent="
                  changeComponent('newDestination');
                  changeComponentClass($event);
                "
                class="nav-link"
                href="#"
              >
                <i class="fas fa-dolly-flatbed ms-3"></i> بدء عملية جرد
              </a>
            </li>
            <!-- الاحصائيات -->
            <li class="nav-item btn" v-if="allRoles.includes('Admin')">
              <a
                @click.prevent="
                  changeComponent('statistics');
                  changeComponentClass($event);
                "
                class="nav-link"
                href="#"
              >
                <span data-feather="shopping-cart"></span>
                <i class="fas fa-chart-line ms-3"></i> الأحصائيات
              </a>
            </li>
            <!-- المستخدمين -->
            <li class="nav-item" v-if="allRoles.includes('Admin')">
              <button
                class="btn btn-toggle align-items-center rounded collapsed"
                data-bs-toggle="collapse"
                data-bs-target="#users-collapse"
                aria-expanded="false"
              >
                <a class="nav-link" aria-current="page" href="#">
                  <span data-feather="home"></span>
                  <i class="fas fa-users ms-3"></i> المستخدمين
                  <i class="arrow-icon fas fa-caret-down pe-2"></i>
                </a>
              </button>
              <div class="collapse" id="users-collapse">
                <ul
                  class="btn-toggle-nav list-unstyled fw-normal pe-4 pb-2 small"
                >
                  <li>
                    <a
                      @click.prevent="
                        changeComponent('addUser');
                        changeComponentClass($event);
                      "
                      href="#"
                      class="link-dark rounded text-decoration-none p-0 py-1 ps-4"
                      ><i class="minus-icon fas fa-minus ps-2"></i> اضافة مستخدم
                      جديد
                    </a>
                  </li>
                  <li>
                    <a
                      @click.prevent="
                        changeComponent('usersList');
                        changeComponentClass($event);
                      "
                      href="#"
                      class="link-dark rounded text-decoration-none p-0 py-1 ps-4"
                      ><i class="minus-icon fas fa-minus ps-2"></i> جميع
                      المستخدمين
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <!-- التقارير -->
            <li
              class="nav-item btn"
              v-if="
                allRoles.includes('Admin') ||
                allRoles.includes('Inventory Member')
              "
            >
              <a class="nav-link" href="#">
                <span data-feather="bar-chart-2"></span>
                <i class="fas fa-flag ms-3"></i> التقارير
              </a>
            </li>
          </ul>

          <!-- خيارات المستخدم -->
          <h6
            class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted d-md-none d-lg-none d-xl-none"
          >
            <span>{{ user.name }}</span>
            <a class="link-secondary" href="#" aria-label="إضافة تقرير جديد">
              <span data-feather="plus-circle"></span>
            </a>
          </h6>
          <ul class="nav flex-column mb-2 list-unstyled">
            <!-- <li class="nav-item d-md-none d-lg-none d-xl-none">
              <div class="w-100 nav-link">
                <div
                  class="position-relative border border-1 w-50 d-flex flex-row p-2 rounded"
                >
                  <a
                    class="text-secondary p-0 m-0 overflow-hidden text-decoration-none"
                    ><i class="fa fa-search me-1"></i
                  ></a>
                  <input
                    class="form-control border-0 rounded text-secondary"
                    id="header-search-2"
                    type="text"
                    placeholder="بحث"
                    aria-label="بحث"
                  />
                </div>
              </div>
            </li> -->
            <li class="nav-item d-md-none d-lg-none d-xl-none">
              <div class="navbar-nav nav-link">
                <div class="text-nowrap nav-link">
                  <a
                    @click.prevent="signOut"
                    class="nav-link px-3 btn-primary btn btn-sm d-inline ms-3 border-0 rounded fs-12"
                    href="#"
                  >
                    <i class="fas fa-sign-out-alt"></i> تسجيل الخروج</a
                  >
                </div>
              </div>
            </li>
          </ul>
        </div>
      </nav>
      <main class="col-md-9 me-sm-auto col-lg-10 px-md-4">
        <!-- dynamic components (dashboardContent) -->
        <component
          :is="componentName"
          :allDestinationTask="allDestinationTask"
          :setCurrentDestinationTasks="setCurrentDestinationTasks"
          :setCurrentDestinationItems="setCurrentDestinationItems"
          :changeComponent="changeComponent"
          :allDestinationItems="allDestinationItems"
        ></component>
      </main>
    </div>
  </div>

  <!--FAB-->
  <div class="fab-container d-none d-lg-block" id="goFS">
    <i class="fas fa-compress"></i>
  </div>
</template>

<script>
import addUser from "@/components/users/addUser.vue";
import usersList from "@/components/users/usersList.vue";
import newDestination from "@/components/inventory/newDestination.vue";
import DestinationsList from "@/components/inventory/DestinationsList.vue";
import inventoryDestination from "@/components/inventory/inventoryDestination.vue";
import tasksList from "@/components/inventory/tasksList.vue";
import statistics from "./statistics/statistics.vue";
import store from "@/store";
import footerVue from "@/components/footer";
import axiosConfig from "../includes/axiosConfig";
import { mapGetters } from "vuex";

export default {
  name: "dashboard",
  components: {
    addUser,
    usersList,
    footerVue,
    newDestination,
    inventoryDestination,
    DestinationsList,
    tasksList,
    statistics,
  },
  computed: {
    ...mapGetters({
      allRoles: "allRoles",
      config: "config",
    }),
  },
  data() {
    return {
      user: store.state.user,
      componentName: "DestinationsList",
      fullScreen: false,
      document: null,
      goFS: null,
      allDestinationTask: {},
      allDestinationItems: null,
      allCurentuserRoles: this.allRoles,
    };
  },
  mounted() {
    this.document = document.documentElement;
    this.goFS = document.getElementById("goFS");
    this.goFS.addEventListener("click", this.changeScreen);
  },
  methods: {
    changeScreen() {
      if (this.fullScreen) {
        this.closeFullscreen();
      } else {
        this.openFullscreen();
      }
    },
    openFullscreen() {
      this.fullScreen = true;
      this.goFS.innerHTML = "<i class='fas fa-compress-arrows-alt'></i>";
      if (this.document.requestFullscreen) {
        this.document.requestFullscreen();
      } else if (this.document.webkitRequestFullscreen) {
        /* Safari */
        this.document.webkitRequestFullscreen();
      } else if (this.document.msRequestFullscreen) {
        /* IE11 */
        this.document.msRequestFullscreen();
      }
    },
    closeFullscreen() {
      this.fullScreen = false;
      this.goFS.innerHTML = "<i class='fas fa-compress'></i>";
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        /* Safari */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        /* IE11 */
        document.msExitFullscreen();
      }
    },
    changeComponent(name, id = 0) {
      this.componentName = name;
      this.currentDestinationId = id;
    },
    changeComponentClass(e) {
      var as = document.querySelectorAll("#sidebarMenu a");
      for (let i = 0; i < as.length; i++) {
        as[i].classList.toggle("active-link", false);
      }
      e.currentTarget.classList.toggle("active-link");
    },
    async signOut() {
      await axiosConfig
        .get("logout", this.config)
        .then(() => {
          this.$store.dispatch("signOutAction");
          this.$router.replace({ name: "signIn" });
        })
        .catch(() => {
          this.$store.dispatch("signOutAction");
          this.$router.replace({ name: "signIn" });
          return;
        });
    },
    setCurrentDestinationTasks(tasks) {
      this.allDestinationTask = tasks;
    },
    setCurrentDestinationItems(Items) {
      this.allDestinationItems = Items;
    },
  },
};
</script>

<style></style>
