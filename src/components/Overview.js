import React, { useContext, useEffect, useState } from 'react';
import ReactEcharts from 'echarts-for-react';

import { store } from '../store';

function Overview() {
    const [option, setOption] = useState({});

    useEffect(() => {
        fetch('./data_SQ_SD_BMI.json')
            .then(response => response.json())
            .then(data => {
                // 配置 ECharts 的选项
                const chartOption = {
                  title: {
                    text: 'Dispersion of sleep and BMI',
                    left: 'center',
                    top: 0
                  },
                  visualMap: {
                    type: 'piecewise',
                    pieces: [
                      { value: 'Normal', label: 'Normal', color: '#ff9999' },
                      { value: 'Overweight', label: 'Overweight', color: '#99ff99' },
                      { value: 'Obese', label: 'Obese', color: '#9999ff' }
                    ],
                    dimension: 2,
                    orient: 'vertical',
                    right: 10,
                    top: 'center',
                    text: ['HIGH', 'LOW'],
                    calculable: true
                  },
                  tooltip: {
                    trigger: 'item'
                    // axisPointer: {
                    //     type: 'cross'
                    // }
                  },
                  xAxis: [
                    {
                      type: 'value',
                      name: 'Sleep Duration',
                      min: 5.5
                    }
                  ],
                  yAxis: [
                    {
                      type: 'value',
                      name: 'Quality of Sleep',
                      min: 3.5
                    }
                  ],
                  series: [
                    {
                      name: 'BMI',
                      type: 'scatter',
                      symbolSize: 10,
                      data: data
                    }
                  ]
                };

                setOption(chartOption);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            <p>Overview</p>
            <ReactEcharts option={option} />
        </div>
    );
}

export default Overview;