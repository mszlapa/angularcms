var app = angular.module('cmsApp', []);

//This configures the routes and associates each route with a view and a controller
app.config(function ($routeProvider) {
    $routeProvider
        //Define a route that has a route parameter in it (:customerID)
        .when('/page/:pageName',
            {
                controller: 'PageController',
                templateUrl: '/content/partials/placeholder.html'
            })

        .otherwise({ redirectTo: '/page/home' });
});


app.controller('PageController',function ($scope, $routeParams, $http) {
    $scope.pageName = $routeParams.pageName;
    $scope.objectName = $routeParams.pageName;


    $scope.objectData = {};

//    todo this has timing issue, lets pretend the data is already there
    $scope.objectData = {
        "id": 1,
        "type": "page",
        "template": "<div > This template for page with title <i>{{cmsData.title}}<i></div>",
        "cmsData": {
            "title": "Hi this is a templated page"
        }

    }
//    $scope.fetchContent = function(url) {
//        $http.get(url).then(function(result){
//            $scope.objectData = result.data;
//            console.log('Fetched '+ $scope.objectData);
//        });
//    }
//
//    $scope.fetchContent('content/instance/page/home.json');
});


app.directive('cmsObject', function ($compile) {

    var linker = function(scope, element, attrs) {

        // todo use isolated scope instead
        var cmsData = scope.$parent.objectData.cmsData;
        var template = scope.$parent.objectData.template;

        scope.cmsData = cmsData;
        element.html(template);

        $compile(element.contents())(scope);
    }

    return {
        restrict: "E",
        replace: true,
        link: linker,
        scope: {
            content:'='
        }
    };
});