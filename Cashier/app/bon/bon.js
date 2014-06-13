(function () {
    "use strict";

    /**
     * @param $scope
     * @param products
     * @param {AccountingService} accountingService
     * @constructor
     */
    function BonController($scope, products, accountingService) {
        accountingService.start($scope);

        $scope.entries = [];
        $scope.products = products;

        $scope.$watch('entries', function (newVal) {
            var sum = 0;
            for (var i = 0; i < newVal.length; i++) {
                sum += newVal[i].sum;
            }
            $scope.amount = sum;
        }, true);

        $scope.showAdd = function () {
            $scope.addEntry = {};
            $scope.$watch('addEntry.product', function (newValue) {
                if (newValue) {
                    if (!$scope.form.count.$dirty) {
                        $scope.addEntry.count = 1;
                    }
                    if (!$scope.form.price.$dirty) {
                        $scope.addEntry.price = newValue.price;
                    }
                }
            });
        };

        $scope.cancelAdd = function () {
            $scope.addEntry = null;
        };

        $scope.countDown = function () {
            if ($scope.addEntry.count > 1) {
                $scope.addEntry.count--;
            }
        };

        $scope.countUp = function () {
            $scope.addEntry.count++;
        };

        $scope.add = function () {
            var addEntry = $scope.addEntry;
            $scope.addEntry = null;

            addEntry.text = addEntry.product.name;
            addEntry.sum = addEntry.count * addEntry.price;

            accountingService.addBillingEntry(addEntry.product.id, addEntry.count, addEntry.price).then(function (result) {
                addEntry.id = result;
            });

            $scope.entries.push(addEntry);
        };

        $scope.number = function (value) {
            if ($scope.changeEntry) {
                var changeEntry = $scope.changeEntry;
                $scope.changeEntry = null;

                switch ($scope.changeMode) {
                    case 'count':
                        changeEntry.count = value;
                        accountingService.changeBillingEntryCount(changeEntry.id, value);
                        break;
                    case'price':
                        changeEntry.price = value;
                        accountingService.changeBillingEntryPrice(changeEntry.id, value);
                        break;
                }

                changeEntry.sum = changeEntry.count * changeEntry.price;
            } else {
                var addEntry = { text: 'Sonderposition', count: 1, price: value};
                addEntry.sum = addEntry.count * addEntry.price;

                accountingService.addBillingEntry(0, addEntry.count, addEntry.price).then(function (result) {
                    addEntry.id = result;
                });

                $scope.entries.push(addEntry);
            }
        };

        $scope.changeCount = function (entry) {
            $scope.changeEntry = entry;
            $scope.removeEntry = null;
            $scope.changeMode = 'count';
            $scope.$broadcast('numberPadValue', entry.count);
        };

        $scope.changePrice = function (entry) {
            $scope.changeEntry = entry;
            $scope.removeEntry = null;
            $scope.changeMode = 'price';
            $scope.$broadcast('numberPadValue', entry.price);
        };

        $scope.showRemove = function (entry) {
            $scope.changeEntry = null;
            $scope.removeEntry = entry;
        };

        $scope.cancelRemove = function () {
            $scope.changeEntry = null;
            $scope.removeEntry = null;
        };

        $scope.remove = function (index) {
            var removeEntry = $scope.entries[index];

            accountingService.removeBillingEntry(removeEntry.id);

            $scope.entries.splice(index, 1);
        };

        $scope.amount = 0;
    }

    app.resolver.BonController = {
        /**
         * @param {ProductService} productService
         */
        products: function (productService) {
            return productService.getProducts();
        }
    };

    app.module.controller('bonController', BonController);
})();
