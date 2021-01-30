<template>
  <div class="serarchComponent">
    <div class="first">
        <div class="search">
            <div class="input">
                <van-search v-model="value" placeholder="请输入搜索关键词" />
            </div>
            <div class="searchBtn" @click="toSearch">确认</div>
        </div>
        <div class="close">
            <van-icon name="cross" size="36px" color="#4791FF" @click="toCloseBox"/> 
        </div>
    </div>
    <div class="content">
        <div class="leftList">
           <div class="list" v-if="searchOrgList && searchOrgList.length > 0">
               <div class="title">公司排名</div>
                <div class="nameList">
                    <div :class="`nameItem${index+1}`" v-for="(item, index) in nameList" :key="index">{{item}}</div>
                </div> 
                <div class="listItem" v-for="(item, index) in searchOrgList" :key="item.evalOrg">
                   <div class="nameItem1">{{index+1}}</div> 
                   <div class="nameItem2">{{item.orgName}}</div> 
                   <div class="nameItem3">{{item.orgCode}}</div> 
                   <div class="nameItem4">{{item.orgContactName}}</div> 
                   <div class="nameItem5">{{item.orgContactMobile}}</div> 
                   <div class="nameItem6">{{item.rank}}</div> 
                   <div class="nameItem7">{{item.realGrade}}</div> 
                   <div class="nameItem8">
                       <div class="detail" @click="seeDetail(item)">查看</div>
                    </div> 
                </div>
                <div class="pagation">
                    <van-pagination v-model="searchConf.pageIndex"  force-ellipses :total-items="searchTotal" :items-per-page="searchConf.pageSize" @change="changePage">
                        <template #prev-text>
                            <van-icon name="arrow-left"/>
                        </template>
                        <template #next-text>
                            <van-icon name="arrow" />
                        </template>
                    </van-pagination>
                </div>
           </div>
           <van-empty style="margin-top: 50px;" description="暂未搜索到相关企业" v-else/>
        </div>
        <div class="info" v-if="radarData.length > 0">
            <div class="title">{{orgName}}</div>
            <div class="chart">
            <RadarChart :color="'#02BC77'" :rgba="'rgba(2, 188, 119, 0.5)'" :id="'orgInfoChart'" :data="radarData" ref="orgInfoCharts"/>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import RadarChart from '../../components/echart/radar'
