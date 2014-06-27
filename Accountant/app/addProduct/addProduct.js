(function () {
    "use strict";

    /**
     * @param $scope
     * @param {AlertService} alertService
     * @param {ProductService} productService
     * @constructor
     */
    function AddProductController($scope, alertService, productService) {
        $scope.product = {};

        $scope.add = function () {
            productService.addProduct($scope.product);

            $scope.product = {};

            alertService.show('Produkt hinzugefügt', 'Das Produkt wurde erfolgreich gespeichert.');
        };
    }

    app.module.controller('addProductController', AddProductController);
})();
