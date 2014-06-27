(function () {
    "use strict";

    /**
     * @param $scope
     * @param {AlertService} alertService
     * @param {ProductService} productService
     * @constructor
     */
    function ChangeProductController($scope, alertService, productService) {
        productService.getProducts().then(function (products) {
            $scope.products = products;
        });

        $scope.edit = function (product) {
            $scope.product = product;
        };

        $scope.change = function () {
            productService.changeProduct($scope.product);

            $scope.product = null;

            alertService.show('Produkt geändert', 'Das Produkt wurde erfolgreich geändert.');
        };

        $scope.cancel = function () {
            $scope.product = null;
        };
    }

    app.module.controller('changeProductController', ChangeProductController);
})();
