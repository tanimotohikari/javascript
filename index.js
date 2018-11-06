window.onload = function(){

  let $tableElements = document.getElementsByTagName('td');
  //順番を制御するための変数
  let order = true; //trueは黒（先行）
  let othelloWhite = '◯';
  let othelloBlack = '●';
  let othelloColor = othelloBlack;

  let $orderTextBlack = document.getElementById('order-black');
  let $orderTextWhite = document.getElementById('order-white');

  for (var i=0; i < $tableElements.length; i++) {
    $tableElements[i].addEventListener('click', function(){
      //配列に変換する
      let tableElements = [].slice.call($tableElements);
      //クリックした位置の取得
      let index = tableElements.indexOf(this);
      checkPutOthllo(index);
      putOthello(index);
      changeOthello(index);
      changeOrder();
    });
  }

  //順番の判別する
  function changeOrder() {
    if (order) {
      othelloColor = othelloWhite;
      order = false;
      //画面に順番を表す表記を操作するための処理
      $orderTextBlack.classList.add('is-hide');
      $orderTextWhite.classList.remove('is-hide');
    } else {
      othelloColor = othelloBlack;
      order = true;
      $orderTextWhite.classList.add('is-hide');
      $orderTextBlack.classList.remove('is-hide');
    }
  }

  //オセロが置けるかをチェックする
  function checkPutOthllo (index) {
    //現在オセロが置かれているのか
    $tableElements[index].innerHTML.match(othelloColor)

    //index番号から配列のどの位置にオセロを置いたのかを判断するための配列
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

    let arrayNumber;
    let itemNumber;
    let valid = [];
    let changeIndexs = [];

    for(let i=0; i < 8; i++) {
      if (rowSpot[i].indexOf(index) !== -1) {
        arrayNumber = i;
        itemNumber = rowSpot[i].indexOf(index);
      }
    }

    //console.log(arrayNumber);
    console.log('item:' + itemNumber);
    console.log('index:' + index);

    //置いた場所の直後のオセロの色をチェック
    // let element = $tableElements[index + 8].innerHTML.match(othelloColor);
    // console.log(element[0]);
    // if(element[0] !== othelloColor) {
    //   console.log('hoge');
    //   if($tableElements[num].innerHTML.match(othelloColor)) {
    // }

    //オセロを置いたとことから上のマスをチェック
    //オセロを置いたところを含ませないように初期値を1に設定
    for (let i=1; i < arrayNumber; i++) {
      let checkNumber = index - (8 * i);
      if($tableElements[index - (8 * i)].innerHTML.match(othelloColor)) {
        //間のオセロの色を変える
        //同じ色までのオセロの数
        let changeNumber = -((checkNumber -index) / 8);
        for (let n=0; n < changeNumber - 1; n++) {
          changeIndexs[n] = checkNumber + (8 * (n + 1));

          $tableElements[changeIndexs[n]].innerHTML = othelloColor;
        }
      }
    }

    //オセロを置いたとことから下のマスをチェック
    for (let i=1; i < (8 - arrayNumber); i++) {
      let checkNumber = index + (8 * i);
      if($tableElements[checkNumber].innerHTML.match(othelloColor)) {
        //間のオセロの色を変える
        //同じ色までのオセロの数
        let changeNumber = ((checkNumber - index) / 8);
        for (let n=0; n < changeNumber - 1; n++) {
          changeIndexs[n] = checkNumber - (8 * (n + 1));
          $tableElements[changeIndexs[n]].innerHTML = othelloColor;
        }
      }
    }

    //オセロを置いたとことから左のマスをチェック
    for (let i=1; i < (itemNumber + 1); i++) {
      let checkNumber = index - i;
      if($tableElements[checkNumber].innerHTML.match(othelloColor)) {
        //間のオセロの色を変える
        //同じ色までのオセロの数
        let changeNumber = -(checkNumber - index);
        for (let n=0; n < changeNumber - 1; n++) {
          changeIndexs[n] = checkNumber + (n + 1);
          $tableElements[changeIndexs[n]].innerHTML = othelloColor;
        }
      }
    }

    //オセロを置いたとことから右のマスをチェック
    for (let i=1; i < (8 - itemNumber) - 1); i++) {
      let checkNumber = index + i;
      if($tableElements[checkNumber].innerHTML.match(othelloColor)) {
        console.log($tableElements[checkNumber]);
        //間のオセロの色を変える
        //同じ色までのオセロの数
        let changeNumber = checkNumber - index;
        for (let n=0; n < changeNumber - 1; n++) {
          changeIndexs[n] = checkNumber - (n + 1);
          $tableElements[changeIndexs[n]].innerHTML = othelloColor;
        }
      }
    }
  }

  //オセロを置く
  function putOthello(index) {
    $tableElements[index].innerHTML = othelloColor;
  }

  //オセロの色を変える
  function changeOthello(index) {

    //複数のオセロの色を変える
    // for (var i=0; i < 8; i++) {
    //   let target = rowSpot[i][itemNumber];
    //   //選択した以外のマス目をチェック
    //   if (target !== index) {
    //     //黒か白かの判定
    //     if (order) {
    //       if ($tableElements[target].innerHTML.match(othelloBlack)) {
    //         let othelloChangeNumber = (i - 1) - arrayNumber;
    //         //console.log(othelloChangeNumber);
    //         for (var n=0; n < othelloChangeNumber; n++) {
    //           let changeTarget = rowSpot[n + othelloChangeNumber][itemNumber];
    //           //console.log(changeTarget);
    //           $tableElements[changeTarget].innerHTML = othelloColor;
    //         }
    //       }
    //     } else {
    //       if ($tableElements[target].innerHTML.match(othelloWhite)) {
    //
    //       }
    //     }
    //   }
    // }
  }
}
