angular.module('starter.controllers')
	.controller('RhythmExerciseCtrl', function($scope, ApiService, $filter, exercises, RhythmExercisesManager, $timeout, $state, $interval) {
		var mediaRec, mediaTimer = null;
		$scope.position = 0;
		$scope.recording = false;
		$scope.vm = {};
		init();

		function init() {
			$scope.actualExercise = angular.copy(exercises.unresolved[$scope.position]);
			
			$scope.unresolvedExercises = exercises.unresolved;
			loadExercise();
		}

		function loadExercise() {
			
			$scope.actualExerciseTime = 0;
			$scope.actualExercise.phrase.forEach(word => {$scope.actualExerciseTime = $scope.actualExerciseTime + word.time})
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

		$scope.karaoke = function() {
			$scope.vm.hideMic = true;
			$timeout(function() {
				$scope.$digest();
			}, 1);
			var wait = 0;
			angular.forEach($scope.actualExercise.phrase, function(wordObject, index) {
				
				$timeout(function() {
					angular.forEach($scope.actualExercise.phrase, function(wordObject) { wordObject.highlighted = false; });
					wordObject.highlighted = true;
				}, wait);
				wait = wait + wordObject.time;
				if (index == $scope.actualExercise.phrase.length - 1) {
					$timeout(function() {
						angular.forEach($scope.actualExercise.phrase, function(wordObject) { wordObject.highlighted = false; });
						$scope.vm.hideMic = false;
					}, wait);
				}
			});
			angular.forEach($scope.actualExercise.phrase, function(wordObject) { wordObject.highlighted = false; });
			$timeout(function() {
				$scope.$digest();
			}, 1);
			
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
				$scope.correct = true;
			} else {
				
				$scope.correct = false;
			}
			if ($scope.correct) {
				$timeout(function() {
					$scope.nextExercise();
				}, 3000);
			}
		}

		$scope.setResult = function() {
			
			RhythmExercisesManager.setResult($scope.actualExercise.id, $scope.correct);
			$scope.unresolvedExercises = $filter('filter')($scope.unresolvedExercises, function(exercise) {
				return exercise.id != $scope.actualExercise.id
			});
		}

		$scope.nextExercise = function() {
			$scope.setResult();
			if ($scope.unresolvedExercises.length > 0) {
				
				if ($scope.position >= $scope.unresolvedExercises.length) {
					
					$scope.position = $scope.unresolvedExercises.length - 1;
				}
				$scope.actualExercise = angular.copy($scope.unresolvedExercises[$scope.position]);
				loadExercise();
				// $timeout(function() {
				// 	$scope.$apply();
				// }, 10);
			} else {
				
				alert("Ha finalizado todos los ejercicios");
				$state.go('app.menuexercises');
			}
		}
	});
