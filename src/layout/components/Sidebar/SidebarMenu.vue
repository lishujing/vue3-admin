<template>
  <!-- 一级 menu 菜单 -->
  <el-menu
    router
    :default-active="activeMenu"
    :uniqueOpened="true"
    :background-color="$store.getters.cssVar.menuBg"
    :text-color="$store.getters.cssVar.menuText"
    :active-text-color="$store.getters.cssVar.menuActiveText"
    :collapse="!$store.getters.sidebarOpened"
  >
    <sidebar-item
      v-for="item in routes"
      :key="item.path"
      :route="item"
    ></sidebar-item>
  </el-menu>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { filteRouters, generateMenus } from '@/utils/route'
import SidebarItem from './SidebarItem.vue'
const router = useRouter()
const routes = computed(() => {
  const filterRoutes = filteRouters(router.getRoutes())
  return generateMenus(filterRoutes)
})

// 计算高亮 menu 得方法
const route = useRoute()
const activeMenu = computed(() => {
  const { path } = route
  return path
})
</script>
