angular.module('starter.controllers')
    .controller('ToneExerciseCtrl', function($scope, ApiService, $filter, exercises, ToneExercisesManager, $timeout, $state) {
        $scope.position = 0;

        var mediaRec, mediaTimer = null;
        var amplitudes = [];
        $scope.recording = false;
        $scope.vm = {};
        $scope.vm.actualAmp = 0;
        $scope.mediaAmplitude = 0;
        $scope.maxLowerAmp = ToneExercisesManager.maxLowerAmplitude() * 100;
        $scope.minHigherAmp = ToneExercisesManager.minHigherAmplitude() * 100;

        console.log('gato');
        init();

        function init() {
            $scope.actualExercise = angular.copy(exercises.unresolved[$scope.position]);
            $scope.unresolvedExercises = exercises.unresolved;
            loadExercise();
        }

        function loadExercise() {
            console.log($scope.actualExercise);
            console.log('start loadExercise');
            $scope.correct = null;
            $scope.vm.actualAmp = 0;
            $scope.mediaAmplitude = 0;
            $scope.vm.showHelp = false;
        }

        $scope.recordButton = function(argument) {
            if ($scope.recording) {
                $scope.stopRecord();
            } else {
                $scope.startRecord();
            }
            $scope.recording = !$scope.recording;
        }

        $scope.startRecord = function() {
            mediaRec = new Media("toneFree.mp3", function() {}, function(err) {});
            mediaRec.startRecord();
            amplitudes = [];
            mediaTimer = setInterval(function() {
                mediaRec.getCurrentAmplitude(
                    function(amp) {
                        amplitudes.push(amp);
                    },
                    function(e) {
                        console.log("Error getting amp=" + e);
                    }
                );
            }, 500);
        }

        $scope.stopRecord = function() {
            clearInterval(mediaTimer);
            mediaRec.stopRecord();
            $scope.mediaAmplitude = (amplitudes.reduce((a, b) => a + b, 0)) / amplitudes.length;
            $scope.finishExercise();
        }

        $scope.finishExercise = function() {
            if ($scope.mediaAmplitude * 100 > $scope.actualExercise.toneFrom && $scope.mediaAmplitude * 100 <= $scope.actualExercise.toneTo) {
                console.log('Correcto:' + $scope.mediaAmplitude * 100 + ' entre ' + $scope.actualExercise.toneFrom + ' y ' + $scope.actualExercise.toneTo);
                $scope.correct = true;
            } else {
                console.log('Incorrecto:' + $scope.mediaAmplitude * 100 + ' entre ' + $scope.actualExercise.toneFrom + ' y ' + $scope.actualExercise.toneTo);
                $scope.correct = false;
            }
            $scope.setResult();
            $timeout(function() {
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
            }, 3000);
        }

        $scope.setResult = function() {
            console.log('start setResult');
            ToneExercisesManager.setResult($scope.actualExercise.id, $scope.correct);
            $scope.unresolvedExercises = $filter('filter')($scope.unresolvedExercises, function(exercise) {
                return exercise.id != $scope.actualExercise.id
            });
        }

        $scope.startRecord = function() {
            mediaTimer = setInterval(function() {
                var amp = Math.random();
                $scope.vm.actualAmp = amp;
                amplitudes.push(amp);
                $scope.$digest();
            }, 500);
        }
        $scope.stopRecord = function(argument) {
            clearInterval(mediaTimer);
            $scope.mediaAmplitude = (amplitudes.reduce((a, b) => a + b, 0)) / amplitudes.length;
            $scope.vm.actualAmp = $scope.mediaAmplitude;
            $scope.finishExercise();
        }
    });