export default {
    components: { RadarChart },
    data() {
        return {
           value: '',
           nameList: ['序号', '公司名称', '机构代码', '联系人', '联系方式', '排名', '等级', '操作'],
           radarData: [],
           orgName: ''
        }
    },
    computed: {
        ...mapState(['searchOrgList', 'searchConf', 'orgIndicatorVals', 'searchTotal'])
    },
    methods: {
        fetchOrgList() {
          this.$store.dispatch('getOrgByNameLike')
        },
        toCloseBox() {
            this.$store.commit('changeSearchList', [])
            this.$emit('closeBox')
        },
        toSearch() {
            this.searchConf.pageIndex = 1
            this.searchConf.search = this.value
            this.fetchOrgList()
        },
        changePage() {
             this.fetchOrgList()
        },
        seeDetail(item) {
           this.radarData = []
           this.orgName = item.orgName
           this.$store.dispatch('fetchIndexOrgInfo', item.evalOrg).then(rsp => {
            this.radarData = []
            rsp.datas.forEach(item => {
            this.radarData.push(item.evalValue)
            }) 
            this.$refs.orgInfoCharts.renderChart()
        })
       },
    }
}
</script>
<style>
.van-search {
    padding-top: 8px;
    background-color: #1f1f1f;
}
.van-search .van-cell {
     background-color: #1f1f1f;
}
.van-field__control {
    background-color: #1f1f1f;
    color: #fff;
}
.van-search__content--square {
    margin: 0;
    padding: 0;
}
.van-search__content {
    background-color: #1f1f1f;
}
.van-field__left-icon {
    color: #4791FF;
    margin-right: 20px;
}
 .van-pagination__item  {
    background-color: rgba(71, 145, 255, 0.17);
    color: #fff;
    flex-grow: 0;
}
[class*=van-hairline]::after {
    border: none;
}
.van-pagination__page {
    margin-right: 1px;
}
.van-pagination__prev {
 background-color: rgba(71, 145, 255, 0.17);
 margin-right: 1px;
}
.van-pagination__item--active {
    background-color:  rgba(71, 145, 255, 0.5);
}
</style>
<style lang='scss' scoped>
 .serarchComponent {
      width: 1920px;
      height: calc(1080px - 95px);
      top: 95px;
      left: 0;
      position: absolute; 
      overflow: hidden;
      z-index: 99999;
      background: rgba(18, 18, 18, 0.96);
       padding: 35px 47px;
      .first {
          display: flex;
          justify-content: space-between;
          padding-bottom: 35px;
          .search {
              display: flex;
              align-items: center;
              .input {
                  height: 51px;
                  width: 1116px;
                  background-color: #1F1F1F;
              }
              .searchBtn {
                  cursor: pointer;
                  margin-left: 10px;
                  background-color:rgba(112, 112, 112, 0.52);
                  color: #4791FF;
                  font-size: 18px;
                  padding: 15px 54px;
                  &:active {
                      background-color:rgba(112, 112, 112, 0.7);
                  }
              }
          }
         .close {
              margin-right: 20px;
              cursor: pointer;
         }
      }
      .content {
          display: flex;
          .leftList {
              width: 1270px;
              height: 560px;
              background-color: #1F1F1F;
              box-shadow: 0px 25px 30px rgba(0, 0, 0, 0.1);
               border-radius: 10px;
               .list {
                  .title {
                      font-size: 14px;
                      padding: 16px 38px;
                      color: #fff;
                      border-bottom: 1px solid #5E5E5E;
                  }
                  .nameList {
                       display: flex;
                       align-items: center;
                       border-bottom: 1px solid #5E5E5E;
                       font-size: 14px;
                      .nameItem1 {
                          width: 100px;
                          text-align: center;
                          padding: 20px 0;
                      }
                      .nameItem2 {
                          width: 300px;
                          overflow: hidden;
                          text-overflow: ellipsis; 
                          white-space: nowrap;
                          text-align: center;
                           padding: 20px 0;
                      }
                       .nameItem3 {
                          width: 150px;
                          overflow: hidden;
                          text-overflow: ellipsis; 
                          white-space: nowrap;
                          text-align: center;
                          padding: 20px 0;
                      }
                       .nameItem4 {
                          width: 100px;
                          overflow: hidden;
                          text-overflow: ellipsis; 
                          white-space: nowrap;
                          text-align: center;
                          padding: 20px 0;
                      }
                      .nameItem5 {
                          width: 180px;
                          overflow: hidden;
                          text-overflow: ellipsis; 
                          white-space: nowrap;
                          text-align: center;
                          padding: 20px 0;
                      }
                       .nameItem6 {
                          width: 150px;
                          overflow: hidden;
                          text-overflow: ellipsis; 
                          white-space: nowrap;
                          text-align: center;
                          padding: 20px 0;
                      }
                       .nameItem7 {
                          width: 150px;
                          overflow: hidden;
                          text-overflow: ellipsis; 
                          white-space: nowrap;
                          text-align: center;
                          padding: 20px 0;
                      }
                       .nameItem8 {
                          width: 180px;
                          overflow: hidden;
                          text-overflow: ellipsis; 
                          white-space: nowrap;
                          text-align: center;
                          padding: 20px 0;
                      }
                  }

                  .listItem {
                       display: flex;
                       align-items: center;
                       font-size: 14px;
                       overflow: hidden;
                      .nameItem1 {
                          width: 100px;
                          text-align: center;
                          padding: 10px 0;
                      }
                      .nameItem2 {
                          width: 300px;
                          overflow: hidden;
                          text-overflow: ellipsis; 
                          white-space: nowrap;
                          text-align: center;
                           padding: 10px 0;
                      }
                       .nameItem3 {
                          width: 150px;
                          overflow: hidden;
                          text-overflow: ellipsis; 
                          white-space: nowrap;
                          text-align: center;
                          padding: 10px 0;
                      }
                       .nameItem4 {
                          width: 100px;
                          overflow: hidden;
                          text-overflow: ellipsis; 
                          white-space: nowrap;
                          text-align: center;
                          padding: 10px 0;
                      }
                      .nameItem5 {
                          width: 180px;
                          overflow: hidden;
                          text-overflow: ellipsis; 
                          white-space: nowrap;
                          text-align: center;
                          padding: 10px 0;
                      }
                       .nameItem6 {
                          width: 150px;
                          overflow: hidden;
                          text-overflow: ellipsis; 
                          white-space: nowrap;
                          text-align: center;
                          padding: 10px 0;
                      }
                       .nameItem7 {
                          width: 150px;
                          overflow: hidden;
                          text-overflow: ellipsis; 
                          white-space: nowrap;
                          text-align: center;
                          padding: 10px 0;
                      }
                       .nameItem8 {
                           cursor: pointer;
                          width: 180px;
                          overflow: hidden;
                          text-overflow: ellipsis; 
                          white-space: nowrap;
                          text-align: center;
                          padding: 10px 0;
                        .detail {
                            font-size: 14px;
                            color: #4791FF;
                        }
                      }
                  }
                  .pagation {
                     width: 100%;
                     display: flex;
                     justify-content: center;
                      margin-top: 10px;
                  }
              }
          }
          .info {
              width: 533px;
              height: 560px;
              background-color: #1F1F1F;
              box-shadow: 0px 25px 30px rgba(0, 0, 0, 0.1);
              border-radius: 10px;
              margin-left: 17px;
              .title {
                font-size: 14px;
                padding: 16px 38px;
                color: #fff;
                border-bottom: 1px solid #5E5E5E;
            }
            .chart {
                margin: 100px 0 0 40px;
            }
          }
       }
    }
</style>