angular.module('<%- props.appName %>.component2', ['ngRoute', '<%- props.appName %>.component2.templates'])
    .config(function ($routeProvider) {
        'use strict';
        $routeProvider.when('/component-2/dialog-b', {templateUrl: 'component-2/dialog-b/dialog-b.html'});
    });
