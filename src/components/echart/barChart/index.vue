<template>
    <Echart :options="options" :id="id" height="225px" width="675px"></Echart>
</template>

<script>
import Echart from "@/common/echart";
import { mapState } from 'vuex'
export default {
  components: { Echart },
  props: {
    id: {
      type: String,
      default: 'barChart'
    },
    nameList: {
      type: Array,
      default: function() {
        return []
      }
    },
    barData: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      options: {},
      dataname: [],
      fisrtData: [],
      secondData: [],
      thirdData: []
    }
  },
  computed: {
    ...mapState(['calcIndicators'])
  },
  created() {
    if(this.calcIndicators.length > 0) {
      this.calcIndicators.forEach(item => {
        this.dataname.push(item.name)
      })
    }
    this.renderBarChart()
  },
  methods: {
    renderBarChart() {
      this.options = {
      backgroundColor: "#1f1f1f",
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      grid: {
        left: "5%",
        right: "2%",
        bottom: 0,
        top: "16%",
        containLabel: true,
      },
      legend: {
        data: this.nameList,
        right: 10,
        top: 0,
        textStyle: {
          color: "#fff",
        },
        itemWidth: 12,
        itemHeight: 10,
      },
      xAxis: {
        type: "category",
        data: this.dataname,
        axisTick: {
          show: false, //不显示刻度
        },
        axisLabel: {
          textStyle: {
            fontFamily: "Microsoft YaHei",
            color: "white",
          },
          formatter: function(value) {            
            if (value.length > 16) {  
                return value.substring(0, 6) + "\n"+ value.substring(6, 12)  + "\n" + value.substring(12, 18) + "\n" + value.substring(18, value.length)
            }else if(value.length > 5 && value.length <= 16) {  
                return value.substring(0, 6) + "\n" + value.substring(6, 13) + "\n" + value.substring(13, value.length)
            } else {
                return value
            } 
          }  
        }
      },
      yAxis: {
        type: "value",
        axisLine: {
          lineStyle: {
            color: "white",
          },
        },
        axisTick: {
          show: false, //不显示刻度
        },
        splitLine: {
          show: true,
           lineStyle: {
            type: 'dashed',
            color: "rgba(255,255,255,0.3)",
          },
        },
        axisLabel: {},
      },

      series: [
        {
          name: this.nameList[0],
          type: "bar",
          barWidth: "15%",
          itemStyle: {
            normal: {
              color: "#02BC77",
            },
          },
          data: this.barData[0],
        },
        {
          name: this.nameList[1],
          type: "bar",
          barWidth: "15%",
          itemStyle: {
            normal: {
              color: "#4791FF",
            },
          },
          data: this.barData[1],
        },
        {
          name: this.nameList[2],
          type: "bar",
          barWidth: "15%",
          itemStyle: {
            normal: {
              color: "#FFD950",
            },
          },
          data: this.barData[2],
        }
      ]
    }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>