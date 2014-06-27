(function () {
    "use strict";

    /**
     * @param {SignalRService} signalRService
     * @constructor
     */
    function BillingService(signalRService) {
        var billingHub = signalRService.hub('billingHub');

        this.$entryAdded = signalRService.bind(billingHub, 'entryAdded');
        this.$entryChanged = signalRService.bind(billingHub, 'entryChanged');
        this.$entryRemoved = signalRService.bind(billingHub, 'entryRemoved');

        signalRService.connect();

        this.registerAccountant = function () {
            signalRService.call(billingHub, 'registerAccountant');
        };

        this.addEntry = function (entry) {
            signalRService.call(billingHub, 'addEntry', entry.product.id, entry.count, entry.price)
                .then(function (id) {
                    entry.id = id;
                });
        };

        this.changeEntry = function (entry) {
            signalRService.call(billingHub, 'changeEntry', entry.id, entry.product.id, entry.count, entry.price, entry.previousCount);
        };

        this.removeEntry = function (entry) {
            signalRService.call(billingHub, 'removeEntry', entry.id, entry.product.id, entry.count);
        };
    }

    app.module.service('billingService', BillingService);
})();
