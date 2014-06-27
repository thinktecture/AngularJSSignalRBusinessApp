(function () {
    "use strict";

    /**
     * @constructor
     */
    function SignalRService($q, $rootScope, $timeout) {
        var connection = $.hubConnection('http://192.168.0.71:8091/signalr');
        connection.logging = true;
        connection.disconnected(function () {
            connection.start();
        });

        this.hub = function (hubName) {
            return connection.createHubProxy(hubName);
        };

        /**
         * @returns {String}
         */
        this.bind = function (hub, methodName) {
            var event = 'signalr:' + methodName;

            hub.on(methodName, function () {
                var args = $.makeArray(arguments);
                args.unshift(event);

                $rootScope.$apply(function () {
                    $rootScope.$broadcast.apply($rootScope, args);
                });
            });

            return event;
        };

        /**
         * @returns {Promise}
         */
        this.call = function (hub, methodName) {
            var args = $.makeArray(arguments).slice(1);

            return this.connect().then(function () {
                var defer = $q.defer();

                hub.invoke.apply(hub, args).done(defer.resolve, defer.reject, defer.notify);

                return defer.promise;
            });
        };

        /**
         * @returns {Promise}
         */
        this.connect = function () {
            if (connection.state === $.signalR.connectionState.connected) {
                return $q.when();
            }

            var defer = $q.defer();

            connection.start().then(function () {
                defer.resolve();
            });

            return defer.promise;
        };
    }

    app.module.service('signalRService', SignalRService);
})();
