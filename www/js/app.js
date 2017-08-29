// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ui.router', 'starter.controllers', 'starter.directives', 'starter.api', 'firebase', 'chart.js'])

.run(function($ionicPlatform, $rootScope, ApiService, ExercisesManager, AuthService, $firebaseObject, $firebaseArray) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
  $rootScope.userId = AuthService.getUserUid();
  if ($rootScope.userId) {
    $rootScope.fireUser = $firebaseObject(firebase.database().ref("users/"+$rootScope.userId));
    $rootScope.fireUser.$loaded(function() {
      console.log($rootScope.fireUser);
      ExercisesManager.checkAndLoadExercises();
    });
  }
})

.config(function($stateProvider, $urlRouterProvider, ChartJsProvider) {
  ChartJsProvider.setOptions({ colors : [ '#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'] });
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'modules/login/login.html',
      controller: 'LoginCtrl',
      resolve: {
        logOut: function(AuthService) {
          return AuthService.logOut();
        }
      }
    })
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
    })
    .state('app.soundCategories', {
      url: '/soundcategories',
      views: {
        'menuContent': {
          templateUrl: 'modules/exercises/sound/sound.categories.html',
          controller: 'SoundCategoriesCtrl'
        }
      }
    })
    .state('app.profile', {
      url: '/profile',
      views: {
        'menuContent': {
          templateUrl: 'modules/profile/profile.html',
          controller: 'ProfileCtrl'
        }
      }
    })
     .state('app.changePassword', {
      url: '/changePassword',
      views: {
        'menuContent': {
          templateUrl: 'modules/changePassword/changePassword.html',
          controller: 'ChangePasswordCtrl'
        }
      }
    })
    .state('app.soundExercises', {
      url: '/exercisesSound/:category',
      views: {
        'menuContent': {
          templateUrl: 'modules/exercises/sound/sound.exercise.html',
          controller: 'SoundExerciseCtrl'
        }
      },
      resolve: {
        exercises: function(SoundExercisesManager, $filter, $stateParams, $q) {
          return SoundExercisesManager.getExercisesByCategory(parseInt($stateParams.category, 10)).then(function(exercises) {
            var unresolved = $filter('filter')(exercises, function(exercise) {
              unresolved = true;
              if (exercise.correct === false || exercise.correct === true) {
                unresolved = false;
              }
              return unresolved;
            });
            if(!unresolved || unresolved.length == 0){
              alert("Sin ejercicios pendientes por resolver.");
              console.log("Sin ejercicios pendientes por resolver");
              return $q.reject();
            }
            return {
              all: exercises,
              unresolved: unresolved
            };
          });
        }
      }
    })
    .state('app.soundTracing', {
      url: '/soundTracing',
      views: {
        'menuContent': {
          templateUrl: 'modules/tracing/sound.tracing.html',
          controller: 'SoundTracingCtrl'
        }
      },
      resolve: {
        exercisesCategory1: function(SoundExercisesManager, $filter, $stateParams, $q) {
          return SoundExercisesManager.getExercisesByCategory(1).then(function(exercises) {
            return {
              unresolveds: $filter('filter')(exercises, function(exercise){return !(exercise.correct === false || exercise.correct === true)}),
              corrects: $filter('filter')(exercises, function(exercise){return exercise.correct === true}),
              wrongs: $filter('filter')(exercises, function(exercise){return exercise.correct === false})
            };
          });
        },
        exercisesCategory2: function(SoundExercisesManager, $filter, $stateParams, $q) {
          return SoundExercisesManager.getExercisesByCategory(2).then(function(exercises) {
            return {
              unresolveds: $filter('filter')(exercises, function(exercise){return !(exercise.correct === false || exercise.correct === true)}),
              corrects: $filter('filter')(exercises, function(exercise){return exercise.correct === true}),
              wrongs: $filter('filter')(exercises, function(exercise){return exercise.correct === false})
            };
          });
        },
        exercisesCategory3: function(SoundExercisesManager, $filter, $stateParams, $q) {
          return SoundExercisesManager.getExercisesByCategory(3).then(function(exercises) {
            return {
              unresolveds: $filter('filter')(exercises, function(exercise){return !(exercise.correct === false || exercise.correct === true)}),
              corrects: $filter('filter')(exercises, function(exercise){return exercise.correct === true}),
              wrongs: $filter('filter')(exercises, function(exercise){return exercise.correct === false})
            };
          });
        },
        exercisesCategory4: function(SoundExercisesManager, $filter, $stateParams, $q) {
          return SoundExercisesManager.getExercisesByCategory(4).then(function(exercises) {
            return {
              unresolveds: $filter('filter')(exercises, function(exercise){return !(exercise.correct === false || exercise.correct === true)}),
              corrects: $filter('filter')(exercises, function(exercise){return exercise.correct === true}),
              wrongs: $filter('filter')(exercises, function(exercise){return exercise.correct === false})
            };
          });
        },
        exercisesCategory5: function(SoundExercisesManager, $filter, $stateParams, $q) {
          return SoundExercisesManager.getExercisesByCategory(5).then(function(exercises) {
            return {
              unresolveds: $filter('filter')(exercises, function(exercise){return !(exercise.correct === false || exercise.correct === true)}),
              corrects: $filter('filter')(exercises, function(exercise){return exercise.correct === true}),
              wrongs: $filter('filter')(exercises, function(exercise){return exercise.correct === false})
            };
          });
        }
      }
    })
    .state('app.toneExercises', {
      url: '/toneExercises',
      views: {
        'menuContent': {
          templateUrl: 'modules/exercises/tone/tone.exercise.html',
          controller: 'ToneExerciseCtrl'
        }
      },
      resolve: {
        exercises: function(ToneExercisesManager, $filter, $stateParams, $q) {
          return ToneExercisesManager.getExercises().then(function(exercises) {
            var unresolved = $filter('filter')(exercises, function(exercise) {
              unresolved = true;
              if (exercise.correct === false || exercise.correct === true) {
                unresolved = false;
              }
              return unresolved;
            });
            if(!unresolved || unresolved.length == 0){
              alert("Sin ejercicios pendientes por resolver.");
              console.log("Sin ejercicios pendientes por resolver");
              return $q.reject();
            }
            return {
              all: exercises,
              unresolved: unresolved
            };
          });
        }
      }
    })
    .state('app.rhythmExercises', {
      url: '/rhythmExercises',
      views: {
        'menuContent': {
          templateUrl: 'modules/exercises/rhythm/rhythm.exercise.html',
          controller: 'RhythmExerciseCtrl'
        }
      },
      resolve: {
        exercises: function(RhythmExercisesManager, $filter, $stateParams, $q) {
          return RhythmExercisesManager.getExercises().then(function(exercises) {
            var unresolved = $filter('filter')(exercises, function(exercise) {
              unresolved = true;
              if (exercise.correct === false || exercise.correct === true) {
                unresolved = false;
              }
              return unresolved;
            });
            if(!unresolved || unresolved.length == 0){
              alert("Sin ejercicios pendientes por resolver.");
              console.log("Sin ejercicios pendientes por resolver");
              return $q.reject();
            }
            return {
              all: exercises,
              unresolved: unresolved
            };
          });
        }
      }
    })
    .state('app.toneTracing', {
      url: '/toneTracing',
      views: {
        'menuContent': {
          templateUrl: 'modules/tracing/tone.tracing.html',
          controller: 'ToneTracingCtrl'
        }
      },
      resolve: {
        exercises: function(ToneExercisesManager, $filter, $stateParams, $q) {
          return ToneExercisesManager.getExercises().then(function(exercises) {
            return {
              unresolveds: $filter('filter')(exercises, function(exercise){return !(exercise.correct === false || exercise.correct === true)}),
              corrects: $filter('filter')(exercises, function(exercise){return exercise.correct === true}),
              wrongs: $filter('filter')(exercises, function(exercise){return exercise.correct === false})
            };
          });
        },
      }
    })
    .state('app.tonePractice', {
      url: '/tonePractice',
      views: {
        'menuContent': {
          templateUrl: 'modules/exercises/tone/tone.practice.html',
          controller: 'TonePracticeCtrl'
        }
      }
    })
    .state('app.menuexercises', {
      url: '/menuexercises',
      views: {
        'menuContent': {
          templateUrl: 'modules/exercises/exercises.menu.html',
          controller: 'ExercisesMenuCtrl'
        }
      }
    })
    .state('app.tracing', {
      url: '/tracing',
      views: {
        'menuContent': {
          templateUrl: 'modules/tracing/tracing.menu.html',
          controller: 'TracingMenuCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/menuexercises');
});
