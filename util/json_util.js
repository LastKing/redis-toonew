/**
 * Created by toonew on 2017/9/14.
 */
function stringToObject(string) {
  let result = null;
  try {
    result = JSON.parse(string);
  } catch (err) {
    console.error(err);
    result = null;
  }
  return result;
}

function objectToSting(obj) {
  let result = null;
  try {
    result = JSON.stringify(obj);
  } catch (err) {
    console.error(err);
    result = "";
  }
  return result;
}

module.exports = {stringToObject, objectToSting};