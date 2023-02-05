<template>
  <dashboard></dashboard>
</template>

<script>
import dashboard from "@/components/dashboard";
import store from "@/store";

export default {
  name: "Home",
  components: { dashboard },
  beforeRouteEnter(to, from, next) {
    if (store.state.authenticated) {
      next();
    } else {
      next({ name: "signIn" });
    }
  },
};
</script>
