(function () {
    "use strict";

    window.app = window.app || {};
    app.module = angular.module('cashier', ['ngRoute', 'ngTouch', 'ngAnimate']);

    app.module.run(function(){
        FastClick.attach(document.body);
    });
})();
