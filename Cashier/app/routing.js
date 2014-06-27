(function () {
    "use strict";

    app.module.config(function routeConfig($routeProvider) {
        $routeProvider
            .when('/bon', {
                templateUrl: '/app/bon/bon.html',
                controller: 'bonController'
            })

            .otherwise({
                redirectTo: '/'
            });
    });
})();
