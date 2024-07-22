import React, { useContext, useEffect, useState, useRef } from 'react';
import ReactEcharts from 'echarts-for-react';
import { store } from '../store';

function Data_SQ_SD_BMI() {
    const [option, setOption] = useState({});
    const [isFullscreen, setIsFullscreen] = useState(false);
    const chartRef = useRef(null);

    useEffect(() => {
        fetch('./data_SQ_SD_BMI.json')
            .then(response => response.json())
            .then(data => {
                const chartOption = {
                    title: {
                        text: 'Dispersion of Sleep and BMI',
                        left: 'center',
                        top: 0
                    },
                    visualMap: {
                        type: 'piecewise',
                        categories: ['Obese', 'Overweight', 'Normal'],
                        inRange: {
                            color: ['#ff9999', '#99ffff', '#99ff99'] // 红 蓝 绿
                        },
                        dimension: 2,
                        orient: 'vertical',
                        right: 10,
                        top: 'center',
                        text: ['HIGH', 'LOW'],
                        calculable: true
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: function(params) {
                            return `Sleep Duration: ${params.value[0]}<br/>
                                Quality of Sleep: ${params.value[1]}<br/>
                                BMI Category: ${params.value[2]}`;
                        }
                    },
                    xAxis: [{
                        type: 'value',
                        name: 'Sleep Duration',
                        min: 5.5
                    }],
                    yAxis: [{
                        type: 'value',
                        name: 'Quality of Sleep',
                        min: 3.5
                    }],
                    series: [{
                        name: 'BMI',
                        type: 'scatter',
                        symbolSize: 20,
                        data: data
                    }]
                };

                setOption(chartOption);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleChartClick = () => {
        setIsFullscreen(true);
    };

    const handleMaskClick = (e) => {
        // 如果点击的位置在右侧 100 像素范围内，则不取消全屏
        if (e.clientX < window.innerWidth - 100) {
            setIsFullscreen(false);
        }
    };

    return (
        <div>
            <p>Dispersion of Sleep and BMI</p>
            <div onClick={handleChartClick}>
                <ReactEcharts
                    ref={chartRef}
                    option={option}
                    style={{ width: '100%', height: '400px' }}
                />
            </div>
            {isFullscreen && (
				// 点击时加一个全屏遮罩
                <div className="fullscreen-mask" onClick={handleMaskClick}>
                    <ReactEcharts
                        ref={chartRef}
                        option={option}
                        style={{ width: '99vw', height: '100vh' }}	// 留一点边缘，防止超出屏幕
                    />
                </div>
            )}
        </div>
    );
}

export default Data_SQ_SD_BMI;
