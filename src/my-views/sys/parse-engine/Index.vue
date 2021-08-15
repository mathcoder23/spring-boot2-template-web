<template>
    <div>
        <assign-role-permission-dialog ref="assignDialog"/>
        <avue-crud :data="list" :option="option"
                   :page.sync="page"
                   @current-change="updateList"
                   @refresh-change="updateList"
                   @row-del="clickDel"
                   @row-update="clickEdit"
                   @row-save="clickSave">

        </avue-crud>
    </div>
</template>

<script>

    export default {
        name: "ParseEngine",
        components: {},
        data() {
            return {
                api: this.$api.genApi.CardParseEngineApi,
                list: [],
                page: {
                    currentPage: 1,
                    pageSize: 20
                },
                option: {
                    title: '解析引擎',
                    titleSize: 'h3',
                    titleStyle: {
                        color: 'red'
                    },
                    align: 'center',
                    menuAlign: 'center',
                    column: [
                        {
                            label: 'id',
                            prop: 'id',
                            hide: true,
                            editDisplay: false,
                            addDisplay: false
                        },
                        {
                            label: '解析引擎名词',
                            prop: 'name'
                        }, {
                            label: "创建日期",
                            prop: "createTime",
                            type: "date",
                            editDisabled: true,
                            addDisplay: false,
                            format: "yyyy-MM-dd HH:mm:ss",
                            valueFormat: "yyyy-MM-dd HH:mm:ss",
                        }
                    ]
                }
            }
        },
        mounted() {
            console.log('a', this.$api)
            this.updateList()
        },
        methods: {
            async updateList() {
                const rep = await this.api.list()
                console.log('a', rep)
                this.list = rep.data.list
                this.page.total = rep.data.total
            },
            clickAssignPermission(a) {
                console.log('a', a)
                this.$refs.assignDialog.open(a.row)
            },
            clickDel(row, index) {
                this.$alert('确定要删除-' + row.name, '警告', {
                    confirmButtonText: '确定',
                    callback: action => {
                        this.api.remove({ids: [row.id]}).then(rep => {
                            this.updateList()
                        })
                    }
                });

            },
            clickEdit(row, index, done, loading) {
                this.clickSave(row, done, loading)
            },
            clickSave(form, done, loading) {
                const temp = JSON.parse(JSON.stringify(form))
                delete temp.createTime
                this.api.save(temp).then(rep => {
                    console.log('r', rep)
                    done()
                    this.updateList()
                }).catch(e => {
                    loading()
                })
            }
        }
    }
</script>

<style scoped>

</style>
