<template>
    <div id="app">
        <router-view/>
        <netty-notify/>
        <vue-websocket/>
    </div>
</template>

<script>
    import NettyNotify from "./components/notify/NettyNotify";
    import VueWebsocket from "./components/notify/VueWebsocket";

    export default {
        name: "app",
        components: {VueWebsocket, NettyNotify},
        data() {
            return {};
        },
        mounted() {
            // this.$store.dispatch("GetEnumFormatValue")
        },
        created() {
        },
        methods: {},
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
