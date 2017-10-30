angular.module('starter.controllers')
    .controller('ToneExerciseCtrl', function($scope, ApiService, $filter, exercises, ToneExercisesManager, $timeout, $state) {
        $scope.position = 0;

        var mediaRec, mediaTimer = null;
        var amplitudes = [];
        const Pref = 0.0002; // 210-5  
        const C = 50000; // Factor de Conversión
        const noiseLevel = 30; // Nivel de sonido ambiente en decibeles. Este valor varía de acuerdo al ejercicio.
        $scope.recording = false;
        $scope.vm = {};
        $scope.vm.actualAmp = 0;
        $scope.mediaAmplitude = 0;
        $scope.maxLowerAmp = ToneExercisesManager.maxLowerAmplitude() * 100;
        $scope.minHigherAmp = ToneExercisesManager.minHigherAmplitude() * 100;

        
        init();

        function init() {
            $scope.actualExercise = angular.copy(exercises.unresolved[$scope.position]);
            $scope.unresolvedExercises = exercises.unresolved;
            loadExercise();
        }

        function loadExercise() {
            
            
            $scope.correct = null;
            $scope.vm.actualAmp = 0;
            $scope.mediaAmplitude = 0;
            $scope.vm.showHelp = false;
            $scope.recording = false;
        }

        $scope.recordButton = function(argument) {
            if ($scope.recording) {
                $scope.recording = false;
                //timeout necesario para que corra el digest
                $timeout(function() {
                    $scope.stopRecord();
                }, 10);
            } else {
                $scope.recording = true;
                $scope.startRecord();
            }
        }

        $scope.startRecord = function() {
            mediaRec = new Media("toneExercise.mp3", function() {}, function(err) {});
            mediaRec.startRecord();
            amplitudes = [];
            mediaTimer = setInterval(function() {
                mediaRec.getCurrentAmplitude(
                    function(amp) {
                        // if (amp > 0) {
                        //     amp = amp * 32768;
                        //     var P = amp / C;
                        //     var ampDb = 20 * Math.log10(P / Pref);
                        //     $scope.vm.actualAmp = amp;
                        //     // Sólo si la amplitud es mayor al nivel mínimo del sonido ambiente registramos el valor, caso contrario no podemos estar asegurando grabar un registro de la voz de la persona.
                        //     if (ampDb > noiseLevel) {
                        //         amplitudes.push(ampDb);
                        //     }
                        // }
                        if (amp > 0) {
                            amp = 15 * Math.log10((amp * 0.6325) / 0.00002);
                            $scope.vm.actualAmp = amp;
                            if (amp > 30) {
                                amplitudes.push(amp);
                            }
                        }
                        $scope.$digest();
                    },
                    function(e) {
                        alert("Error getting amp=" + e);
                    }
                );
            }, 10);
        }

        $scope.stopRecord = function() {
            clearInterval(mediaTimer);
            mediaRec.stopRecord();
            $scope.mediaAmplitude = (amplitudes.reduce((a, b) => a + b, 0)) / amplitudes.length;
            $scope.vm.actualAmp = $scope.mediaAmplitude;
            $scope.finishExercise();
        }

        $scope.finishExercise = function() {
            $scope.vm.showHelp = true;
            if ($scope.mediaAmplitude > $scope.actualExercise.toneFrom && $scope.mediaAmplitude <= $scope.actualExercise.toneTo) {
                
                $scope.correct = true;
            } else {
                
                $scope.correct = false;
            }
            $scope.setResult();
            $timeout(function() {
                if ($scope.unresolvedExercises.length > 0) {
                    
                    if ($scope.position >= $scope.unresolvedExercises.length) {
                        
                        $scope.position = $scope.unresolvedExercises.length - 1;
                    }
                    $scope.actualExercise = angular.copy($scope.unresolvedExercises[$scope.position]);
                    loadExercise();
                    $scope.$apply();
                } else {
                    
                    alert("Ha finalizado todos los ejercicios");
                    $state.go('app.menuexercises');
                }
            }, 3000);
        }

        $scope.setResult = function() {
            
            ToneExercisesManager.setResult($scope.actualExercise.id, $scope.correct);
            $scope.unresolvedExercises = $filter('filter')($scope.unresolvedExercises, function(exercise) {
                return exercise.id != $scope.actualExercise.id
            });
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
        //     $scope.finishExercise();
        // }
    });
