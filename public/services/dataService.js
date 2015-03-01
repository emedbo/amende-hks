hks.service('DataService', function ($http) {

    var getDataForLegSelectCtrl = function (id) {
        async.parallel([
                function (callback) {
                    getData()
                        .success(function (data) {
                            callback(null, data);
                        })
                        .error(function (err) {
                            callback(err, null);
                        })
                },
                function(callback){
                    getDataForParticipant(id)
                        .success(function (data) {
                            callback(null, data);
                        })
                        .error(function (err) {
                            callback(err, null);
                        })
                },
                function(callback){
                    getAllLegsSelected()
                        .success(function (data) {
                            callback(null, data);
                        })
                        .error(function (err) {
                            callback(err, null);
                        })
                }
            ],
            function(err, results){
                if(!err)
                {

                }
            }
        )
    };

    var getDataForParticipant = function (id) {
        return $http.get('api/participant/' + id);
    };

    var getAllLegsSelected = function () {
        return $http.get('api/selectedLegs');
    };

    var getData = function () {
        return $http.get('/api/legs');
    };

    return {
        getData: getData,
        join: function (email) {
            return $http.post('api/join', {email: email});
        },
        getDataForParticipant: getDataForParticipant,
        saveParticipant: function (participant) {
            return $http.post('api/participant', {participant: participant});
        },
        getDataForLegSelectCtrl: getDataForLegSelectCtrl
    };

});