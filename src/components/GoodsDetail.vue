<template>
<div>
<el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:30px">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>商品管理</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '/home/goods/goodsList' }">商品列表</el-breadcrumb-item>
    <el-breadcrumb-item>商品详情</el-breadcrumb-item>
</el-breadcrumb>

<el-form ref="form" :model="form" label-width="80px" >
  <el-form-item label="商品名称">
    <el-input v-model="form.g_name"></el-input>
  </el-form-item>
  <el-form-item label="商品类型">
    <el-select v-model="form.goodsclass" placeholder="请选择商品类型">
      <el-option label="耳机" value="shanghai"></el-option>
      <el-option label="手机" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="单价">
    <el-input v-model="form.price" placeholder="请输入单价"></el-input>
  </el-form-item>
  <el-form-item label="供货数量">
    <el-input-number v-model="form.num"  :min="1" :max="1000" label="描述文字"></el-input-number>
  </el-form-item>
  <el-form-item label="商品简介">
    <el-input type="textarea" v-model="form.desc"></el-input>
  </el-form-item>
  <el-form-item label="商品图片">
    <el-upload
        action="http://127.0.0.1:2080/upload/goodsImg_do"
        list-type="picture-card"
        :file-list="form.fileList"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-success="handleUploadSuccess"
        >
        <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <el-button type="button" class="button" @click="getImageList()">获取图片</el-button>
  </el-form-item>
  <el-form-item>
    <el-button type="primary">立即保存</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>
</div>
</template>
<script>

import { getFiles } from "api";
import { bus } from "assets/js/bus";
export default {
  name: "GoodsDetail",
  data() {
    return {
      form: {
        g_name: "坚果砖式蓝牙小音箱",
        goodsclass: "音箱",
        price: "149.00",
        num: "100",
        desc: "",
        fileList: []
      },
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  mounted() {
    this.form.g_name = this.$route.query.data.g_name;
    this.form.goodsclass = this.$route.query.data.goodsclass;
    this.form.price = this.$route.query.data.price;
    this.form.num = this.$route.query.data.num;
    console.log("g_name:"+this.$route.query.data.g_name)
  },
  created() {
      
  },
  methods: {
    async getImageList() {
      const response = await getFiles();
      this.form.fileList = response.data.imageList;
    },
    //上传成功
    handleUploadSuccess(res, file, fileList) {
      console.log("handleUploadSuccess:");
      console.log(res.fileUrls);
      this.$message({
        type: "success",
        message: "上传图片成功"
      });
      getImageList();
    },
    // 删除轮播图
    async handleRemove(file, fileList) {
      const response = await removeImage({ filename: file.name });
      console.log(response.data);
      if (response.data.code == 0) {
        this.$message.error(response.data.message);
      } else {
        this.$message({
          type: "success",
          message: response.data.message
        });
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
};
</script>

<style>

</style>