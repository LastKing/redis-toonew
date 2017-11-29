/**
 * Created by toonew on 2017/9/21.
 */
let adsFindCtrl = adsModule.controller('adsFindCtrl', function ($scope, $http, locals, toaster) {
  $scope.displayStyle = 'json';//展现方式 默认JSON

  $scope.type = 'dev';//测试用
  $scope.key = locals.get('key2', 'niuer_open_app');  //local get方法获取不能用key关键字，有bug
  $scope.field = locals.get('field', '1_5_1');

  //查询redis 工具
  $scope.search = function () {
    if (!$scope.key || !$scope.field) {
      toaster.pop('warning', 'save', '参数缺失');
      return;
    }

    locals.set('key2', $scope.key);
    locals.set('field', $scope.field);

    let type = $scope.type || 'dev';
    let key = $scope.key;
    let field = encodeURIComponent($scope.field);


    let url = `/redis?command=hget&type=${type}&key=${key}&field=${field}`;

    $http.get(url).then(function (doc) {
      let ads;
      if (!Array.isArray(doc.data))
        ads = JSONTool(doc.data);
      else
        ads = doc.data;

      if (Array.isArray(ads))
        ads.forEach(function (ad) {
          delete ad.ads_time;
          delete ad.order_time;
          return ad;
        });
      else {
        $scope.displayStyle = 'string';
        $scope.ads = ads;
        toaster.pop('warning', 'save', '您查询的值不存在或者不是json');
      }

      $scope.ads = ads;
    }).catch(err => {
      toaster.pop('warning', 'save', err);
      console.error(err);
    });
  };

  $scope.saveAdToLocal = function () {
    let type = $scope.type || 'dev';
    let key = $scope.key;
    let field = encodeURIComponent($scope.field);

    let url = `/redis?command=hget&type=${type}&key=${key}&field=${field}`;
    $http.get(url).then(function (result) {
      if (result = 'success')
        toaster.pop('info', '查询成功', '');
    }).catch(function (err) {
      toaster.pop('warning', '查询失败', '');
    });
  };

  //递归json 格式化工具
  function JSONTool(str) {
    try {
      let json = JSON.parse(str);
      console.log(str);
      if (typeof json === 'string')
        return JSONTool(json);
    } catch (err) {
      return {reason: err, str};
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