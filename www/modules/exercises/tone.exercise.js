angular.module('starter.controllers')
    .controller('ToneExerciseCtrl', function($scope, $rootScope, ApiService, $filter, resolvedExercises) {
        $scope.actualExercise = resolvedExercises.actualExercise;
        $scope.exercises = resolvedExercises.exercises;

        $scope.recordButton = function(argument) {
            if ($scope.recording) {
                $scope.resolveExercise();
            } else {
                $scope.startRecord();
            }
            $scope.recording = !$scope.recording;
        }
        var mediaRec = new Media(src,
            function() {},
            function(err) {});
        $scope.recording = true;
        var mediaTimer = null;
        var amplitudes = [];
        $scope.startRecord = function() {
            localStorage.setItem("actualToneExercise", $scope.actualExercise);
            var src = "tone" + $scope.actualExercise + ".mp3";
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
        $scope.resolveExercise = function() {
            clearInterval(mediaTimer);
            mediaRec.stopRecord();
            $scope.mediaAmplitude = (amplitudes.reduce((a, b) => a + b, 0)) / amplitudes.length;
        }
    });
