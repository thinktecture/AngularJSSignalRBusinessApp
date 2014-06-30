(function () {
    "use strict";

    /**
     * @param $scope
     * @constructor
     * @param {ProductService} productService
     * @param {BillingService} billingService
     */
    function LiveController($scope, productService, billingService) {
        var products = {};

        productService.getProducts().then(function (items) {
            angular.forEach(items, function (product) {
                products[product.id] = product;
            });
        });

        $scope.$on(productService.$productAdded, function (event, product) {
            products[product.id] = product;
        });

        $scope.$on(productService.$productChanged, function (event, product) {
            angular.extend(products[product.id], product);
        });

        $scope.entries = [];

        $scope.$on(billingService.$entryAdded, function (event, id, productId, count, price) {
            var product = products[productId] || { id: productId, name: 'Unbekanntes Produkt' };

            $scope.entries.push({ id: id, product: product, count: count, price: price, sum: count * price });

            if ($scope.entries.length > 10) {
                $scope.entries.shift();
            }
        });

        $scope.$on(billingService.$entryChanged, function (event, id, productId, count, price) {
            var product = products[productId] || { id: productId, name: 'Unbekanntes Produkt' };

            for (var i = 0; i < $scope.entries.length; i++) {
                var entry = $scope.entries[i];
                if (entry.id === id) {
                    angular.extend(entry, { product: product, count: count, price: price, sum: count * price });
                    break;
                }
            }
        });

        $scope.$on(billingService.$entryRemoved, function (event, id) {
            for (var i = 0; i < $scope.entries.length; i++) {
                if ($scope.entries[i].id === id) {
                    $scope.entries.splice(i, 1);
                    break;
                }
            }
        });
    }

    app.module.controller('liveController', LiveController);
})();
