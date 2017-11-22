angular.module('starter.controllers')
    .controller('TonePracticeCtrl', function($scope, ToneExercisesManager, $timeout) {
        var mediaRec, mediaTimer = null;
        var amplitudes = [];
        $scope.recording = false;
        $scope.vm = {};
        $scope.vm.actualAmp = 0;
        $scope.maxLowerAmp = ToneExercisesManager.maxLowerAmplitude();
        $scope.minHigherAmp = ToneExercisesManager.minHigherAmplitude();

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
                        // if (amp > 0) {
                        //     amp = 15 * Math.log10((amp * 0.6325) / 0.00002);
                        //     $scope.mediaAmplitude = amp;
                        //     $scope.vm.actualAmp = amp;
                        //     if (amp > 30) {
                        //         amplitudes.push(amp);
                        //     }
                        // }
                        if(amp > 0) {
                            amp = 20 * Math.log10(amp * 32767);
                            // var p = amp * 32767 /51805.5336; //the value 51805.5336 can be derived from asuming that x=32767=0.6325 Pa and x=1 = 0.00002 Pa (the reference value)
                            // amp = (15 * Math.log10(p/0.00002));
                            // amp = 15 * Math.log(amp * 100000) / Math.LN10;
                            $scope.mediaAmplitude = amp;
                            $scope.vm.actualAmp = amp;
                            if (amp > 30) {
                                amplitudes.push(amp);
                            }
                        }
                        // $scope.prueba = amp;
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
