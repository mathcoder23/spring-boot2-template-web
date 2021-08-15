<template>
    <el-card header="卡片组">
        <el-tree
                :expand-on-click-node="false"
                :data="data"
                :props="defaultProps"
                default-expand-all
                node-key="id"
                @node-click="handleNodeClick">
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                        <div>
                            {{ node.label }}
                        </div>
                     </span>
        </el-tree>
    </el-card>
</template>

<script>
    export default {
        name: "CardGroupSelect",
        data() {
            return {
                data: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                currentNode: {}
            }
        },
        mounted() {
            this.updateList()
        },
        methods: {
            async updateList() {
                const rep = await this.$api.genApi.CardGroupApi.getTree()
                this.data = rep.data
            },
            handleNodeClick(data, node) {
                this.currentNode = data
                this.$emit('change', this.currentNode)
            }
        }

    }
</script>

<style scoped>

</style>