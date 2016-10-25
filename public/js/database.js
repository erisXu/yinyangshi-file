// 初期化するためのファイル
//手動でデータベースを用意しました
var charaData = [
{name: "snow",
 fire: 2,
 attack: 700
},
{name: "bird",
 fire: 1,
 attack: 300
},
{name: "fox",
 fire: 1,
 attack: 450
},
{name: "seimei",
 fire: 1,
 attack: 440
},
{name: "fish",
 fire: 3,
 attack: 1000
}
];
// 初期化関数
function init($id, DB){
  var nameArray = [];
  //名前文字列をhtmlリスト形に整形する関数
  function evaluateName(charaInfo){
    var name = charaInfo.name || "",
         nameInList = "<li class = 'name'> "+name+"</li>",
         nameBox = nameInList + "<input class = 'number'>" + "<p class = 'error'></p>";
    return nameBox;
  }
  // データベース配列にあるすべてのオブジェクトの名前プロパティに整形を与える
  for (var i = 0; i < DB.length; i++){
    nameArray.push(evaluateName(DB[i]));
  }
  // <div>に<ul></ul>を作成し、リストを中に入れる
  $id.innerHTML = "<ul class = 'nameList'>"+nameArray.join("")+"</ul>"
}
var $divId = document.getElementById('info');
init($divId,charaData);
