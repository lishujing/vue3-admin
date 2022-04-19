<template>
  <div class="">
    <div class="logo-container">
      <!-- <el-avatar :size="logoHeight" shape="square" src="https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png"></el-avatar> -->
      <img src="@/assets/images/logo.jpg" />
      <h1 class="logo-title" v-if="$store.getters.sidebarOpened">爷乐意</h1>
    </div>
    <el-scrollbar>
      <sidebar-menu></sidebar-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import SidebarMenu from './SidebarMenu'
const logoHeight = '44px'
// const bgColor = 'red'
</script>

<style lang="scss" scoped>
.logo-container {
  // background-color: v-bind(bgColor);
  height: v-bind(logoHeight);
  padding: 10px 0 22px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  .logo-title{
    margin-left:10px;
    color:#fff;
    font-weight: 600;
    line-height: 50px;
    font-size: 16px;
    white-space: nowrap;
  }
  img{
    width:  v-bind(logoHeight);
    height: v-bind(logoHeight);
  }
}
</style>
