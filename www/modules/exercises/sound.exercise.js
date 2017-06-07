angular.module('starter.controllers')
    .controller('SoundExerciseCtrl', function($scope, $rootScope, ApiService, $filter, exercises, SoundExercisesManager, $state) {
        $scope.actualExercise = exercises.unresolved[0];
        $scope.unresolvedExercises = exercises.unresolved;
        var sound = null;
        loadExercise();

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
            $scope.actualExercise = exercises.unresolved.filter(function(exercise) {
                return exercise.id == $scope.actualExercise.id + 1;
            })[0];
            loadExercise();
        }

        $scope.prevExercise = function() {
            $scope.actualExercise = exercises.unresolved.filter(function(exercise) {
                return exercise.id == $scope.actualExercise.id - 1;
            })[0];
            loadExercise();
        }

        $scope.playSound = function(argument) {
            if (!$scope.playing) {
                sound = new Media('db/sounds/' + $scope.actualExercise.sound);
                sound.play();
                $scope.playing = true;
            } else {
                sound.pause();
                $scope.playing = false;
            }
        }

        $scope.resolveExercise = function(selected) {
            $scope.selected = selected;
            // var selectedSound = new Media('db/sounds/' + selected.sound);
            // selectedSound.play();
            var correct = false;
            if (selected.id == $scope.actualExercise.id) {
                correct = true;
            }
            $scope.correct = correct;
            SoundExercisesManager.setResult($scope.actualExercise.id, correct);
            $state.reload();
            if ($scope.playing) {
                // sound.pause();
                $scope.playing = false;
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
