(function () {
    "use strict";

    /**
     * @param {SignalRService} signalRService
     * @constructor
     */
    function ProductService(signalRService) {
        var productHub = signalRService.hub('productHub');

        this.$productAdded = signalRService.bind(productHub, 'productAdded');
        this.$productChanged = signalRService.bind(productHub, 'productChanged');

        signalRService.connect();

        this.getProducts = function () {
            return signalRService.call(productHub, 'getProducts');
        };

        this.addProduct = function (product) {
            signalRService.call(productHub, 'addProduct', product.name, product.price, product.stock)
                .then(function (id) {
                    product.id = id;
                })
        };

        this.changeProduct = function (product) {
            signalRService.call(productHub, 'changeProduct', product.id, product.name, product.price, product.stock);
        }
    }

    app.module.service('productService', ProductService);
})();
