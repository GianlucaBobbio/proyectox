angular.module('starter.api', [])
    .service('ExercisesManager', function($http, $filter, $firebase, $firebaseArray, $window, AuthService, SoundExercisesManager) {
        this.checkAndLoadExercises = function() {
            var self = this;
            var exercises = SoundExercisesManager.getExercises();
            // if (!exercises || exercises.length == 0) {
                self.loadExercises();
            // }
        }
        this.loadExercises = function() {
            var self = this;
            return SoundExercisesManager.loadExercisesDone();
        }
    });
