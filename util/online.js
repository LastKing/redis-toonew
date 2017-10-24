/**
 * Created by Rain on 17/10/19
 */
const http = require('superagent');
const fs = require('fs');
const co = require('co');


// co(function* () {
//   let doc = yield http.get('http://106.14.26.43:3001/redis?command=hgetall&key=ssp_need_demand');
//   let allAds = doc.text;
//
//   fs.writeFileSync('./test2.js', allAds);
//   process.exit(1);
// });


let data = JSON.parse(fs.readFileSync('./value.js'));

for (let key in data) {
  if (data.hasOwnProperty(key)) {
    fs.writeFileSync(`./${key}.json`, data[key]);

    let r = JSON.parse(data[key]);

    let ads = '';
    for (var i = 0; i < r.length; i++)
      ads += i + '_' + r[i].aid + ' ';

    console.log(`${key} :  length=${r.length} , ${ads}`);
  }
}



