(function () {
    "use strict";

    app.module.config(function routeConfig($routeProvider) {
        $routeProvider
            .when('/addProduct', {
                templateUrl: 'app/addProduct/addProduct.html',
                controller: 'addProductController'
            })
            .when('/changeProduct', {
                templateUrl: 'app/changeProduct/changeProduct.html',
                controller: 'changeProductController'
            })
            .when('/live', {
                templateUrl: 'app/live/live.html',
                controller: 'liveController'
            })

            .otherwise({
                redirectTo: '/'
            });
    });
})();
