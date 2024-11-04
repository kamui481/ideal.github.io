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
const slideshowWidth = 800;  // 幅を指定（ピクセル単位）
const slideshowHeight = 450; // 高さを指定（ピクセル単位）

// スライドショー要素の取得
const slideshowElementGroup1 = document.getElementById("slideshow-group-1");
const slideshowElementGroup2 = document.getElementById("slideshow-group-2");

// スライドショー領域のサイズを固定
slideshowElementGroup1.style.width = `${slideshowWidth}px`;
slideshowElementGroup1.style.height = `${slideshowHeight}px`;
slideshowElementGroup2.style.width = `${slideshowWidth}px`;
slideshowElementGroup2.style.height = `${slideshowHeight}px`;

// スライドショーの設定
const slideshowElementGroup1 = document.getElementById("slideshow-group-1");
const slides = slideshowElementGroup1.querySelectorAll('.slide');
let slideIndex = 0;
let cycleCount = 0;
const maxCycles = 2; // スライドショーを繰り返す回数

function showSlides() {
    if (cycleCount >= maxCycles) {
        // 最大サイクル数に達したら1枚目のスライドで固定
        slides.forEach((slide, index) => {
            slide.style.display = (index === 0) ? 'block' : 'none';
        });
        return;
    }

    // 全てのスライドを非表示にして現在のスライドを表示
    slides.forEach((slide, index) => {
        slide.style.display = (index === slideIndex) ? 'block' : 'none';
    });

    // スライドインデックスを更新
    slideIndex++;
    if (slideIndex >= slides.length) {
        slideIndex = 0;
        cycleCount++; // 1巡したらカウントを増やす
    }
}

// 3秒ごとにスライドを切り替え
setInterval(showSlides, 3000);
