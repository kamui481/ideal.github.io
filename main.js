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

const slideshowImages = [
  "assets/Paizaレーティング.jpg",
  "assets/S007_結果サマリ.png",
  "assets/S007_問題文.png",// 特別なタイミング
  "assets/S002_結果サマリ.png",
  "assets/S002_問題文.png"// 特別なタイミング
];

let currentImageIndex = 0;
const slideshowElement = document.getElementById("slideshow-image");
let isWaitingForOutputClear = false;// 出力結果が消えるのを待機中かどうか

// スライドショーの画像を切り替える関数
function changeImage() {
  if ((currentImageIndex === 2 || currentImageIndex === 4) && !isOutputCleared()) {
    isWaitingForOutputClear = true;
    return;// 出力結果が消えるまで切り替えを待つ
  }

  currentImageIndex = (currentImageIndex + 1) % slideshowImages.length;
  slideshowElement.src = slideshowImages[currentImageIndex];
  isWaitingForOutputClear = false;
}

// 出力結果がクリアされているかをチェックする関数
function isOutputCleared() {
  return outputDisplay.textContent.trim() === '';// 出力結果が空ならtrue
}

// 3秒ごとに通常の画像を切り替え
setInterval(() => {
  if (!isWaitingForOutputClear) {
    changeImage();
  }
}, 3000);

// 出力結果がクリアされたときに画像を切り替える
const observer = new MutationObserver(() => {
  if (isWaitingForOutputClear && isOutputCleared()) {
    changeImage();// 出力結果がクリアされたら画像を切り替え
  }
});
// 出力結果の変化を監視する
observer.observe(outputDisplay, { childList: true, subtree: true });

function startSlideshow(slideClass) {
  let currentIndex = 0;
  const slides = document.querySelectorAll(`.${slideClass}`);

  function showSlide() {
    slides.forEach((slide, index) => {
      slide.style.display = (index === currentIndex) ? 'block' : 'none';
    });
    currentIndex = (currentIndex + 1) % slides.length;
  }

  setInterval(showSlide, 3000);
}

// 1枚目、2枚目、4枚目のスライドショー開始
startSlideshow('slideshow-group-1', 'slide-1');

// 3枚目と5枚目のスライドショー開始
startSlideshow('slideshow-group-2', 'slide-2');
