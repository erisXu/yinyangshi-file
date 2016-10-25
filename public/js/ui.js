// 入力ミス判定実行
'jQuery' in window && (function ($) {
  $('#calSubmit').on('click', uiReaction);

//関数uiReaction：ユーザー入力後のリアクション関数：
  function uiReaction(){
    var $numbers = $('.number'),
        $error = $('.error'),
        $resultTitle = $('#resultTitle'),
        $resultName = $('#resultName'),
        Result = [];
// エラーメッセージを初期化する；
    $error.empty();
// 表示結果を初期化する；
    $resultTitle.empty();
    $resultName.empty();
//入力ミス判断
    for (var i = 0; i < $numbers.length; i++){
      errorCheck($numbers[i], $error[i]);
    }
//入力ミスのない場合、結果titleを表示させます
//cal.jsの判断に使う？
    if (Result.length == $numbers.length && addNumber(Result) >= 3){
      $resultTitle[0].innerText = "The best group are:";
      $resultName[0].innerText = showResult();
    }else{
      $resultTitle[0].innerText = "エラーが起こってます！";
    }

// 記入漏れやミスがあるかどうかの判断関数
    function errorCheck($_number, $error ){
      var num = $_number.value // 入力した文字列が返してくる
      //もし0-3の数字以外の入力の場合,、入力ミスのアラート
      if (!(num.match(/^[0-3]+$/))){
        $error.innerHTML = "入力ミスあります、修正してください！";
      }else{
        Result.push(num);
      }
    }
// 記入したキャラ合計数を計算する
    function addNumber(Result){
      var sum = 0;
      for (var i = 0; i < Result.length; i++){
        sum += Number(Result[i]);
      }
      return sum;
    }
  }
}(jQuery));
