angular.module('starter.services', [])
    .factory('APIServices', function($http, $q) {
        
        var urlOptions = {
            baseURL : "/cricket/services/"
        }

        return ({
            getBaseStats: getBaseStats,
            getVsStats: getVsStats,
            getCareerGraph: getCareerGraph,
        });

        function convertTextToLocaleString(val) {
            return val.toLocaleString();
        }

        function getBaseStats(params) {
            var request = createRequest("post","getbasestats",params);
            return (request.then(handleSuccess, handleError));
        }

        function getCareerGraph(params) {
            console.log('sd')
            var request = createRequest("post","getcareergraph",params);
            return (request.then(handleSuccess, handleError));
        }

        function getVsStats(params) {
            var request = createRequest("post","getvsstats",params);
            return (request.then(handleSuccess, handleError));
        }

        function createRequest(method,endPoint,params) {
            return $http({
                method: method,
                url: urlOptions.baseURL + endPoint +"/",
                data: JSON.stringify(params)
            });
        }

        function handleError(response) {
            // The API response from the server should be returned in a
            // nomralized format. However, if the request was not handled by the
            // server (or what not handles properly - ex. server error), then we
            // may have to normalize it on our end, as best we can.
            if (!angular.isObject(response.data) ||
                !response.data.message
            ) {
                return ($q.reject("An unknown error occurred."));
            }
            // Otherwise, use expected error message.
            return ($q.reject(response.data.message));
        }

        function handleSuccess(response) {
            return response;
        }
    });
