// =============================
// 自動コード入力・実行デモのスクリプト
// =============================

const codeDisplay = document.getElementById('codeDisplay');
const outputDisplay = document.getElementById('outputDisplay');
const testDisplay = document.getElementById('testDisplay');

// 自動入力されるコード
const code = `
const greet = (name) => \`こんにちは、\${name}さん！\`;
console.log(greet('太郎'));
`;

// テストデータと期待結果
const testData = [
  { input: '太郎', expected: 'こんにちは、太郎さん！' },
  { input: '花子', expected: 'こんにちは、花子さん！' }
];

// 自動入力のスピード
const typingSpeed = 100; // ミリ秒

// 実行関数
function executeCode() {
  outputDisplay.textContent = ''; // 出力をクリア
  try {
    const result = eval(code);
    outputDisplay.textContent = '実行結果: ' + result;
    runTests();
  } catch (error) {
    outputDisplay.textContent = 'エラー: ' + error.message;
  }
}

// テスト実行
function runTests() {
  testDisplay.textContent = ''; // テスト結果をクリア
  let allPassed = true;
  
  testData.forEach((test, index) => {
    const { input, expected } = test;
    const actual = eval(`greet('${input}')`);
    const passed = actual === expected;
    allPassed = allPassed && passed;
    testDisplay.textContent += `テスト ${index + 1}: 入力 = ${input}, 期待結果 = ${expected}, 実際の結果 = ${actual} - ${passed ? '合格' : '不合格'}\n`;
  });

  if (allPassed) {
    testDisplay.textContent += '\nすべてのテストに合格しました！';
  } else {
    testDisplay.textContent += '\n一部のテストに不合格です。';
  }

  // 次のデモ開始
  setTimeout(startTypingAnimation, 3000); // 3秒後に再スタート
}

// コードを入力アニメーションで表示する関数
function startTypingAnimation() {
  codeDisplay.textContent = ''; // コード表示をクリア
  outputDisplay.textContent = '';
  testDisplay.textContent = '';

  let index = 0;

  function type() {
    if (index < code.length) {
      codeDisplay.textContent += code[index];
      index++;
      setTimeout(type, typingSpeed);
    } else {
      // コードの入力が完了したら実行
      executeCode();
    }
  }
  type();
}

// 初回のアニメーション開始
startTypingAnimation();


// =============================
// スクロールエフェクトのスクリプト
// =============================

// スクロールエフェクト
document.addEventListener('scroll', () => {
  const projects = document.querySelectorAll('.project');
  projects.forEach(project => {
    const position = project.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (position < windowHeight - 100) {
      project.style.opacity = '1';
      project.style.transform = 'translateY(0)';
    }
  });
});

// 初期状態を隠す設定
document.querySelectorAll('.project').forEach(project => {
  project.style.opacity = '0';
  project.style.transform = 'translateY(50px)';
  project.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
});
