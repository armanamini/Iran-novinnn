import { useEffect } from "react";
import * as echarts from 'echarts';
const EChartsComponent = ({ data }) => {
  useEffect(() => {
    const chartDom = document.getElementById('main');
    const myChart = echarts.init(chartDom);

    const dateList = data?.map(() => {
      // Generate a random date between 2000-06-05 and 2000-07-24
      const startDate = new Date('2000-06-05');
      const endDate = new Date('2000-07-24');
      const randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
      return randomDate.toLocaleDateString();
    });

    const valueList = data?.map((item) => item.price);

    const option = {
      // Make gradient line here
      visualMap: [
        {
          show: false,
          type: 'continuous',
          seriesIndex: 0,
          min: valueList ? Math.min(...valueList) : 0,
          max: valueList ? Math.max(...valueList) : 0,
        },
       
      ],
      title: [
        {
          left: 'center',
          text: 'Gradient along the y axis',
        },
        
      ],
      tooltip: {
        trigger: 'axis',
      },
      xAxis: [
        {
          data: dateList,
        },
       
      ],
      yAxis: [
        {},
        
      ],
      grid: [
        {
          bottom: '12%',
        },
        {
          top: '60%',
        },
      ],
      series: [
        {
          type: 'line',
          showSymbol: false,
          data: valueList,
        },
      
      ],
    };

    option && myChart.setOption(option);

    // Clean up the chart on component unmount
    return () => {
      myChart.dispose();
    };
  }, [data]);

  return <div id="main" style={{ width: '100%', height: '500px' }}></div>;
};


export default EChartsComponent;

