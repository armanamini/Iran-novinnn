import { useEffect } from "react";
import * as echarts from "echarts";

const EChartsComponent = ({ chartData  }) => {
  useEffect(() => {
    const chartDom = document.getElementById("main");
    const myChart = echarts.init(chartDom);

    if (chartData  && chartData.items) {
      const reportDates = [];
      const values = [];

      JSON.parse(chartData?.items).forEach((item) => {
        JSON.parse(item.fields)?.forEach((field) => {
          if (field.is_report === 2) {
            reportDates.push(field.report_date);
            values.push(Number(field.value));
          }
        });
      });

      const option = {
        xAxis: {
          type: "category",
          data: reportDates,
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: (value) => {
              if (value >= 1000) {
                return (
                  (value / 1000).toLocaleString("en-US", {
                    maximumFractionDigits: 1,
                  }) + "k"
                );
              }
              return value.toLocaleString("en-US");
            },
          },
        },
        graphic: [
          {
            type: "rect",
            left: "center",
            top: "10%", // Adjust the top position as needed
            z: -1,
            shape: {
              width: "80%", // Adjust the width as needed
              height: 30,
            },
            style: {
              fill: {
                type: "linear",
                colorStops: [
                  { offset: 0, color: "rgba(0, 255, 255, 1)" },
                  { offset: 1, color: "transparent" },
                ],
              },
            },
          },
        ],
        tooltip: {
          trigger: "axis",
          formatter: "{b}: {c}",
        },
        series: [
          {
            data: values,
            type: "line",
            smooth: true,
          },
        ],
      };

      option && myChart.setOption(option);
    }

    return () => {
      myChart.dispose();
    };
  }, [chartData]);

  return <div id="main" style={{ width: "100%", height: "500px" }}></div>;
};

export default EChartsComponent;
