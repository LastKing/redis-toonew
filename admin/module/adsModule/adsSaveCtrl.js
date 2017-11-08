/**
 * Created by toonew on 2017/9/21.
 */
let adsSaveCtrl = adsModule.controller('adsSaveCtrl', function ($scope, $http, toaster) {


  //获取当前显示的keys长度
  function getHkeyLength(key) {
    $http.get(`/redis/hkeyLength?key=${key}`).then(function (doc) {
      $scope.fieldLength = doc.data;
    });
  }

  getHkeyLength($scope.select_key_name);
});