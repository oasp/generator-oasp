angular.module('<%- props.appName %>', ['ngRoute',  '<%- props.appName %>.main', '<%- props.appName %>.component1', '<%- props.appName %>.component2'])
    .config(function ($locationProvider) {
        'use strict';
        $locationProvider.html5Mode(false);
    });
