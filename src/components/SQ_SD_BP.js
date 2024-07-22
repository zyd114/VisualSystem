import React, { useContext, useEffect, useState } from 'react';
import ReactEcharts from 'echarts-for-react';

import { store } from '../store';

function Data_SQ_SD_BP() {
    const [option, setOption] = useState({});

    useEffect(() => {
        fetch('./data_SQ_SD_BP.json')
            .then(response => response.json())
            .then(data => {
                // 配置 ECharts 的选项
                const chartOption = {
                  title: {
                    text: 'Dispersion of Sleep and Blood Pressure',
                    left: 'center',
                    top: 0
                  },
                  visualMap: [
                    {   // 最低血压
                        type: 'continuous',
                        min: 50,
                        max: 100,
                        dimension: 3,
                        orient: 'vertical',
                        right: 100,
                        top: 'center',
                        text: ['LOW', 'HIGH'],
                        calculable: true,
                        inRange: {
                            color: ['#FFF200', '#ED1C24']   // 黄 红
                        }
                    },
                    {   // 最高血压
                        type: 'continuous',
                        min: 100,
                        max: 150,
                        dimension: 2,
                        orient: 'vertical',
                        right: 10,
                        top: 'center',
                        text: ['HIGH', 'LOW'],
                        calculable: true,
                        inRange: {
                            color: ['#FFF200', '#ED1C24']   // 黄 红
                        }
                    }
                  ],
                  tooltip: {
                    trigger: 'item',
                    formatter: function (params) {
                        // params.data[2] 为第三项
                        return `Sleep Duration: ${params.value[0]}<br/>
                                Quality of Sleep: ${params.value[1]}<br/>
                                BMI Category: ${params.value[2]}`;
                    }
                    // axisPointer: {
                    //     type: 'cross'
                    // }
                  },
                  xAxis: [
                    {
                      type: 'value',
                      name: 'Sleep Duration',
                      min: 5.5,
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
                      name: 'Blood Pressure',
                      type: 'scatter',
                      symbolSize: 20,
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
            <p>Dispersion of Sleep and Blood Pressure</p>
            <ReactEcharts option={option} />
        </div>
    );
}

export default Data_SQ_SD_BP;