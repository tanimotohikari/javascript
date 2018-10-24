window.onload = function(){

  let $tableElements = document.getElementsByTagName('td');
  //順番を制御するための変数
  let order = true; //trueは黒（先行）
  let othelloWhte = '◯';
  let othelloBlack = '●';
  let othelloColor = othelloBlack;

  //tableの全てにclickイベントを付与する
  // for (let $i=0; $i < $tableElements.length; $i++) {
  //   othelloPositions.push($i);
  //   $tableElements[$i].addEventListener('click', function(){
  //     let tableElements = [].slice.call($tableElements);
  //     let index = tableElements.indexOf(this);
  //     changeOthello(index);
  //     changeOrder();
  //   });
  // }

  for (let i=0; i < $tableElements.length; i++) {
    $tableElements[i].addEventListener('click', function(){
      //配列に変換する
      let tableElements = [].slice.call($tableElements);
      //クリックした位置の取得
      let index = tableElements.indexOf(this);
      putOthello(index);
      changeOthello(index);
      changeOrder();
    });
  }

  //オセロを置く
  function putOthello(targetIndex, index) {
    $tableElements[targetIndex].innerHTML = othelloColor;
    $tableElements[index].innerHTML = othelloColor;
  }

  function putOthello(index) {
    $tableElements[index].innerHTML = othelloColor;
  }

  //オセロの色を変える
  function changeOthello(index) {
    //両隣とその隣のオセロの色（値）を取得
    let prevLeftOthello = $tableElements[index - 2].innerHTML;
    let prevOthello = $tableElements[index - 1].innerHTML;
    let nextRightOthello = $tableElements[index + 2].innerHTML;
    let nextOthello = $tableElements[index + 1].innerHTML;

    let unavailableListLeft = [9, 17, 25, 33, 41, 49, 57];
    let unavailableListRight = [6, 14, 22, 30, 38, 46, 54];
    const validLeftSide = [];
    const validRightSide = [];
    let leftIndex = 0;
    let rightIndex = 0;

    //配列を使って選択したマスが該当の箇所かをチェックする（左側）
    unavailableListLeft.forEach(function() {
      if (index === unavailableListLeft[leftIndex]) {
        validLeftSide.push(true);
      } else {
        validLeftSide.push(false);
      }
      leftIndex++;
    });

    //配列の中に一つでもtrueがあるとtrueを返してくれる「some」メソッド
    let resultLeftSide = validLeftSide.some((value) => {
      return value === true;
    });

    //配列を使って選択したマスが該当の箇所かをチェックする（右側）
    unavailableListRight.forEach(function() {
      if (index === unavailableListRight[rightIndex]) {
        validRightSide.push(true);
      } else {
        validRightSide.push(false);
      }
      rightIndex++;
    });

    //配列の中に一つでもtrueがあるとtrueを返してくれる「some」メソッド
    let resultRightSide = validRightSide.some((value) => {
      return value === true;
    });

    //左隣の次のマスの色が置いたオセロと同じ色の場合隣のオセロの色を変える 黒色
    if (!resultLeftSide) {
      if (prevLeftOthello.match(othelloBlack) && prevOthello.match(othelloWhte)) {
        let targetIndex = index - 1;
        putOthello(targetIndex, index);
      }

      //左隣の次のマスの色が置いたオセロと同じ色の場合隣のオセロの色を変える 白色
      if (prevLeftOthello.match(othelloWhte) && prevOthello.match(othelloBlack)) {
        let targetIndex = index - 1;
        putOthello(targetIndex, index);
      }
    }

    //右隣の次のマスの色が置いたオセロと同じ色の場合隣のオセロの色を変える 黒色
    if (!resultRightSide) {
      if (nextRightOthello.match(othelloBlack) && nextOthello.match(othelloWhte)) {
        let targetIndex = index + 1;
        putOthello(targetIndex, index);
      }

      //右隣の次のマスの色が置いたオセロと同じ色の場合隣のオセロの色を変える 白色
      if (nextRightOthello.match(othelloWhte) && nextOthello.match(othelloBlack)) {
        let targetIndex = index + 1;
        putOthello(targetIndex, index);
      }
    }

    //相手にオセロを上下で挟み込んだ場合
  }

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
