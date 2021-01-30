<template>
  <div class="box">
     <div class="title">
            <div class="name">{{type === 1 ? '行业信息' : '街道信息'}}</div>
            <div class="companyName">{{title}}</div>
      </div>
      <div class="info">
      <div class="infoLeft">
          <div class="line">
              <div :class="item" v-for="item in lineList" :key="item"></div>
          </div>
          <van-checkbox-group v-if="type === 1" v-model="defaultCheckIndustry" :max="3" @change="changeIndustryCheck" direction="horizontal">
            <div class="col">
                <div class="checkItem" v-for="item in industries" :key="item.bigNo">
                   <van-checkbox :name="item.bigNo +'-' + item.name" shape="square" icon-size="18px" style="font-size: 13px;" checked-color="#4791FF">
                       <span style="color: #fff;" :title="item.name">{{item.name}}</span>
                   </van-checkbox>
                </div>
            </div>
        </van-checkbox-group>
          <van-checkbox-group v-else v-model="defaultCheckStreet" :max="3" @change="changeStreetCheck" direction="horizontal">
            <div class="col">
                <div class="checkItem" v-for="item in districts" :key="item.id">
                   <van-checkbox :name="item.id +'-' + item.name" shape="square" icon-size="18px" style="font-size: 13px;" checked-color="#4791FF">
                       <span style="color: #fff;" :title="item.name">{{item.name}}</span>
                   </van-checkbox>
                </div>
            </div>
        </van-checkbox-group>
      </div>
      <div class="infoRight">
          <RadarChart v-if="type === 1" :color="'#02BC77'" :rgba="'rgba(2, 188, 119, 0.5)'" :id="'industryId'" :data="radarInData" ref="radarRef"/>
          <RadarChart v-else :color="'#4791FF'" :rgba="'rgba(71, 145, 255, 0.5)'" :id="'streetId'" :data="radarStreetData" ref="radarStreetRef"/>
      </div>
      </div>

      <div class="barChart">
          <div class="name">
            {{ type === 1 ?  '行业数据比较信息图' : '街道数据比较信息图' }}
          </div>
          <BarChart :id="type === 1 ? 'industryId' : 'streetId'" 
          :nameList="type === 1 ? checkIndustryLabel : checkStreetLabel"
          :barData="barData"
           ref="barChart"
          />
      </div>
  </div>
</template>

