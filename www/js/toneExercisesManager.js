angular.module('starter.api')
  .service('ToneExercisesManager', function() {
    var exercisesDone = null;
    this.maxLowerAmplitude = function() {
    	return 0.33;
    }
    this.minHigherAmplitude = function() {
    	return 0.66;
    }
  });
