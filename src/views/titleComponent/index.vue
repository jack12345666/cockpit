<template>
  <div class="box">
    <div class="first">
      <div class="logo">
        <img src="../../assets/logoTitle.png" width="43px" height="38px"/>
      </div>
      <div class="name">杭州钱塘新区亩产效益综合评价数据统计平台</div>
      <div class="titleRight"> 
      <div class="second">
       <div class="tabBtns">
        <!-- <div
          :class="item.isChecked ? 'tabBtn btnChecked' : 'tabBtn'"
          v-for="item in tabBtnList"
          :key="item.id"
          @click="checkTab(item)"
        >
          {{ item.name }}
        </div> -->
      </div>
     </div>
    <div class="info">
           {{evaluationOrgs[0].evaluationName}}: {{evaluationOrgs[0].orgSum}}家{{" "}}
           {{evaluationOrgs[1].evaluationName}}: {{evaluationOrgs[1].orgSum}}家{{" "}}
           {{evaluationOrgs[2].evaluationName}}: {{evaluationOrgs[2].orgSum}}家{{" "}}
           {{evaluationOrgs[3].evaluationName}}: {{evaluationOrgs[3].orgSum}}家
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
      tabBtnList: [
        { id: 1, name: "企业规上", isChecked: true },
        { id: 2, name: "工业规下", isChecked: false },
      ]
    }
  },
  computed: {
    ...mapState(['evaluationOrgs', 'evaluations'])
  },
  methods: {
    checkTab(item) {
      this.tabBtnList.map((item) => (item.isChecked = false));
      item.isChecked = true;
    }
  }
}
</script>

<style lang="scss" scoped>
.first {
  width: 100%;
  height: 90px;
  background-color: rgba(0, 0, 0, 0.17);
  display: flex;
  justify-content: space-between;
  align-items: center;
  .logo {
    margin: 10px 0 0 45px;
  }
  .name {
    flex: 1;
    height: 40px;
    font-size: 30px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    line-height: 40px;
    color: #4791ff;
    margin-left: 8px;
  }
  .titleRight {
    display: flex;
    align-items: center;
    .second {
    height: 72px;
    box-shadow: 0px 5px 30px rgba(0, 0, 0, 0.05);
    opacity: 1;
    display: flex;
    justify-content: flex-end;
    .tabBtns {
        display: flex;
        align-items: center;
        margin-right: 51px;
        .tabBtn {
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #4791ff;
        text-align: center;
        margin-left: 30px;
        &:hover {
            cursor: pointer;
            border-radius: 10px;
        }
        }
        .btnChecked {
        background: rgba(71, 145, 255, 0.17);
        border-radius: 10px;
        padding: 14px 16px;
        &:hover {
            cursor: pointer;
        }
        }
     }
    }  

   .info {
    margin-right: 51px;
    font-size: 16px;
    color: #4791ff;
    opacity: 0.5;
   } 
  }
  
}
</style>