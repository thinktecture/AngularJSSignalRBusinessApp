(function () {
    "use strict";

    /**
     * @param $scope
     * @param {AlertService} alertService
     * @param {ProductService} productService
     * @constructor
     */
    function AddProductController($scope, alertService, productService) {
        $scope.add = function () {
            productService.addProduct($scope.product);

            $scope.product = null;

            alertService.show('Produkt hinzugefügt', 'Das Produkt wurde erfolgreich gespeichert.');
        };
    }

    app.module.controller('addProductController', AddProductController);
})();
