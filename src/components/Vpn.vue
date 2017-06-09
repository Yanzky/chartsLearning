<template>
  <div class='loading' v-show='loading'>LOADING...</div>
  <div class='box'>
    <div class='box-header-1'>
      <span class='box-title'>{{ header.titleMajor }}</span>
    </div>

    <div class='box-charts'></div>

    <div class='box-footer-1'>
      <div class='box-info－1 clear line1'>
        <div class='box-info-1-item'>
          <div class='first-caption' style='color: #ed3f49;'>{{ header.value1 }}</div>
          <div class='sec-caption'>{{ header.label1 }}</div>
        </div>
        <div class='box-info-1-item'>
          <div class='first-caption'>{{ header.value2 }}</div>
          <div class='sec-caption'>{{ header.label2 }}</div>
        </div>
      </div>

      <div class='box-info－1 clear line1'>
        <div class='box-info-1-item'>
          <div class='sec-caption' style='top: 1.5rem; position: relative;'>{{ header.label3 }}</div>
        </div>
        <div class='box-info-1-item'>
          <div class='first-caption' style='top: 0.7rem; position: relative;'>{{ header.value3 }}</div>
        </div>
      </div>
      <div class='list-group'>
        <div class='list'><span>{{ header.label4 }}</span><span>{{ header.value4 }}</span></div>
        <div class='list'><span>{{ header.label5 }}</span><span>{{ header.value5 }}</span></div>
        <div class='list'><span>{{ header.label6 }}</span><span>{{ header.value6 }}</span></div>
        <div class='list'><span>{{ header.label7 }}</span><span>{{ header.value7 }}</span></div>
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
            titleMajor: 'Cloud VPN',
            value1: '2,500',
            value2: '18,675',
            value3: '2365,478',
            value4: 6,
            value5: 10,
            value6: 34,
            value7: 12,
            label1: '异常Cloud VPN业务',
            label2: 'Cloud VPN业务',
            label3: '租户数',
            label4: '紧急告警',
            label5: '重要告警',
            label6: '一般告警',
            label7: '提示告警'
          },
          charts: {
            data: [
              {
                value: 170
              },
              {
                value: 90
              }
            ]
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
        el.innerHTML = ''
        el.style.height = (document.body.clientHeight - footer.clientHeight - info.clientHeight - info.offsetTop - 170) + 'px'
        var width = el.clientWidth
        var height = el.clientHeight
        var radius = Math.min(width, height) / 2
//        var color = d3.scaleOrdinal()
//          .range(['#004682', '#944147'])
        var arc = d3.arc()
          .outerRadius(radius - 10)
          .innerRadius(0)
        var pie = d3.pie()
          .sort(null)
          .value((d) => { return d.value })
        var svg = d3.select('.box-charts')
          .append('svg')
          .attr('width', width)
          .attr('height', height)
          .append('g')
          .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
        var g = svg.selectAll('.arc')
          .data(pie(obj.charts.data))
          .enter()
          .append('g')
          .attr('class', (d, i) => { return 'arc arc-' + (i + 1) })
          .attr('stroke-width', 2)
        g.append('path')
          .attr('transform', (x, index) => {
            var offset = index === 1 ? 4 : 0
            var angle = (x.startAngle + x.endAngle) / 2
            var xOff = Math.sin(angle) * offset
            var yOff = -Math.cos(angle) * offset
            return 'translate(' + xOff + ',' + yOff + ')'
          })
          .attr('d', arc)
          .attr('cx', (d, i) => { return i === 0 ? '0' : '5' })
          .attr('cy', '0')
          .attr('fill', (d, i) => { return 'url(#gradient' + i + ')' })
        var gradient = g.append('defs')
          .selectAll('.gradient')
          .data(['#004a8a', '#a44e53'])
          .enter()
          .append('radialGradient')
          .attr('id', (d, i) => { return 'gradient' + i })
          .attr('gradientUnits', 'userSpaceOnUse')
          .attr('cx', '0')
          .attr('cy', '0')
          .attr('r', 2.5 * 100)
          .attr('spreadMethod', 'pad')
        gradient.append('stop').attr('offset', '0%').attr('stop-color', (d, i) => { return i === 0 ? '#00314c' : '#000000' })
        gradient.append('stop').attr('offset', '30%')
          .attr('stop-color', (d) => { return d })
          .attr('stop-opacity', 1)
        gradient.append('stop').attr('offset', '100%')
          .attr('stop-color', (d) => { return d })
          .attr('stop-opacity', 1)
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
