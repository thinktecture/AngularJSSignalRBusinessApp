(function () {
    "use strict";

    /**
     * @param $scope
     * @param {AlertService} alertService
     * @param {ProductService} productService
     * @param {BillingService} billingService
     * @constructor
     */
    function BonController($scope, alertService, productService, billingService) {
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

        $scope.entries = [];

        resetEntry();

        $scope.$on(productService.$productAdded, function (event, product) {
            $scope.products.push(product);

            alertService.show('Neues Produkt verfügbar!', 'Das Produkt ' + product.name + ' wurde soeben hinzugefügt.');
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

        $scope.$watch('entries', function (newVal) {
            var sum = 0;
            for (var i = 0; i < newVal.length; i++) {
                sum += newVal[i].sum;
            }

            $scope.amount = sum;
        }, true);

        $scope.$watch('entry.product', function (newValue) {
            if (newValue) {
                if (!$scope.form.price.$dirty) {
                    $scope.entry.price = newValue.price;
                }
            }
        });

        $scope.countDown = function () {
            if ($scope.entry.count > 1) {
                $scope.entry.count--;
            }
        };

        $scope.countUp = function () {
            $scope.entry.count++;
        };

        function resetNumberPad() {
            $scope.numberEntry = null;
            $scope.$broadcast('numberpad:value', 0);
        }

        function resetEntry() {
            $scope.entry = { count: 1 };
        }

        $scope.edit = function (entry) {
            if (entry.remove) {
                return;
            }

            entry.previousCount = entry.count;

            $scope.numberEntry = null;
            $scope.$broadcast('numberpad:value', 0);

            $scope.entry = angular.extend({}, entry);
        };

        $scope.cancel = function () {
            resetEntry();
        };

        $scope.add = function () {
            var entry = $scope.entry;
            resetEntry();

            entry.text = entry.product.name;
            entry.sum = entry.count * entry.price;

            billingService.addEntry(entry);

            $scope.entries.push(entry);
        };

        $scope.change = function () {
            var entry = $scope.entry;
            resetEntry();

            entry.text = entry.product.name;
            entry.sum = entry.count * entry.price;

            billingService.changeEntry(entry);

            for (var i = 0; i < $scope.entries.length; i++) {
                var item = $scope.entries[i];
                if (item.id === entry.id) {
                    angular.extend(item, entry);
                    break;
                }
            }
        };

        $scope.remove = function (entry) {
            billingService.removeEntry(entry);

            entry.remove = true;

            resetNumberPad();
            resetEntry();

            for (var i = 0; i < $scope.entries.length; i++) {
                if ($scope.entries[i].id === entry.id) {
                    $scope.entries.splice(i, 1);
                    break;
                }
            }
        };

        $scope.number = function (value) {
            if ($scope.numberEntry) {
                var changeEntry = $scope.numberEntry;
                $scope.numberEntry = null;

                changeEntry.previousCount = changeEntry.count;

                switch ($scope.changeMode) {
                    case 'count':
                        changeEntry.count = value;
                        billingService.changeEntry(changeEntry);
                        break;
                    case 'price':
                        changeEntry.price = value;
                        billingService.changeEntry(changeEntry);
                        break;
                }

                changeEntry.sum = changeEntry.count * changeEntry.price;
            }
        };

        $scope.changeCount = function (event, entry) {
            event.stopPropagation();

            $scope.numberEntry = entry;
            $scope.changeMode = 'count';

            resetEntry();

            $scope.$broadcast('numberpad:value', entry.count);
        };

        $scope.changePrice = function (event, entry) {
            event.stopPropagation();

            $scope.numberEntry = entry;
            $scope.changeMode = 'price';

            resetEntry();

            $scope.$broadcast('numberpad:value', entry.price);
        };

        $scope.amount = 0;
    }

    app.module.controller('bonController', BonController);
})();
