angular.module('starter.controllers')
	.controller('TracingMenuCtrl', function($scope, ApiService, $filter, $stateParams, $state, SoundExercisesManager, $ionicPopup, ToneExercisesManager) {
		$scope.vm = {};
		$scope.selectExercise = function(exerciseType) {
			if (exerciseType == 4) {
				$state.go('app.soundTracing');
			}
			if (exerciseType == 2) {
				$state.go('app.toneTracing');
			}
			if (exerciseType == 3) {
				$state.go('app.rhythmTracing');
			}
			if (exerciseType == 5) {
				$state.go('app.recognitionTracing');
			}
		}

		$scope.sendMail = function() {
			var sound = {
				exercisesCategory1: function(SoundExercisesManager, $filter, $stateParams, $q) {
					return SoundExercisesManager.getExercisesByCategory(1).then(function(exercises) {
						return {
							unresolveds: $filter('filter')(exercises, function(exercise) { return !(exercise.correct === false || exercise.correct === true) }),
							corrects: $filter('filter')(exercises, function(exercise) { return exercise.correct === true }),
							wrongs: $filter('filter')(exercises, function(exercise) { return exercise.correct === false })
						};
					});
				},
				exercisesCategory2: function(SoundExercisesManager, $filter, $stateParams, $q) {
					return SoundExercisesManager.getExercisesByCategory(2).then(function(exercises) {
						return {
							unresolveds: $filter('filter')(exercises, function(exercise) { return !(exercise.correct === false || exercise.correct === true) }),
							corrects: $filter('filter')(exercises, function(exercise) { return exercise.correct === true }),
							wrongs: $filter('filter')(exercises, function(exercise) { return exercise.correct === false })
						};
					});
				},
				exercisesCategory3: function(SoundExercisesManager, $filter, $stateParams, $q) {
					return SoundExercisesManager.getExercisesByCategory(3).then(function(exercises) {
						return {
							unresolveds: $filter('filter')(exercises, function(exercise) { return !(exercise.correct === false || exercise.correct === true) }),
							corrects: $filter('filter')(exercises, function(exercise) { return exercise.correct === true }),
							wrongs: $filter('filter')(exercises, function(exercise) { return exercise.correct === false })
						};
					});
				},
				exercisesCategory4: function(SoundExercisesManager, $filter, $stateParams, $q) {
					return SoundExercisesManager.getExercisesByCategory(4).then(function(exercises) {
						return {
							unresolveds: $filter('filter')(exercises, function(exercise) { return !(exercise.correct === false || exercise.correct === true) }),
							corrects: $filter('filter')(exercises, function(exercise) { return exercise.correct === true }),
							wrongs: $filter('filter')(exercises, function(exercise) { return exercise.correct === false })
						};
					});
				},
				exercisesCategory5: function(SoundExercisesManager, $filter, $stateParams, $q) {
					return SoundExercisesManager.getExercisesByCategory(5).then(function(exercises) {
						return {
							unresolveds: $filter('filter')(exercises, function(exercise) { return !(exercise.correct === false || exercise.correct === true) }),
							corrects: $filter('filter')(exercises, function(exercise) { return exercise.correct === true }),
							wrongs: $filter('filter')(exercises, function(exercise) { return exercise.correct === false })
						};
					});
				}
			};
			var recognition = RecognitionExercisesManager.getExercises().then(function(exercises) {
				return {
					unresolveds: $filter('filter')(exercises, function(exercise) { return !(exercise.correct === false || exercise.correct === true) }),
					corrects: $filter('filter')(exercises, function(exercise) { return exercise.correct === true }),
					wrongs: $filter('filter')(exercises, function(exercise) { return exercise.correct === false })
				};
			});
			var tone = ToneExercisesManager.getExercises().then(function(exercises) {
				return {
					unresolveds: $filter('filter')(exercises, function(exercise) { return !(exercise.correct === false || exercise.correct === true) }),
					corrects: $filter('filter')(exercises, function(exercise) { return exercise.correct === true }),
					wrongs: $filter('filter')(exercises, function(exercise) { return exercise.correct === false })
				};
			});
			var rhythm = RhythmExercisesManager.getExercises().then(function(exercises) {
				return {
					unresolveds: $filter('filter')(exercises, function(exercise) { return !(exercise.correct === false || exercise.correct === true) }),
					corrects: $filter('filter')(exercises, function(exercise) { return exercise.correct === true }),
					wrongs: $filter('filter')(exercises, function(exercise) { return exercise.correct === false })
				};
			});
		}
	});


//
