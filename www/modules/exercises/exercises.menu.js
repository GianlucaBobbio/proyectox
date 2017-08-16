angular.module('starter.controllers')
    .controller('ExercisesMenuCtrl', function($scope, ApiService, $filter, $stateParams, $state, SoundExercisesManager, $ionicPopup, ToneExercisesManager) {
        $scope.vm = {};
        $scope.selectExercise = function(exerciseType) {
            $scope.vm.selected = exerciseType;
            // if (!$scope.vm.selected) {

            // } else if ($scope.vm.selected != exerciseType) {
            //     $scope.vm.selected = exerciseType;
            // } else if ($scope.vm.selected == exerciseType) {
            //     if (exerciseType == 2) {
            //      $state.go('app.toneExercises');
            //     } else if (exerciseType == 4){
            //         $state.go('app.soundCategories');
            //     } else {
            //         $state.go('app.exercises', { exerciseType: exerciseType });
            //     }
            // }
        }
        $scope.startSoundExercises = function() {
            $state.go('app.soundCategories');
        }
        $scope.startTonePractice = function() {
            $state.go('app.tonePractice');
        }
        $scope.startToneExercise = function() {
            $state.go('app.toneExercises');
        }
    });
