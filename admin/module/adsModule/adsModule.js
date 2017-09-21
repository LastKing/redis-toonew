/**
 * Created by toonew on 2017/9/21.
 */
const adsModule = angular.module('adsModule', ['ui.router']);

//overview模块路由和依赖配置
adsModule.config(function ($stateProvider) {

  $stateProvider.state({
    name: 'ads',
    url: '/ads',
    controller: 'adsCtrl',
    templateUrl: '/admin/module/adsModule/adsModule.html',
  });
});
