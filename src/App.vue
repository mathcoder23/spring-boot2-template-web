<template>
  <div id="app">
    <router-view />
    <netty-notify/>
  </div>
</template>

<script>
import NettyNotify from "./components/notify/NettyNotify";
export default {
  name: "app",
  components: {NettyNotify},
  data() {
    return {};
  },
  mounted() {
    // this.$store.dispatch("GetEnumFormatValue")
  },
  created() {},
  methods: {

  },
  computed: {}
};
</script>
<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
