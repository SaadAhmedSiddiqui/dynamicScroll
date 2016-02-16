(function () {
    "use strict";

    var exampleApp = angular.module('exampleApp', ['dynamicScroll']);

    exampleApp
        .controller('ListCtrl', function($scope){
            $scope.list = data;
        });

})();