import * as echarts from '../../ec-canvas/echarts';
const app = getApp();
function initChart(canvas, width, height) {
  const chart = echarts.init(canvas,null,{
    width:width,
    height:height
  });
  canvas.setChart(chart);

  var data = [];
  var value = Math.random()*1000;
  var now = +new Date();

  function initdata(){
    now = new Date(+now+1000);
    value = value+Math.random()*21-10;
    return {
      name: now.toString(),
      value:[
        now,
        Math.round(value)
      ]
    };
  }
  for(var i=1;i<=10;i++){
    data.push(initdata());
  }
  var option = {
    title: {
      text: '动态数据 + 时间坐标轴'
  },
   grid: {  
    left: '3%',  
    right: '4%',  
    bottom: '3%',  
    containLabel: true  
},
  tooltip: {
    trigger: 'axis',
    borderWidth:5,
    formatter: function (params) {
        params = params[0];
        var date = new Date(params.name);
        return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + '----' + params.value[1];
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
    axisLabel:{
      rotate:90
    },
    splitNumber:12
},
yAxis: {
    type: 'value',
    boundaryGap: [0, '100%'],
    splitLine: {
        show: false
    }
},
series: [
  {
  name: '模拟数据',
  type: 'line',
  lineStyle: {
    normal: {
      color: "#2B68D4", // 线条颜色
    },
  },
  data: data
  }
]};
setInterval(function(){
  var data1 = data.shift();
  console.log(data1.name+data1.value[1]);
  data.push(initdata())
  chart.setOption({
    series:[{
      data:data
    }]
  });
},2000);
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
