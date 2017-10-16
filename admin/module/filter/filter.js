/**
 * create by toonew on 2017.10.16
 */
app.filter('blank', function () {
  return function (x) {
    if (!x)
      return '""';
    else
      return `"${x}"` ;
  };
});