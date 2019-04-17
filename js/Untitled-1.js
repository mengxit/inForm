
        var options = {
            chart: {
                height: 350,
                type: 'bar',
                stacked: true,
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                },
                
            },
            stroke: {
                width: 1,
                colors: ['#fff']
            },
            series: [{
                name: 'Current Income',
                data: [44]
            },{
                name: 'Additional Income',
                data: [53]
            }],
            title: {
                text: 'Total Income Test'
            },
            xaxis: {
                categories: ["Income"],
                labels: {
                    formatter: function(val) {
                        return "$" + val 
                    }
                }
            },
            yaxis: {
                title: {
                    text: undefined
                },
                
            },
            tooltip: {
                y: {
                    formatter: function(val) {
                    return val + "K"
                }
                }
            },
            fill: {
                opacity: 1
                
            },
            
            legend: {
                position: 'top',
                horizontalAlign: 'left',
                offsetX: 40
            }
        }

       var chart = new ApexCharts(
            document.querySelector("#chart"),
            options
        );
        
        chart.render();
    