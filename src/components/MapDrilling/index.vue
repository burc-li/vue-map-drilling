<template>
  <div class="mapdrilling-inner">
    <div id="chart" class="chart"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import { TAIWAN_ADCODE, JD_ADCODE, EXISTING_SECOND_LAYER_REGION, EXISTING_THIRD_LAYER_REGION } from './constant'
import { getGeoJson, getMapData } from '@/apis/map'

export default {
  name: 'MapDrilling',
  data: () => {
    return {
      mapChart: null, // echarts实例
      mapStack: [], // 存储地图数据
      timer: null,
    }
  },
  mounted () {
    this.initChart()
  },
  methods: {
    async initChart () {
      // 初始化echarts实例
      this.mapChart = echarts.init(document.getElementById('chart'))
      this.addChartEvent()

      // 获取渲染地图的相关数据
      this.mapChart.showLoading()
      const mapName = 'china'
      const { partData, geoJson } = await this.getGeoAndMapData('china', mapName)
      this.mapChart.hideLoading()

      // 注册渲染地图
      const specialAreas = {
        澳门: {
          left: 113,
          top: 20.5,
          width: 0.7,
        },
        香港: {
          left: 115,
          top: 21.3,
          width: 2,
        },
      }
      this.registeRenderMap(mapName, partData, geoJson, specialAreas)
    },

    // 添加绑定事件
    addChartEvent () {
      this.bindResizeWindow() // 监听屏幕大小改变
      this.bindClickChart() // 绑定自定义单击事件
      this.bindContextmenuChart() // 绑定自定义右击事件
    },

    // 监听屏幕大小改变
    bindResizeWindow () {
      window.addEventListener('resize', () => {
        if (this.timer) return

        this.timer = setTimeout(() => {
          this.mapChart.resize()
          this.timer = null
        }, 100)
      })
    },

    // 绑定自定义单击事件
    bindClickChart () {
      this.mapChart.on('click', async e => {
        const {
          seriesName,
          name,
          data: { adcode },
        } = e

        // 可下钻到二级地图（23个省、5个自治区、4个直辖市、2个特别行政区）
        if (EXISTING_SECOND_LAYER_REGION.find(i => i.adcode === adcode)) {
          const mapName = `${adcode}-${name}`
          const { partData, geoJson } = await this.getGeoAndMapData('province', mapName)
          this.registeRenderMap(mapName, partData, geoJson)
        }

        // 可下钻到三级地图（23个省、5个自治区 的市级区域）
        else if (EXISTING_THIRD_LAYER_REGION.find(i => `${i.adcode}-${i.name}` === seriesName)) {
          // 台湾，无法下钻（暂无市级区域geojson数据）
          if (seriesName.includes(TAIWAN_ADCODE)) return

          const mapName = `${seriesName}-${adcode}-${name}`
          const { partData, geoJson } = await this.getGeoAndMapData('city', mapName)
          this.registeRenderMap(mapName, partData, geoJson)
        }
      })
    },

    // 绑定自定义右击事件
    bindContextmenuChart () {
      // 取消右击默认事件
      const container = document.getElementById('chart')
      container.oncontextmenu = e => e.preventDefault()
      // 绑定自定义右击事件
      this.mapChart.on('contextmenu', () => {
        this.goBack()
      })
    },

    /**
     * @description: 获取渲染地图的相关数据 geoJson 和 partData（地图部分数据内容）
     * @param {String} type 类型  china：中国地图   province：省级地图   city：市级地图
     * @param {String} mapName 地图名称 同注册地图方法registerMap 的第一个参数一致
     */
    async getGeoAndMapData (type, mapName) {
      const [{ data: geoJson }, res] = await Promise.all([getGeoJson(type, mapName), getMapData(type)])
      const { data: partData } = res.data
      return { geoJson, partData }
    },

    /**
     * @description: 返回上一级地图
     */
    goBack () {
      // 如果栈中只剩下中国地图
      if (this.mapStack.length <= 1) {
        return
      }
      this.mapStack.pop()
      const { mapName, partData, geoJson } = this.topChild()
      this.registeRenderMap(mapName, partData, geoJson)
    },

    /**
     * @description: 地图数据入栈，栈顶成员即当前渲染的地图数据
     * @param {String} mapName 地图名称 同注册地图方法registerMap 的第一个参数一致
     * @param {Array} partData 地图部分数据内容
     * @param {Object} geoJson 地图geoJson
     */
    pushStack (mapName, partData, geoJson) {
      this.mapStack.push({
        mapName,
        partData,
        geoJson,
      })
    },

    /**
     * @description: 获取栈顶成员
     */
    topChild () {
      if (this.mapStack.length === 0) return undefined
      return this.mapStack[this.mapStack.length - 1]
    },

    /**
     * @description: 注册渲染地图
     * @param {String} mapName 地图名称 同 option/series/map 一致
     * @param {Array} partData 地图部分数据内容
     * @param {Object} geoJson 地图geoJson
     * @param {Object} specialAreas 特殊区域
     */
    registeRenderMap (mapName, partData, geoJson, specialAreas = {}) {
      // 注册地图
      echarts.registerMap(mapName, geoJson, specialAreas)
      // 绘制地图
      this.renderMap(mapName, partData, geoJson)
    },

    /**
     * @description: 绘制地图
     * @param {String} mapName 地图名称 同注册地图方法registerMap 的第一个参数一致
     * @param {Array} partData 地图部分数据内容
     * @param {Object} geoJson 地图geoJson
     */
    renderMap (mapName, partData, geoJson) {
      const seriesData = this.getSeriesDataByPart(partData, geoJson)
      const visualMapMax = this.getVisualMapMax(seriesData)
      const option = {
        title: {
          text: mapName,
          textStyle: {
            color: '#b7def9',
            fontSize: 16,
          },
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}<br/>{c}',
          backgroundColor: '#de5e60',
          textStyle: {
            color: '#ffe4e5',
            fontSize: 12,
          },
        },
        // 视觉映射
        visualMap: {
          min: 0,
          max: visualMapMax,
          text: ['高', '低'],
          realtime: true,
          calculable: true,
          inRange: {
            color: ['#70add9', '#549ccb', '#297bb4'], // 色阶范围
          },
          textStyle: {
            color: '#b7def9',
          },
        },
        series: [
          {
            name: mapName, // 系列名称
            type: 'map',
            map: mapName, // 同 registerMap 方法的第一个参数一致
            zoom: 1.15, // 当前视角的缩放比例
            zlevel: 1, // 用于 Canvas 分层，不同zlevel值的图形会放置在不同的 Canvas 中
            scaleLimit: {
              min: 0.8,
              max: 2,
            },
            label: {
              // 非高亮状态下的文本样式
              normal: {
                show: true,
                position: 'inside', // 文本标签显示的位置
                textStyle: {
                  color: '#ffe4e5', // 文本颜色
                  fontSize: 14,
                },
                // formatter: '{b}\n{c}', // 文本上显示的值  data:[{name: "地名", value: 数据}],  {b}表示label信息,{c}代表value
              },
              // 高亮状态下的文本样式
              emphasis: {
                textStyle: {
                  color: '#fff', // 文本颜色
                },
              },
            },
            itemStyle: {
              // 非高亮状态下的地图块样式
              normal: {
                borderColor: '#c2e6ff',
              },
              // 高亮状态下的地图块样式
              emphasis: {
                areaColor: '#9acbec',
              },
            },

            data: seriesData,
          },
        ],
        animation: true,
        animationDuration: 1000,
        animationDurationUpdate: 600,
        animationEasingUpdate: 'cubicInOut',
      }

      // 绘制图表
      this.mapChart.setOption(option)

      // 如果渲染的地图 和 栈顶地图一致，无需入栈
      if (this.topChild() && mapName === this.topChild().mapName) {
        return
      }
      // 入栈
      this.pushStack(mapName, partData, geoJson)
    },

    /**
     * @description: 根据partData 和 geoJson 生成 seriesData
     * @param {Array} partData 地图部分数据内容
     * @param {Object} geoJson 地图geoJson
     */
    getSeriesDataByPart (partData, geoJson) {
      let data = geoJson.features.map(({ properties }) => ({
        adcode: properties.adcode,
        name: properties.name,
        value: 0,
      }))
      if (geoJson.attach) {
        const attachData = geoJson.attach.map(item => ({
          adcode: item.adcode,
          name: item.name,
          value: 0,
        }))
        data.push(...attachData)
      }
      // 过滤掉九段线数据
      data = data.filter(item => item.adcode !== JD_ADCODE)

      data.forEach(item => {
        const currData = partData.find(i => i.adcode === item.adcode)
        if (currData) {
          item.value = currData.value
        }
      })
      return data
    },

    /**
     * @description: 根据seriesData 动态计算生成 visualMap 的最大值
     * @param {Array} seriesData 地图数据内容
     */
    getVisualMapMax (seriesData) {
      const maxValue = Math.max(...seriesData.map(item => item.value))
      return parseInt(maxValue) + 50
    },
  },

  beforeUnmount () {
    // 销毁地图实例
    this.mapChart.dispose()
  },
}
</script>

<style scoped lang="less">
.mapdrilling-inner {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  .chart {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    border: 3px solid #de5e60;
  }
}
</style>
