angular.module('starter.controllers')
  .controller('RecognitionExerciseCtrl', function($scope, $rootScope, ApiService, $filter, exercises, RecognitionExercisesManager, $state, $timeout) {
    $scope.position = 0;
    $scope.playing = false;
    $scope.result = [];
    var sound = null;
    var actualResolved = false;
    init();

    function init() {
      $scope.actualExercise = angular.copy(exercises.unresolved[$scope.position]);
      $scope.unresolvedExercises = exercises.unresolved;
      loadExercise();
    }

    function loadExercise() {
      console.log('start loadExercise');
      $scope.correct = null;
      $scope.playing = false;
      sound = null;
      actualResolved = false;
    }

    function stopPlaying() {
      if ($scope.playing) {
        sound.stop();
        sound.release();
        $scope.playing = false;
      }
    }

    $scope.nextExercise = function() {
      console.log('start nextExercise');
      stopPlaying();
      if (actualResolved) {
        $scope.actualExercise = angular.copy($scope.unresolvedExercises[$scope.position]);
      } else {
        $scope.actualExercise = angular.copy($scope.unresolvedExercises[$scope.position + 1]);
        $scope.position = $scope.position + 1;
      }
      loadExercise();
    }

    $scope.prevExercise = function() {
      stopPlaying();
      $scope.actualExercise = angular.copy($scope.unresolvedExercises[$scope.position - 1]);
      $scope.position = $scope.position - 1;
      loadExercise();
    }

    $scope.playSound = function() {
      stopPlaying();
      sound = new Media('/android_asset/www/db/sounds/' + $scope.actualExercise.sound, function() {
      }, function(e) {
      });
      sound.play();
      $scope.playing = true;
    }

    // $scope.playSound = function() {}

    $scope.resolveExercise = function() {
      console.log('start resolveExercise');
      var correct = true;
      for (var i = actualExercise.phrase.length - 1; i >= 0; i--) {
      	if($scope.result[i] != actualExercise.phrase[i])
      		correct = false;
      }
      $scope.correct = correct;
      actualResolved = true;
      $scope.setResult();
      if (correct) {
        $timeout(function() {
          stopPlaying();
          if ($scope.unresolvedExercises.length > 0) {
            if($scope.position >= $scope.unresolvedExercises.length){
                $scope.position = $scope.unresolvedExercises.length - 1;
            }
            $scope.actualExercise = angular.copy($scope.unresolvedExercises[$scope.position]);
            loadExercise();
            $scope.$apply();
          }else{
            alert("Ha finalizado todos los ejercicios");
            $state.go('app.menuexercises');
          }
        }, 2000);
      }
    }

    $scope.setResult = function () {
        console.log('start setResult');
        RecognitionExercisesManager.setResult($scope.actualExercise.id, $scope.correct);
        $scope.unresolvedExercises = $filter('filter')($scope.unresolvedExercises, function(exercise) {
          return exercise.id != $scope.actualExercise.id
        });
    }

    function shuffle(array) {
      var currentIndex = array.length,
        temporaryValue, randomIndex;
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    }
  });
