(function () {
    "use strict";

    /**
     * @param $scope
     * @param {AlertService} alertService
     * @param {ProductService} productService
     * @constructor
     */
    function ChangeProductController($scope, alertService, productService) {
        function productSorter(a, b) {
            var aname = a.name.toLowerCase(), bname = b.name.toLowerCase();

            if (aname === bname) {
                return 0;
            }

            return aname > bname ? 1 : -1;
        }

        productService.getProducts().then(function (products) {
            $scope.products = products;
            $scope.products.sort(productSorter);
        });

        $scope.$on(productService.$productChanged, function (event, product) {
            for (var i = 0; i < $scope.products.length; i++) {
                var item = $scope.products[i];
                if (item.id === product.id) {
                    angular.extend(item, product);
                    $scope.products.sort(productSorter);
                    break;
                }
            }
        });

        $scope.edit = function (product) {
            $scope.product = angular.copy(product);
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
