angular.module('starter.controllers')
	.controller('VocalizationExerciseCtrl', function($scope, ApiService, $filter, exercises, VocalizationExercisesManager, $timeout, $state, $interval) {
		var mediaRec, mediaTimer = null;
		$scope.position = 0;
		$scope.recording = false;
		$scope.vm = {};
		$scope.actualExercise = null;
		var recognition = new(window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
		recognition.lang = 'es-AR';
		recognition.interimResults = false;
		recognition.maxAlternatives = 5;
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
			recognition.start();
		}

		recognition.onresult = function(event) {
			console.log(event);
			// var result = event;
			// debugger;
			// logHtml('Dijiste: ' + event.results[0][0].transcript + ' con una certeza del ' + (event.results[0][0].confidence * 100) + '%');
			// logHtml('Con otros ' + (event.results.length * event.results[0].length - 1) + ' resultados');
			for (var i = 0; i < event.results.length; i++) {
				for (var j = 0; j < event.results[i].length; j++) {
					// logHtml('Otros valores: ' + i + '-' + j + ' ' + event.results[i][j].transcript + ' ' + event.results[i][j].confidence);
				}
			}
			$scope.finishExercise();
		};

		function wait(ms) {
			var start = Date.now(),
				now = start;
			while (now - start < ms) {
				now = Date.now();
			}
		}

		$scope.finishExercise = function() {
			// ANALIZAR QUE EL RESULTADO SEA CORRECTO
			if ($scope.correct) {
				$timeout(function() {
					$scope.nextExercise();
				}, 3000);
			}
		}

		$scope.setResult = function() {
			console.log('start setResult');
			VocalizationExercisesManager.setResult($scope.actualExercise.id, $scope.correct);
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
