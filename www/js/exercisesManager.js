angular.module('starter.api', [])
    .service('ExercisesManager', function($http, $filter, $firebase, $firebaseArray, $window, AuthService, SoundExercisesManager, ToneExercisesManager, RhythmExercisesManager) {
        this.checkAndLoadExercises = function() {
            var self = this;
            SoundExercisesManager.loadExercisesDone();
            ToneExercisesManager.loadExercisesDone();
            RhythmExercisesManager.loadExercisesDone();
        }

        // this.loadExercises = function() {
        //     var self = this;
        //     return SoundExercisesManager.loadExercisesDone();
        // }
    });
