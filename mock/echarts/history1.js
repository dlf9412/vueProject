export default {
    title: {
        text: ''
    },
    tooltip: {
        trigger: 'axis'
    },
    xAxis: {
        data: []
    },
    yAxis: {
        splitLine: {
            show: false
        }
    },
    toolbox: {
        left: 'center',
        feature: {
            // dataZoom: {
            //     yAxisIndex: 'none'
            // },
            // restore: {},
            // saveAsImage: {}
        }
    },
    dataZoom: [{
        show: true
            // startValue: '2014-06-01'
    }, {
        type: 'inside'
    }],
    visualMap: {
        show: false,
        top: 10,
        right: 10,
        pieces: [{
            gt: 0,
            lte: 200,
            color: '#096'
        }, {
            gt: 200,
            lte: 400,
            color: '#ffde33'
        }, {
            gt: 400,
            lte: 600,
            color: '#ff9933'
        }, {
            gt: 600,
            lte: 800,
            color: '#cc0033'
        }, {
            gt: 800,
            lte: 1000,
            color: '#660099'
        }, {
            gt: 1000,
            color: '#7e0023'
        }],
        outOfRange: {
            color: '#999'
        }
    },
    series: {
        name: 'Beijing AQI',
        type: 'line',
        data: [],
        markLine: {
            silent: true,
            data: [{
                yAxis: 200
            }, {
                yAxis: 400
            }, {
                yAxis: 600
            }, {
                yAxis: 800
            }, {
                yAxis: 1000
            }]
        }
    }
}