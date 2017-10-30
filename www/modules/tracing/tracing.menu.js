angular.module('starter.controllers')
	.controller('TracingMenuCtrl', function($scope, ApiService, $filter, $stateParams, $state, SoundExercisesManager, $ionicPopup, ToneExercisesManager) {
		$scope.vm = {};
		$scope.selectExercise = function(exerciseType) {
			if (exerciseType == 4) {
				$state.go('app.soundTracing');
			}
			if (exerciseType == 2) {
				$state.go('app.toneTracing');
			}
			if (exerciseType == 3) {
				$state.go('app.rhythmTracing');
			}
			if (exerciseType == 5) {
				$state.go('app.recognitionTracing');
			}
		}

		$scope.sendMail = function() {
			var userName = $rootScope.fireUser.name;
			SoundExercisesManager.getExercisesByCategory(1).then(function(exercises) {
				var category1 = {
					unresolveds: $filter('filter')(exercises, function(exercise) { return !(exercise.correct === false || exercise.correct === true) }),
					corrects: $filter('filter')(exercises, function(exercise) { return exercise.correct === true }),
					wrongs: $filter('filter')(exercises, function(exercise) { return exercise.correct === false })
				};
				"En el ejercicio de Discriminación auditiva: En la categoría de Animales"
			});
		}
	});


// 
