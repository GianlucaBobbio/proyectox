angular.module('starter.controllers')
    .controller('SoundCategoriesCtrl', function($scope, ApiService, $filter, $stateParams, $state) {
        $scope.vm = {};
        $scope.selectExercise = function(exerciseType) {
        	$state.go('app.soundExercises', {category: exerciseType});
        }
    });
