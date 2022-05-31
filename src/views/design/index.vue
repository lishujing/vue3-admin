<template>
  <div class="design-cards">
    <window-card
      v-for="item in cards"
      :key="item.id"
      :title="item.title"
      :description="item.description"
      :pageUrl="item.pageUrl"
      :bgImage="item.bgImage"
    ></window-card>
  </div>
</template>

<script setup>
import WindowCard from '@/components/cards/WindowCard.vue'

const cards = [
  {
    id: 1,
    title: '大屏设计',
    description: '自定义大屏设计',
    pageUrl: '/extra-platform/1',
    bgImage: 'data_card_bg_1'
  },
  {
    id: 2,
    title: ' H5设计',
    description: '',
    pageUrl: '/extra-platform/2',
    bgImage: 'h5_card_bg'
  }
]
</script>

<style lang="scss" scope>
.design-cards {
  display: flex;
  padding: 30px 10px;
}
</style>
