import * as echarts from '../../ec-canvas/echarts';//需要注意这个地方的路径不用引用错误了
function initChart(canvas, width, height) {
  const chart = echarts.init(canvas,null,{
    width:width,
    height:height
  });
  canvas.setChart(chart);
  function randomData() {
   now = new Date(+now+1000);
    value = value + Math.random() * 21 - 10;
    return {
        name: now.toString(),
        value: [
            now,
            Math.round(value)
        ]
    };
}
var option;
var data = [];
var now = new Date();
var value = Math.random() * 100;
for (var i = 0; i < 1000; i++) {
  data.push(randomData());
}
option = {
    title: {
        text: '动态数据 + 时间坐标轴'
    },
    tooltip: {
        trigger: 'axis',
        formatter: function (params) {
            params = params[0];
            var date = new Date(params.name);
            return date.getSeconds() + '/' + date.getMinutes() + '/' + date.getHours() + ' : ' + params.value[1];
        },
        axisPointer: {
            animation: false
        }
    },
    xAxis: {
        type: 'time',
        splitLine: {
            show: false
        },
        minInterval:1000
    },
    yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        splitLine: {
            show: false
        }
    },
    series: [{
        name: '模拟数据',
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        data: data
    }]
};

setInterval(function () {
        data.shift();
        data.push(randomData());
        chart.setOption({
          series:[{
            data:data
          }]
        });
}, 100);
  chart.setOption(option);
  return chart;
}
Page({
  data: {
    ec: {
      onInit: initChart
    }
  },
  onReady() {
  }
});
