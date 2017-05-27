angular.module('starter.controllers')
    .controller('ExercisesCtrl', function($scope, $rootScope, ApiService, $filter, resolvedExercises) {
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
        var src = "myrecording.mp3";
        // var mediaRec = new Media(src,
        //     // success callback
        //     function() {
        //         alert("recordAudio():Audio Success");
        //     },

        //     // error callback
        //     function(err) {
        //         alert("recordAudio():Audio Error: " + err.code);
        //     });

        $scope.recognizedText = "";
        var recognition = new SpeechRecognition(); // To Device
        recognition.lang = 'es-ES';

        recognition.onresult = function(event) {
            if (event.results.length > 0) {
                $scope.recognizedText = event.results[0][0].transcript;
                $scope.$apply();
            }
        };

        $scope.startRecord = function() {
            localStorage.setItem("actualExercise", $scope.actualExercise);
            recognition.start();
            // Record audio
            // mediaRec.startRecord();
        }
        $scope.resolveExercise = function() {
        	alert($scope.recognizedText);
            recognition.stop();
            // mediaRec.stopRecord();
            // mediaRec.play();
            // setTimeout(function() {
            //     mediaRec.pause();
            // }, 10000); 
        }
        $scope.lucho = "caca";
    });
