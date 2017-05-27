angular.module('starter.controllers')
    .controller('ExercisesMenuCtrl', function($scope, ApiService, $filter, $stateParams, $state) {
        $scope.vm = {};
        $scope.selectExercise = function(exerciseType) {
            if (!$scope.vm.selected) {
                $scope.vm.selected = exerciseType;
            } else if ($scope.vm.selected != exerciseType) {
                $scope.vm.selected = exerciseType;
            } else if ($scope.vm.selected == exerciseType) {
                if (exerciseType == 2) {
                	$state.go('app.toneExercises');
                } else if (exerciseType == 4){
                    $state.go('app.soundCategories');
                } else {
                    $state.go('app.exercises', { exerciseType: exerciseType });
                }
            }
        }
    });
