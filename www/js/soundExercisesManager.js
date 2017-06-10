angular.module('starter.api', [])
    .service('SoundExercisesManager', function($http, $filter, $firebase, $firebaseArray, $window, AuthService, $q) {
        this.getExercisesByCategory = function(category) {
            var self = this;
            var exercises = JSON.parse($window.localStorage.getItem("soundExercises"));
            exercises = $filter('filter')(exercises, { category: category }, true);
            return $q.resolve(exercises);
        }
        this.getExercises = function(){
			var self = this;
            var exercises = JSON.parse($window.localStorage.getItem("soundExercises"));
        	return exercises;	
        }
        this.resetExercises = function(){
            var self = this;
            return $http.get('db/exercisesSound.json').then(function(json) {
                var exercises = json.data;
                $window.localStorage.setItem("soundExercises", JSON.stringify(exercises));
                return true;
            });
        }
        this.loadExercisesDone = function(exercisesDone) {
            var self = this;
            return $http.get('db/exercisesSound.json').then(function(json) {
                var exercises = json.data;
                var userUid = AuthService.getUserUid();
                var refUser = firebase.database().ref().child("users").orderByChild('userUid').equalTo(userUid);
                var user = $firebaseArray(refUser);
                angular.forEach(exercises, function(exercise) {
                    var resolvedExercise = $filter('filter')(exercisesDone, { id: exercise.id }, true);
                    if (resolvedExercise) {
                        exercise.correct = resolvedExercise.correct;
                    }
                });
                $window.localStorage.setItem("soundExercises", JSON.stringify(exercises));
                return true;
            });
        }
        this.setResult = function(exerciseId, result) {
            var exercises = JSON.parse($window.localStorage.getItem("soundExercises"));
            angular.forEach(exercises, function(exercise) {
                if (exercise.id == exerciseId) {
                    exercise.correct = result;
                }
            });
            $window.localStorage.setItem("soundExercises", JSON.stringify(exercises));
        }
    });
