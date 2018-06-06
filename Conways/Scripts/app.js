angular.module('conway', []);


angular.module('conway').directive('conwayGrid', [function() {
    return {
        templateUrl: '/Home/Directive',
        restrict: 'E, A',
        replace: true,
        scope: true,
        controller: ['$scope', '$http', '$interval', function($scope, $http, $interval) {      
            var playing = null;
        
            var build = function() {
                var data = [];
                var rows = 18;
                var cols = 36;
                
                for (row_count = 0; row_count < rows; row_count++) {
                    var row = [];

                    for (cols_count = 0; cols_count < cols; cols_count++)
                        row.push(0);
                    
                    data.push(row);
                }
                
                return data;
            };
            
             var send_request = function () {
                $http({
                    url: '/api/conways',
                    method: 'post',
                    data: {
                        Grid: angular.copy($scope.data)
                    }
                }).then(function(response){
                    $scope.data = response.data.Grid;

                    if (!has_active_cell())
                        $scope.reset();

                }, function() {
                    alert("Ouch");
                });
            };
            
            var has_active_cell = function() {
                for (var x = 0; x < $scope.data.length; x++) {
                    for (var y = 0; y < $scope.data[0].length; y++) {
                        if (true == $scope.data[x][y])
                            return true;
                    }
                }
                
                return false;
            };
            
            $scope.started = false;
            
            $scope.actions = {
                play: false,
                pause: false,
                next: false,
                reset: false
            };
            
            $scope.data = build();
            
            $scope.update = function (column, row) {
                console.log(column, row);
                $scope.data[row][column] = $scope.data[row][column] ? 0 : 1;
                
                if (has_active_cell()) {
                    $scope.actions.play = true;
                    $scope.actions.next = true;
                    $scope.actions.reset = true;
                }
            }
            
            $scope.next = function() {
                console.log('next');
                $scope.started = true;
                send_request();
            }
            
            $scope.play = function() {
                console.log('play');
                $scope.actions.play = false;
                $scope.actions.pause = true;
                $scope.started = true;
                
                playing = $interval(function() {
                    console.log('playing');
                    send_request();
                }, 100);
                
            };
            
            $scope.pause = function() {
                console.log('pause');
                $interval.cancel(playing);
                $scope.actions.play = true;
            };
            
            $scope.reset = function() {
                console.log('reset');
                $interval.cancel(playing);
                $scope.actions.play = false;
                $scope.actions.pause = false;
                $scope.actions.next = false;
                $scope.actions.reset = false;
                $scope.started = false;
                $scope.data = build();
            }
        }]
    };
}]);

