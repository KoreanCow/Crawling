const express = require('express');
const router = express.Router();

const request = require('request');
const cheerio = require('cheerio');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/cheerioTest', function(req, res, next) {
  let url = "http://movie.naver.com/movie/sdb/rank/rmovie.nhn";

  request(url, function(error, response, body){
    // console.log(body) 파싱 내용 확인
    // cheerio 모듈은 jQuery와 유사 -> HTML요소에 접근하기위해 셀렉터 사용
    
    let resultArr = [];
    const $ = cheerio.load(body);
    // 백에서 jQuery 셀렉터를 사용할 수 있도록 jQuery 기호인
    // $변수에 cheerio.load() 메소드를 호출한 값을 할당
    // 메소드의 인자로 request(url)의 실행 데이터를 body넘겨줌


    let colArr = $(".tit3"); 
    // 영화 이름의 클래스가 tit3

    for(let i = 0; i < colArr.length; i++){
      resultArr.push(colArr[i].children[1].attribs.title)
      // 모든 tit3 클래스를 resultArr에 담음
    }

    res.json(resultArr);
  })
})
module.exports = router;
