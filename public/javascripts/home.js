app.factory("HomeService", ["$http","APIServices","ChartService",function($http, APIServices, ChartService){
    var factObj = {
        baseStats :[],
        baseStatsDetailed :[],
        vsTeam:[],
        baseCount: 0,
        CareerGraphCat: [],
        CareerGraphData: []
    };

    factObj.getBaseStats = function() {
    	APIServices.getVsStats().then(function(response){
    		// angular.copy(response.data,factObj.baseStats);
    		factObj.baseCount = response.data.length;

    		factObj.vsTeam = [];

    		angular.forEach(response.data,function(val,index){
    			factObj.baseStats.push([index,val.win+val.loss]);
    			factObj.vsTeam.push(index);
    			factObj.baseStatsDetailed.push(['W',val.win]);
    			factObj.baseStatsDetailed.push(['L',val.loss]);
    		});

    		// console.log(factObj.baseStats)

    		factObj.pieVSChart = ChartService.pieChartConfig;
    	});
    }

    factObj.getCareerGraph = function () {
    	APIServices.getCareerGraph().then(function(response){
    		// console.log(response.data)

    		var mult = {
    			won:1,
    			lost:-1,
    		}

    		response.data.sort(function(a,b) { return new Date(a.date) - new Date(b.date)})

    		angular.forEach(response.data ,function (val,index){
    			
    			factObj.CareerGraphCat.push(val.date) 
    			factObj.CareerGraphData.push(mult[val.match_result] * val.batting_score); 

    		});

    		// console.log()

    	});
    }

    


    factObj.keyWiseSort = function() {

    }

    return factObj;
}]);

app.controller("home", ["$scope", "HomeService", "ChartService", function($scope, HomeService, ChartService){

	// $scope.baseCount = HomeService.baseCount;
	$scope.chartConfig = ChartService.pieChartConfig;

	$scope.chartConfig.series = [{
			        name: 'Matches Played',
			        size: '100%',
			        innerSize: '60%',
			        data: HomeService.baseStatsDetailed
			    },{
			        name: 'total Played',
			        size: '40%',
			        innerSize:"0%",
			        data: HomeService.baseStats
			    }];
    $scope.chartConfig.title.text = "Vs country graph";


	$scope.chart2Config = ChartService.negBarConfig;
    $scope.chart2Config.title.text = "career graph";
    $scope.chart2Config.xAxis.categories = HomeService.CareerGraphCat;
    $scope.chart2Config.series = [{ name:"sachin", data:HomeService.CareerGraphData}];
		    

}]);