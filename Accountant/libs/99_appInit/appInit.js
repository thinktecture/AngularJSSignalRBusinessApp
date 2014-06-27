(function () {
    "use strict";

    window.app = window.app || { resolver: {} };
    app.module = angular.module('accountant', ['ngRoute', 'ngAnimate']);

    app.module.run(function(){
        FastClick.attach(document.body);
    });
})();
