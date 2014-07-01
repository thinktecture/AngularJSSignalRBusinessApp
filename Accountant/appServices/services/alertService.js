(function () {
    "use strict";

    /**
     * @param $rootScope
     * @param $timeout
     * @constructor
     */
    function AlertService($rootScope, $timeout) {
        var last;

        this.show = function (header, message) {
            $rootScope.alert = {
                visible: true,
                header: header,
                message: message
            };

            $timeout.cancel(last);
            last = $timeout(function () {
                $rootScope.alert.visible = false;
            }, 5000);
        }
    }

    app.module.service('alertService', AlertService);
})();
