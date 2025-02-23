import React, { useContext, useEffect, useState, useRef } from 'react';
import ReactEcharts from 'echarts-for-react';

import { store } from '../store';

function Data_SQ_SD_BP() {
	const [option, setOption] = useState({});
    const [isFullscreen, setIsFullscreen] = useState(false);
    const chartRef = useRef(null);

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
					visualMap: [{ // 最低血压
						type: 'continuous',
						min: 75,
						max: 100,
						dimension: 3,
						orient: 'vertical',
						right: 100,
						top: 'center',
						text: ['HIGH', 'LOW'],
						calculable: true,
						inRange: {
							color: ['#FFF200', '#ED1C24'] // 黄 红
						}
					},
					{ // 最高血压
						type: 'continuous',
						min: 115,
						max: 150,
						dimension: 2,
						orient: 'vertical',
						right: 10,
						top: 'center',
						text: ['HIGH', 'LOW'],
						calculable: true,
						inRange: {
							color: ['#FFF200', '#ED1C24'] // 黄 红
						}
					}],
					tooltip: {
						trigger: 'item',
						formatter: function(params) {
							return `Sleep Duration: ${params.value[0]}<br/>
                                Quality of Sleep: ${params.value[1]}<br/>
                                Highest Pressure: ${params.value[2]}<br/>
                                Lowest Pressure: ${params.value[3]}`;
						}
						// axisPointer: {
						//     type: 'cross'
						// }
					},
					xAxis: [{
						type: 'value',
						name: 'Sleep Duration',
						min: 5.5,
					}],
					yAxis: [{
						type: 'value',
						name: 'Quality of Sleep',
						min: 3.5
					}],
					series: [{
						name: 'Blood Pressure',
						type: 'scatter',
						symbolSize: 20,
						data: data
					}]
				};

				setOption(chartOption);
			})
			.catch(error => console.error('Error fetching data:', error));
	}, []);

    const handleChartClick = (e) => {
        // 如果点击的位置在右侧 150 像素范围内，则不全屏
        if (e.clientX < window.innerWidth - 150) {
            setIsFullscreen(true);
        }
    };

    const handleMaskClick = (e) => {
        // 如果点击的位置在右侧 150 像素范围内，则不取消全屏
        if (e.clientX < window.innerWidth - 150) {
            setIsFullscreen(false);
        }
    };

	return (
		<div>
            <div onClick={handleChartClick}>
                <ReactEcharts
                    ref={chartRef}
                    option={option}
					theme="dark"
                    style={{ width: '100%', height: '400px' }}
                />
            </div>
            {isFullscreen && (
				// 点击时加一个全屏遮罩
                <div className="fullscreen-mask" onClick={handleMaskClick}>
                    <ReactEcharts
                        ref={chartRef}
                        option={option}
						theme="dark"
                        style={{ width: '99vw', height: '100vh' }}	// 留一点边缘，防止超出屏幕
                    />
                </div>
            )}
        </div>
	);
}

export default Data_SQ_SD_BP;