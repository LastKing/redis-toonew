/**
 * Created by toonew on 2017/9/21.
 */
let adsFindCtrl = adsModule.controller('adsFindCtrl', function ($scope, $http, toaster) {
  $scope.displayStyle = 'json';//展现方式 默认JSON

  $scope.type = 'dev';//测试用
  $scope.key = 'niuer_open_app';
  $scope.field = '1_5_1';

  $scope.search = function () {
    let type = $scope.type || 'dev';
    let key = $scope.key;
    let field = encodeURIComponent($scope.field);


    let url = `/redis?command=hget&type=${type}&key=${key}&field=${field}`;
    $http.get(url).then(function (doc) {
      let ads = JSONTool(doc.data);

      ads.forEach(function (ad) {
        delete ad.ads_time;
        delete ad.order_time;
        return ad;
      });

      $scope.ads = ads;
    }).catch(err => {
      console.error(err);
    });
  };

  function JSONTool(str) {
    try {
      let json = JSON.parse(str);
      if (typeof json === 'string')
        json = JSONTool(json);

      return json;
    } catch (err) {
      return str;
    }
  }


  /**
   * 切换展现形式
   * @param style
   */
  $scope.displayStyleFunc = function (style) {
    $scope.displayStyle = style;
  };
});