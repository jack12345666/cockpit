<template>
  <div id="index">
       <dv-full-screen-container>
          <dv-loading v-if="loading"><span style="color: #fff;">Loading...</span></dv-loading>
          <div v-if="!loading">
          <!-- 标题栏 -->
          <div class="titleLayout">
            <TitleComponent />
          </div>

        <div class="center">
          <!-- 第一列 -->
          <div class="firstCol">
            <!-- 平台入驻企业数量 -->
           <CompanyComponent />
            <!-- 公司排名 -->
            <div class="companyRank">
              <CompanyRank />
            </div>
            <!-- 公司信息图 -->
            <div class="companyInfo"></div>
          </div>

          <!-- 第二列 -->
          <div class="secondCol">
            <!-- 行业指标 -->
            <div class="industryIndex">
              <IndexComponent :type="1" />
            </div>
            <!-- 行业信息 -->
            <div class="industryInfo">
              <InfoComponent :type="1"/>
            </div>
          
          </div>

          <!-- 第三列 -->
          <div class="thirdCol">
             <!-- 地区指标 -->
            <div class="areaIndex">
              <IndexComponent :type="2" />
            </div>
            <!-- 地区街道信息 -->
            <div class="streetInfo">
               <InfoComponent  :type="2" />
            </div>
           
          </div>
      </div>
    </div>
  </dv-full-screen-container>   
  </div>
</template>

<script>
import TitleComponent from '../views/titleComponent'
import CompanyComponent from '../views/companyComponent'
import IndexComponent from '../views/indexComponent'
import CompanyRank from '../views/companyRank'
import InfoComponent from '../views/infoComponent'
import { mapState } from 'vuex'
export default {
  components: { 
    TitleComponent, CompanyComponent, IndexComponent, 
    CompanyRank, InfoComponent
   },
    data() {
      return {
          loading: true,
      }
    },
    computed: {
      ...mapState(['calcIndicators','indicatorIndustryRanks','orgIndicatorVals',
      'orgRankIndicatorVals', 'districts', 'threeIndustryValArr', 'industries'])
    },
    created() {
      this.$store.dispatch("fetchDataInfo").then(rsp => {
         this.$store.commit('changeDataInfo', rsp)
         this.loading = false
      })
    },
     methods: {
     
    }
}
</script>

<style lang="scss" scoped>
#index {
  background-color: #121212;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  &::-webkit-scrollbar {  display: none; }
  scrollbar-width: none;
  -ms-overflow-style: none;
  .titleLayout {
    width: 100%;
  }
  .center {
    padding: 10px;
    display: flex;
    .firstCol {
      width: 440px;
      margin-right: 10px;
    }
    .secondCol {
      width: 720px;
      margin-right: 10px;
    }
    .thirdCol {
      width: 720px;
    }
  }
  
}
</style>