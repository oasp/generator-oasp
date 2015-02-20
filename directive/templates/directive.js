angular.module('<%= moduleName %>')
  .directive('<%= directiveName %>', function () {
    'use strict';
    return {
      restrict: 'E',
      link: function ($scope, $element, $attr) {

      }
    };
  });
