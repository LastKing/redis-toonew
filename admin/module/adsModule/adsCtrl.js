/**
 * Created by toonew on 2017/9/21.
 */
let adsCtrl = adsModule.controller('adsCtrl', function ($scope, $http, toaster) {
  $scope.displayStyle = 'json';//展现方式 默认JSON
  $scope.select_key_name = 'niuer_open_app';

  //获取 开屏/信息流 广告队列中存在的广告
  $scope.getAllField = function (key) {
    key = key || 'niuer_open_app';
    $scope.key = key;

    $http.get(`/redis/fields?key=${key}`).then(function (doc) {
      $scope.keys = doc.data;
      getHkeyLength($scope.select_key_name);
    }).catch(function (err) {
      console.error(err);
    });
  };
  $scope.getAllField();


  /**
   * 保存测试服务器上的数据到本地
   */
  $scope.saveToLocal = function (type) {
    $http.get(`/redis/saveToLocal?type=${type}&key=${$scope.select_key_name}`).then(function (doc) {
      if (doc.data.status === 'success') {
        toaster.pop('info', 'save', '保存成功');

        $scope.getAllField();
      }

    }).catch(function (err) {
      console.error(err);
    });
  };

  /**
   * 切换展现形式
   * @param style
   */
  $scope.displayStyleFunc = function (style) {
    $scope.displayStyle = style;
  };

  /**
   * 根据key和filed提取广告
   * @param field
   */
  $scope.getValue = function (field) {
    let paraments = {key: $scope.key, field: field};
    $http.post('/redis/getValueByKeyAndFie', paraments).then(function (doc) {
      let ads = JSON.parse(doc.data.data);
      ads.forEach(function (ad) {
        // delete ad.h && delete ad.w;
        return ad;
      });
      $scope.ads = ads;
    }).catch(function (err) {
      console.error(err);
    })
  };


  //获取当前显示的keys长度
  function getHkeyLength(key) {
    $http.get(`/redis/hkeyLength?key=${key}`).then(function (doc) {
      $scope.fieldLength = doc.data;
    });
  }

  getHkeyLength($scope.select_key_name);


});