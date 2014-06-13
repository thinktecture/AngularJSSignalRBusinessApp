(function () {
    "use strict";

    /**
     * @constructor
     */
    function AccountingService($q) {
        var connection = $.hubConnection('http://192.168.0.71:8091/signalr');
        connection.logging = true;
        connection.disconnected(function () {
            connection.start();
        });

        var hubProxy = connection.createHubProxy('billingHub');

        function forwardSignalREventToScope(name, scope) {
            hubProxy.on(name, function (data) {
                scope.$broadcast('signalr:' + name, data);
            });
        }

        /**
         * @returns {promise}
         */
        function forwardMethodToSignalR(name) {
            var defer = $q.defer();
            hubProxy.invoke.apply(hubProxy, arguments).done(defer.resolve, defer.reject, defer.notify);
            return defer.promise;
        }

        this.start = function (scope) {
            forwardSignalREventToScope('addBillEntry', scope);
            forwardSignalREventToScope('changeBillEntryCount', scope);
            forwardSignalREventToScope('changeBillEntryPrice', scope);
            forwardSignalREventToScope('removeBillEntry', scope);

            connection.start();

            scope.$on('$destroy', function () {
                connection.stop();
            })
        };

        /**
         * @returns {promise}
         */
        this.addBillingEntry = function(productId, count, price) {
            return forwardMethodToSignalR('addBillEntry', productId, count, price);
        };
        this.changeBillingEntryCount = function(id, count) {
            forwardMethodToSignalR('changeBillEntryCount', id, count);
        };
        this.changeBillingEntryPrice = function(id, price) {
            forwardMethodToSignalR('changeBillEntryPrice', id, price);
        };
        this.removeBillingEntry = function(id) {
            forwardMethodToSignalR('removeBillEntry', id);
        };
    }

    app.module.service('accountingService', AccountingService);
})();
