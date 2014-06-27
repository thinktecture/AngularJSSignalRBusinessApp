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

        $scope.entries = [];

        $scope.$on(billingService.$entryAdded, function (event, id, productId, count, price) {
            var product = products[productId] || { name: 'Sonderposition' };

            $scope.entries.push({ id: id, text: product.name, count: count, price: price, sum: count * price });

            if ($scope.entries.length > 20) {
                $scope.entries.pop();
            }
        });

        $scope.$on(billingService.$entryChanged, function (event, id, productId, count, price) {
            var product = products[productId] || { name: 'Sonderposition' };

            for (var i = 0; i < $scope.entries.length; i++) {
                var entry = $scope.entries[i];
                if (entry.id === id) {
                    angular.extend(entry, { text: product.name, count: count, price: price, sum: count * price });
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
