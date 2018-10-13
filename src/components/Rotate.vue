<template>
<div>
<el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:30px">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>轮播图管理</el-breadcrumb-item>
</el-breadcrumb>

<el-row >
  <el-upload
    action="http://127.0.0.1:2080/upload/rotate_do"
    list-type="picture-card"
    :file-list="fileList"
    :on-preview="handlePictureCardPreview"
    :on-remove="handleRemove"
    :on-success="handleUploadSuccess"
    :before-upload="handleBefore"
    >
    <i class="el-icon-plus"></i>
  </el-upload>
  <el-dialog :visible.sync="dialogVisible">
    <img width="100%" :src="dialogImageUrl" alt="">
  </el-dialog>
</el-row>
<el-button type="button" class="button" @click="getImageList()">获取轮播图</el-button>
</div>
</template>
<script>
import { getFiles } from "api";
import { removeImage } from "api";

export default {
  name: "Rotate",
  data() {
    return {
      fileList: [],
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  computed: {
    
  },
  mounted() {
    
  },
  created() {
    
  },
  methods: {
    async getImageList() {
        const response = await getFiles();
        console.log("=======getFiles imageList=========");
        console.log(response.data.imageList);
        console.log("=======fileList=========");
        console.log(this.fileList);
        this.fileList = response.data.imageList;
    },
    handleBefore(file) {},
    //上传成功
    handleUploadSuccess(res, file, fileList) {
      console.log("handleUploadSuccess:");
      console.log(res.fileUrls);
      this.$message({
            type:'success',
            message:"上传图片成功",
          })
      getImageList();  
    },
    // 删除轮播图
    async handleRemove(file, fileList) {
        const response = await removeImage({filename:file.name});
        console.log(response.data);
        if(response.data.code==0){
          this.$message.error(response.data.message)
        }else{
          this.$message({
            type:'success',
            message:response.data.message,
          })
        }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
      console.log("handlePictureCardPreview:");
      console.log(file, fileList);
    }
  }
};
</script>
<style>
.el-carousel__item.is-active.l-carousel__item--card.is-in-stage img.image {
  width: 100%;
  height: auto;
  margin: 0;
}
.el-carousel__item.is-active.l-carousel__item--card.is-in-stage{
  height:auto;
  width: 40%;
}
</style>