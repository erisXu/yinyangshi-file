//結果を計算する関数
function showResult(){
// var $resultTitle = $('#resultTitle');
// if ($resultTitle[0].innerText.length > 0){};

//データベースをコピーする；
  var dataBase = charaData;
//DOMから必要な情報を拾う
//データベースからname情報を出すにも関わらず、念のため、そのままDOMから拾う
  var $names = $('.name'),
      $numbers = $('.number'),
      $resultTitle = $('#resultTitle'),
      $resultName = $('#resultName'),
      names_array = [],
      instance_array = [];

//キャラに共通のクラスを定義する；
  function CharaClass(name){
    this.name = name;
  };
  CharaClass.prototype = {
    getObject: function(){
      var name = this.name;
      return dataBase.filter(function(dataObj){
        return dataObj.name === name;
      }).shift();  //filterは必ず配列が変えてくるから、初めての要素だけ取る
    }/*,
// もしデータベースにさらにプロパティを追加する場合に便利なメソッド
    getValue: function(valueName){
      var object = this.getObject();
      return object[valueName];
    }*/
  }

//[name1,name1,name2,name2...]　キャラの人数分配列names_arrayにpushする
  if ($names.length === $numbers.length){
    for (var i = 0; i < $names.length; i++){
      pushNamesbyNumber($names[i],$numbers[i]);
    }
  }
// names_arrayからinstance_arrayを作る
  for (var i = 0; i < names_array.length; i++){
    var instance = new CharaClass(names_array[i]);
    var object = instance.getObject();
    instance_array.push(object);
  }
//------------------------------------以下のロジック判断部分：--------------------------------
  var allPatterns_array = [],
      firesum_array = [],
      attacksum_array = [],
      filteredObject= [],
      nameResult = [],
      finalResult = [],
      finalText="";
//すべての33キャラパターンを出す
  allPatterns_array = allThreePatterns(instance_array);
// fireが合計5以下のパターンをフィルター
  patternsFilterFires = filterFire(allPatterns_array);
//フィルターしたパターンのattach合計を計算する
  for (var i = 0; i < patternsFilterFires.length; i++){
    var pattern = patternsFilterFires[i];
    attacksum_array.push(addTogetherProperty(pattern,"attack", 0));
  }
// 上記フィルターしたオブジェクトに対して、attack合計最大な項目を出す
  filteredObject = filterMaxAttack(attacksum_array, patternsFilterFires);
//ネーム配列として整形し、重複項目を削除
  if (filteredObject.length > 0){
    for (var i = 0; i < filteredObject.length; i++){
     nameResult.push(addTogetherProperty(filteredObject[i],"name", "-"));
    }
  }
//ネーム結果配列に対して、2項目以上の場合、重複項目を削除する
  finalResult = deleteSame(nameResult, "-");
  for (var i = 0; i < finalResult.length; i++){
    finalText += finalResult[i].join(" and ");
  }

  return finalText;
//----------------------------------------------------関数定義：----------------------------------
/*関数pushNamesbyNumber：$number分の$nameを配列にpushする
  万が一クラス名を変更することを前提として*/
  function pushNamesbyNumber($name,$number){
    if ($name && $number){
      var name = $name.innerText,
          number = Number($number.value);　// .valueのブラウザ対応検討入り
      for(var i = 0; i < number; i++){
        names_array.push(name);
      }
    }
  }
//-----------パターン出すための関数----------------
//重複パターン削除

// 配列に対して、すべての3項目可能性を出す
  function allThreePatterns(array){
    var _array = copyArray(array);
    var len = _array.length,
        threePatterns= [];
    for (var i = 0; i < len-2;i++){
        var first = _array.shift(_array[0]);
        var randomTwo = ramdomTwoFromRest(_array);
        for (var n = 0; n < randomTwo.length; n++){
          threePatterns.push([first,randomTwo[n][0],randomTwo[n][1]]);
        }
    }
    return threePatterns;
  }
//shift作業などが元arrayに影響を与えないよう、copyします
  function copyArray(arr){
    var _arr = [];
    for (var i = 0; i< arr.length; i++){
      _arr.push(arr[i]);
    }
    return _arr;
  }
// 配列からすべての2項目パターンを出す
  function ramdomTwoFromRest(arr){
    var randomTwoArray = [];
    for (var i = 1, origin = 0; i < arr.length; i++){
   　randomTwoArray.push([arr[origin], arr[i]]);
 　　}
    return randomTwoArray;
  }
//------------ fire とattackのフィルターをつけるための関数-----------
  function filterFire(array){
    var result =[];
    for (var i = 0; i < array.length; i++){
      var sum = addTogetherProperty(array[i],"fire", 0);
      if (array[i].length === 3 && sum <= 5){
        result.push(array[i]);
      }
    }
    return result;
  }

//attachの合計最大値の番号を出し、その対応のオブジェクトを出す
  function filterMaxAttack(attach_array, object_array){
    var result = [];
    var max = Math.max.apply(null, attach_array);
    if(attach_array.length === object_array.length){
        for  (var i = 0; i < attach_array.length; i++){
          if (attach_array[i] === max){
            result.push(object_array[i]);
          }
      }
    }
    return result;
}

//[obj1, obj2, obj3]中の共通プロパティの合計を計算する
// 数値プロパティと文字プロパティを考える
// 数値の場合、0でjoinする、文字列の場合、後で区切りのため、"-"で繋がる
  function addTogetherProperty(array, property, join){
    var result;
    if (array.length > 0){
      //数値の場合、result=0; その他、result = ""
     result = (typeof(array[0][property]) === 'number'? 0 : "");
      for (var i = 0; i < array.length; i++){
        result += (join + array[i][property]);
      }
    }
    return result;
  }
    // 重複項目を削除する関数
    function deleteSame(array, join){
      var len = array.length,
           compare = [],
           different = [];
      compare = array[0].split(join); //結果は["",name1,name2,name3]になる；
      compare.shift(); //結果は[name1,name2,name3]になる；
      different.push(compare); // とりあえず配列の0番目をpushする；
    //nameresult文字列配列長さが1より長い場合に下記実行、それ以外にそのままarrayをreturnする
      if (len > 1){
        for (var i = 1; i < len; i++){
          if (array[i].indexOf(compare[0]) < 0  || array[i].indexOf(compare[1]) < 0 ||  array[i].indexOf(compare[2]) < 0){
            var namearray = array[i].split(join);
            namearray.shift();
            different.push(namearray);
          }
        }
      }
      return different;
    }
}
