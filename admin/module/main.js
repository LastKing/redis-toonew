/**
 * Created by toonew on 2017/9/20.
 */
const app = angular.module('app', ['ui.bootstrap', 'ui.router', 'toaster', 'ngAnimate',
  'adsModule']);

app.config(function ($stateProvider, $urlRouterProvider) {
  // 默认到overview路由
  $urlRouterProvider.otherwise("/overview");

  let helloState = {
    name: 'hello',
    url: '/hello',
    template: `<h3>Hello World</h3>`
  };

  let aboutState = {
    name: 'about',
    url: '/about',
    template: '<h3>Its the UI-Router hello world app!</h3>'
  };

  let ads = {
    name: 'ads',
    url: '/ads',
    controller: ''
  };

  $stateProvider.state(helloState);
  $stateProvider.state(aboutState);
});

app.controller('rootCtrl', function ($scope, $http, toaster) {
  $scope.oneAtATime = true;

  $scope.groups = [
    {
      title: 'Dynamic Group Header - 1',
      content: 'Dynamic Group Body - 1'
    },
    {
      title: 'Dynamic Group Header - 2',
      content: 'Dynamic Group Body - 2'
    }
  ];

  $scope.items = ['Item 1', 'Item 2', 'Item 3'];

  $scope.addItem = function () {
    var newItemNo = $scope.items.length + 1;
    $scope.items.push('Item ' + newItemNo);
  };

  $scope.status = {
    isCustomHeaderOpen: false,
    isFirstOpen: true,
    isFirstDisabled: false
  };
});

// app.run('$rootScope', function ($rootScope, $log) {
//   $rootScope.$on('$viewContentLoaded', function (event, viewConfig) {
//     var before = new Date();
//     var after = new Date();
//     $log.debug("扫描并初始化界面元素 [耗时 " + (after.getTime() - before.getTime()) + " ms]");
//   })
// });

// $http.get('/redis').then(function (doc) {
//   $scope.redis = doc.data;
//   for (let key in $scope.redis) {
//     if ($scope.redis.hasOwnProperty(key))
//       $scope.redis[key] = JSON.parse($scope.redis[key]);
//   }
// }).catch(function (err) {
//   console.error(err);
// });
