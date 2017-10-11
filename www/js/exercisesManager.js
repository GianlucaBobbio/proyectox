angular.module('starter.api', [])
    .service('ExercisesManager', function($http, $filter, $firebase, $firebaseArray, $window, AuthService, SoundExercisesManager, ToneExercisesManager, RhythmExercisesManager, RecognitionExercisesManager) {
        this.checkAndLoadExercises = function() {
            var self = this;
            SoundExercisesManager.loadExercisesDone();
            ToneExercisesManager.loadExercisesDone();
            RhythmExercisesManager.loadExercisesDone();
            RecognitionExercisesManager.loadExercisesDone();
        }

        // this.loadExercises = function() {
        //     var self = this;
        //     return SoundExercisesManager.loadExercisesDone();
        // }
    });
