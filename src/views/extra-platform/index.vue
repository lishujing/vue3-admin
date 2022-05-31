<template>
  <div class="extra-page">
    <iframe class="extra-page-iframe" :src="iframeUrl"></iframe>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const urlArr = [
  {
    id: 1,
    title: '智能云数据化设计',
    url: '/dataPage/#/index'
  },
  {
    id: 2,
    title: '智能云H5设计',
    url: '/H5/#/hello-world'
  }
]

const route = useRoute()
console.log(route)
const iframeUrl = ref(null)
onMounted(() => {
  const currenPage = urlArr.find((item) => item.id === Number(route.params.id))
  if (currenPage) {
    iframeUrl.value = currenPage.url
  }
  console.log('iframeUrl.value', iframeUrl.value)
  console.log('route.params.id', route.params.id)
  console.log('currenPage', currenPage)
})
</script>

<style lang="scss" scoped>
.extra-page {
  width: 100%;
  height: 100%;
  overflow: hidden;
  &-iframe{
    width: 100%;
    height: 100%;
    overflow: hidden;
    border: none;
  }
}
</style>
