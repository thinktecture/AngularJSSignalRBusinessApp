(function () {
    "use strict";

    /**
     * @param $scope
     * @param $location
     * @param {BillingService} billingService
     * @param {ProductService} productService
     * @constructor
     */
    function CashierController($scope, $location, billingService, productService) {
        $scope.bon = function () {
            $location.path('/bon');
        };
    }

    app.module.controller('cashierController', CashierController);
})();
