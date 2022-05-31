<template>
  <div class="window-card" @click="goToNextPage()">
    <div class="container">
      <div class="title">{{ title }}</div>
      <div class="description">{{ description }}</div>
    </div>
    <div class="footer">进入体验</div>
  </div>
</template>

<script setup>
import { defineProps, onMounted, ref } from 'vue'
const props = defineProps({
  title: {
    type: String,
    defualt: ''
  },
  description: {
    type: String,
    defualt: ''
  },
  pageUrl:{
    type: String,
    defualt: './'
  },
  bgImage:{
    type: String,
    defualt: ''
  }
})

const bgImageUrl = ref()
onMounted(() => {
  if (props.bgImage) {
    const imageUrl = require('@/assets/images/' + props.bgImage + '.png')
    bgImageUrl.value = `url(${imageUrl})`
  }
})
const goToNextPage = () => {
  window.location.href = props.pageUrl
}
</script>

<style lang="scss" scope>

.window-card {
  background: #fff;
  color: #fff;
  width: 300px;
  height: 200px;
  border: 1px solid #3331;
  border-radius: 20px;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: v-bind(bgImageUrl);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .container {
    text-align: center;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 12px;
    .title {
      font-size: 20px;
      font-weight: bold;
      padding-bottom: 5px;
    }
  }
  .footer {
    padding: 10px;
    width: 100%;
    text-align: center;
    background: rgb(38,52,69,0.9);
    border-radius: 0 0 15px 12px;
  }
}
.window-card:hover {
  transform: scale(1.04);
  transition: transform .8s cubic-bezier(.27,0,0,1);
  cursor: pointer;
}
</style>
