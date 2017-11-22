angular.module('starter.controllers')
	.controller('VocalizationExerciseCtrl', function($scope, ApiService, $filter, exercises, VocalizationExercisesManager, $timeout, $state, $interval) {
		$scope.position = 0;
		$scope.vm = {};
		$scope.actualExercise = null;
		$scope.result = {};
		// var recognition = new(window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
		var recognition = new SpeechRecognition();
		var actualResolved = false;
		recognition.lang = 'es-ES';
		recognition.interimResults = false;
		recognition.maxAlternatives = 5;
		init();

		function init() {
			$scope.actualExercise = angular.copy(exercises.unresolved[0]);
			$scope.unresolvedExercises = exercises.unresolved;
			console.log($scope.unresolvedExercises);
			loadExercise();
		}

		function loadExercise() {
			$scope.correct = null;
			actualResolved = false;
		}

		$scope.recordButton = function(argument) {
			recognition.start();
		}

		recognition.onresult = function(event) {
			$scope.result = {};
			// var result = event;
			// debugger;
			// logHtml('Dijiste: ' + event.results[0][0].transcript + ' con una certeza del ' + (event.results[0][0].confidence * 100) + '%');
			// logHtml('Con otros ' + (event.results.length * event.results[0].length - 1) + ' resultados');
			console.log(event.results);
			for (var i = 0; i < event.results.length; i++) {
				for (var j = 0; j < event.results[i].length; j++) {
					var transcript = event.results[i][j].transcript;
					var confidence = event.results[i][j].confidence;
					if (transcript.toLowerCase() == $scope.actualExercise.word.toLowerCase()) {
						$scope.result = {
							confidence: Math.round(confidence * 100)
						};
						break;
					}
					// logHtml('Otros valores: ' + i + '-' + j + ' ' + event.results[i][j].transcript + ' ' + event.results[i][j].confidence);
				}
			}
			if ($scope.result && $scope.result.confidence && $scope.result.confidence >= 90) {
				$scope.result.correct = true;
			} else {
				$scope.result.correct = false;
			}
			console.log($scope.result);
			$scope.finishExercise();
		};
		// recognition.onresult = function(event) {
		// 	$scope.result = {
		// 		confidence: 80,
		// 		correct: false
		// 	};
		// 	$scope.finishExercise();
		// }

		$scope.finishExercise = function() {
			if ($scope.result)
				$scope.correct = $scope.result.correct;
			else
				$scope.correct = false;
			$scope.$apply();
			if (!actualResolved) {
				actualResolved = true;
				$scope.setResult();
			}
			// ANALIZAR QUE EL RESULTADO SEA CORRECTO
			if ($scope.correct) {
				$timeout(function() {
					$scope.nextExercise();
				}, 3000);
			}
		}

		$scope.setResult = function() {
			VocalizationExercisesManager.setResult($scope.actualExercise.id, $scope.correct);
			$scope.unresolvedExercises = $filter('filter')($scope.unresolvedExercises, function(exercise) {
				return exercise.id != $scope.actualExercise.id
			});
		}
		$scope.nextExercise = function() {
			console.log($scope.unresolvedExercises);
			if ($scope.unresolvedExercises.length > 0) {
				$scope.actualExercise = angular.copy($scope.unresolvedExercises[0]);
				loadExercise();
			} else {
				alert("Ha finalizado todos los ejercicios");
				$state.go('app.menuexercises');
			}
		}
	});
