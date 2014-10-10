angular.module('app.component1', ['app.main'])
    .config(function ($routeProvider) {
        'use strict';
        $routeProvider.when('/component-1/dialog-a', {templateUrl: 'html/component-1/dialog-a.html'});
    });


