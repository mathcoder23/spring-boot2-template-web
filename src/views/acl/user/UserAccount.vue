<template>
    <el-card>
        <avue-crud :data="list" :option="option"
                   ref="form"
                   :page.sync="page"
                   @current-change="updateList"
                   @refresh-change="updateList"
                   @row-del="clickDel"
                   @row-update="clickEdit"
                   @row-save="clickSave">
            <template slot-scope="scope" slot="menu">

            </template>
        </avue-crud>
    </el-card>
</template>

<script>
    export default {
        name: "UserAccount",
        components: {},
        data() {
            return {
                list: [],
                page: {
                    currentPage: 1,
                    pageSize: 20
                },
                roleList: [],
                option: {
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
                            label: '用户昵称',
                            prop: 'nick'
                        },
                        {
                            label: '登录名',
                            prop: 'username'
                        },
                        {
                            label: '是否启用',
                            prop: 'enable',
                            type: 'select',
                            dicData: this.$store.state.constants.dictList['local_Enable']
                        },
                        {
                            label: '用户类型',
                            prop: 'type',
                            type: 'select',
                            dicData: this.$store.state.constants.dictList['Account_Type']
                        },
                        {
                            label: '角色',
                            prop: 'roleId',
                            type: 'select',
                            remote: true,
                            dicData: this.roleList
                        }, {
                            label: "最近活跃时间",
                            prop: "lastActiveTime",
                            type: "date",
                            editDisabled: false,
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
            this.updateRoleList()
        },
        methods: {

            async updateRoleList() {
                const rep = await this.$api.genApi.RoleApi.list({pageNo: 1, pageSize: 20})
                console.log('a', rep)
                this.roleList = []
                for (const item of rep.data.list) {
                    this.roleList.push({
                        label: item.name,
                        value: item.id
                    })
                }
                this.option.column[5].dicData = this.roleList
                this.$refs.form.init()
            },
            async updateList() {
                const rep = await this.$api.genApi.AccountApi.list({pageNo: 1, pageSize: 20})
                console.log('a', rep)
                this.list = rep.data.list
                this.page.total = rep.data.total
            },
            clickAssignPermission(a) {
                console.log('a', a)
                this.$refs.assignDialog.open(a.row)
            },
            clickDel(row, index) {
                this.$api.genApi.RoleApi.remove({ids: [row.id]}).then(rep => {
                    this.updateList()
                })
            },
            clickEdit(row, index, done, loading) {
                this.clickSave(row, done, loading)
            },
            clickSave(form, done, loading) {
                const temp = JSON.parse(JSON.stringify(form))
                delete temp.createTime
                this.$api.genApi.UserAccountApi.save(temp).then(rep => {
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
