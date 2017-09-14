angular.module('starter')
    .service('ApiService', function($http, $filter) {
        this.getExercises = function(type) {
            switch (type) {
                case 1:
                    return $http.get('db/exercisesCompare.json').then(function(exercises) {
                        return exercises.data;
                    });
                    break;
                case 2:
                    return $http.get('db/exercisesCompare.json').then(function(exercises) {
                        return exercises.data;
                    });
                    break;
                case 3:
                    return $http.get('db/exercisesTone.json').then(function(exercises) {
                        return exercises.data;
                    });
                    break;
                case 3:
                    return $http.get('db/exercisesTone.json').then(function(exercises) {
                        return exercises.data;
                    });
                    break;
            }
        }
        this.getToneExercises = function() {
            return $http.get('db/exercisesTone.json').then(function(exercises) {
                return exercises.data;
            });
        }
        this.getSoundExercisesCategory = function(category){
            return $http.get('db/exercisesSound.json').then(function(exercises) {
                return $filter('filter')(exercises.data, { category: parseInt(category, 10) }, true);
            });   
        }
        this.sendTracing = function(tracing){
            return $http.post('https://hooks.zapier.com/hooks/catch/2502600/r9t9c7/', tracing).then(function(data){
                console.log(data);
                return data;
            })
        }
    });
