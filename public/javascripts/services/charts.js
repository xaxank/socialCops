
app.service("ChartService",function(){
	var factObj = {
		links:[],
		chartConfig:{}
	};

	factObj.pieChartConfig = {
		options :{
		    chart: {
		        type: 'pie',
		        options3d: {
		            enabled: true,
		            alpha: 45
		        },
                width:700,
                height:600,
                backgroundColor:'transparent'
		    },
		    plotOptions: {
		        pie: {
		            innerSize: 100,
		            depth: 45
		        }
		    }
		},
	    title: {
	        text: '',
            style:{
                color: '#Fff'
	       }
        },
	    subtitle: {
	        text: ''
	    },
	    series: []
	};

    factObj.negBarConfig = {    
        options:{
            chart: {
                type: 'column'
            },
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: []
        },
        credits: {
            enabled: false
        },
        series: []
    }

	factObj.chartConfig = {
        options:{
        	chart: {
	            type: 'column',
                zoomType: 'xy'
	        }, 
	        plotOptions: {
	            column: {
	                stacking: 'normal',
	                dataLabels: {
	                    enabled: false,
	                    style: {
	                        textShadow: '0 0 3px black'
	                    }
	                }
	            }
	        },
            tooltip: {
                headerFormat: '<b>{point.x}</b><br/>',
                pointFormat: '{series.name}: {point.y}<br/>'
            },
	        colors: ["#4376a2","#c54a0f","#44aa11","#41aaee"],
            yAxis: {
                min: 0
            }
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: [],
            crosshair: true
        },
        yAxis: {
            min: 0
        },
        legend: {
            align: 'right',
            x: -30,
            verticalAlign: 'top',
            y: 25,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        series: []
    };

    return factObj;
});
