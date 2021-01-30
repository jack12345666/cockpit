<template>
  <div class="box">
       <div class="companyList">
              <div class="title">
                <div class="name">平台入驻企业数量</div>
              </div>
              <div class="itemList">
              <div class="item" v-for="(item, index) in gradeOrgs" :key="item.evaluationId">
                  <div :class="colorList[index]">{{item.gradeName}}企业</div>
                 <div class="progress">
                   <div class="num">{{item.orgSum}}家</div>
                   <van-progress :percentage="(item.orgSum/500)*100" stroke-width="5" color="#4791FF" track-color="#5E5E5E" :show-pivot="false"/>
                 </div>
             </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data() {
      return {
        colorList: ['btn a','btn b','btn c','btn d'],
      }
    },
    computed: {
      ...mapState(['gradeOrgs'])
    }
}
</script>

<style lang="scss" scoped>
 .companyList {
        width: 100%;
        height: 321px;
        background-color: #1F1F1F;
        box-shadow: 0px 25px 30px rgba(0, 0, 0, 0.1);
        color:#FFFFFF;
        border-radius: 10px;
        .title {
          width: 100%;
          height: 55px;
          border-bottom: 1px solid #5E5E5E; 
          .name {
            padding: 19px 20px;
            font-size: 12px;
          }
        }
        .itemList {
          padding: 32px;
          .item {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            .btn {
              margin-right: 23px;
              font-size: 16px;
            }
            .a {
              width: 82px;
              height: 38px;
              background: rgba(255, 35, 102, 0.17);
              border-radius: 7px;
              color: #FF2366;
              padding: 8px 11px;
            }
             .b {
              width: 82px;
              height: 38px;
              background:rgba(255, 217, 80, 0.17);
              border-radius: 7px;
              color: #FFD950;
              padding: 8px 11px;
            }
              .c {
              width: 82px;
              height: 38px;
              background:rgba(2, 188, 119, 0.17);
              border-radius: 7px;
              color: #02BC77;
              padding: 8px 11px;
            }
              .d {
              width: 82px;
              height: 38px;
              background:rgb(71, 145, 255,0.17);
              border-radius: 7px;
              color:#4791FF;
              padding: 8px 11px;
            }
            .progress {
              width: 232px;
              overflow: hidden;
              .num {
               margin-left: 180px;
               color: #D7DADB;
               font-size: 12px;
               margin-bottom: 3px;
              }
            }
          }
        }
      }
</style>