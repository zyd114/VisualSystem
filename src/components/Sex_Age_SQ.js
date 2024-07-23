import React, { useContext, useEffect, useState, useRef } from 'react';
import ReactEcharts from 'echarts-for-react';
import { store } from '../store';

function Data_Sex_Age_SQ() {
    const [option, setOption] = useState({});
    const [isFullscreen, setIsFullscreen] = useState(false);
    const chartRef = useRef(null);

    useEffect(() => {
        fetch('./data_Sex_Age_SQ_SD.json')
            .then(response => response.json())
            .then(data => {
                const Data = {
                    Male: [],
                    Female: []
                };
                // 分类数据
                data.forEach(entry => {
                    const [gender, age, sleepQuality, sleepDuration] = entry;
                    if (Data[gender]) {
                        Data[gender].push({ age, sleepQuality });
                    }
                });
                // 提取年龄信息并去重排序
                const ages = [...new Set(data.map(entry => entry[1]))].sort((a, b) => a - b);

                // 计算每个年龄的平均睡眠时长
                const maleData = ages.map(age => {
                    // 获取所有该年龄的男性数据
                    const entries = Data.Male.filter(d => d.age === age);
                    // 计算平均值
                    if (entries.length > 0) {
                        const totalSQ = entries.reduce((sum, entry) => sum + parseFloat(entry.sleepQuality), 0);
                        const avgSQ = totalSQ / entries.length;
                        return parseFloat(avgSQ.toFixed(2));    // 保留两位小数
                    }
                    // 如果没有数据，返回 0
                    return 0;
                });
                // 同样处理
                const femaleData = ages.map(age => {
                    const entries = Data.Female.filter(d => d.age === age);
                    if(entries.length > 0) {
                        const totalSQ = entries.reduce((sum, entry) => sum + parseFloat(entry.sleepQuality), 0);
                        const avgSQ = totalSQ / entries.length;
                        return parseFloat(avgSQ.toFixed(2));
                    }
                    return 0;
                });

                const chartOption = {
                    title: {
                        text: 'Gender, Age, and AverageSleep Quality',
                        left: 'center',
                        top: 0
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    legend: {
                        data: ['Male', 'Female'],
                        right: 10,
                        bottom: 'center',
                        orient: 'vertical'
                    },
                    xAxis: {
                        type: 'category',
                        data: ages
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: 'Male',
                            type: 'bar',
                            data: maleData,
                            itemStyle: {
                                color: '#5470c6'
                            }
                        },
                        {
                            name: 'Female',
                            type: 'bar',
                            data: femaleData,
                            itemStyle: {
                                color: '#91cc75'
                            }
                        }
                    ]
                };

                setOption(chartOption);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleChartClick = (e) => {
        // 如果点击的位置在右侧 100 像素范围内，则不全屏
        if (e.clientX < window.innerWidth - 100) {
            setIsFullscreen(true);
        }
    };

    const handleMaskClick = (e) => {
        // 如果点击的位置在右侧 100 像素范围内，则不取消全屏
        if (e.clientX < window.innerWidth - 100) {
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
                <div className="fullscreen-mask" onClick={handleMaskClick}>
                    <ReactEcharts
                        ref={chartRef}
                        option={option}
                        theme="dark"
                        style={{ width: '99vw', height: '100vh' }}
                    />
                </div>
            )}
        </div>
    );
}

export default Data_Sex_Age_SQ;