window.onload = function(){

  var $tableElements = document.getElementsByTagName('td');
  //順番を制御するための変数
  var order = true; //trueは黒（先行）
  var othelloWhte = '◯';
  var othelloBlack = '●';
  var othelloColor = othelloBlack;

  //tableの全てにclickイベントを付与する
  // for (var $i=0; $i < $tableElements.length; $i++) {
  //   othelloPositions.push($i);
  //   $tableElements[$i].addEventListener('click', function(){
  //     var tableElements = [].slice.call($tableElements);
  //     var index = tableElements.indexOf(this);
  //     changeOthello(index);
  //     changeOrder();
  //   });
  // }

  for (var $i=0; $i < $tableElements.length; $i++) {
    $tableElements[$i].addEventListener('click', function(){
      //配列に変換する
      var tableElements = [].slice.call($tableElements);
      //クリックした位置の取得
      var index = tableElements.indexOf(this);
      putOthello(index);
      changeOrder();
    });
  }

  //オセロを置く
  // function putOthello(targetIndex, index) {
  //   $tableElements[targetIndex].innerHTML = othelloColor;
  //   $tableElements[index].innerHTML = othelloColor;
  // }

  function putOthello(index) {
    $tableElements[index].innerHTML = othelloColor;
  }

  //オセロの色を変える
  // function changeOthello(index) {
  //   //両隣とその隣のオセロの色（値）を取得
  //   var prevLeftOthello = $tableElements[index - 2].innerHTML;
  //   var prevOthello = $tableElements[index - 1].innerHTML;
  //   var nextRightOthello = $tableElements[index + 2].innerHTML;
  //   var nextOthello = $tableElements[index + 1].innerHTML;
  //
  //   //左隣の次のマスの色が置いたオセロと同じ色の場合隣のオセロの色を変える
  //   if (prevLeftOthello.match(othelloBlack) && prevOthello.match(othelloWhte)) {
  //     var targetIndex = index - 1;
  //     putOthello(targetIndex, index);
  //   }
  //
  //   //右隣の次のマスの色が置いたオセロと同じ色の場合隣のオセロの色を変える
  //   if (nextRightOthello.match(othelloBlack) && nextOthello.match(othelloWhte)) {
  //     var targetIndex = index + 1;
  //     putOthello(targetIndex, index);
  //   }
  //
  //   if (prevLeftOthello.match(othelloWhte) && prevOthello.match(othelloBlack)) {
  //     var targetIndex = index - 1;
  //     putOthello(targetIndex, index);
  //   }
  //
  //   //右隣の次のマスの色が置いたオセロと同じ色の場合隣のオセロの色を変える
  //   if (nextRightOthello.match(othelloWhte) && nextOthello.match(othelloBlack)) {
  //     var targetIndex = index + 1;
  //     putOthello(targetIndex, index);
  //   }
  // }

  //順番の判別する
  function changeOrder() {
    if (order) {
      othelloColor = othelloWhte;
      order = false;
    } else {
      othelloColor = othelloBlack;
      order = true;
    }
  }
}
