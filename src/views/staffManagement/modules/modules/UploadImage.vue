<template>
    <div class="clearfix">
        <a-upload accept="image/*"
                  listType="picture-card"
                  :fileList="fileList"
                  @preview="handlePreview"
                  :remove="remove"
                  :beforeUpload="beforeUpload"
                  :customRequest="handleUpload">
            <div v-if="fileList.length < maxNum">
                <a-icon :type="loading ? 'loading' : 'plus'"/>
                <div class="ant-upload-text">{{tip}}</div>
            </div>
        </a-upload>
        <!-- 图片预览 -->
        <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
            <img alt="加载失败" style="width: 100%" :src="previewImage" />
        </a-modal>
    </div>

</template>

<script>
    import COS from 'cos-js-sdk-v5'
    import {getCosTempSecret} from"../../../../api/localApi"
    import uuid from '../../../../utils/uuid'
    /* eslint-disable */
    export default {
        name:"UploadImage",
        props: {
            files: {
                type: Array,
                required: false,
                default: () => []
            },
            tip:{
                type:String,
                required:false,
                default:'upLoad'
            }
        },
        data() {
            return {
                fileList: [],
                cos: null,
                // 图片预览相关
                previewVisible: false,
                previewImage: '',
                maxNum:1,
                loading:false
            }
        },
        watch:{
            files(list){
                this.fileList = list
            }
        },
        created() {
            // 初始化腾讯云上传
            this.cos = new COS({
                getAuthorization: (options, callback) => {
                    getCosTempSecret().then(res => {
                        console.log(res)
                        if(res.code == 0){
                            let credentials = res.data
                            callback({
                                TmpSecretId: credentials.credentials.tmpSecretId,
                                TmpSecretKey: credentials.credentials.tmpSecretKey,
                                XCosSecurityToken: credentials.credentials.sessionToken,
                                ExpiredTime: credentials.expiredTime
                            })
                        }
                    })
                }
            })
        },
        methods: {
            // 限制上传数量
            changeNum(maxNum){
                this.maxNum = maxNum
            },
            // 图片预览关闭
            handleCancel() {
                this.previewVisible = false;
            },
            // 图片预览开启
            handlePreview(file) {
                this.previewImage = file.url || file.thumbUrl;
                this.previewVisible = true;
            },
            // 上传之前判断文件类型
            beforeUpload(file) {
                // console.log("beforeUpload",file)
                this.loading = true
                let isJPG = false
                const picTypes = ["image/jpeg","image/png","image/bmp","image/tif"]
                picTypes.forEach(item=>{
                    if(file.type.toLocaleLowerCase() == item){
                        isJPG = true
                    }
                })
                if(!isJPG){
                    this.$message.error("请上传图片类型：jpeg/png/bmp/tif")
                    this.loading = false
                    return false
                }
            },
            // 删除图片
            remove(file){
                // console.log("remove",file)
                // console.log("remove",this.fileList)
                let fileList = this.fileList.filter(item=>{
                    return item.uid != file.uid
                })
                this.fileList = fileList
                this.$emit('change', fileList)
            },
            // 上传文件 返回腾讯云信息，通过事件将存储信息返回到父组件
            handleUpload(info) {
                const that = this
                const { file } = info
                // console.log("handleUpload",file)
                const uid = uuid()
                const extName = that.getExtName(file.name)
                const fileName = file.name
                that.cos.putObject(
                    {
                        // Bucket: 'jiamei-test-1259302518',
                        Bucket: 'jiamei-1259302518',
                        Region: 'ap-shanghai',
                        Key: fileName,
                        Body: file, // 上传文件对象
                        onProgress: progressData => {
                            // that.progress = progressData.percent
                            // console.log(JSON.stringify(progressData))
                        }
                    },
                    (err, data) => {
                        if (err) {
                            that.$notification.error({
                                message: '文件上传错误',
                                description: err.Message
                            })
                        } else {
                            console.log(data)
                            const url = `https://${data['Location']}`
                            that.fileList.push({
                                uid,
                                name: file.name,
                                status: 'done',
                                url
                            })
                            // console.log("handleUpload",that.fileList)
                            that.$emit('change', that.fileList)
                            that.loading = false
                            // that.$message.success('上传成功')
                        }
                    }
                )
            },
            /**
             * 获取后缀名
             */
            getExtName(fileName) {
                const index = fileName.lastIndexOf('.')
                if (index > -1) {
                    return fileName.substring(index + 1)
                } else {
                    return ''
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .ant-upload-select-picture-card i {
        font-size: 32px;
        color: #999;
    }

    .ant-upload-select-picture-card .ant-upload-text {
        margin-top: 8px;
        color: #666;
    }
</style>
