angular.module('app.component2', ['app.main'])
    .config(function ($routeProvider) {
        'use strict';
        $routeProvider.when('/component-2/dialog-b', {templateUrl: 'html/component-2/dialog-b.html'});
    });
