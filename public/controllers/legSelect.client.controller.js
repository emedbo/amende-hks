hks.controller('LegSelectCtrl', ['$scope', '$routeParams', '$location', 'DataService', function ($scope, $routeParams, $location, DataService) {
    var id = $routeParams.id;
    if (!id) {
        $location.path('/legselect');
    }

    $scope.participant = {};
    $scope.legs = [];



    // Todo:
    // Neste er å sette isselected på leg etter at både leg og participant er lastet

    DataService.getData()
        .success(function (legData) {
            $scope.legs = legData;
            console.log(JSON.stringify(legData));
            DataService.getDataForParticipant($routeParams.id)
                .success(function (participant) {
                    $scope.participant = participant;
                    for(var i = 0; i < $scope.participant.selectedLegs.length; i++) {
                        var leg = $scope.participant.selectedLegs[i];
                        $scope.legs[leg-1].isSelected = true;
                    }
                    disableIfMaxSelected();
                })
                .error(function (error) {
                });
        });

    $scope.sortableOptions = {
        containment: '#sortable-container'
    };

    $scope.save = function () {
        DataService.saveParticipant($scope.participant);
    };

    $scope.toggleLegSelected = function (leg) {
        if(leg.isDisabled) {
            return;
        }
        leg.isSelected = !leg.isSelected;
        if(leg.isSelected) {
            $scope.participant.selectedLegs.push(leg.name);
        }
        else{
            console.log($scope.participant.selectedLegs.length);
            //$scope.participant.selectedLegs.remove(leg.name);
            removeItem($scope.participant.selectedLegs, leg.name);
            console.log($scope.participant.selectedLegs.length);
        }
        disableIfMaxSelected();
    };

    function disableIfMaxSelected(){
        var countSelected = Count($scope.legs, function (leg) {
            return leg.isSelected;
        })();

        if(countSelected >= 3) {
            var selector = function (leg) {
                return !leg.isSelected;
            };
            var action = function(item) {
                item.isDisabled = true;
            };
            DoForEach(Where($scope.legs, selector), action);
        }
        else{
            DoForEach($scope.legs, function (item) {
                item.isDisabled = false;
            })
        }
    }

    function removeItem(array, item){
        console.log(item);
        var index = array.indexOf(item);
        console.log(JSON.stringify(array));
        console.log(index);
        if(index > -1)
        {
            array.splice(index, 1);
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

    function DoForEach(coll, action){
        for(var i = 0; i < coll.length; i++){
            var item = coll[i];
            action(item);
        }
    }

    function Where(coll, selector){
        var retItems = [];
        for(var i = 0; i < coll.length; i++){
            var item = coll[i];
            if(selector(item)) {
                retItems.push(item);
            }
        }
        return retItems;
        //return function () {
        //    return retItems
        //}
    }

}]);