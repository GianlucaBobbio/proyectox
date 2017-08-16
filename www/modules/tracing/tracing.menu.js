angular.module('starter.controllers')
    .controller('TracingMenuCtrl', function($scope, ApiService, $filter, $stateParams, $state, SoundExercisesManager, $ionicPopup, ToneExercisesManager) {
        $scope.vm = {};
        $scope.selectExercise = function(exerciseType) {
        	if(exerciseType == 4){
        		$state.go('app.soundTracing');
        	}
        	if(exerciseType == 2){
        		$state.go('app.toneTracing');
        	}
        }
    });
