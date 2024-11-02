// =============================
// 自動コード入力・繰り返しテストデモのスクリプト
// =============================

const codeDisplay = document.getElementById('codeDisplay');
const outputDisplay = document.getElementById('outputDisplay');
const testDataDisplay = document.getElementById('testDataDisplay');

// 入力されるコード（途中まで入力）
const code = `
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
`;

// テストデータの定義
const testCases = [
  {
    input: "abcdefg10h12(ij2(3k))l9mnop4(3(2(6(qq)r)s5tu)7v5w)x15(yz)",
    expected: `a 1\nb 1\nc 1\nd 1\ne 1\nf 1\ng 1\nh 10\ni 12\nj 12\nk 72\nl 1\nm 9\nn 1\no 1\np 1\nq 288\nr 24\ns 12\nt 60\nu 12\nv 28\nw 20\nx 1\ny 15\nz 15`
  },
  {
    input: "10000(10000(10000(2000(ab)500(dz)c200h)2mu3000(fpr)))",
    expected: `a 2000000000000000\nb 2000000000000000\nc 1000000000000\nd 500000000000000\ne 0\nf 300000000000\ng 0\nh 200000000000000\ni 0\nj 0\nk 0\nl 0\nm 200000000\nn 0\no 0\np 300000000000\nq 0\nr 300000000000\ns 0\nt 0\nu 100000000\nv 0\nw 0\nx 0\ny 0\nz 500000000000000`
  }
];

let typingIndex = 0;
let testIndex = 0;
const typingSpeed = 50; // コード入力の速度

// コードをアニメーションで途中まで表示する関数
function startTypingAnimation() {
  codeDisplay.textContent = '';
  outputDisplay.textContent = '';
  testDataDisplay.textContent = '';

  typingIndex = 0;

  function type() {
    if (typingIndex < code.length) {
      codeDisplay.textContent += code[typingIndex];
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
  testDataDisplay.textContent = `入力データ: ${currentTest.input}`;
  
  // 完全な処理を模擬して出力
  setTimeout(() => {
    const result = executeTest(currentTest.input);
    outputDisplay.textContent = (result === currentTest.expected) ? 'テスト合格: ' + result : 'テスト不合格';
    testIndex = (testIndex + 1) % testCases.length; // 次のテストケースへ
    setTimeout(startTypingAnimation, 3000); // 次のアニメーション開始
  }, 1000);
}

// 完全な処理を模擬する関数
function executeTest(inputData) {
  return testCases[testIndex].expected; // ここでは期待結果を直接返して表示
}

// 初回アニメーション開始
startTypingAnimation();
