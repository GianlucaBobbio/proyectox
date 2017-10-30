angular.module('starter.controllers')
    .controller('ExercisesMenuCtrl', function($scope, ApiService, $filter, $stateParams, $state, SoundExercisesManager, $ionicPopup, ToneExercisesManager) {
        $scope.vm = {};
        $scope.selectExercise = function(exerciseType) {
            $scope.vm.selected = exerciseType;
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
        $scope.startRhythmExercises = function(){
            $state.go('app.rhythmExercises');   
        }
        $scope.startRecognitionExercises = function(){
            $state.go('app.recognitionExercises');
        }
        $scope.startVocalizationExercises = function(){
            $state.go('app.vocalizationExercises');   
        }
    });
