import * as echarts from '../../ec-canvas/echarts';
const app = getApp();
function initChart(canvas, width, height) {
  const chart = echarts.init(canvas,null,{
    width:width,
    height:height
  });
  canvas.setChart(chart);

  var data1 = [];
  var data2 = [];
  var date = [];
  var value = Math.random()*1000;
  var value2 = Math.random()*500;
  var now = +new Date();

  function initdata(i){
    for(var j = 0;j<i;j++){
    now = new Date(+now+1000);
    value = Math.round(value+Math.random()*21-10);
    value2 = Math.round(value2+Math.random()*21-5);
    var time = now.getHours()+':'+now.getMinutes()+':'+now.getSeconds();
    data1.push(value);
    data2.push(value2);
    date.push(time);
    }
  }
  initdata(10);
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
    trigger: 'axis'
  },
  xAxis: {
    type: 'category',
    splitLine: {
        show: false
    },
    axisLabel:{
      rotate:90
    },
    splitNumber:10,
    data:date
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
  name: '空气质量',
  type: 'line',
  lineStyle: {
    normal: {
      color: "#2B68D4", // 线条颜色
    },
  },
  data: data1
  },
  {
    name:'CO2',
    type:'line',
    lineStyle:{
      normal: {
        color: "#2B68D4", // 线条颜色
      },
    },
    data:data2
  }
]};
setInterval(function(){
  var a = date.shift();
  var b = data1.shift();
  var c = data2.shift();
  console.log(a+"  "+b+"   "+c);
  initdata(1);
  chart.setOption({
    series:[{
      name:'空气质量',
      data:data1
    },
  {
    name:'CO2',
    data:data2
  }],
  xAxis:{
    data:date
  }
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
