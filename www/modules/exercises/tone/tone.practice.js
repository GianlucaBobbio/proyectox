angular.module('starter.controllers')
    .controller('TonePracticeCtrl', function($scope, ToneExercisesManager, $timeout) {
        var mediaRec, mediaTimer = null;
        var amplitudes = [];
        $scope.recording = false;
        $scope.vm = {};
        $scope.vm.actualAmp = 0;
        $scope.maxLowerAmp = ToneExercisesManager.maxLowerAmplitude() * 100;
        $scope.minHigherAmp = ToneExercisesManager.minHigherAmplitude() * 100;

        $scope.recordButton = function(argument) {
            if ($scope.recording) {
                $timeout(function() {
                    $scope.stopRecord();
                }, 10);
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
                        if (amp > 0) {
                            amp = 15 * Math.log10((amp * 0.6325) / 0.00002);
                            $scope.mediaAmplitude = amp;
                            $scope.vm.actualAmp = amp;
                            if (amp > 30) {
                                amplitudes.push(amp);
                            }
                        }
                        $scope.$digest();
                    },
                    function(e) {
                        
                    }
                );
            }, 10);
        }

        $scope.stopRecord = function() {
            clearInterval(mediaTimer);
            mediaRec.stopRecord();
            $scope.mediaAmplitude = (amplitudes.reduce((a, b) => a + b, 0)) / amplitudes.length;
            $scope.vm.actualAmp = $scope.mediaAmplitude;
        }

        // $scope.startRecord = function() {
        //     mediaTimer = setInterval(function() {
        //         var amp = Math.random();
        //         $scope.vm.actualAmp = amp;
        //         amplitudes.push(amp);
        //         $scope.$digest();
        //     }, 500);
        // }
        // $scope.stopRecord = function(argument) {
        //     clearInterval(mediaTimer);
        //     $scope.mediaAmplitude = (amplitudes.reduce((a, b) => a + b, 0)) / amplitudes.length;
        //     $scope.vm.actualAmp = $scope.mediaAmplitude;
        // }
    });
