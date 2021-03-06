angular.module('starter.api')
  .service('RhythmExercisesManager', function($http, $filter, $firebase, $firebaseArray, $window, AuthService, $q, $rootScope, $firebaseObject) {
    var exercisesDone = null;
    this.getExercises = function() {
      var self = this;
      var exercises = JSON.parse($window.localStorage.getItem("rhythmExercises"));
      return $q.resolve(exercises);
    }
    this.resetExercises = function() {
      var self = this;
      return $http.get('db/exercisesRhythm.json').then(function(json) {
        var exercises = json.data;
        $window.localStorage.setItem("rhythmExercises", JSON.stringify(exercises));
        return self.emptyFireExercises();
      });
    }
    this.loadFireExercises = function() {
      exercisesDone = $firebaseArray(firebase.database().ref("users/" + $rootScope.userId + "/rhythmExercisesDone"));
    }
    this.emptyFireExercises = function() {
      var user = $firebaseObject(firebase.database().ref("users/" + $rootScope.userId));
      return user.$loaded(function() {
        user.rhythmExercisesDone = [];
        return user.$save();
      });
    }
    this.loadExercisesDone = function() {
      var self = this;
      self.loadFireExercises();
      return exercisesDone.$loaded().then(function() {
        return $http.get('db/exercisesRhythm.json').then(function(json) {
          var exercises = json.data;
          
          
          angular.forEach(exercises, function(exercise) {
            var resolvedExercise = $filter('filter')(exercisesDone, { id: exercise.id }, true)[0];
            if (resolvedExercise) {
              
              exercise.correct = resolvedExercise.correct;
            }
          });
          
          
          $window.localStorage.setItem("rhythmExercises", JSON.stringify(exercises));
          return true;
        });
      })
    }
    this.setResult = function(exerciseId, result) {
      var exercises = JSON.parse($window.localStorage.getItem("rhythmExercises"));
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
      
      $window.localStorage.setItem("rhythmExercises", JSON.stringify(exercises));
    }
  });
