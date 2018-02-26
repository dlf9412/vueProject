export default {
    title: {
        text: '每两秒数据变化',
        subtext: '纯属虚构'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        }
    },
    toolbox: {
        show: false,
        feature: {
            // saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: []
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            formatter: '{value} °C'
        },
        axisPointer: {
            snap: true
        }
    },
    visualMap: {
        show: false,
        dimension: 0,
        pieces: [{
            lte: 6,
            color: 'green'
        }, {
            gt: 6,
            lte: 8,
            color: 'green'
        }, {
            gt: 8,
            lte: 14,
            color: 'green'
        }, {
            gt: 14,
            lte: 17,
            color: 'green'
        }, {
            gt: 17,
            color: 'green'
        }]
    },
    series: [{
        name: '用电量',
        type: 'line',
        smooth: true,
        data: [],
        markArea: {
            data: [
                [{
                    name: '最高数值',
                    yAxis: 1000
                }, {
                    yAxis: 999
                }],
                [{
                    name: '最低数值',
                    yAxis: 0
                }, {
                    yAxis: 0
                }]
            ]
        }
    }]
}