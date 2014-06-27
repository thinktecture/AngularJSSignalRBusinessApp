(function () {
    "use strict";

    /**
     * @param $scope
     * @param $location
     * @constructor
     */
    function CashierController($scope, $location) {
        $scope.bon = function () {
            $location.path('/bon');
        };
    }

    app.module.controller('cashierController', CashierController);
})();
