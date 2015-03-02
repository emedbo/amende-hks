
hks.controller('LegSelectCtrl', ['$scope', '$routeParams', '$location', 'DataService', function ($scope, $routeParams, $location, DataService) {
    var id = $routeParams.id;
    if (!id) {
        $location.path('/legselect');
    }

    $scope.participant = {};
    $scope.legs = [];
    $scope.allLegParticipants = [];

    DataService.getDataForLegSelectCtrl($routeParams.id, function (data) {
        $scope.legs = data[0];
        $scope.participant = data[1];

        $scope.names = getNames(data[2]);
        SetOtherParticipantLegSelections(data[2]);

        for (var i = 0; i < $scope.participant.selectedLegs.length; i++) {
            var leg = $scope.participant.selectedLegs[i];
            $scope.legs[leg - 1].isSelected = true;
        }
        disableIfMaxSelected();
    }, function (error) {

    });

    function getNames(data2) {
        return data2.map(function (n) {
            return n.name;
        });
    }

    var SetOtherParticipantLegSelections = function (data2) {
        $scope.legs.forEach(function (leg) {
            leg.otherPartitipants = 0;
            data2.forEach(function (d) {
                if(d._id == $scope.participant._id) {
                    return;
                }
                d.selectedLegs.forEach(function (l) {
                    if(l == leg.name){
                        leg.otherPartitipants ++;
                    }
                })
            })
        })
    };

    $scope.sortableOptions = {
        orderChanged: function(event) {
            $scope.save();
        },
        containment: '#sortable-container'
    };

    $scope.save = function () {
        DataService.saveParticipant($scope.participant);
    };

    $scope.toggleLegSelected = function (leg) {
        if (leg.isDisabled) {
            return;
        }
        leg.isSelected = !leg.isSelected;
        if (leg.isSelected) {
            $scope.participant.selectedLegs.push(leg.name);
        }
        else {
            console.log($scope.participant.selectedLegs.length);
            $scope.participant.selectedLegs.remove(leg.name);
            //removeItem($scope.participant.selectedLegs, leg.name);
            console.log($scope.participant.selectedLegs.length);
        }
        disableIfMaxSelected();
        $scope.save();
    };

    function disableIfMaxSelected() {
        var countSelected = Count($scope.legs, function (leg) {
            return leg.isSelected;
        })();

        if (countSelected >= 3) {
            var selector = function (leg) {
                return !leg.isSelected;
            };
            var action = function (item) {
                item.isDisabled = true;
            };
            DoForEach(Where($scope.legs, selector), action);
        }
        else {
            DoForEach($scope.legs, function (item) {
                item.isDisabled = false;
            })
        }
    }

    function Count(coll, selector) {
        var count = 0;
        for (var i = 0; i < coll.length; i++) {
            var item = coll[i];
            if (selector(item)) {
                count++;
            }
        }
        return function () {
            return count;
        };
    }

    function DoForEach(coll, action) {
        for (var i = 0; i < coll.length; i++) {
            var item = coll[i];
            action(item);
        }
    }

    function Where(coll, selector) {
        var retItems = [];
        for (var i = 0; i < coll.length; i++) {
            var item = coll[i];
            if (selector(item)) {
                retItems.push(item);
            }
        }
        return retItems;
    }

}]);