angular.module('starter.controllers')
    .controller('SoundExerciseCtrl', function($scope, $rootScope, ApiService, $filter, exercises, SoundExercisesManager, $state, $stateParams) {
        $scope.position = 0;
        init();

        function init() {
            $scope.actualExercise = exercises.unresolved[$scope.position];
            $scope.unresolvedExercises = exercises.unresolved;
            var sound = null;
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

        $scope.nextExercise = function() {
            $scope.actualExercise = exercises.unresolved[$scope.position + 1];
            $scope.position = $scope.position + 1;
            loadExercise();
        }

        $scope.prevExercise = function() {
            $scope.actualExercise = exercises.unresolved[$scope.position - 1];
            $scope.position = $scope.position - 1;
            loadExercise();
        }

        $scope.playSound = function(exercise) {
            if (!$scope.playing) {
                sound = new Media('/android_asset/www/db/sounds/' + exercise.sound, function() {
                    // sound.play();   
                }, function(e) {
                    alert('error ' + e.code + ' ' + e.message);
                });
                sound.play();
                $scope.playing = true;
                setTimeout(function() {
                    sound.stop();
                    sound.release();
                    $scope.playing = false;
                }, 3000);
            } else {
                sound.stop();
                sound.release();
                $scope.playing = false;
            }
        }

        $scope.playSound = function(exercise) {}

        $scope.resolveExercise = function(selected) {
            var correct = false;
            if (selected.id == $scope.actualExercise.id) {
                correct = true;
            } else {
                $scope.playSound(selected);
            }
            if (!$scope.selected) {
                $scope.selected = selected;
                $scope.correct = correct;
                SoundExercisesManager.setResult($scope.actualExercise.id, correct);
            }
            if (correct) {
                setTimeout(function() {
                    $state.reload();
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
