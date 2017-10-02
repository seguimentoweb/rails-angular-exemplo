'use strict'

angular
    .module('app', ['ngRoute', 'ngResource'])
    .config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
        let authToken = document.querySelector("meta[name='csrf-token']").getAttribute("content");
        console.log(authToken);
        $httpProvider.defaults.headers.common['X_CSRF_TOKEN'] = authToken;
        $routeProvider
            .when('/', {
                templateUrl: '/templates/home/index.html',
                controller: 'HomeCtrl'
            })
            .when('/product/create', {
                templateUrl: '/templates/product/create.html',
                controller: 'ProductAddCtrl'
            })
            .when('/product', {
                templateUrl: '/templates/product/index.html',
                controller: 'ProductCtrl'
            })
    }])
    .controller('HomeCtrl', ['$scope', 'Home', function($scope, Home) {
        $scope.name = '';

        Home.query().$promise.then(function(data) {
            $scope.name = data;
        })
    }])
    .controller('ProductAddCtrl', ['$scope', 'Product', '$location', function($scope, Product, $location) {
        $scope.create = function(data) {
            Product.create({
                    product: data
                })
                .$promise.then(function(data) {
                    $location.path('/product')
                });
        }
    }])
    .controller('ProductCtrl', ['$scope', 'Product', function($scope, Product) {
        $scope.products = [];

        Product.query().$promise.then(function(data) {
            $scope.products = data;
        })
    }])
    .factory('Product', ['$resource', function($resource) {
        return $resource('/product.json', {}, {
            create: { method: 'POST', isArray: false },
            query: { method: 'GET', isArray: true }
        })
    }])
    .factory('Home', ['$resource', function($resource) {
        return $resource('/hello.json', {}, {
            query: { method: 'GET', isArray: false }
        })
    }])