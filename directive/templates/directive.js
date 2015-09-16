angular.module('<%= targetModuleName %>')
  .directive('<%= directiveName %>', function () {
    'use strict';
    return {
      restrict: 'E',
      link: function ($scope, $element, $attr) {

      }
    };
  });
