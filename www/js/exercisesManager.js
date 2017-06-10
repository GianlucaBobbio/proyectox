angular.module('starter')
    .service('ExercisesManager', function($http, $filter, $firebase, $firebaseArray, $window, AuthService, SoundExercisesManager) {
        this.checkAndLoadExercises = function() {
            var self = this;
            var exercises = SoundExercisesManager.getExercises();
            if (!exercises || exercises.length == 0) {
                self.loadExercises();
            }
        }
        this.loadExercises = function() {
            var self = this;
            var userUid = AuthService.getUserUid();
            var refUser = firebase.database().ref().child("users").orderByChild('userUid').equalTo(userUid);
            var user = $firebaseArray(refUser);
            user.$loaded().then(function(){
                SoundExercisesManager.loadExercisesDone(user[0].soundExercisesDone);
            })
        }
    });
