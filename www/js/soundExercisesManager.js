angular.module('starter.api', [])
    .service('SoundExercisesManager', function($http, $filter, $firebase, $firebaseArray, $window, AuthService) {
        this.getExercisesByCategory = function(category) {
            self = this;
            var exercises = $window.localStorage.getItem("soundExercises");
            return $filter('filter')(exercises, { category: category }, true);
        }
        this.getExercises = function(){
			self = this;
            var exercises = $window.localStorage.getItem("soundExercises");
        	return exercises;	
        }
        this.loadExercisesDone = function(exercisesDone) {
            self = this;
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
                $window.localStorage.setItem("soundExercises", exercises);
                return true;
            });
        }
        this.setResult = function(exerciseId, result) {
            var exercises = $window.localStorage.getItem("soundExercises");
            angular.forEach(exercises, function(exercise) {
                if (exercise == exerciseId) {
                    exercise.correct = result;
                }
            });
            $window.localStorage.setItem("soundExercises", exercises);
        }
    });
