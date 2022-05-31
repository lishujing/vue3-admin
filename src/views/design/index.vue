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
    id: '0',
    title: '大屏设计',
    description: '自定义大屏设计',
    pageUrl: 'http://localhost:9528/',
    bgImage: 'data_card_bg_1'
  },
  {
    id: '1',
    title: ' H5设计',
    description: '',
    pageUrl: 'http://127.0.0.1:8082/',
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
