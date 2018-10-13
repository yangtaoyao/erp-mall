<template>
<div class="goods-app">

    <!-- <router-link to="/home/goods/goodsList">goodsList</router-link>    
    <router-link to="/home/goods/goodsdetail">GoodsDetail</router-link>
   -->
  <router-view class="goods-view"></router-view>

</div>
</template>

<script>
export default {
  name: 'Goods',
  data() {
    return {
    };
  },
  methods: {
  }
};
</script>
<style>
.goods-app{
    position: relative;
    background-color: #eee;
    margin: 0;
    padding: 0px;
    -webkit-transition: all .2s ease;
    transition: all .2s ease;
}
</style>