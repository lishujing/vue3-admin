<template>
  <div class="navbar">
    <hamburger class="hamburger-container"></hamburger>
    <breadcrumb class="breadcrumb-container"></breadcrumb>
    <div class="right-menu">
      <!-- <theme-picker class="right-menu-item hover-effect"></theme-picker> -->
      <lang-select class="right-menu-item hover-effect" />
      <!-- 头像 -->
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <!-- <el-avatar
            shape="square"
            :size="40"
            :src="$store.getters.userInfo.avatar"
          ></el-avatar> -->
          <img src="@/assets/images/img_header.jpg" />
          <i class="el-icon-s-tools"></i>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item> {{$t('msg.navBar.home')}} </el-dropdown-item>
            </router-link>
            <!-- 外链使用 a 标签 -->
            <!-- <a target="_blank" href="">
              <el-dropdown-item>{{$t('msg.navBar.course')}}</el-dropdown-item>
            </a> -->
            <el-dropdown-item divided @click="logout()">
              {{$t('msg.navBar.logout')}}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import {} from 'vue'
import { useStore } from 'vuex'
import Hamburger from '@/components/Hamburger'
import Breadcrumb from '@/components/Breadcrumb'
import LangSelect from '@/components/LangSelect'
import ThemePicker from '@/components/ThemePicker/index'

const store = useStore()
const logout = () => {
  store.dispatch('user/logout')
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables.module.scss';

.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #{$navBg};
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .right-menu {
    display: flex;
    align-items: center;
    float: right;
    padding-right: 16px;

    :deep(.avatar-container) {
      cursor: pointer;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .el-avatar {
          --el-avatar-background-color: none; // element-plus 自带的颜色背景
          margin-right: 12px;
        }
        img {
          width: 40px;
          height: 40px;
          margin-right: 12px;
        }
      }
    }

    :deep(.right-menu-item) {
      display: inline-block;
      padding: 0 18px 0 0;
      font-size: 24px;
      color: #{$mainTextColor}; // #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
      }
    }
  }

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    // hover 动画
    transition: background 0.5s;
    &:hover {
      background: rgb(0, 0, 0, 0.1);
    }
  }

  .breadcrumb-container {
    float: left;
  }
}
</style>
