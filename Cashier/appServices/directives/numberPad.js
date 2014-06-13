(function () {
    "use strict";

    /**
     * @param $scope
     * @constructor
     */
    function NumberPadController($scope) {
        var fractionPart = false,
            clearOnInput = false;

        $scope.value = 0;

        $scope.input = function (number) {
            if (clearOnInput) {
                text = '';
                clearOnInput = false;
            }
            else {
                var text = $scope.value.toString();

                if (fractionPart && text.indexOf('.') === -1) {
                    text += '.';
                }
            }

            $scope.value = parseFloat(text + number);
        };

        $scope.dot = function () {
            fractionPart = true;
        };

        $scope.undo = function () {
            var text = $scope.value.toString();

            text = text.substr(0, text.length - 1);
            if (text.length === 0) {
                text = "0";
            }

            if (text.substr(-1) === '.') {
                fractionPart = false;
                text.substr(0, text.length - 1);
            }

            $scope.value = parseFloat(text);
        };

        $scope.set = function () {
            $scope.number({ value: $scope.value });
            $scope.value = 0;
            fractionPart = false;
        };

        $scope.$on('numberPadValue', function (event, value) {
            $scope.value = value;
            clearOnInput = true;
        });
    }

    app.module.controller('numberPadController', NumberPadController);

    app.module.directive('numberPad', function () {
        return {
            restrict: 'E',
            templateUrl: 'appServices/directives/numberPad.html',
            controller: 'numberPadController',
            scope: {
                number: '&'
            }
        }
    });
})();
