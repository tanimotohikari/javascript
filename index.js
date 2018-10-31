window.onload = function(){

  let $tableElements = document.getElementsByTagName('td');
  //順番を制御するための変数
  let order = true; //trueは黒（先行）
  let othelloWhte = '◯';
  let othelloBlack = '●';
  let othelloColor = othelloBlack;

  for (var i=0; i < $tableElements.length; i++) {
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

    if (index > 15) {
      let topOthello = $tableElements[index - 8].innerHTML;
      let upperTopOthello = $tableElements[index - 16].innerHTML;

      //相手のオセロを上方向で挟み込んだ場合　黒色
      if (upperTopOthello.match(othelloBlack) && topOthello.match(othelloWhte)) {
        let targetIndex = index - 8;
        putOthello(targetIndex, index);
      }

      //相手のオセロを上方向で挟み込んだ場合 白色
      if (upperTopOthello.match(othelloWhte) && topOthello.match(othelloBlack)) {
        let targetIndex = index - 8;
        putOthello(targetIndex, index);
      }
    }

    if(index < 48) {
      let bottomOthello = $tableElements[index + 8].innerHTML;
      let lowerBottomOthello = $tableElements[index + 16].innerHTML;

      //相手のオセロを下方向で挟み込んだ場合　黒色
      if (lowerBottomOthello.match(othelloBlack) && bottomOthello.match(othelloWhte)) {
        let targetIndex = index + 8;
        putOthello(targetIndex, index);
      }

      //相手のオセロを下方向で挟み込んだ場合 白色
      if (lowerBottomOthello.match(othelloWhte) && bottomOthello.match(othelloBlack)) {
        let targetIndex = index + 8;
        putOthello(targetIndex, index);
      }
    }

    let rowSpot = [
      [0, 1, 2, 3, 4, 5, 6, 7],
      [8, 9, 10, 11, 12, 13, 14, 15],
      [16, 17, 18, 19, 20, 21, 22, 23],
      [24, 25, 26, 27, 28, 29, 30, 31],
      [32, 33, 34, 35, 36, 37, 38, 39],
      [40, 41, 42, 43, 44, 45, 46, 47],
      [48, 49, 50, 51, 52, 53, 54, 55],
      [56, 57, 58, 59, 60, 61, 62, 63]
    ];

    let selectArray;
    let selectNumber;

    for(var i=0; i < 8; i++) {
      if (rowSpot[i].indexOf(index) !== -1) {
        selectArray = i;
        selectNumber = rowSpot[i].indexOf(index);
      }
    }

    // console.log(selectArray);
    // console.log(selectNumber);

    //複数のオセロの色を変える
    for (var i=0; i < 8; i++) {
      let target = rowSpot[i][selectNumber];
      //選択した以外のマス目をチェック
      if (target !== index) {
        //黒か白かの判定
        if (order) {
          if ($tableElements[target].innerHTML.match(othelloBlack)) {
            let othelloChangeNumber = (i - 1) - selectArray;
            console.log(othelloChangeNumber);
            for (var n=0; n < othelloChangeNumber; n++) {
              let changeTarget = rowSpot[n + othelloChangeNumber][selectNumber];
              console.log(changeTarget);
              $tableElements[changeTarget].innerHTML = othelloColor;
            }
          }
        } else {
          if ($tableElements[target].innerHTML.match(othelloWhte)) {

          }
        }
      }
    }

    // let othelloWhtePosition = othellos.indexOf('◯');
    // let targetOthellos = prevHorizontalOthellos.slice(0, othelloWhtePosition);
    // let length = targetOthellos.length;
    // let valid = targetOthellos.every(value => value === '●');

    //console.log(othelloWhtePosition);
    //console.log(prevHorizontalOthellos);

    // if (valid) {
    //   othellos.forEach(function() {
    //     let indexNumber = 0;
    //     hoge[indexNumber] = '◯';
    //     indexNumber++;
    //   });
    // }
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
