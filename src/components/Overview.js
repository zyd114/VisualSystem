import React, { useContext } from 'react';
import ReactEcharts from 'echarts-for-react';

import { store } from '../store';

function getOption() {
    const data = [
        [
            "6.1",
            "6",
            "Overweight"
        ],
        [
            "8.1",
            "9",
            "Overweight"
        ]
    ]

    return {
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
              // axisLine: { onZero: false },
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
}

function Overview() {
    const { state, dispatch } = useContext(store);

    return (
        <div>
            <p>Overview</p>
            <ReactEcharts option={getOption()} />
        </div>
    );
}

export default Overview;
