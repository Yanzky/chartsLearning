<template>
  <div class="loading" v-show='loading'>LOADING...</div>
  <div class='box'>
    <div class='box-header-1'>
      <span class='box-title'>{{ header.titleMajor }}</span>
    </div>

    <div class='box-charts'></div>

    <div class="charts-info">
      <div><span class="charts-info-major">{{ charts.textValue }}</span><span class="charts-info-unit">%</span></div>
      <div class="charts-info-label">{{ charts.label }}</div>
    </div>

    <div class='box-footer-1'>
      <div class='box-info－1 clear line1'>
        <div class='box-info-1-item'>
          <div class='sec-caption' style="top: 1.5rem; position: relative;">{{ header.label3 }}</div>
        </div>
        <div class='box-info-1-item'>
          <div class='first-caption' style="top: 0.7rem; position: relative;">{{ header.value3 }}</div>
        </div>
      </div>

      <div class='box-info－1 clear line1' style="padding-top: 1rem;">
        <div class='box-info-1-item'>
          <div class='first-caption'>{{ header.value1 }}</div>
          <div class='sec-caption'>{{ header.label1 }}</div>
        </div>
        <div class='box-info-1-item'>
          <div class='first-caption'>{{ header.value2 }}</div>
          <div class='sec-caption'>{{ header.label2 }}</div>
        </div>
      </div>

      <div class="list-group">
        <div class="list"><span>{{ header.label4 }}</span><span>{{ header.value4 }}</span></div>
        <div class="list"><span>{{ header.label5 }}</span><span>{{ header.value5 }}</span></div>
        <div class="list"><span>{{ header.label6 }}</span><span>{{ header.value6 }}</span></div>
        <div class="list"><span>{{ header.label7 }}</span><span>{{ header.value7 }}</span></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    data () {
      return {
        header: {},
        charts: {
          data: [
            {
              label: ''
            },
            {
              label: ''
            }
          ]
        },
        loading: true
      }
    },

    methods: {
      test () {
        document.body.style.background = 'black'
        this.initCharts({
          header: {
            titleMajor: 'vIMS',
            value1: '18,547',
            value2: '95%',
            value3: '3,548,741',
            value4: 9,
            value5: 7,
            value6: 19,
            value7: 16,
            label1: '在线会话数',
            label2: '呼叫成功率',
            label3: '注册用户数',
            label4: '紧急告警',
            label5: '重要告警',
            label6: '一般告警',
            label7: '提示告警'
          },
          charts: {
            value: 122,
            textValue: 73,
            label: 'CPU利用率'
          }
        })
      },
      initCharts (obj) {
        this.$set('header', obj.header)
        this.$set('charts', obj.charts)
        this.$set('loading', false)
        var el = document.querySelector('.box-charts')
        var footer = document.querySelector('.box-footer-1')
        var info = document.querySelector('.box-header-1')
        var chartInfo = document.querySelector('.charts-info')
        el.innerHTML = ''
        el.style.height = (document.body.clientHeight - footer.clientHeight - info.clientHeight - info.offsetTop - 200) + 'px'
        chartInfo.style.top = (el.offsetTop + el.clientHeight - chartInfo.clientHeight) + 'px'
        var height = el.clientHeight
        var width = Math.min(el.clientWidth, height)
        var iR = Math.min(height, width) / 1.1
        var oR = iR - 30
        var svg = d3.select(el)
          .append('svg')
          .attr('width', width * 5.5)
          .attr('height', height * 2.5)
          .append('g')
          .attr('transform', 'translate(' + (el.clientWidth / 2 - 8) + ',' + el.clientHeight + ')')
        var s = 18
        var offset = 0.04
        var currentOffset = Math.ceil(s * (Number(obj.charts.textValue) / 100))
        var deg2rad = (deg) => {
          return deg * Math.PI / 180
        }
        var arc2 = d3.arc()
          .innerRadius((d, i) => { return iR + i * 1.1 })
          .outerRadius(oR)
          .startAngle((d, i) => {
            var ratio = d * i
            var step = i === 0 ? 0 : offset / 2
            return deg2rad(-90 + (ratio * 180)) + step + 0.01
          })
          .endAngle((d, i) => {
            var ratio = d * (i + 1)
            var step = i + 1 === s ? 0 : offset / 2
            return deg2rad(-90 + (ratio * 180)) - step + 0.01
          })
        svg.selectAll('.arc-item')
          .data(d3.range(s).map(() => { return 1 / s }))
          .enter()
          .append('path')
          .style('fill', '#163f90')
          .attr('d', arc2)
        var arc = d3.arc()
          .innerRadius((d, i) => { return iR + i * 1 })
          .outerRadius(oR)
          .startAngle((d, i) => {
            var ratio = d * i
            var step = i === 0 ? 0 : offset / 2
            return deg2rad(-90 + (ratio * 180)) + step
          })
          .endAngle((d, i) => {
            var ratio = d * (i + 1)
            var step = i + 1 === s ? 0 : offset / 2
            return deg2rad(-90 + (ratio * 180)) - step
          })
        svg.selectAll('.arc-item')
          .data(d3.range(s).map(() => { return 1 / s }))
          .enter()
          .append('path')
          .style('fill', (d, i) => {
            i++
            if (i <= currentOffset) {
              var r = Math.min(Math.round(17 + ((40 - 18) / currentOffset * i)), 255)
              var g = Math.min(Math.round(63 + ((204 - 63) / currentOffset * i)), 255)
              var b = Math.min(Math.round(74 + ((209 - 74) / currentOffset * i)), 255)
              return i === currentOffset ? '#99eff1' : 'rgb(' + r + ', ' + g + ', ' + b + ')'
            } else {
              return '#041635'
            }
          })
          .attr('d', arc)
      }
    },

    ready () {
      window.entry = this
      if (typeof window.ready === 'function') {
        window.ready()
      }
      this.test()
    }
  }
</script>
