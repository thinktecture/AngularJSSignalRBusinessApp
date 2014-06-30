(function () {
    "use strict";

    /**
     * @param $scope
     * @param $location
     * @param {BillingService} billingService
     * @param {ProductService} productService
     * @constructor
     */
    function AccountantController($scope, $location, billingService, productService) {
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
