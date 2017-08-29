angular.module('starter.controllers')
	.controller('RhythmExerciseCtrl', function($scope, ApiService, $filter, exercises, ToneExercisesManager, $timeout, $state, $interval) {
		var mediaRec, mediaTimer = null;
		$scope.position = 0;
		$scope.recording = false;
		$scope.vm = {};
		init();

		function init() {
			$scope.actualExercise = angular.copy(exercises.unresolved[$scope.position]);
			console.log($scope.actualExercise);
			$scope.unresolvedExercises = exercises.unresolved;
			loadExercise();
		}

		function loadExercise() {
			console.log($scope.actualExercise);
			console.log('start loadExercise');
			$scope.actualExerciseTime = $scope.actualExercise.phrase.reduce((a, b) => a.time + b, 0);
			$scope.correct = null;
			$scope.recording = false;
			$scope.startTime = null;
			$scope.finishTime = null;
			$scope.diffTime = null;
		}

		$scope.recordButton = function(argument) {
			if ($scope.recording) {
				$scope.recording = false;
				//timeout necesario para que corra el digest
				$timeout(function() {
					$scope.stopRecord();
				}, 10);
			} else {
				$scope.recording = true;
				$scope.startRecord();
			}
		}

		$scope.startRecord = function() {
			// mediaRec = new Media("rhythmExercise.mp3", function() {}, function(err) {});
			// mediaRec.startRecord();
			$scope.startTime = Date.now();
		}

		$scope.stopRecord = function() {
			// clearInterval(mediaTimer);
			// mediaRec.stopRecord();
			$scope.finishTime = Date.now();
			$scope.diffTime = $scope.finishTime - $scope.startTime;
			$scope.finishExercise();
		}

		$scope.karaoke = function() {
			angular.forEach($scope.actualExercise.phrase, function(wordObject) {
				console.log(wordObject.word);
				$interval(function() {
					wordObject.highlighted = true;
				}, wordObject.time, 1);
				angular.forEach($scope.actualExercise.phrase, function(wordObject) { wordObject.highlighted = false; });
			});
			angular.forEach($scope.actualExercise.phrase, function(wordObject) { wordObject.highlighted = false; });
			$timeout(function() {
				$scope.$digest();
			}, 10);
			console.log('fin');
		}

		$scope.finishExercise = function() {
			if ($scope.diffTime < $scope.actualExerciseTime + 1000 && $scope.diffTime > $scope.actualExerciseTime - 1000) {
				console.log('Correcto:' + $scope.diffTime + ' entre ' + ($scope.actualExerciseTime + 1000) + ' y ' + ($scope.actualExerciseTime - 1000));
				$scope.correct = true;
			} else {
				console.log('Incorrecto:' + $scope.diffTime + ' entre ' + ($scope.actualExerciseTime + 1000) + ' y ' + ($scope.actualExerciseTime - 1000));
				$scope.correct = false;
			}
			$scope.setResult();
			$timeout(function() {
				if ($scope.unresolvedExercises.length > 0) {
					console.log('unresolvedExercises.length > 0');
					if ($scope.position >= $scope.unresolvedExercises.length) {
						console.log('last position');
						$scope.position = $scope.unresolvedExercises.length - 1;
					}
					$scope.actualExercise = angular.copy($scope.unresolvedExercises[$scope.position]);
					loadExercise();
					$scope.$apply();
				} else {
					console.log("$scope.unresolvedExercises.length == 0");
					alert("Ha finalizado todos los ejercicios");
					$state.go('app.menuexercises');
				}
			}, 3000);
		}

		$scope.setResult = function() {
			console.log('start setResult');
			ToneExercisesManager.setResult($scope.actualExercise.id, $scope.correct);
			$scope.unresolvedExercises = $filter('filter')($scope.unresolvedExercises, function(exercise) {
				return exercise.id != $scope.actualExercise.id
			});
		}
	});
