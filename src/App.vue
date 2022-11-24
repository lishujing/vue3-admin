<template>
  <!-- <router-view/> -->
  <!-- <card-bluetooth />
  <card-nfc @click-left="click('left')"  @click-right="click('right')" />

  <emh-img-item @read-img="readImg" @view-img="readImg" :img="{src:'de', name:'hss'}" :deleteIcon="true" @delete-img="readImg"/>

  <emh-card-info tips='dddddddddd' :showTips="true" /> -->

  <h1 @click="show = !show">HSHSHS</h1>
  <emh-user-home v-if="show" />
  <emh-handler v-else />
  <!-- <emh-user-home /> -->
  <!-- <emh-handler /> -->
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { Icon } from 'vant'
import { EmhUserHome, EmhHandler, CardInfoType } from 'esurfaceapp-test'
console.log('Icon', Icon)
console.log('CardInfoType', CardInfoType)

const show = ref(false)

onBeforeMount(() => {
  window.localStorage.setItem('channel', '{"cityId":"752","chnTypeCd":"100102","statusCd":"1000","channelDesc":"","salesThirdType":"100301","salesSecondType":"100300","salesFirstType":"100000","channelClass":"10","channelName":"惠州电信龙门公客直销队伍","channelNbr":"4413243098473","channelId":60149624,"updateStaff":0,"createStaff":0,"regionId":8441324,"partyId":0,"orgId":1081144,"updateDate":1453824668000,"statusDate":1395795277000,"createDate":1453824668000,"sownChannelId":null,"sownOrgId":null,"schannelTypeCd":null,"schannelSubtypeCd":null,"orgName":null,"staffId":null,"achannelNbr":null,"zchannelNbr":null,"aorgId":null,"zorgId":null,"orgRelType":null}')
  window.localStorage.setItem('tokenId', '1AAC267203C4ADD6242140E1AF534A96')
  window.localStorage.setItem('loginUser', '{"orgTypeid":"1200","loginPostCityID":"752","loginPostOrgId":752000000,"loginPostOrgName":null,"cityId":"752","cityName":"惠州","sysUserId":2024,"sysUserCode":"zhangwum","staffId":2024,"postId":752,"postName":"惠州本地一级管理工位","orgAgentid":0,"orgId":752000000,"channelId":null,"channelNbr":null,"channelName":null,"sysUser":{"operType":null,"beginDate":null,"endDate":null,"pageInfo":null,"cityId":"752","qryType":null,"qryValue1":null,"qryValue2":null,"qryValue3":null,"qryValue4":null,"qryValueSet":[],"sysUserId":2024,"staffId":2024,"sysUserCode":"zhangwum","password":"B3A7D9574F74CD47F3B5009541D6610A4E86E52D","pwdErrCnt":-1,"pwdSmsTel":null,"pwdStatus":"1000","pwdNewtime":1663299819000,"pwdEffectDays":900,"limitCount":-1,"loginedNum":0,"sysUserDesc":"2024","systemInfoId":1000,"effDate":1532956899000,"expDate":4102415999000,"regionId":8440000,"efflogStartdate":"","efflogEnddate":"","validdate":-1,"lastlogindate":1669195578000,"loginIp":"1.1.1.256","pwdControl":"","certId":null,"createStaff":123,"createStaffName":null,"updateStaff":123,"updateStaffName":null,"createDate":1532956899000,"statusCd":"1000","statusDate":1569859200000,"updateDate":1633662523000,"remark":"更改密码","sysPostId":null,"mobilePhone":"13719107932","staffAccount":null,"salesstaffCode":"Y12345678910","staffCode":null,"staffType":null,"staffName":"hhong","staffDesc":null,"commonRegionId":null,"partyId":null,"orgId":752000000,"orgName":"惠州分公司","caFlag":null,"channelNbr":null,"cityName":null,"staffCaflag":null,"globalStaff":null,"eMail":null,"flag":null,"salesCode":"44232044","accFlag":null,"certNum":null},"sysPostList":[{"operType":null,"beginDate":null,"endDate":null,"pageInfo":null,"cityId":"752","qryType":null,"qryValue1":null,"qryValue2":null,"qryValue3":null,"qryValue4":null,"qryValueSet":[],"sysPostId":752,"sysPostCode":"100000","sysPostName":"惠州本地一级管理工位","sysPostType":"1000","sysPostDesc":"超级管理员使用工位，不能删改","initFlag":0,"orgId":752000000,"orgName":null,"systemInfoId":10004,"regionId":null,"isProv":null,"postLevle":null,"billTitle":null,"loginLimit":null,"createStaff":null,"updateStaff":null,"createDate":null,"statusCd":"1000","statusDate":null,"updateDate":null,"remark":null,"sysPostRoleList":null,"nameOfPostId":"惠州本地一级管理工位","postOrgid":null,"nameOfPostOrgid":null,"isInitdata":null,"nameOfCityId":"惠州","sysCode":null,"nameOfSysCode":"CRM＋","cn":null,"sysRoleId":null,"effDate":null,"expDate":null,"sysPostRoleId":null,"roleIds":null,"index":null,"batchResult":null,"success":null,"flag":null,"needSystemInfo":false,"loginPostId":null,"loginSysuserId":null}],"pageLoginfo":null,"iscmCode":null,"agentPayRule":null,"agent":false,"sysPostDto":{"operType":null,"beginDate":null,"endDate":null,"pageInfo":null,"cityId":"760","qryType":null,"qryValue1":null,"qryValue2":null,"qryValue3":null,"qryValue4":null,"qryValueSet":[],"sysPostId":760,"sysPostCode":"100000","sysPostName":"中山本地一级管理工位","sysPostType":null,"sysPostDesc":"超级管理员使用工位，不能删改","initFlag":0,"orgId":760000000,"orgName":null,"systemInfoId":null,"regionId":null,"isProv":null,"postLevle":null,"billTitle":"X","loginLimit":-1,"createStaff":null,"updateStaff":null,"createDate":null,"statusCd":"1000","statusDate":null,"updateDate":null,"remark":null,"sysPostRoleList":null,"nameOfPostId":null,"postOrgid":null,"nameOfPostOrgid":null,"isInitdata":null,"nameOfCityId":null,"sysCode":null,"nameOfSysCode":null,"cn":null,"sysRoleId":null,"effDate":null,"expDate":null,"sysPostRoleId":null,"roleIds":null,"index":null,"batchResult":null,"success":null,"flag":null,"needSystemInfo":false,"loginPostId":null,"loginSysuserId":null},"onlyBDSP":false,"hasBdspFlag":true,"BDSPName":""}')
})
// export default {
//   name: 'App',
//   components: {
//     [EmhUserHome.name]: EmhUserHome,
//     EmhCardInfoUser
//   },
//   methods:{
//     click(){
//       console.log('ceshi ')
//     },
//     readImg(data) {
//       console.log(data)
//     }
//   }
// }

</script>

<style></style>
