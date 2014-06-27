(function () {
    "use strict";

    /**
     * @param $scope
     * @param {AlertService} alertService
     * @param {ProductService} productService
     * @constructor
     */
    function ChangeProductController($scope, alertService, productService) {
        $scope.product = {};

        $scope.change = function () {
            productService.changeProduct($scope.product);

            $scope.product = {};

            alertService.show('Produkt geändert', 'Das Produkt wurde erfolgreich geändert.');
        };
    }

    app.module.controller('changeProductController', ChangeProductController);
})();
