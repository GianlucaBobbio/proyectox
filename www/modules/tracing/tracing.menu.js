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
			if (exerciseType == 1) {
				$state.go('app.vocalizationTracing');
			}
		}

	});


//
