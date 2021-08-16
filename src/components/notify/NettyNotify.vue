<template>
    <div id="main" class="app-main">
    </div>
</template>

<script>
    import Push from 'push.js'
    import {baseUrl} from "../../config/env";

    export default {
        name: 'netty-notify',
        data() {
            return {
                wsUri: ''
            };
        },
        mounted() {
            // this.initWebSocket()
        },
        beforeDestroy() {

        },
        methods: {
            initWebSocket() {
                this.websock = new WebSocket(this.wsUri);
                this.websock.onmessage = this.websocketOnMessage;
                this.websock.onopen = this.websocketOnOpen;
                this.websock.onerror = this.websocketOnError;
                this.websock.onclose = this.websocketOnClose;
            },
            websocketOnOpen() {
                this.websocketSend('hello')
                console.log('websocket 连接成功');
            },
            websocketOnError() {//连接建立失败重连
                // this.initWebSocket()
            },
            websocketOnMessage(e) {
                console.log(e)
                let json = null
                try {
                    json = JSON.parse(e.data)
                } catch (e) {

                }
                if (null === json) {
                    return;
                }
                if (json.code === 'DEVICE_STATUS') {
                    this.$message.success(json.data)
                    this.$store.commit('DEVICE_STATUS', json.data)
                    Push.create("设备状态", {
                        // body 选项是通知的内容
                        body: json.data,
                        // timeout 选项是通知停留时间
                        timeout: 4000
                    });
                }
                if (json.code === 'PLATFORM_STATUS') {
                    this.$message.success(json.data)
                    this.$store.commit('PLATFORM_STATUS', json.data)
                    Push.create("设备状态", {
                        // body 选项是通知的内容
                        body: json.data,
                        // timeout 选项是通知停留时间
                        timeout: 4000
                    });
                }

            },
            websocketSend(Data) {//数据发送
                this.websock.send(Data)
            },
            websocketOnClose(e) {  //关闭
                console.log('断开连接', e)
                console.log('websocket 连接失败');

            }

        }
    };
</script>

<style lang="less">
    html, body {
        width: 100%;
        height: 100%;
        background: #f0f0f0;
        overflow: auto;
        font-size: 16px;
    }

    .app-main {
        width: 100%;
        height: 100%;
    }
</style>
