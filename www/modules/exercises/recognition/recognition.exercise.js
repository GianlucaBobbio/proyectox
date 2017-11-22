angular.module('starter.controllers')
  .controller('RecognitionExerciseCtrl', function($scope, $rootScope, ApiService, $filter, exercises, RecognitionExercisesManager, $state, $timeout) {

    $scope.position = 0;
    $scope.playing = false;
    $scope.result = [];
    $scope.correctsResults = [];
    var sound = null;
    var actualResolved = false;
    init();

    function init() {
      $scope.actualExercise = angular.copy(exercises.unresolved[$scope.position]);
      $scope.unresolvedExercises = exercises.unresolved;
      loadExercise();
    }

    function loadExercise() {

      $scope.correct = null;
      $scope.correctsResults = [];
      $scope.result = [];
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
      sound = new Media('/android_asset/www/db/sounds/' + $scope.actualExercise.sound, function() {}, function(e) {});
      sound.play();
      $scope.playing = true;
    }

    // $scope.playSound = function() {}

    $scope.resolveExercise = function() {

      var correct = true;
      for (var i = $scope.actualExercise.phrase.length - 1; i >= 0; i--) {
        var exerciseWord = RemoveAccents($scope.actualExercise.phrase[i]);
        var input = RemoveAccents($scope.result[i]);


        if (input != exerciseWord) {
          correct = false;
          $scope.correctsResults[i] = false;
        } else {
          $scope.correctsResults[i] = true;
        }

      }
      $scope.correct = correct;
      if(!actualResolved){
        actualResolved = true;
        $scope.setResult();
      }
      if (correct) {
        $timeout(function() {
          stopPlaying();
          if ($scope.unresolvedExercises.length > 0) {
            if ($scope.position >= $scope.unresolvedExercises.length) {
              $scope.position = $scope.unresolvedExercises.length - 1;
            }
            $scope.actualExercise = angular.copy($scope.unresolvedExercises[$scope.position]);
            loadExercise();
            $scope.$apply();
          } else {
            alert("Ha finalizado todos los ejercicios");
            $state.go('app.menuexercises');
          }
        }, 3000);
      }
    }

    $scope.setResult = function() {

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

    function RemoveAccents(str) {
      var accents = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž';
      var accentsOut = "AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz";
      if (str) {
        str = str.split('');
        var strLen = str.length;
        var i, x;
        for (i = 0; i < strLen; i++) {
          if ((x = accents.indexOf(str[i])) != -1) {
            str[i] = accentsOut[x];
          }
        }
        str = str.join('').toUpperCase();
      }
      return str;
    }
  });
