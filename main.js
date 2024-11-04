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
// const slideshowWidth = 1400;  // 幅を指定（ピクセル単位）
// const slideshowHeight = 450;  // 高さを指定（ピクセル単位）

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

// 基準画像のサイズ取得と他の画像のサイズ調整関数
const baseImageSrc = "assets/Paizaレーティング.jpg"; // 基準とする画像
let baseWidth, baseHeight;

function setBaseImageSize() {
  const baseImage = new Image();
  baseImage.src = baseImageSrc;

  baseImage.onload = () => {
    baseWidth = baseImage.width;
    baseHeight = baseImage.height;

    // スライドショーコンテナのサイズを基準画像に合わせる
    slideshowElementGroup1.style.width = `${baseWidth}px`;
    slideshowElementGroup1.style.height = `${baseHeight}px`;

    // 他の画像を基準画像と同じサイズに設定
    slideshowImages.forEach((src) => {
      const imgElement = document.createElement("img");
      imgElement.src = src;
      imgElement.style.width = `${baseWidth}px`;
      imgElement.style.height = `${baseHeight}px`;
      imgElement.classList.add("slide"); // スライド用クラスを追加
      slideshowElementGroup1.appendChild(imgElement); // コンテナに追加
    });

    console.log("基準画像のサイズに基づいて他の画像の縮尺を設定しました。");
  };
}

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
  // slideshowElementGroup1が読み込まれていることを確認
  slideshowElementGroup1 = document.getElementById("slideshow-group-1");
  slideshowImageElement = slideshowElementGroup1.querySelector("img"); // 最初の画像要素を取得

  if (slideshowElementGroup1) {
    setBaseImageSize(); // 基準画像のサイズ設定
  } else {
    console.error("スライドショー要素が見つかりませんでした");
  }

  // スライドショーを開始（基準画像設定後に実行されるよう調整）
  const slideshowInterval = setInterval(changeImage, 3000);
  console.log("スライドショーを開始します");
});

// =============================
// slideshow-group-2の設定
// =============================

// スライドショー要素の取得
const slideshowElementGroup2 = document.getElementById("slideshow-group-2");
const slideshowImageElementGroup2 = document.querySelector("#slideshow-group-2 img"); // グループ内の画像要素

// スライドショーの画像リスト
const slideshowImagesGroup2 = [
  "assets/S007_問題文.png",
  "assets/S002_問題文.png",
];

let currentImageIndexGroup2 = 0;
let slideshowRepeatCountGroup2 = 0;
const maxRepeatsGroup2 = 2; // スライドショーの繰り返し回数（2回）
const slideIntervalGroup2 = 9000; // スライド間隔（15秒）

// スライドショーの画像を切り替える関数
function changeImageGroup2() {
  // 2回繰り返した後に停止し、最後の画像に固定
  if (slideshowRepeatCountGroup2 >= maxRepeatsGroup2) {
    clearInterval(slideshowIntervalGroup2); // スライドショーを停止
    currentImageIndexGroup2 = slideshowImagesGroup2.length - 1; // 最後の画像に設定
    slideshowImageElementGroup2.src = slideshowImagesGroup2[currentImageIndexGroup2];
    console.log("slideshow-group-2が2回で停止し、最後の画像に固定されました。");
    return;
  }

  // 画像を切り替え
  slideshowImageElementGroup2.src = slideshowImagesGroup2[currentImageIndexGroup2];
  currentImageIndexGroup2 = (currentImageIndexGroup2 + 1) % slideshowImagesGroup2.length;

  // 一巡した場合、繰り返し回数を増加
  if (currentImageIndexGroup2 === 0) {
    slideshowRepeatCountGroup2++;
    console.log(`slideshow-group-2が一巡しました。現在の繰り返し回数: ${slideshowRepeatCountGroup2}`);
  }
}

// スライドショー開始
const slideshowIntervalGroup2 = setInterval(changeImageGroup2, slideIntervalGroup2);
