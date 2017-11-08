/**
 * Created by toonew on 2017/9/20.
 */
const app = angular.module('app',
  [
    'ui.bootstrap', 'ui.router', 'toaster', 'angular-loading-bar',
    'ngAnimate',
    'adsModule'
  ]);

app.config(function ($stateProvider, $urlRouterProvider) {
  // 默认到hello路由
  $urlRouterProvider.otherwise("/hello");

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

  $stateProvider.state({
    name: 'ads',
    url: '/ads',
    controller: 'adsCtrl',
    templateUrl: '/admin/module/adsModule/adsModule.html',
  });

  $stateProvider.state({
    name: 'ads_save',
    url: '/ads_save',
    controller: 'adsSaveCtrl',
    templateUrl: '/admin/module/adsModule/adsSave.html',
  });

  $stateProvider.state(helloState);
  $stateProvider.state(aboutState);
});

app.run(function ($rootScope, $log) {
  $rootScope.$on('$viewContentLoaded', function (event, viewConfig) {
    $log.info(`内容重新加载时间${new Date().toLocaleString()}`);
  })
});

app.controller('rootCtrl', function ($scope, $http, toaster) {

});


