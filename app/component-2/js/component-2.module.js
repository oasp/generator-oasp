angular.module('app.component2', ['ngRoute', 'app.component-2.templates'])
    .config(function ($routeProvider) {
        'use strict';
        $routeProvider.when('/component-2/dialog-b', {templateUrl: 'component-2/html/dialog-b.html'});
    });
