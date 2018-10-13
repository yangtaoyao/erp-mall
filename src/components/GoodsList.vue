<template>
<div>
  <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:30px">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>商品管理</el-breadcrumb-item>
    <el-breadcrumb-item>商品列表</el-breadcrumb-item>
  </el-breadcrumb>

  <div class="search-box">
    <el-button class="delete-btn" type="" icon="el-icon-delete">删除</el-button>
    <el-input class="search-inpt"
      placeholder="请输入内容"
      prefix-icon="el-icon-search"
      v-model="search_input"
      >
    </el-input>
    <el-button type="primary" @click="searchSubmit">搜索</el-button>
    
  </div>
  <el-table
    max-height="450"
    border
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    :default-sort = "{prop: 'price', order: 'descending'}"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      label="名称"
      width="280"
      show-overflow-tooltip
      >
      <template slot-scope="scope">{{ scope.row.g_name }}</template>
    </el-table-column>
    <el-table-column
      prop="goodsclass"
      label="类别"
      width="150"
      :filters="[{ text: '音箱', value: '音箱' }, { text: '数据线', value: '数据线' }]"
      :filter-method="filterClass"
      >
    </el-table-column>
    <el-table-column
      sortable
      width="120"
      prop="price"
      label="单价">
    </el-table-column>
    <el-table-column
      sortable
      prop="num"
      label="数量"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click.stop="goto_detail(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div style="margin-top: 20px">
    <!-- <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
    <el-button @click="toggleSelection()">取消选择</el-button> -->
  </div>
</div>
</template>

<script>
import {bus} from 'assets/js/bus'
export default {
  name: 'GoodsList',
  data() {
    return {
      search_input:"",
      tableData: [
        {
          g_name: "坚果砖式蓝牙小音箱",
          goodsclass: "音箱",
          price: "149.00",
          num:"100"
        },
        {
          g_name: "快充移动电源 10000mAh",
          goodsclass: "移动电源",
          price: "1.00",
          num:"1"
        },
        {
          g_name: "绿联 Type C 转 HDMI 视频连接线",
          goodsclass: "数据线",
          price: "14.00",
          num:"10"
        },
        {
          g_name: "坚果砖式蓝牙小音箱",
          goodsclass: "音箱",
          price: "149.00",
          num:"100"
        }
      ],
      multipleSelection: []
    };
  },
  methods: {
    goto_detail(data){
      this.$router.push({path:'/home/goods/goodsdetail',query: { data: data }});
    },
    searchSubmit(){

    },
    filterClass(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>
<style>
.search-box{
  text-align: left;
  position: relative;
}
/* .delete-btn{
  position: absolute;
  margin: 0;
  bottom: 16px;
  left: 0;
} */
.search-box .search-inpt{
  width: 20%;
  margin: 16px 0;
  margin-right: 8px;
}
</style>