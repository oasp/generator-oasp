angular.module('<%- props.appName %>.component1', ['ngRoute','<%- props.appName %>.component1.templates'])
    .config(function ($routeProvider) {
        'use strict';
        $routeProvider.when('/component-1/dialog-a', {templateUrl: 'component-1/dialog-a/dialog-a.html'});
    });


