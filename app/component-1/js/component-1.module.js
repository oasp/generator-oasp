angular.module('app.component1', ['ngRoute'])
    .config(function ($routeProvider) {
        'use strict';
        $routeProvider.when('/component-1/dialog-a', {templateUrl: 'component-1/html/dialog-a.html'});
    });


