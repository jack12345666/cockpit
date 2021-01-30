<template>
  <Echart :options="options" :id="id" height="236px" width="352px"></Echart>
</template>

<script>
import Echart from "@/common/echart";
import { mapState } from 'vuex'
export default {
  components: { Echart },
  props: {
    id: {
      type: String,
      default: 'radar'
    },
    color: {
      type: String,
      default: ''
    },
    rgba: {
      type: String,
      default: ''
    },
    data: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      indicator: [],
      options: {},
      datamax: [3500, 7700, 2400, 172000, 72, 1170],
      dataname: []
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
    if(this.id === 'orgRankChart' || this.id === 'orgInfoChart') {
      this.datamax = [3500, 7700, 2400, 172000, 72, 1170]
    }else if(this.id === 'industryId') {
      this.datamax = [160, 700, 200, 13500, 15, 150]
    }else {
      this.datamax = [110, 450, 65, 8200, 5, 120]
    }
   
    this.renderChart()
  },
  methods: {
    renderChart() { 
      this.indicator = []
      for (var i = 0; i < this.dataname.length; i++) {
      this.indicator.push({
          name: this.data[i] + ',' + this.dataname[i],
          max: this.datamax[i],
        })
      }
    this.options = {
        tooltip: {
          show: true,
          trigger: "item",
          position: ['0', '30%'],
          textStyle: {
            fontSize: 12
          }
        },
        radar: {
          center: ["50%", "50%"],
          radius: "65%",
          startAngle: 90,
          splitNumber: 5,
          splitArea: {
            areaStyle: {
              color: ['rgba(255,255,255,0.15)'],
            },
          },
          axisLabel: {
            show: false,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: this.rgba
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: this.rgba
            },
          },
          name: {
            formatter: function(value) {
                let arr = value.split(',')
                if(arr[1] == '单位排放权益增加值[万元/吨]' || arr[1] == '亩均税收[万元/亩]') {
                   return arr[0] + "\n" + arr[1]
                 }
                else if(arr[1] == 'R&D研发经费支出占主营业务收入比重[百分比]') {
                    return arr[0] + "\n" + arr[1].substr(0, 8) + "\n" + arr[1].substr(8, 16) + "\n" + arr[1].substr(16, arr[1].length)
                 }
                 else if(arr[1] == '单位能耗增加值[万元/吨标煤]' || arr[1] == '全员劳动生产率[万元/人]' || arr[1] == '亩均增加值[万元/亩]') {
                     return arr[0] + "\n" + arr[1].substr(0, 6) + "\n" + arr[1].substr(6, arr[1].length)
                 } 
                 else {
                     return arr[0] + '\n' +arr[1]
                 }
            },
            textStyle: {
              color: "#656565",
              fontSize: 12,
            },
          },
          indicator: this.indicator,
        },

        series: [
          {
            name: "",
            type: "radar",
            symbol: 'none',
             data: [
                {
                  value: this.data,
                  name: '',
                  itemStyle: {
                    color: this.color,
                  },
                    areaStyle: {
                    normal: {
                      color: this.color,
                    }
                  }
                },
                {
                    value: this.datamax,
                    name: '',
                    itemStyle: {
                      color: this.color,
                  },
                 
                }
            ]
      //       symbol: "none",
      //       symbolSize: 6,
      //       areaStyle: {
      //         normal: {
      //           color: this.color,
      //         },
      //       },
      //       itemStyle: {
      //         color: this.color,
      //       },
      //       lineStyle: {
      //         normal: {
      //           color: this.color,
      //           width: 2,
      //         },
      //       },
      //       data: [this.data],
      //     },{
      //         name: "",
      //         type: "radar",
      //         symbol: "none",
      //         symbolSize:6,
      //         itemStyle: {
      //             color: this.color,
      //         },
      //         lineStyle: {
      //             normal: {
      //                 color: this.color,
      //                 width: 2
      //             }
      //         },
      //         data: [this.datamax]
          }
        ]
      }
    }
  }
}
</script>

<style>
</style>