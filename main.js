// =============================
// 自動コード入力・繰り返しテストデモのスクリプト
// =============================

const codeDisplay = document.getElementById('codeDisplay');
const outputDisplay = document.getElementById('outputDisplay');
const testDataDisplay = document.getElementById('testDataDisplay');

// 入力されるコード（途中まで入力されるものを複数設定）
const codeSamples = [
  `import sys\nfrom collections import defaultdict\n\ndef multiply_dict(d, factor):\n    return {k: v * factor for k, v in d.items()}\n\ndef add_dicts(d1, d2):\n    for k in d2:\n        if k in d1:\n            d1[k] += d2[k]\n        else:\n            d1[k] = d2[k}\n`,
  `from collections import deque\n\ndef bfs(maze, start, goal, rows, cols):\n    directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]\n    queue = deque([(start[0], start[1], 0)])\n    visited = set()\n    visited.add((start[0], start[1]))\n\n    while queue:\n        x, y, dist = queue.popleft()\n        if (x, y) == goal:\n            return dist\n`
];

// テストデータの定義
const testCases = [
  { input: "abcdefg10h12(ij2(3k))l9mnop4(3(2(6(qq)r)s5tu)7v5w)x15(yz)", expected: "q 288\nr 24\n..." },
  { input: "10000(10000(10000(2000(ab)500(dz)c200h)2mu3000(fpr)))", expected: "a 2000000000000000\nb 200000..." },
  { input: "4 5\n0 s 0 1\n0 0 1 0\n0 1 1 0\n0 0 1 g\n0 0 0 0", expected: "9" },
  { input: "4 4\n0 s 0 1\n1 0 0 0\n0 1 1 1\n0 0 0 g", expected: "Fail" }
];

let typingIndex = 0;
let testIndex = 0;
let codeIndex = 0;
const typingSpeed = 50; // コード入力の速度

// コードをアニメーションで途中まで表示する関数
function startTypingAnimation() {
  codeDisplay.textContent = '';
  outputDisplay.textContent = '';
  testDataDisplay.textContent = '';

  typingIndex = 0;

  function type() {
    if (typingIndex < codeSamples[codeIndex].length) {
      codeDisplay.textContent += codeSamples[codeIndex][typingIndex];
      typingIndex++;
      setTimeout(type, typingSpeed);
    } else {
      displayTestData();
    }
  }
  type();
}

// テストデータを表示し、裏で完全な処理を実行して結果を出力
function displayTestData() {
  const currentTest = testCases[testIndex];
  testDataDisplay.textContent = `入力データ:\n${currentTest.input}`;

  // 完全な処理を模擬して出力
  setTimeout(() => {
    const result = currentTest.expected;
    outputDisplay.innerHTML = `テスト合格:<br>${result.replace(/\n/g, '<br>')}`;

    // 次のテストケース・コードに進む
    testIndex = (testIndex + 1) % testCases.length;
    codeIndex = (codeIndex + 1) % codeSamples.length;

    setTimeout(startTypingAnimation, 3000); // 次のアニメーション開始
  }, 1000);
}

// 初回アニメーション開始
startTypingAnimation();

// =============================
// スライドショーの設定
// =============================

// スライドショーの表示サイズをユーザーが指定
const slideshowWidth = 1400;  // 幅を指定（ピクセル単位）
const slideshowHeight = 450;  // 高さを指定（ピクセル単位）

// スライドショー関連の変数
let slideshowElementGroup1;
let slideshowImageElement;
const slideshowImages = [
  "assets/Paizaレーティング.jpg",
  "assets/S007_結果サマリ.png",
  "assets/S002_結果サマリ.png"
];
let currentImageIndex = 0;
let slideshowRepeatCount = 0;
const maxRepeats = 1; // スライドショーの繰り返し回数

// スライドショーの画像を切り替える関数
function changeImage() {
  // 指定回数繰り返した後、スライドショーを停止して1枚目に固定
  if (slideshowRepeatCount >= maxRepeats) {
    currentImageIndex = 0; // 1枚目の画像に戻す
    slideshowImageElement.src = slideshowImages[currentImageIndex]; // 1枚目に設定
    clearInterval(slideshowInterval); // スライドショーを停止
    console.log("スライドショーを停止しました。1枚目の画像で固定されています。");
    return;
  }

  // 画像を切り替える
  slideshowImageElement.src = slideshowImages[currentImageIndex];
  currentImageIndex = (currentImageIndex + 1) % slideshowImages.length;

  // スライドショーが一巡した場合、繰り返し回数を増やす
  if (currentImageIndex === 0) {
    slideshowRepeatCount++;
    console.log(`スライドショーが一巡しました。現在の繰り返し回数: ${slideshowRepeatCount}`);
  }
}

// DOMの読み込み完了後にスライドショーを初期化
document.addEventListener("DOMContentLoaded", function() {
  slideshowElementGroup1 = document.getElementById("slideshow-group-1");
  slideshowImageElement = slideshowElementGroup1.querySelector("img"); // 最初の画像要素を取得

  if (slideshowElementGroup1 && slideshowImageElement) {
    // スライドショー領域のサイズを固定
    slideshowElementGroup1.style.width = `${slideshowWidth}px`;
    slideshowElementGroup1.style.height = `${slideshowHeight}px`;

    // スライドショー開始
    const slideshowInterval = setInterval(changeImage, 3000);
    console.log("スライドショーを開始します");
  } else {
    console.error("スライドショー要素が見つかりませんでした");
  }
});

// =============================
// slideshow2の設定
// =============================

const slideshowElementGroup2 = document.getElementById("slideshow-group-2");
const slideshowImages2 = [
  "assets/S007_問題文.png",  // 1枚目の画像
  "assets/S002_問題文.png"   // 2枚目の画像
];

let currentImageIndex2 = 0;
let repeatCount2 = 0;
const maxRepeats2 = 2;  // スライドショーの最大繰り返し回数

// slideshow2用の画像を切り替える関数
function changeImage2() {
  if (repeatCount2 >= maxRepeats2) {
    // 指定回数を超えた場合、スライドショーを停止し、非表示にする
    clearInterval(slideshowInterval2);
    slideshowElementGroup2.style.display = "none";
    console.log("slideshow2を停止し、非表示にしました。");
    return;
  }

  // 現在の画像を切り替え
  slideshowElementGroup2.querySelector("img").src = slideshowImages2[currentImageIndex2];
  console.log(`slideshow2の現在の画像: ${currentImageIndex2 + 1}枚目`);

  // 画像インデックスを更新
  if (currentImageIndex2 === 0) {
    // 1枚目 -> 2枚目に切り替える際は9秒後に変更
    setTimeout(changeImage2, 10500);
  } else {
    // 2枚目 -> 1枚目に切り替える際は17秒後に変更
    setTimeout(changeImage2, 24000);
    repeatCount2++;  // 1巡完了とみなして繰り返しカウントを増やす
  }

  // 画像インデックスの更新（0と1を交互に）
  currentImageIndex2 = (currentImageIndex2 + 1) % slideshowImages2.length;
}

// slideshow2の初期設定
document.addEventListener("DOMContentLoaded", function() {
  if (slideshowElementGroup2) {
    // slideshow2を表示し、1枚目の画像を設定
    slideshowElementGroup2.style.display = "block";
    slideshowElementGroup2.querySelector("img").src = slideshowImages2[0];

    // slideshow2を開始
    setTimeout(changeImage2, 9000);  // 初回は9秒後に2枚目に変更
  } else {
    console.error("slideshow2要素が見つかりませんでした");
  }
});

