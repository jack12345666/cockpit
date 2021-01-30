<template>
  <div class="box">
      <div class="index">
         <div class="title">
            <div class="name">{{type === 1 ? '行业指标' : '街道指标'}}</div>
            <div class="indexName">{{checkName}}</div>
         </div>
          <div class="itemList">
                <div>
                    <div v-for="(item, index) in calcIndicators" :key="item.id" class="name" @click="checkIndex(item, index)">
                      <div :class="colorList[index]"></div>
                      <div class="value">{{item.name}}</div>
                  </div>
                </div>
                <div v-if="type === 1">
                <div class="item" v-for="item in indicatorIndustryRanks.slice(0, 6)" :key="item.bigNo">
                 <div class="progress">
                   <div class="num">
                       <div class="label">{{item.name}}</div>
                       <div class="num">{{(item.indicatorVal).toFixed(2)}}</div>
                   </div>
                   <van-progress v-if="index === 0" :percentage="(item.indicatorVal/industryMax[index])*100" stroke-width="5" :color="checkColor" track-color="#5E5E5E" :show-pivot="false"/>
                   <van-progress v-else :percentage="(item.indicatorVal/industryMax[index-1])*100" stroke-width="5" :color="checkColor" track-color="#5E5E5E" :show-pivot="false"/>
                 </div>
                 </div>
             </div>
              <div v-else>
                <div class="item" v-for="item in indicatorDistrictRanks.slice(0, 6)" :key="item.districtId">
                 <div class="progress">
                   <div class="num">
                       <div class="label">{{item.districtName}}</div>
                       <div class="num">{{(item.indicatorVal).toFixed(2)}}</div>
                   </div>
                   <van-progress v-if="streetIndex === 0" :percentage="(item.indicatorVal/streetMax[streetIndex])*100" stroke-width="5" :color="checkColor" track-color="#5E5E5E" :show-pivot="false"/>
                   <van-progress v-else :percentage="(item.indicatorVal/streetMax[streetIndex-1])*100" stroke-width="5" :color="checkColor" track-color="#5E5E5E" :show-pivot="false"/>
                 
                 </div>
                 </div>
             </div>
        </div>
      </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { WAITTIME } from '../../utils/config'
export default {
    props: {
        type: {
            type: Number,
            default: 1
        }
    },
    data() {
        return {
           colorList: ['sign a', 'sign b', 'sign c', 'sign d', 'sign e', 'sign f'],
           checkColor: '#50FFEE',
           checkName: '',
           colorObj: {
               0: '#50FFEE',
               1: '#AF47FF',
               2: '#FF2366',
               3: '#FFD950',
               4: '#02BC77',
               5: '#4791FF',
           },
            colorStreetObj: {
               0: '#50FFEE',
               1: '#AF47FF',
               2: '#FF2366',
               3: '#FFD950',
               4: '#02BC77',
               5: '#4791FF',
           },
           index: 0,
           streetIndex: 0,
           industryMax: [160, 700, 200, 13500, 15, 150],
           streetMax: [110, 450, 65, 8200, 5, 120],
           checkIndustryIndex: 0,
           checkStreetIndex: 0
        }
    },
    computed: {
       ...mapState(['calcIndicators', 'indicatorIndustryRanks', 'indicatorDistrictRanks'])
    },
    created() {
         this.checkName = this.calcIndicators[0].name
    },
    mounted() {
      if(this.type === 1) {
          this.industryLunxun()  
        }else {
          this.streetLunxun()
      }
    },
    methods: {
        checkIndex(item, index) {
            this.checkName = item.name
            this.checkColor = this.colorObj[index]
            if(this.type === 1) {
                if(index === 0) {
                    this.index = index
                }else {
                    this.index = index + 1
                }
                
                this.$store.dispatch('fetchIndexIndustryRank', item.id).then(rsp => {
                    this.$store.commit('changeIndexIndustryRank', rsp.datas)
                })
            }else {
                if(index === 0) {
                   this.streetIndex = index 
                }else {
                    this.streetIndex = index + 1
                }
                
                this.$store.dispatch('fetchIndexStreetRank', item.id).then(rsp => {
                    this.$store.commit('changeIndexStreetRank', rsp.datas)
                })
            }
        },
        industryLunxun() {
           setInterval(() => { 
            let id = this.calcIndicators[this.index].id
            this.checkName = this.calcIndicators[this.index].name
            this.$store.dispatch('fetchIndexIndustryRank', id).then(rsp => {
                this.$store.commit('changeIndexIndustryRank', rsp.datas)
            })
            this.checkColor = this.colorObj[this.index]
            this.index ++
            if(this.index > 5) {
                this.index = 0
            }
            }, WAITTIME)
        },
        streetLunxun() {
            setInterval(() => { 
            let id = this.calcIndicators[this.streetIndex].id
            this.checkName = this.calcIndicators[this.streetIndex].name
            this.$store.dispatch('fetchIndexStreetRank', id).then(rsp => {
                   this.$store.commit('changeIndexStreetRank', rsp.datas)
             })
            this.checkColor = this.colorStreetObj[this.streetIndex]
            this.streetIndex ++
            if(this.streetIndex > 5) {
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

<style lang="scss" scoped>
.index {
      width: 100%;
      height: 321px;
      background-color: #1F1F1F;
    //box-shadow: 0px 25px 30px rgba(0, 0, 0, 0.1);
      color:#FFFFFF;
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
          .indexName {
              margin-left: 100px;
              font-size: 12px;
              flex: 1;
              display: flex;
              justify-content: center;
          }
    }
    .itemList {
        padding: 11px 35px;
        display: flex;
         .name {
               display: flex;
               align-items: center;
               color: #fff;
               margin-bottom: 5px;
               &:hover {
                   cursor: pointer;
               }
               .sign {
                  margin-right: 10px; 
                  width: 12px;
                  height: 12px;
                  border-radius: 50%; 
               }
               .a {
                   background-color: #50FFEE;
               }
               .b {
                   background-color: #AF47FF;
               }
               .c {
                   background-color: #FF2366;
               }
               .d {
                   background-color: #FFD950;
               }
               .e {
                   background-color: #02BC77;
               }
               .f {
                  background-color: #4791FF; 
               }
               .even {
                    background: #4791FF;
               }
               .odd {
                    background: #02BC77;
               }
              .value {
                    font-size: 14px;
                    width:145px;
                    margin-right: 70px;
              }
            }
        .item {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            .progress {
                width: 357px;
                overflow: hidden;
                .num {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 3px;
                    .label {
                        font-size: 14px;
                        color: #fff;
                    }
                    .num {
                        color: #D7DADB;
                        font-size: 12px;
                    }
                }
            }
        }
    }
}
</style>