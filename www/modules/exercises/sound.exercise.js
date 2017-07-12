angular.module('starter.controllers')
  .controller('SoundExerciseCtrl', function($scope, $rootScope, ApiService, $filter, exercises, SoundExercisesManager, $state, $timeout) {
    $scope.position = 0;
    $scope.playing = false;
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
      // angular.forEach($scope.compareExercises, function (image) {
      //     image.wasCorrect = null;
      // });
      $scope.compareExercises = [];
      $scope.selected = null;
      $scope.correct = null;
      $scope.compareExercises.push($scope.actualExercise);
      loadCompareExercises($scope.actualExercise.category);
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

    $scope.playSound = function(exercise) {
      stopPlaying();
      sound = new Media('/android_asset/www/db/sounds/' + exercise.sound, function() {
      }, function(e) {
      });
      sound.play();
      $scope.playing = true;
    }

    // $scope.playSound = function(exercise) {}

    $scope.resolveExercise = function(selected) {
      console.log('start resolveExercise');
      var correct = false;
      $scope.playSound(selected);
      if (selected.id == $scope.actualExercise.id) {
        correct = true;
      }
      selected.wasCorrect = correct;
      if (!$scope.selected) {
        $scope.selected = selected;
        $scope.correct = correct;
        actualResolved = true;
        $scope.setResult();
      }
      if (correct) {
        console.log('correct=true');
        $timeout(function() {
          stopPlaying();
          // $state.reload();
          if ($scope.unresolvedExercises.length > 0) {
            console.log('unresolvedExercises.length > 0');
            if($scope.position >= $scope.unresolvedExercises.length){
                console.log('last position');
                $scope.position = $scope.unresolvedExercises.length - 1;
            }
            $scope.actualExercise = angular.copy($scope.unresolvedExercises[$scope.position]);
            loadExercise();
            $scope.$apply();
          }else{
            console.log("$scope.unresolvedExercises.length == 0");
            alert("Ha finalizado todos los ejercicios");
            $state.go('app.soundCategories');
          }
        }, 2000);
      }
    }

    $scope.setResult = function () {
        console.log('start setResult');
        SoundExercisesManager.setResult($scope.actualExercise.id, $scope.correct);
        $scope.unresolvedExercises = $filter('filter')($scope.unresolvedExercises, function(exercise) {
          return exercise.id != $scope.actualExercise.id
        });
    }

    function loadCompareExercises(category) {
      var filteredExercises = exercises.all.filter(function(exercise) {
        return exercise.category == category;
      });
      var randomExercise = filteredExercises[Math.floor(Math.random() * filteredExercises.length)];
      var contains = $scope.compareExercises.filter(function(exercise) {
        return exercise.id == randomExercise.id;
      });
      if (contains.length == 0) {
        $scope.compareExercises.push(angular.copy(randomExercise));
      }
      if ($scope.compareExercises.length < $scope.actualExercise.toCompare) {
        loadCompareExercises(category);
      } else {
        $scope.compareExercises = shuffle($scope.compareExercises);
      }
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
