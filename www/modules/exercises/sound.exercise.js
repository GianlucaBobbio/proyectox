angular.module('starter.controllers')
    .controller('SoundExerciseCtrl', function($scope, $rootScope, ApiService, $filter, exercises, SoundExercisesManager, $state, $timeout) {
        $scope.position = 0;
        $scope.playing = false;
        var sound = null;
        var positionFix = false;
        init();

        function init() {
            $scope.actualExercise = exercises.unresolved[$scope.position];
            $scope.unresolvedExercises = exercises.unresolved;
            loadExercise();
        }

        function loadExercise() {
            $scope.compareExercises = [];
            $scope.selected = null;
            $scope.correct = null;
            $scope.compareExercises.push($scope.actualExercise);
            loadCompareExercises($scope.actualExercise.category);
            $scope.playing = false;
            sound = null;
        }

        function stopPlaying() {
            if ($scope.playing) {
                sound.stop();
                sound.release();
                $scope.playing = false;
            }
        }

        $scope.nextExercise = function() {
            stopPlaying();
            if (positionFix) {
                $scope.actualExercise = exercises.unresolved[$scope.position];
                positionFix = false;
            } else {
                $scope.actualExercise = exercises.unresolved[$scope.position + 1];
                $scope.position = $scope.position + 1;
            }
            loadExercise();
        }

        $scope.prevExercise = function() {
            stopPlaying();
            $scope.actualExercise = exercises.unresolved[$scope.position - 1];
            $scope.position = $scope.position - 1;
            loadExercise();
        }

        $scope.playSound = function(exercise) {
            stopPlaying();
            sound = new Media('/android_asset/www/db/sounds/' + exercise.sound, function() {
                // sound.play();   
            }, function(e) {
                // alert('error ' + e.code + ' ' + e.message);
            });
            sound.play();
            $scope.playing = true;
            // setTimeout(function() {
                // stopPlaying();
            // }, 3000);
        }

        // $scope.playSound = function(exercise) {}

        $scope.resolveExercise = function(selected) {
            var correct = false;
            $scope.playSound(selected);
            if (selected.id == $scope.actualExercise.id) {
                correct = true;
            }
            if (!$scope.selected) {
                $scope.selected = selected;
                $scope.correct = correct;
                SoundExercisesManager.setResult($scope.actualExercise.id, correct);
                exercises.unresolved = $filter('filter')(exercises.unresolved, function(exercise) {
                    return exercise.id != $scope.actualExercise.id });
                positionFix = true;
            }
            if (correct) {
                $timeout(function() {
                    stopPlaying();
                    // $state.reload();
                    $scope.actualExercise = exercises.unresolved[$scope.position];
                    positionFix = false;
                    loadExercise();
                    $scope.$apply();
                }, 2000);
                // init();
                // $state.transitionTo($state.current, $stateParams, { reload: true, inherit: false, notify: true });
            }
        }

        function loadCompareExercises(category) {
            var filteredExercises = exercises.all.filter(function(exercise) {
                return exercise.category == category;
            });
            var randomExercise = filteredExercises[Math.floor(Math.random() * filteredExercises.length)];
            var contains = $scope.compareExercises.filter(function(exercise) {
                return exercise.id == randomExercise.id;
            });
            if (contains.length == 0) {
                $scope.compareExercises.push(randomExercise);
            }
            if ($scope.compareExercises.length < $scope.actualExercise.toCompare) {
                loadCompareExercises(category);
            } else {
                $scope.compareExercises = shuffle($scope.compareExercises);
            }
        }

        function shuffle(array) {
            var currentIndex = array.length,
                temporaryValue, randomIndex;

            // While there remain elements to shuffle...
            while (0 !== currentIndex) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }

            return array;
        }
    });
