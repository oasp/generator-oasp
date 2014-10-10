angular.module('app.main', ['ngRoute', 'oasp.templates'])
    .config(function ($routeProvider) {
        'use strict';
        $routeProvider
            .when('/', {redirectTo: '/main/welcome'})
            .when('/main/welcome', {templateUrl: 'html/main/welcome.html'})
            .otherwise({templateUrl: 'html/main/page-not-found.html'});
    });