<script>
import RadarChart from '../../components/echart/radar'
import BarChart from '../../components/echart/barChart'
import { WAITTIME } from '../../utils/config'
import { mapState } from 'vuex'
export default {
    components: { RadarChart, BarChart },
    props: {
        type: {
            type: Number,
            default: 1
        }
    },
    data() {
        return {
            lineList: [
                'lineItem b',
                'lineItem y',
                'lineItem h',
                'lineItem g',
                'lineItem r'
            ],
            title: '',
            checkIndustryLabel: [],
            checkIndustryValue: [],
            checkStreetLabel: [],
            checkStreetValue: [],
            defaultCheckIndustry: [],
            defaultCheckStreet: [],
            radarInData: [],
            radarStreetData: [],
            barData: [[],[],[]],
            index: 0,
            streetIndex: 0,
        }
    },
    computed: {
        ...mapState(['industries', 'districts', 'threeIndustryValArr', 'threeDistrictValArr'])
    },
    created() {
        this.title = this.type === 1 ? this.industries[0].name + '雷达图' : this.districts[0].name + '雷达图'
        this.checkIndustryLabel = [`${this.industries[0].name}`, `${this.industries[1].name}`, `${this.industries[2].name}`]
        this.checkStreetLabel = [`${this.districts[0].name}`, `${this.districts[1].name}`, `${this.districts[2].name}`]
        this.defaultCheckIndustry = [
            `${this.industries[0].bigNo}-${this.industries[0].name}`,
            `${this.industries[1].bigNo}-${this.industries[1].name}`,
            `${this.industries[2].bigNo}-${this.industries[2].name}`,
        ]
        this.defaultCheckStreet = [
            `${this.districts[0].id}-${this.districts[0].name}`,
            `${this.districts[1].id}-${this.districts[1].name}`,
            `${this.districts[2].id}-${this.districts[2].name}`,
        ]
        if(this.type === 1) {
             this.changeIndustryChart()
        }else {
             this.changeStreetChart()
        }
   },
   mounted() {
       if(this.type === 1) {
           this.industryLunxun()
       }else {
           this.streetLunxun()
       }
   },
    methods: {
        changeIndustryCheck(value) {
            this.checkIndustryLabel = []
            this.checkIndustryValue = []
            if(value.length > 0) {
                value.forEach(item => {
                    this.checkIndustryLabel.push(item.split('-')[1])
                    this.checkIndustryValue.push(item.split('-')[0])
                })
            }
            if(this.checkIndustryValue.length === 3) {
                this.$store.dispatch('fetchIndustryIndexList', this.checkIndustryValue.join(',')).then(rsp => {
                   this.$store.commit('changeThreeIndustryList', [])
                   this.$store.commit('changeThreeIndustryList', rsp.industryValArr)
                   this.changeIndustryChart()
                })
            }
        },
         changeStreetCheck(value) {
            this.checkStreetLabel = []
            this.checkStreetValue = []
            if(value.length > 0) {
                value.forEach(item => {
                    this.checkStreetLabel.push(item.split('-')[1])
                    this.checkStreetValue.push(item.split('-')[0])
                })
            }
             if(this.checkStreetValue.length === 3) {
                this.$store.dispatch('fetchStreetIndexList', this.checkStreetValue.join(',')).then(rsp => {
                   this.$store.commit('changeThreeStreetList', [])
                   this.$store.commit('changeThreeStreetList', rsp.threeDistrictValArr)
                   this.changeStreetChart()
                })
            }
        },
        changeIndustryChart() {
          this.barData = [[], [] , []]
          if(this.threeIndustryValArr.length > 0) {
            this.threeIndustryValArr[0].industryIndicatorVals.forEach(item => {
                this.radarInData.push((item.indicatorVal).toFixed(2))
            })
           if(this.threeIndustryValArr.length === 3) {
            this.threeIndustryValArr[0].industryIndicatorVals.forEach(item => {
                this.barData[0].push((item.indicatorVal).toFixed(2))
            })
            this.threeIndustryValArr[1].industryIndicatorVals.forEach(item => {
                this.barData[1].push((item.indicatorVal).toFixed(2))
            })
            this.threeIndustryValArr[2].industryIndicatorVals.forEach(item => {
                this.barData[2].push((item.indicatorVal).toFixed(2))
            })
            }
          }
            this.$refs.barChart.renderBarChart()
        },
        changeStreetChart() {
          this.barData = [[], [] , []]
          if(this.threeDistrictValArr.length > 0) {
             this.threeDistrictValArr[0].districtIndicatorVals.forEach(item => {
                this.radarStreetData.push((item.indicatorVal).toFixed(2))
             })
           }
            if(this.threeDistrictValArr.length === 3) {
            this.threeDistrictValArr[0].districtIndicatorVals.forEach(item => {
                this.barData[0].push((item.indicatorVal).toFixed(2))
            })
            this.threeDistrictValArr[1].districtIndicatorVals.forEach(item => {
                this.barData[1].push((item.indicatorVal).toFixed(2))
            })
            this.threeDistrictValArr[2].districtIndicatorVals.forEach(item => {
            this.barData[2].push((item.indicatorVal).toFixed(2))
            })
          }
           this.$refs.barChart.renderBarChart()
        },
        industryLunxun() {
            setInterval(() => { 
            let id = this.industries[this.index].bigNo
            this.title = this.industries[this.index].name + '雷达图'
            this.$store.dispatch('fetchIndustryIndexList', id).then(rsp => {
                 this.radarInData = []
                 rsp.industryValArr[0].industryIndicatorVals.forEach(item => {
                   this.radarInData.push((item.indicatorVal).toFixed(2))
                })
                this.$refs.radarRef.renderChart()
             })
            this.index ++
            if(this.index >= this.industries.length) {
                this.index = 0
            }
            }, WAITTIME)
        },
        streetLunxun() {
          setInterval(() => { 
            let id = this.districts[this.streetIndex].id
            this.title = this.districts[this.streetIndex].name + '雷达图'
            this.$store.dispatch('fetchStreetIndexList', id).then(rsp => {
                 this.radarStreetData = []
                  rsp.threeDistrictValArr[0].districtIndicatorVals.forEach(item => {
                   this.radarStreetData.push((item.indicatorVal).toFixed(2))
                })
                this.$refs.radarStreetRef.renderChart()
             })
            this.streetIndex ++
            if(this.streetIndex >= this.industries.length) {
                this.streetIndex = 0
            }
            }, WAITTIME)
        }
    },
    destroyed() {
        clearInterval()
    }
}
</script>
<style>
.van-checkbox__icon .van-icon {
    border-radius: 4px;
    background-color: rgb(235, 235, 235, 0.17);
    border: none;
}
</style>
<style lang="scss" scoped>
.box {
      width: 100%;
      background-color: #1f1f1f;
      height: 645px;
      box-shadow: 0px 25px 30px rgba(0, 0, 0, 0.1);
      color:#FFFFFF;
      margin-top: 10px;
      border-radius: 10px;
      .title {
          width: 100%;
          height: 55px;
          border-bottom: 1px solid #5E5E5E; 
          display: flex;
          align-items: center;
          .name {
            padding: 19px 20px;
            font-size: 12px;
          }
          .companyName {
              font-size: 12px;
              margin-left: 260px;
              flex: 1;
              display: flex;
              justify-content: center;
          }
    }
    .info {
        display: flex;
        justify-content: space-between;
        .infoLeft {
            padding: 16px 20px;
            display: flex;
            .line {
                margin-right: 15px;
                .lineItem {
                   width: 5px;
                   height: 55px;
                   border-radius: 5px;
                   margin-bottom: 2px;
                }
                .b {
                    background-color: #4791FF; 
                }
                .y {
                   background-color: #FFD950; 
                }
                .h {
                    background-color: #707070;
                }
                .g {
                    background-color: #02BC77;
                }
                .r {
                    background-color: #FF2366;
                }
            } 
            .col {
               display: flex;
               width: 300px;
               flex-wrap: wrap;
                .checkItem {
                 margin-bottom:19px; 
                 width: 142px;
                 overflow: hidden;
                 white-space: nowrap;
                 text-overflow: ellipsis;
               }
           }
        }
        .infoRight {
            margin: 20px 40px 0 0;
        }
    }
    .barChart {
        .name {
            color: #fff;
            font-size: 12px;
            margin-left: 20px;
            padding-bottom: 20px;
        }
    }
}
</style>