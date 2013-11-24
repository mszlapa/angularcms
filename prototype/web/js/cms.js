var app = angular.module('cmsApp', []);

//This configures the routes and associates each route with a view and a controller
app.config(function ($routeProvider) {
    $routeProvider
        //Define a route that has a route parameter in it (:customerID)
        .when('/page/:pageName',
            {
                controller: 'PageController',
                templateUrl: '/content/partials/bootstrapPage.html'  // change to inline template ?
            })

        .otherwise({ redirectTo: '/page/home' });
});


app.controller('PageController',function ($scope, $routeParams, $http) {
    $scope.objectName = $routeParams.pageName;
});



// renders an instance of cms object based on the template and dat a
app.directive('cmsObject', function ($compile) {


    // todo #1 read object type e.g. page  and id e.g. home from attributes of the directive
    // todo #2 refactor cms access to cmsService
    // todo #3 check/improve performance of cmsService if need be pre-caching data and templates

    var controller = function ($scope, $http) {
        //define function with fetches definition of the piece of cms content from backend
        $scope.fetchContent = function (url) {
            $http.get(url).then(function (result) {
                // we expose cmsData from object definition
                $scope.cmsData = result.data.cmsData;
                console.log('Fetched data for ' + result.data.type + '#'+ result.data.id);
            });
        }
    };

    return {
        restrict: "E",
        replace: true,
        templateUrl: '/content/type/page/template.html',            //todo construct dynamically
        scope: {
            content:'='
        },
        controller: controller,
        link: function(scope, iElement, iAttrs, ctrl) {
            scope.fetchContent('content/instance/page/home.json');  //todo construct dynamically
        }
    };
});
