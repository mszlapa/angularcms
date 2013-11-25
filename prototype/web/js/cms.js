var cmsApp = angular.module('cmsApp', ['ngRoute']);

//This configures the routes and associates each route with a view and a controller
cmsApp.config(function ($routeProvider) {
    $routeProvider
        //Define a route that has a route parameter in it (:customerID)
        .when('/page/:pageName',
            {
                controller: 'PageController',
                template: '<cms-object cms-type="page" cms-id="{{pageName}}"> Loading page ... {{pageName}}</cms-object>'
            })

        .otherwise({ redirectTo: '/page/home' });
});


// this does not really do anything just make pageName available to pageTemplate
cmsApp.controller('PageController',function ($scope, $routeParams, $http) {
    $scope.pageName = $routeParams.pageName;
});



// renders an instance of cms object based on the template and dat a
cmsApp.directive('cmsObject', function () {


    // todo  refactor cms access to cmsService
    // todo test behaviour for recursive cmsobject references
    // todo  check/improve performance of cmsService if need be pre-caching data and templates

    var controller = function ($scope, $http) {
        //define function with fetches definition of the piece of cms content from backend
        $scope.fetchContent = function (url) {
            $http.get(url).then(function (result) {
                // we expose cmsData from object definition
                $scope.cmsData = result.data;
                console.log('Fetched data for ' + $scope.cmsType + '#'+ $scope.cmsId);
            });
        }
    };

    return {
        restrict: "E",
        replace: true,
        templateUrl: function (iElement, iAttrs) {
            return '/content/type/'+iAttrs.cmsType+'/template.html'  //WARN  this might not work if cms-type is dynamic
        },
        //todo validation        require: '@cmsType @cmsId',
        scope: {
            cmsType:'@',
            cmsId:'@'
        },
        controller: controller,
        link: function(scope, iElement, iAttrs, ctrl) {
            scope.fetchContent('content/instance/'+scope.cmsType+'/'+scope.cmsId+'.json');  //todo construct dynamically
        }
    };
});
