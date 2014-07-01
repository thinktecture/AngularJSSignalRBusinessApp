(function () {
    "use strict";

    app.module.directive('billNotifier', function ($filter, alertService, productService, billingService) {
        return {
            restrict: 'E',
            link: function (scope, element, attrs) {
                var products = {};

                productService.getProducts().then(function (items) {
                    angular.forEach(items, function (product) {
                        products[product.id] = product;
                    });
                });

                scope.$on(productService.$productAdded, function (event, product) {
                    products[product.id] = product;
                });

                scope.$on(productService.$productChanged, function (event, product) {
                    products[product.id] = product;
                });

                scope.$on(billingService.$entryAdded, function (event, id, productId, count, price) {
                    var turnover = $filter('number')(count * price, 2);

                    var product = products[productId];

                    if (product) {
                        alertService.show('Neuer Umsatz!', '"' + product.name + '" wurde soeben im Gesamtwert von ' + turnover + '€ verkauft.');
                    }
                    else {
                        alertService.show('Neuer Umsatz!', 'Soeben wurden Waren im Gesamtwert von ' + turnover + '€ verkauft.');
                    }
                });
            }
        }
    });
})();
