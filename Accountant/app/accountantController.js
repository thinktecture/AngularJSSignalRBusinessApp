(function () {
    "use strict";

    /**
     * @param $scope
     * @param $location
     * @param {BillingService} billingService
     * @constructor
     */
    function AccountantController($scope, $location, billingService) {
        $scope.addProduct = function () {
            $location.path('/addProduct');
        };

        $scope.changeProduct = function () {
            $location.path('/changeProduct');
        };

        $scope.live = function () {
            $location.path('/live');
        };

        billingService.registerAccountant();
    }

    app.module.controller('accountantController', AccountantController);
})();
