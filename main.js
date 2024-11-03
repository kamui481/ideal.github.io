// =============================
// 自動コード入力・繰り返しテストデモのスクリプト
// =============================

const codeDisplay = document.getElementById('codeDisplay');
const outputDisplay = document.getElementById('outputDisplay');
const testDataDisplay = document.getElementById('testDataDisplay');

// 入力されるコード（途中まで入力されるものを複数設定）
const codeSamples = [
  `
import sys
from collections import defaultdict

def multiply_dict(d, factor):
    return {k: v * factor for k, v in d.items()}

def add_dicts(d1, d2):
    for k in d2:
        if k in d1:
            d1[k] += d2[k]
        else:
            d1[k] = d2[k]
  `,
  `
from collections import deque

def bfs(maze, start, goal, rows, cols):
    directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]
    queue = deque([(start[0], start[1], 0)])
    visited = set()
    visited.add((start[0], start[1]))

    while queue:
        x, y, dist = queue.popleft()

        if (x, y) == goal:
            return dist

        for dx, dy in directions:
            nx, ny = x + dx, y + dy

            if 0 <= nx < rows and 0 <= ny < cols and (nx, ny) not in visited and maze[nx][ny] != '1':
  `
];

// テストデータの定義
const testCases = [
  {
    input: "abcdefg10h12(ij2(3k))l9mnop4(3(2(6(qq)r)s5tu)7v5w)x15(yz)",
    expected: `a 1\nb 1\nc 1\nd 1\ne 1\nf 1\ng 1\nh 10\ni 12\nj 12\nk 72\nl 1\nm 9\nn 1\no 1\np 1\nq 288\nr 24\ns 12\nt 60\nu 12\nv 28\nw 20\nx 1\ny 15\nz 15`
  },
  {
    input: "10000(10000(10000(2000(ab)500(dz)c200h)2mu3000(fpr)))",
    expected: `a 2000000000000000\nb 2000000000000000\nc 1000000000000\nd 500000000000000\ne 0\nf 300000000000\ng 0\nh 200000000000000\ni 0\nj 0\nk 0\nl 0\nm 200000000\nn 0\no 0\np 300000000000\nq 0\nr 300000000000\ns 0\nt 0\nu 100000000\nv 0\nw 0\nx 0\ny 0\nz 500000000000000`
  },
  {
    input: "4 5\n0 s 0 1\n0 0 1 0\n0 1 1 0\n0 0 1 g\n0 0 0 0",
    expected: "9"  // ショートテスト
  },
  {
    input: "4 4\n0 s 0 1\n1 0 0 0\n0 1 1 1\n0 0 0 g",
    expected: "Fail" // ショートテスト
  }
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
    const result = executeTest(currentTest.input);
    outputDisplay.innerHTML = (result === currentTest.expected) 
      ? 'テスト合格:<br>' + result.replace(/\n/g, '<br>') // 改行を<br>に変換
      : 'テスト不合格';
    
    // 次のテストケース・コードに進む
    testIndex = (testIndex + 1) % testCases.length;
    codeIndex = (codeIndex + 1) % codeSamples.length;
    
    setTimeout(startTypingAnimation, 3000); // 次のアニメーション開始
  }, 1000);
}

// 完全な処理を模擬する関数
function executeTest(inputData) {
  return testCases[testIndex].expected; // ここでは期待結果を直接返して表示
}

// 初回アニメーション開始
startTypingAnimation();

// =============================
// スライドショーの設定
// =============================

// スライドショー画像のリスト
const slideshowImages = [
  "assets/Paizaレーティング.jpg",
  "assets/S007_結果サマリ.png",
  "assets/S007_問題文.png", // 特別なタイミング
  "assets/S002_結果サマリ.png",
  "assets/S002_問題文.png"  // 特別なタイミング
];

let currentImageIndex = 0;
const slideshowElement = document.getElementById("slideshow-image");
let isWaitingForOutputClear = false; // 出力結果が消えるのを待機中かどうか

// スライドショーの画像を切り替える関数
function changeImage() {
  // 現在の画像が3枚目または5枚目の場合、出力結果のクリアを待つ
  if ((currentImageIndex === 2 || currentImageIndex === 4) && !isOutputCleared()) {
    isWaitingForOutputClear = true;
    return; // 出力結果が消えるまで切り替えを待つ
  }

  // 次の画像に切り替え
  currentImageIndex = (currentImageIndex + 1) % slideshowImages.length;
  slideshowElement.src = slideshowImages[currentImageIndex];
  isWaitingForOutputClear = false;
}

// 出力結果がクリアされているかをチェックする関数
function isOutputCleared() {
  return outputDisplay.textContent.trim() === ''; // 出力結果が空ならtrue
}

// 3秒ごとに通常の画像を切り替え
setInterval(() => {
  if (!isWaitingForOutputClear) {
    changeImage();
  }
}, 5000);

// 出力結果がクリアされたときに画像を切り替える
const observer = new MutationObserver(() => {
  if (isWaitingForOutputClear && isOutputCleared()) {
    changeImage(); // 出力結果がクリアされたら画像を切り替え
  }
});

// 出力結果の変化を監視する
observer.observe(outputDisplay, { childList: true, subtree: true });
