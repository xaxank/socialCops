var app = angular.module("cricket", ["ui.router","chart.js", "highcharts-ng","initializeBindings","starter.services"]);
app.config(["$stateProvider", "$urlRouterProvider", 
	function($stateProvider, $urlRouterProvider){
		$stateProvider
			.state(
			"home", {
				url:"/home",
				templateUrl:"/home.html",
                    controller:"home",
                    resolve:{
                        promise: ["HomeService", function(HomeService){ 
                            return HomeService.getBaseStats();	
                        }],
                        promise1: ["HomeService", function(HomeService){ 
                            return HomeService.getCareerGraph();	
                        }]
                    }
			});
			
		$urlRouterProvider.otherwise("home");
	}
]);
