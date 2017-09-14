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
			$scope.startTime = Date.now();
		}

		$scope.stopRecord = function() {
			$scope.finishTime = Date.now();
			$scope.diffTime = $scope.finishTime - $scope.startTime;
			$scope.finishExercise();
		}

		function wait(ms) {
			var start = Date.now(),
				now = start;
			while (now - start < ms) {
				now = Date.now();
			}
		}

		$scope.finishExercise = function() {
			if ($scope.diffTime < $scope.actualExerciseTime + 1000 && $scope.diffTime > $scope.actualExerciseTime - 1000) {
				console.log('Correcto:' + $scope.diffTime + ' entre ' + ($scope.actualExerciseTime + 1000) + ' y ' + ($scope.actualExerciseTime - 1000));
				$scope.correct = true;
			} else {
				console.log('Incorrecto:' + $scope.diffTime + ' entre ' + ($scope.actualExerciseTime + 1000) + ' y ' + ($scope.actualExerciseTime - 1000));
				$scope.correct = false;
			}
			if ($scope.correct) {
				$timeout(function() {
					$scope.nextExercise();
				}, 3000);
			}
		}

		$scope.setResult = function() {
			console.log('start setResult');
			ToneExercisesManager.setResult($scope.actualExercise.id, $scope.correct);
			$scope.unresolvedExercises = $filter('filter')($scope.unresolvedExercises, function(exercise) {
				return exercise.id != $scope.actualExercise.id
			});
		}

		$scope.nextExercise = function() {
			$scope.setResult();
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
		}
	});
