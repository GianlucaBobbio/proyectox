// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ui.router', 'starter.controllers', 'starter.directives', 'starter.api', 'firebase'])

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

.config(function($stateProvider, $urlRouterProvider) {
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
          templateUrl: 'modules/exercises/sound.categories.html',
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
    // .state('app.toneExercises', {
    //     url: '/exercises/tone',
    //     views: {
    //         'menuContent': {
    //             templateUrl: 'modules/exercises/tone.exercise.html',
    //             controller: 'ToneExerciseCtrl'
    //         }
    //     },
    //     resolve: {
    //         resolvedExercises: function(ApiService, $filter, $stateParams) {
    //             var storage = "actualToneExercise"
    //             return ApiService.getToneExercises().then(function(exercises) {
    //                 var actualStoragedExercise = localStorage.getItem(storage);
    //                 var actualExercise = null;
    //                 if (actualStoragedExercise && $filter('filter')(exercises, { id: parseInt(actualStoragedExercise, 10) }, true).length) {
    //                     actualExercise = parseInt(actualStoragedExercise, 10);
    //                 } else {
    //                     actualExercise = exercises[0].id;
    //                     localStorage.setItem(storage, exercises[0].id);
    //                 }
    //                 return {
    //                     exercises: exercises,
    //                     actualExercise: actualExercise
    //                 };
    //             });
    //         }
    //     }
    // })
    .state('app.soundExercises', {
      url: '/exercisesSound/:category',
      views: {
        'menuContent': {
          templateUrl: 'modules/exercises/sound.exercise.html',
          controller: 'SoundExerciseCtrl'
        }
      },
      resolve: {
        exercises: function(SoundExercisesManager, $filter, $stateParams) {
          var storage = "actualSoundExercise";
          return SoundExercisesManager.getExercisesByCategory(parseInt($stateParams.category, 10)).then(function(exercises) {
            var unresolved = $filter('filter')(exercises, function(exercise) {
              unresolved = true;
              if (exercise.correct === false || exercise.correct === true) {
                unresolved = false;
              }
              return unresolved;
            });
            return {
              all: exercises,
              unresolved: unresolved
            };
          });
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
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/menuexercises');
});
