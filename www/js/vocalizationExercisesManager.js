angular.module('starter.api')
  .service('VocalizationExercisesManager', function($http, $filter, $firebase, $firebaseArray, $window, AuthService, $q, $rootScope, $firebaseObject) {
    var exercisesDone = null;
    this.getExercisesByCategory = function(category) {
      var self = this;
      var exercises = JSON.parse($window.localStorage.getItem("vocalizationExercises"));
      exercises = $filter('filter')(exercises, { category: category }, true);
      return $q.resolve(exercises);
    }
    this.getExercises = function() {
      var self = this;
      var exercises = JSON.parse($window.localStorage.getItem("vocalizationExercises"));
      return exercises;
    }
    this.resetExercises = function() {
      var self = this;
      return $http.get('db/exercisesVocalization.json').then(function(json) {
        var exercises = json.data;
        $window.localStorage.setItem("vocalizationExercises", JSON.stringify(exercises));
        return self.emptyFireExercises();
      });
    }
    this.loadFireExercises = function() {
      exercisesDone = $firebaseArray(firebase.database().ref("users/" + $rootScope.userId + "/vocalizationExercisesDone"));
    }
    this.emptyFireExercises = function() {
      var user = $firebaseObject(firebase.database().ref("users/" + $rootScope.userId));
      return user.$loaded(function() {
        user.vocalizationExercisesDone = [];
        return user.$save();
      });
    }
    this.loadExercisesDone = function() {
      var self = this;
      self.loadFireExercises();
      return exercisesDone.$loaded().then(function() {
        return $http.get('db/exercisesVocalization.json').then(function(json) {
          var exercises = json.data;
          angular.forEach(exercises, function(exercise) {
            var resolvedExercise = $filter('filter')(exercisesDone, { id: exercise.id }, true)[0];
            if (resolvedExercise) {
              console.log(resolvedExercise);
              exercise.correct = resolvedExercise.correct;
            }
          });
          console.log(exercisesDone);
          console.log(exercises);
          $window.localStorage.setItem("vocalizationExercises", JSON.stringify(exercises));
          return true;
        });
      })
    }
    this.setResult = function(exerciseId, result) {
      var exercises = JSON.parse($window.localStorage.getItem("vocalizationExercises"));
      angular.forEach(exercises, function(exercise) {
        if (exercise.id == exerciseId) {
          exercise.correct = result;
        }
      });
      var exerciseDone = {
        correct: result,
        id: exerciseId
      }
      exercisesDone.$add(exerciseDone);
      console.log(exercisesDone);
      $window.localStorage.setItem("vocalizationExercises", JSON.stringify(exercises));
    }
  });
