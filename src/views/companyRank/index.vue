<template>
  <div class="box">
      <div class="title">
          <div class="name">公司排名</div>
          <div class="select">
            <select class="selectList" name="select" v-model="selected" @change="getSelected">                                        
             <option class="options" :value="item.id" v-for="item in calcIndicators" :key="item.id">{{item.name}}</option>                                    
            </select>
          </div>
          <div class="search" @click="toSearch">搜索</div>
      </div>
      <div class="rankList">
        <dv-scroll-board :config="config" style="width:400px;height:290px" />
      </div>
       <div class="title">
          <div class="name">{{orgName}}</div>
      </div>
      <div style="margin-top: 5px;">
        <RadarChart :color="'#FF2366'" :rgba="'rgba(255, 35, 102, 0.5)'" :id="'orgRankChart'" :data="radarData" ref="radarCharts"/>
      </div>

      <SearchItem v-if="showSearch" @closeBox="closeBox"/>
     
  </div>
</template>

<script>
import RadarChart from '../../components/echart/radar'
import SearchItem from '../searchComponent'
import { WAITTIME } from '../../utils/config'
import { mapState } from 'vuex'
export default {
    components: { RadarChart, SearchItem },
    data() {
        return  {
            config: {
            header: ["排名", "公司", "数据"],
            data: [],
            rowNum: 8, //表格行数
            headerHeight: 35,
            headerBGC: "#1F1F1F", //表头
            oddRowBGC: "#1F1F1F", //奇数行
            evenRowBGC: "#1F1F1F", //偶数行
            index: false,
            waitTime: WAITTIME,
            columnWidth: [80, 200, 80],
            align: ["center", "center", "center"]
         },
         selected: null,
         radarData: [],
         orgName: '',
         index: 0,
         showSearch: false
       }
    },
    computed: {
      ...mapState(['calcIndicators', 'orgRankIndicatorVals', 'orgIndicatorVals'])
    },
    created() {
     this.selected = this.calcIndicators[0].id
     this.orgName = this.orgRankIndicatorVals[0].orgName
     if(this.orgIndicatorVals.length > 0) {
        this.orgIndicatorVals.forEach(item => {
         this.radarData.push(item.evalValue)
       })
     }
     this.changeConfigData(this.orgRankIndicatorVals)
    },
    mounted() {
      this.lunxunChart()
    },
    methods: {
      toSearch() {
        this.showSearch = true
      },
      closeBox() {
        this.showSearch = false
      },
      getSelected() {
        this.index = 0
        this.orgName = this.orgRankIndicatorVals[0].orgName
        this.$store.dispatch('fetchIndexOrgRank',this.selected).then(rsp => { 
          if(rsp && rsp.code === '0') {
            this.$store.commit('changeIndexOrgRank', rsp.datas) 
            this.changeConfigData(this.orgRankIndicatorVals)
             this.$store.dispatch('fetchIndexOrgInfo', rsp.datas[0].evalOrg).then(rsp => {
                this.radarData = []
                rsp.datas.forEach(item => {
                this.radarData.push(item.evalValue)
              }) 
              this.$refs.radarCharts.renderChart()
            })
          }
        })
      },
      changeConfigData(data) {
         let arr = []
         if(data.length > 0) {
           data.forEach((item, index) => {
            if(index < 3) {
                arr.push([`<span class='rank${index+1}'>${index+1}</span>`, item.orgName, item.evalValue])
            }else {
                arr.push([`<span class='rank'>${index+1}</span>`, item.orgName, item.evalValue])
            }
          })
        }
        this.config = {...this.config, data: arr }
      },
      lunxunChart() {
        setInterval(() => { 
          let id = this.orgRankIndicatorVals[this.index].evalOrg
          this.orgName = this.orgRankIndicatorVals[this.index].orgName
          this.$store.dispatch('fetchIndexOrgInfo', id).then(rsp => {
                this.radarData = []
                rsp.datas.forEach(item => {
                this.radarData.push(item.evalValue)
              }) 
              this.$refs.radarCharts.renderChart()
            })
           this.index ++
           if(this.index > this.radarData.length) {
             this.index = 0
           }
        }, WAITTIME)
      }
    },
    beforeDestroy() {
      clearInterval();
    }
}
</script>

<style lang="scss" scoped>
.box {
      width: 100%;
      height: 645px;
      background-color: #1F1F1F;
      box-shadow: 0px 25px 30px rgba(0, 0, 0, 0.1);
      color:#FFFFFF;
      margin-top: 10px;
      border-radius: 10px;
      .title {
          width: 100%;
          height: 55px;
          border-bottom: 1px solid #5E5E5E; 
          display: flex;
          justify-content: space-between;
          align-items: center;
          .name {
            padding: 19px 20px;
            font-size: 12px;
          }
          .select {
            margin-right: 30px;
            .selectList {
              width: 200px;
              background-color: #1F1F1F;
              color: #fff;
              padding: 5px;
              border-radius: 5px;
              .options {
                padding: 5px;
              }
            }
          }
          .search {
            margin-right: 20px;
            cursor: pointer;
            font-size: 14px;
            color: #4791FF;
            padding: 5px 18px;
            background-color: rgba(71, 145, 255, 0.17);
          }
    }
    .rankList {
      padding: 0 30px;
    }
}
</style>