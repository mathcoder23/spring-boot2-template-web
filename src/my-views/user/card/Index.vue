<template>
    <el-row :gutter="20">
        <el-col span="8">
            <card-group-select @change="changeCardGroup"/>
        </el-col>
        <el-col span="16">
            <el-card>
                <avue-crud :data="list" :option="option"
                           ref="form"
                           v-model="form"
                           :page.sync="page"
                           @current-change="updateList"
                           @refresh-change="updateList"
                           @row-del="clickDel"
                           @row-update="clickEdit"
                           @row-save="clickSave">
                    <div slot-scope="{}" slot="bindForm">
                        <br><br>
                        {{form}}
                    </div>
                </avue-crud>
            </el-card>

        </el-col>

    </el-row>
</template>

<script>
    import CardGroupSelect from "../card-group/modules/CardGroupSelect";

    export default {
        name: "CardIndex",
        components: {CardGroupSelect},
        data() {
            return {
                api: this.$api.genApi.CardApi,
                currentCardGroup: {},
                form: {},
                list: [],
                page: {
                    currentPage: 1,
                    pageSize: 20
                },
                roleList: [],
                option: {
                    card:true,
                    labelWidth: 200,
                    align: 'center',
                    column: [
                        {
                            label: 'id',
                            prop: 'id',
                            hide: true,
                            editDisplay: false,
                            addDisplay: false
                        },
                        {
                            label: '卡片名称',
                            prop: 'name'
                        },
                        {
                            label: '问题',
                            prop: '_questionCardInfo_info',
                            bind: 'questionCardInfo.info'
                        },
                        {
                            label: '答案',
                            prop: '_answerCardInfo_info'
                        },
                        {
                            label: '答案提示',
                            prop: '_answerHintCardInfo_info'
                        }, {
                            label: '',
                            prop: 'bind',
                            span: 24,
                            formslot: true
                        },
                        {
                            label: "创建时间",
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
            changeCardGroup(cardGroup) {
                this.currentCardGroup = cardGroup
            },
            async updateList() {
                const rep = await this.api.listPage()
                console.log('a', rep)
                this.list = rep.data.list
                this.page.total = rep.data.total
            },
            clickDel(row, index) {
                this.api.remove({ids: [row.id]}).then(rep => {
                    this.updateList()
                })
            },
            clickEdit(row, index, done, loading) {
                this.clickSave(row, done, loading)
            },
            clickSave(form, done, loading) {
                if (!this.currentCardGroup.id) {
                    this.$message.warning("请选择卡片组")
                    return
                }
                console.log('a', form)
                console.log('a', this.form)
                const temp = JSON.parse(JSON.stringify(form))
                temp.cardGroupId = this.currentCardGroup.id
                this.api.saveData(temp).then(rep => {
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
