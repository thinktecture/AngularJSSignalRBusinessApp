(function () {
    "use strict";

    app.module.config(function routeConfig($routeProvider) {
        $routeProvider
            .when('/bon', {
                templateUrl: '/app/bon/bon.html',
                controller: 'bonController',
                resolve: app.resolver.BonController
            })

            .otherwise({
                redirectTo: '/bon'
            });
    });
})();
