hks.service('DataService', function ($http) {

    return {
        getData: function() {
            return  $http.get('/api/legs');
        },
        join: function(email){
            return $http.post('api/join', {email:email});
        },
        getDataForParticipant: function (id) {
            return $http.get('api/participant/'+id);
        },
        saveParticipant: function (participant) {
            return $http.post('api/participant', {participant: participant});
        }
    };

});